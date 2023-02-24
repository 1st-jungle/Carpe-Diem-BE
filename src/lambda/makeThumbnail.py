"""
    [Lambda 함수 실행 전 사전 작업]
        - [ffmpeg.zip, pymysql.zip] 파일을 Layer에 등록해야 함
        - S3 버킷 퍼블릭 설정, Lambda 에서도 S3-READ 권한 설정
        - Lambda environment 설정 필요(DB.config)
        - Lambda 함수 스펙, 메모리 - 1280MB, 제한 시간 - 1분 설정(optional) / 단, 메모리나 제한 시간이 너무 짧으면 수행 불가능함
"""

import boto3
import os
import json
import subprocess
import pymysql
from datetime import datetime

def lambda_handler(event, context):
    # os.system('/opt/ffmpeg/ffmpeg --help')
    # print('osdir', os.listdir("/opt/ffmpeg"))
    s3 = boto3.client('s3')
    bucket = event["Records"][0]["s3"]["bucket"]["name"]
    key = event["Records"][0]["s3"]["object"]["key"]
    
    try:
      # DB configure
      conn = pymysql.connect(host=os.environ['DB_HOST'], 
                            user=os.environ['DB_USERNAME'], 
                            password=os.environ['DB_PASSWORD'], 
                            db=os.environ['DB_DATABASE'], 
                            charset='utf8')
      cur = conn.cursor()
      query_select_expression = f"""
                                  SELECT expression_label, expression_time 
                                  FROM expression 
                                  where video_url = %s
                                """
      
      cur.execute(query_select_expression, (key))
      
      expression_label, expression_time = cur.fetchone()
    
      # 파일을 저장할 위치, AWS Lambda에서는 오직 /tmp 에만 파일을 작성 가능
      FILE_NAME = f'/tmp/{os.path.basename(key)}'
      s3.download_file(bucket, key, FILE_NAME)
      
      # Check the directory
      # print('osdir', os.listdir("/tmp"))
      
      # convert .webm to .mp4 using ffmpeg
      converted_mp4file = f'/tmp/{os.path.basename(key)}.mp4'
      subprocess.run(['/opt/ffmpeg/ffmpeg', '-y', '-i', FILE_NAME, '-vcodec', 'copy', converted_mp4file])
      
      # Upload to ffmpeg converted file s3
      destination_mp4file = f'{key.split(".webm")[0]}.mp4'
      s3.upload_file(converted_mp4file, bucket, destination_mp4file)
      
      # make .jpg file from .webm file
      converted_jpgfile = f'/tmp/{os.path.basename(key)}.mp4'
      # 형식: ([실행시킬 프로그램명], [-y: yes comfirm], [-ss: 언제부터 자를건지], [-i: input data], [-vframes: 프레임 단위], [-q:v: 품질 요인. 낮을수록 좋음])
      subprocess.run(['/opt/ffmpeg/ffmpeg', '-y', '-ss', expression_time.strftime("%H:%M:%S"), '-i', FILE_NAME, '-vframes', '1', '-q:v', '2', '-f', 'image2', converted_jpgfile])
      
      # Upload to ffmpeg converted file s3
      destination_jpgfile = f"{('card-thumbnail/' + '/'.join(key.split('/')[1:])).split('.')[0]}.jpg"
      s3.upload_file(converted_jpgfile, bucket, destination_jpgfile)
      
      # INSERT DATA to DB.dev.card
      query_insert_card = f"""
                            INSERT INTO card (user_id, expression_label, thumbnail_url, video_url) 
                            VALUES(%s, %s, %s, %s)
                          """
      cur.execute(query_insert_card, (key.split('/')[1], expression_label, destination_jpgfile, destination_mp4file))
      
      # UPDATE DATA to DB.dev.expression (확장자 변경 .mp4)
      query_update_expression = f"""
                                  UPDATE expression
                                  SET video_url = %s 
                                  WHERE video_url = %s
                                """
      
      cur.execute(query_update_expression, (destination_mp4file, key))
      
      conn.commit()
      conn.close()
      
      s3.delete_object(Bucket=bucket, Key=key)
    
    except Exception as e:
      print("An error occurred:", e)
      raise e
    
    else:
      return {
        'statusCode': 200,
        'body': json.dumps('Lambda function works successfully!')
      } 
    