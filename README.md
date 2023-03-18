<img width="1089" alt="title_carpe" src="https://user-images.githubusercontent.com/67156494/225974898-e547171f-53ca-47f6-9235-587b62fa00db.png">

## [👋 프로젝트 소개 README](https://github.com/cd-carpe-diem/.github/blob/main/profile/README.md)
## [🤗 팀 소개 WIKI](https://kimpp.notion.site/CARPE-DIEM-WIKI-1647f0a74db346b3b3edddebe390cd48)

<br>

## 1️⃣ 프로젝트 구조

```bash
src
│   app.js            # App entry point
└───api               # Express route controllers for all the endpoints of the app
└───config            # Environment variables and configuration related stuff
└───loaders           # Split the startup process into modules
└───models            # Database models
└───services          # All the business logic is here
└───types             # Type declaration files (d.ts) for Typescript
```
- [Ref](https://github.com/cd-carpe-diem/Carpe-Diem-BE/pull/2#issue-1572483330)

<br>

## 2️⃣ 프로젝트 실행 방법

```bash
>> npm i
```

<br>

```bash
>> npm run dev
```

<br>

> `📄 .env`
```bash
# Deployment environment
NODE_ENV=dev
VERSION=alpha

# Server Info
HOST=localhost
PORT=4000

# Client Info
CLIENT_HOST=localhost
CLIENT_PORT=3000

# DB
DB_HOST=${secret}
DB_PORT=${secret}
DB_USERNAME=${secret}
DB_PASSWORD=${secret}
DB_DATABASE=${secret}
DB_SESSION_DATABASE=${secret}
DB_DIALECT=${secret}

# AWS S3 bucket
AWS_ACCESS_KEY_ID=${secret}
AWS_SECRET_ACCESS_KEY=${secret}
AWS_BUCKET_NAME=${secret}
AWS_LOG_BUCKET_NAME=${secret}
AWS_REGION=${secret}

# Google Credentials
GOOGLE_CLIENT_ID=${secret}
GOOGLE_CLIENT_SECRET_KEY=${secret}
GOOGLE_REDIRECT_URI=http://localhost:4000/auth/google/callback

# Google Email
EMAIL_USER=JungleCarpeDiem@gmail.com
EMAIL_PASS=${secret}
```

- 보안 상의 이유로 key 부분은 `${secret}`로 표시

<br>

<br>

## 3️⃣ 로그 관리
- 개발 로깅 : 루트 경로내 `.logs` 디렉토리
- 배포 로깅 : AWS S3 버킷
	- Log levels 
	- error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6

<br>

<br>

## 4️⃣ ERD
![db_erc](https://user-images.githubusercontent.com/67156494/226110650-4e1cc2ca-56a8-4cb1-be5d-4f78702e38b8.png)


