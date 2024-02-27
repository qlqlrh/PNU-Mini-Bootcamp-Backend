# 프로젝트 세팅
- 프로젝트 생성
    - ``$ express -e``
- 패키지 설치
    - ``$ npm install``
- 명령 내용 수정
        - package.json > Script > start > node를 nodemon으로 변경
- 서버 가동
    - ``$ npm start``

# passport 사용을 위한 세팅
```
$ npm i --save passport passport-local passport-kakao bcrypt passport-jwt
$ npm i --save mariadb sequelize
$ npm i --save -dev sequelize-cli
$ npm i --save express-session session-file-store
```

# 인증 방법
- Strategies (인증 전략)
    - Local
        - passport-local : 로컬 DB에서 로그인 인증 처리 ( + ORM )
    - Social
        - passport-kakao : 소셜 서비스 기반 로그인 인증 처리
    - /passport 폴더
        - 이하에서 내용 구성
        - 기본 인증 처리, 로컬 인증 구현

# workflow
- app.js 세팅
    - 옵션 (DB 연결 방식에 따라 변동)
        - ORM 관련 폴더와 파일 이동 혹은 직접 세팅
        - 여기서는 ORM 예시 테이블을 활용, 비밀번호 칼럼 추가
        - app.js에 ORM 관련 내용 세팅
    - express-session 관련 사항 세팅
    - passport 기본 사항 등록
- 로그인 절차를 진행하면서 코드 완성
    - 로그인 요청
    - 페이지별로 인증 여부를 기준으로 접근 가능한지 판단
        - 판단 : req.isAuthenticated()
        - 페이지 이동
    - 아이디/비번 => 로그인 시도
    - passport.authenticate() 호출
    - localStrategy.js 내부 내용이 호출 (자동 설정)