`![logo](https://user-images.githubusercontent.com/66216102/224023729-c3fef6b4-d45a-48a8-8e7c-1be533e18078.png)

## 🚀 목차

- [🚀 프로젝트 개요](#🚀-프로젝트-개요)
- [🎮 기술 스택](#🎮-기술-스택)
  - [💻 Back-End](#💻-back-end)
  - [✨ Front-End](#✨-front-end)
  - [🌏 Infra](#🌏-Infra)
  - [🫡 협업툴](#🫡-협업툴)
- [🚀 서비스 소개](#🚀-서비스-소개)
  - [Carpe Diem은 이런 생각에서 시작하였습니다.](#carpe-diem은-이런-생각에서-시작하였습니다)
  - [Carpe Diem은 이런 서비스입니다.](#carpe-diem은-이런-서비스입니다)
- [🚀 주요기능](#🚀-주요기능)
  - [두 가지의 영상 모드](#두-가지의-영상-모드)
  - [소셜 로그인](#소셜-로그인)
  - [인물 등록 - 인물 & 감정 디텍팅](#인물-등록---인물--감정-디텍팅)
  - [영상 녹화 - 비디오 & 앨범](#영상-녹화---비디오--앨범)
  - [친구 기능](#친구-기능)
  - [감정 리포트 제작](#감정-리포트-제작)
- [🚀 전체 프로젝트의 구조](#🚀-전체-프로젝트의-구조)
- [🚀 프로젝트 포스터](#🚀-프로젝트-포스터)

## 🚀 프로젝트 개요

|   Name   | 김다솔                                                                                                            | 김수경                                                                                                            | 이지연                                                                                                            | 주성우                                                                                                            | 홍서희                                                                                                           |
| :------: | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Profile  | ![김다솔](https://user-images.githubusercontent.com/66216102/224022201-5cecf932-469b-416e-8e43-e62ec1286337.jpeg) | ![김수경](https://user-images.githubusercontent.com/66216102/224022211-d841609e-5e04-4246-95bc-893bb0b95959.jpeg) | ![이지연](https://user-images.githubusercontent.com/66216102/224022216-5b8070a7-afb1-4d60-b21f-2fcd74f54cf8.jpeg) | ![주성우](https://user-images.githubusercontent.com/66216102/224022220-16542f51-9dcd-45a8-a1af-b04422a125cc.jpeg) | ![홍서희](https://user-images.githubusercontent.com/66216102/224022221-e2ce65ca-a78e-4589-9ae3-38eb04af98f3.jpg) |
| Position | Frontend & UI/UX                                                                                                  | 팀장 & Backend Develop                                                                                            | Frontend & UI/UX                                                                                                  | Backend Develop                                                                                                   | Backend Develop                                                                                                  |
|   Git    | [@sol2588](https://github.com/sol2588)                                                                            | [@olive-su](https://github.com/olive-su)                                                                          | [@ljy6712](https://github.com/ljy6712)                                                                            | [@nickhealthy](https://github.com/nickhealthy)                                                                    | [@XxoSio](https://github.com/XxoSio)                                                                             |

프로젝트 기간: 2023년 1월 25일 ~ 2023년 3월 11일(5주)
서비스 보러가기: ![favicon-32x32](https://user-images.githubusercontent.com/66216102/224023859-edc77f7f-9169-4d68-a0f0-773a180e4706.png)[Carpe-Diem 접속하기](https://jungle-carpediem.site/)
소개 및 시연 영상:
팀 노션: [노션링크](https://www.notion.so/kimpp/CARPE-DIEM-WIKI-1647f0a74db346b3b3edddebe390cd48)

## 🎮 기술 스택

### 💻 Back-End

<details>
      <summary>Back 자세히 살펴보기 🔥</summary>
      <ul>
        <li>기술스택 ⚙ 및 라이브러리 📚</li>
      </ul>
      <ul>
          <li><img src='https://user-images.githubusercontent.com/66216102/224264138-0edc6152-a748-4118-9cf2-fc4898c16c68.png'/>Nodejs v18.14.0</li>
          <li><img src='https://user-images.githubusercontent.com/66216102/224264127-57727e5f-5602-4b16-9e40-046b483a9276.png'/>express: 4.17.17</li>
          <li><img src='https://user-images.githubusercontent.com/66216102/224264117-eeb99abc-0445-4b26-93d1-aac2f9f6898f.png'/>eslint: 8.33.0</li>
          <li><img src='https://user-images.githubusercontent.com/66216102/224264995-09b056e5-7669-481b-91e8-43d888828c47.png'/>typescript: 4.9.5</li>
					<li><img src='https://user-images.githubusercontent.com/66216102/224264994-93ffc8de-a92a-45f0-b19f-4e2eac64af81.png'/>dotenv: 16.0.3</li>
        	<li><img src='https://user-images.githubusercontent.com/66216102/224265356-8c73514d-9775-4728-ba97-93f87fa521bb.png'/>aws-sdk: 3.266</li>
  	      <li><img src=''/>multer: 8.33.0</li>
          <li><img src='https://user-images.githubusercontent.com/66216102/224264989-00f768e1-ad7f-48aa-bf42-94cd3cc51e98.png'/>socket.io: 4.6.1</li>
	        <li><img src='https://user-images.githubusercontent.com/66216102/224264142-38b6385c-f684-4994-8288-6b6df487a530.png'/>passport: 0.6.0</li>
	        <li><img src='https://user-images.githubusercontent.com/66216102/224264142-38b6385c-f684-4994-8288-6b6df487a530.png'/>passport-google-oauth2: 0.2.0</li>
        	<li><img src=''/>swagger-jsdoc: 6.2.8</li>
        	<li><img src=''/>swagger-ui-express: 4.6.0</li>
          <li><img src=''/>cors: 2.8.5</li>
          <li><img src='https://user-images.githubusercontent.com/66216102/224264131-18f9cac3-9af3-439f-b902-9552cce9a605.png'/>mysql: 8.0.28</li>
          <li><img src='https://user-images.githubusercontent.com/66216102/224264143-8b481f85-594d-4b57-96af-54a04d27e539.png'/>sequelize: 6.28.0</li>
          <li><img src='https://user-images.githubusercontent.com/66216102/224264999-d220bce1-5802-4bf6-b199-d0af409904fe.png'/>winston: 3.8.2</li>
        	<li><img src='https://user-images.githubusercontent.com/66216102/224264999-d220bce1-5802-4bf6-b199-d0af409904fe.png'/>winston-daily-rotate-file: 4.7.1</li>
      </ul>
  </details>

### ✨ Front-End

<details>
    <summary>Front 자세히 살펴보기 🌈</summary>
    <ul>
        <li>기술스택 ⚙ 및 라이브러리 📚</li>
    </ul>   
    <ul>
      <li>JS, HTML, CSS</li>
        <li><img src='https://user-images.githubusercontent.com/66216102/224266842-8f9ddd03-2693-461a-a3e6-48a62781aeb7.png'/>react: 18.2.0</li>
        <li><img src=''/>react-webcam: 7.0.1</li>
        <li><img src='https://user-images.githubusercontent.com/66216102/224266847-3d5ba778-a382-4a4a-a327-19fdecf55961.png'/>redux: 4.2.1</li>
        <li><img src='https://user-images.githubusercontent.com/66216102/224266847-3d5ba778-a382-4a4a-a327-19fdecf55961.png'/>redux-saga: 1.2.2</li>
        <li><img src=''/>styled-components: 5.3.6</li>
        <li><img src='https://user-images.githubusercontent.com/66216102/224264989-00f768e1-ad7f-48aa-bf42-94cd3cc51e98.png'/>socket.io-client: 4.6.0</li>
        <li><img src=''/>styled-components: 5.3.6</li>
   		  <li><img src='https://user-images.githubusercontent.com/66216102/224265356-8c73514d-9775-4728-ba97-93f87fa521bb.png'/>aws-sdk: 3.266</li>
        <li><img src=''/>axios @0.21.1 : Promise 기반 HTPP 클라이언트</li>
        <li><img src=''/>fontawesome @2.0.2 : 아이콘 라이브러리</li>
        <li><img src=''/>openvidu-browser @2.17.0 : webRTC 라이브러리</li>
        <li><img src=''/>vue-awesome-swiper @4.1.1 : 이미지 슬라이더 라이브러리</li>
      <li><img src='https://user-images.githubusercontent.com/66216102/224264117-eeb99abc-0445-4b26-93d1-aac2f9f6898f.png'/>eslint & prettier @6.7.2 : 협업을 위한 formatter 라이브러리</li>
        <li>"@mui/material": "^5.11.7"</li>
      	<li><img src='https://user-images.githubusercontent.com/66216102/224266855-0f802f93-25cc-4aed-94a6-453206a51804.png'/>yarn: 3.4.1</li>
        <li>"@react-oauth/google": "^0.7.0"</li>
        <li>"html2canvas": "^1.4.1",</li>
        <li>"react-images-upload": "^1.2.8",</li>
        <li>"@types/swiper": "^6.0.0",</li>
    </ul>
</details>

### 🌏 Infra

  <details>
      <summary>개발, CI/CD 자세히 살펴보기 🔥</summary>
      <ul>
          <li><img src=''/>AWS IAM - Access Management</li>
          <li><img src='https://user-images.githubusercontent.com/66216102/224265881-0913eef6-823b-4504-bbb8-dc4a52624cf1.png'/>AWS EC2 - Deploy Server</li>
         	<li><img src=''/>AWS Lambda - Change File extension, Make Thumbnail, Batch</li>
          <li><img src='https://user-images.githubusercontent.com/66216102/224265876-9c4decdf-4db5-467d-b1ea-ce51c250cb43.png'/>AWS Cloud Front - CDN</li>
          <li><img src='https://user-images.githubusercontent.com/66216102/224265890-611527f2-bc0f-4406-a578-5e11d9e30afa.png'/>AWS S3 - File(Image, Video) Server</li>
          <li><img src='https://user-images.githubusercontent.com/66216102/224265887-d75e49a5-3142-4bc8-b158-b9cef781faad.png'/>AWS RDS - DB Server</li>
	        <li><img src='https://user-images.githubusercontent.com/66216102/224264133-4050418b-93d3-45e1-ae10-d019af337e4f.png'/>Nginx - WEB Server</li>
          <li><img src=''/>Github Action</li>
          <li><img src='https://user-images.githubusercontent.com/66216102/224265361-58d20587-0ef0-4307-8906-c78cad062faa.png'/>Docker</li>
      </ul>
  </details>

### 🫡 협업툴

- ![slack](https://user-images.githubusercontent.com/66216102/224266849-ba599070-7921-4454-9780-bb8890b51996.png)Slack
- Jira
- ![github](https://user-images.githubusercontent.com/66216102/224265368-70504ef1-5678-4c1a-9863-1823203c4b4e.png)Git
- ![Notion](https://user-images.githubusercontent.com/66216102/224267565-955bf2eb-e3d9-4c3a-bee9-cf04be016966.png)Notion

## 🚀 서비스 소개

"아무리 많은 돈과 황금이 있더라도 단 1초의 시간도 살 수 없다." 영화 어벤져스의 토니스타크 대사입니다.<br />
우리의 인생은 1분, 1초 모두 놓치기 아까운 소중한 시간들입니다.

### Carpe Diem은 이런 생각에서 시작하였습니다.

- 소중한 추억들은 항상 일상생활에서 일어나는데, 그 순간이 지나서 아까운 경험은 없으셨나요?
- 그 순간을 다시 회상하고 싶진 않으셨나요?
- 영상을 전체 저장해서 그 순간을 찾아내는 것 보단 특정 순간을 바로 보고 싶지 않으셨나요?

### Carpe Diem은 이런 서비스입니다.

- Carpe Diem과 함께라면 오늘 하루를 포착하고, 인생의 모든 소중한 순간을 포착할 수 있습니다.
- 감지된 인물과 감정을 기반으로 개인화된 앨범을 쉽게 제작할 수 있습니다.
- 앨범, 감정 리포트를 친구들과 소중한 경험들을 공유할 수 있습니다.

지금, Carpe Diem을 시작하여 평생 간질할 수 있는 추억을 만들어 보세요!
특별한 순간들을 반복해 다시 경험해보세요!

## 🚀 주요기능

#### 두 가지의 영상 모드

- 웹캠 & 모바일, 두 가지의 영상 모드를 통해 어디서나 쉽게 추억을 저장할 수 있습니다.
  - 모바일은 QR 코드를 통해 접근하실 수 있습니다.

#### 소셜 로그인

- auth0을 이용한 Google 소셜 로그인 지원으로 별도의 회원가입 없이 편리하게 서비스 이용이 가능합니다.

![login](https://user-images.githubusercontent.com/66216102/224342324-8e5eeca2-bb36-4c3a-aa80-71202f5a1f61.gif)

#### 인물 등록 - 인물 & 감정 디텍팅

- 초기 서비스 이용 시 인물 등록을 통해 특정인을 구분하여 영상을 녹화하고, 감정 그래프를 통해 실시간으로 감정을 추적할 수 있습니다.
  - '행복해요', '슬퍼요', '화나요', '힘들어요', '두려워요', '놀라워요' 총 6가지의 감정을 추척하고 기록할 수 있습니다. 👍
- 친구 목록 탭에서 등록한 이미지를 변경하여 재등록할 수 있습니다. 재등록된 사진을 기준으로 인물을 인식합니다.

  <table border="0" >
    <tr>
        <td>    <img width="350" height="230" src="https://user-images.githubusercontent.com/66216102/224342071-c6dd10d1-6fbb-4c33-bacb-17c24412957e.gif"> </img></td>
        <td>    <img width="350" height="230" src="https://user-images.githubusercontent.com/66216102/224342085-7239d891-27d2-47fb-bc89-8f91e3eea993.gif"> </img></td>
   </tr>
</table>

#### 영상 녹화 - 비디오 & 앨범

- 다양한 감정 상태를 통해 자동으로 영상이 녹화되고, 비디오 탭에 저장됩니다.

  - 비디오 탭에서 영상 미리보기, 감정별 필터링이 가능합니다.

- 저장된 영상은 웹캠 & 모바일 탭의 '최근 저장된 영상' 에서 24시간 내 녹화된 영상들을 바로 확인할 수 있습니다.
- 비디오 탭에서 만들어진 영상들을 모아 앨범 형태로 제작할 수 있습니다.

![record](https://user-images.githubusercontent.com/66216102/224341879-813e8400-7683-4a6a-8c15-b45123258780.gif)

#### 친구 기능

- 친구 ID 또는 이메일을 통해 친구를 맺을 수 있습니다.
- 저장된 영상을 앨범으로 저장하여, 친구들과 소중한 추억을 공유할 수 있습니다.
  - 친구끼리 앨범 공유를 통해 소중한 추억과 감정들을 공유하고, 아낌없는 축하와 격려를 보내주세요!

#### 감정 리포트 제작

- 일주일 간의 저장된 영상들을 통해 감정 리포트를 제작해줍니다. 감정 리포트를 통해 나를 점검해보세요!
  - 다운로드 기능을 통해 리포트를 보관할 수 있어요. 😉
- 친구끼리 감정 리포트를 이메일로 보내줄 수 있어요.
  ![report](https://user-images.githubusercontent.com/66216102/224341609-e8c745e5-508c-4def-8c04-fa2e9cd05f32.gif)

## 🚀 전체 프로젝트의 구조

![서비스 아키텍처](https://user-images.githubusercontent.com/66216102/224341403-20838d86-c17e-414b-9093-160c337fc3b5.png)

## 🚀 프로젝트 포스터

![포스터](https://user-images.githubusercontent.com/66216102/224221024-947782bc-c67c-4f53-a6ad-7957c980d618.png)
