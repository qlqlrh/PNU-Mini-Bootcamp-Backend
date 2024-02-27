# 개요
- sequelize
    - Node.js의 대표적인 ORM
    - ORM (Object-Relational Mapping)
        - 객체와 관계형 데이터베이스(RDB)의 데이터를 자동으로 매핑해주는 것
        - 객체 지향 프로그래밍은 클래스를 사용하고, 관계형 데이터베이스는 테이블을 사용
        - 객체 모델과 관계형 모델 간에 불일치가 존재
        - ORM을 통해 객체 간의 관계를 바탕으로 SQL을 자동으로 생성하여 불일치를 해결
        - 즉, SQL 쿼리를 작성할 필요없이 직관적인 코드로 데이터 조작 가능
- passport
    - *사용자 인증 절차*에 대한 로직을 간단하게 구현할 수 있도록 도와주는 Node.js 미들웨어
    - 다른 페이지로 이동해도 로그인 상태를 유지시키려면, 복잡한 *세션*과 *쿠키*를 구현해야 한다
    - 직접 복잡하게 구현하는 대신, passport 미들웨어로 안전 + 간단하게 설계 가능

# 프로젝트 세팅
- 프로젝트 생성
    - ``$ express -e``
- 패키지 설치
    - ``$ npm install``
- 명령 내용 수정
        - package.json > Script > start > node를 nodemon으로 변경
- 서버 가동
    - ``$ npm start``

# ORM 사용을 위한 세팅
- ``$ npm i --save mariadb sequelize``
- sequelize 관련 내용을 커맨드라인에서 수행할 수 있는 모듈
    - ``$ npm i --save -dev sequelize-cli``
- ``$ npx sequelize init``
    - 접속 정보 수정
        - mariadb(sql cmd?) 접속
        - ``create database orm;``
        - ``show databases;``
    - config\config.json
        - DB 접속 정보, 개발용, 테스트용, 배포용 따로 구성
        - root 비밀번호 수정 ("12341234")
        - db 이름 수정 ("orm")
        - dialect 수정 ("mariadb")
        - port 3306 쓰고 있다면 수정 ("3307")
    - models
        - index.js 파일은 컨셉에 맞게 수정 (필요 없는 fs, process 등 삭제)
    - migrations, seeders 폴더 자동 생성

- 접속 테스트
    - test/index.js 생성

# 모델 생성
- 테이블 생성
    - /models 이하에서 생성
    - 파일명, 내부에서 만드는 객체명, 테이블명은 서로 관계 없음
        - users.js   ( 사용자 )
        - comment.js ( 댓글, 짧은 글, SNS 글 )
        - 1:N 관계
- 가능 정의 ( 데이터 생성, 조회, 수정, 삭제 => CRUD )
    - 라우팅된 페이지와 연계해서 