"""
    [Lambda 함수 실행 전 사전 작업]
        - [pymysql.zip, pytz.zip] 파일을 Layer에 등록해야 함(pytz는 lambda 서버가 UTC 기준으로 시간을 사용하기 때문에 Asia/Seoul 시간으로 맞추기 위함임)
        - S3 버킷 퍼블릭 설정, Lambda 에서도 S3-READ 권한 설정
        - Lambda environment 설정 필요(DB.config)
        - (optional)Lambda 함수 스펙, 메모리 - 128MB, 제한 시간 - 1분 설정

    [Lambda 프로세스]
        - EventBridge 서비스를 통해 Batch 작업 및 Lambda 트리거로 활용
        - 매 주 월요일 자정(00:00)에 각 유저당 앨범에 들어갈 Card list(영상 리스트)를 DB에서 추출
            - Query 문을 통해 DB에서 각 유저당 7일 이내 찍힌 영상들 중 'expression_value()' 가 높은 순을 기준으로 최대 10개의 영상 리스트를 가져옴
        - 추출된 데이터를 DB Card 테이블에 반영(매 주 각 유저당 한 개씩 만들어지는 앨범에 활용함)
"""

import json
import os
import pymysql
from datetime import datetime, timedelta
from pytz import timezone

def lambda_handler(event, context):
    try:
      # DB configure
      conn = pymysql.connect(host=os.environ['DB_HOST'], 
                            user=os.environ['DB_USERNAME'], 
                            password=os.environ['DB_PASSWORD'], 
                            db=os.environ['DB_DATABASE'], 
                            charset='utf8')
      cur = conn.cursor()
      
      select_query_maxium_ten_data = f"""
                                      SELECT user_id, expression_label, thumbnail_url, video_url 
                                      FROM ( 
                                        SELECT user_id, expression_label, thumbnail_url, video_url, 
                                          @rownum := IF(@prev_user = user_id, @rownum + 1, 1) AS rownum, 
                                          @prev_user := user_id 
                                        FROM expression 
                                        CROSS JOIN (SELECT @rownum := 0, @prev_user := NULL) AS vars 
                                        WHERE created_at >= %s AND created_at < %s 
                                        ORDER BY user_id, expression_value DESC 
                                      ) AS t 
                                      WHERE rownum <= 10
                                      """
                                      
      
      # print((datetime.now(timezone('Asia/Seoul')) - timedelta(7)).strftime("%Y-%m-%d"), datetime.now(timezone('Asia/Seoul')).strftime("%Y-%m-%d"))
      
      cur.execute(select_query_maxium_ten_data, ((datetime.now(timezone('Asia/Seoul')) - timedelta(7)).strftime("%Y-%m-%d"), datetime.now(timezone('Asia/Seoul')).strftime("%Y-%m-%d")))
      
      data = cur.fetchall()
    
    # 디버깅용
    #   for row_data in data:
    #     print(row_data)
      
    #   print(len(data))
      
      insert_query_every_week_card_data = f"""
                                            INSERT INTO card (user_id, expression_label, thumbnail_url, video_url) 
                                            VALUES(%s, %s, %s, %s)
                                          """
      
      cur.executemany(insert_query_every_week_card_data, data)
      conn.commit()
      conn.close()
   
    except Exception as e:
      print("An error occurred:", e)
      raise e
    
    else:
      return {
        'statusCode': 200,
        'body': json.dumps('Lambda function works successfully!')
      }