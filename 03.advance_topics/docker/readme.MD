# 개요
- CI/CD
    - Docker (git 기본)
        - 개발 전
            - Docker 기반으로 개발 환경 구축 => 허브(이미지) => 팀 배포
            - 모든 팀원이 동일한 환경에서 개발
            - Docker CLi + UI(Client)
                -> Docker file (Cli를 연속적으로 묶은 세트)
                -> Docker Compose (여러 프로그램을 묶어서 세트로 구성, 3-tier)
                    - web: nginx + was: nodejs(express) + db: mariadb(mongo)
                -> 클라우드 (AWS, azure, GCP) or 온프레미스 (사내구축)
                -> 쿠버네티스 (오케스트레이션) (Deops) <-> (MLOps)쿠보플로우(ex, MLflow, ...)
                    -> 클라우드 기반 (제품 제공) 작업, 순수하게 쿠버네티스 구현

        - git/gitAction or 젠킨스 or 클라우드에서도 제공
        - 사용 이유
            - 동일 s/w는 os에 설치되면, 다른 버전 설치 시 제거 후 새로 설치 (or upgrade)
                -> 삭제, 설치 등등 과정에 오류가 발생할 수 있다
                -> 격리해서 운영하면 ?
            - OS 위에 Docker 설치
                - 그 위에서 여러 OS(주로 리눅스)를 설치
                - 그 안에 특정 sw를 설치해서 사용하는 방식으로 격리 -> 컨테이너라고 함
                - 컨테이너는 이미지(허브 제공 or 직접 생성)를 본따서 생성
            - 구조
                ```
                    ------------------------------------------------------------
                    프로그램, 데이터 구성, ...
                    ------------------------------------------------------------
                    컨테이너 구성 (독립된 환경, 격리), n개 존재 <- 이미지로부터 생성
                    ------------------------------------------------------------
                    Docker(리눅스 기반 운영체계 + Docker 엔진 + 기타 sw) => 설치
                    ------------------------------------------------------------
                    OS (윈도우, 맥, 리눅스, ...)
                    ------------------------------------------------------------
                    하드웨어
                    ------------------------------------------------------------
                ```

# 설치
- https://www.docker.com/
    - 다운로드 후 설치
- 회원 가입 및 로그인
    - 로그인 후 hub.docker.com으로 자동 이동됨
    - 도커 클라리언트 가동
        - 도커 로그인 수행
        - 옵션 : 터미널(콘솔)에서 docker login 수행(자동인식 함)
- CLI (Command Line Interface)
    - ``$ docker``
        - 인식 못 하면 VSCode 재가동
    - ``$ docker version``
    - 이미지 관리
        - ``$ docker image``
    - 몽고디비 다운로드
        - ``$ docker image pull mongo``
    - 컨테이너 관리
        - ``$ docker container``
        - run 옵션이 컨테이너 계열에만 존재하므로 container 명령 옵션 생략 가능
        - 기본 : 이미지 없으면 pull, 컨테이너 없으면 생성, 컨테이너 가동 안 되었으면 가동
        - -d : 백그라운드에서 계속 가동
        - --name : 이름
        - -p : port => 인바운드포트(외부->내부 접근):아웃바운드포트(내부->외부 접근)
        - -v : OS단의 디렉토리와 컨테이너 내부의 디렉토리를 동기화 (경로에 대문자 있으면 안 됨)
        - -e : 환경 변수, root 계정의 비번을 설정해서 들어감 or 특정 유저를 생성해서 들어감
        - 이미지명
        - ``$ docker run -d --name mongodb -p 27017:27017 -v D:\dongin\2024\pnu_mini_bootcamp\node_projects\03.advance_topics\docker:/backup -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=1234 mongo``
            -> 하면 해쉬값이 나오면서 docker에 container가 생성됨
    - 컨테이너 내부 접속
        - 도커 클라이언트
            - 이름 클릭
            - exec 클릭
            - ``$ mongosh -u root -p``
            - password > $ 1234
                - root 계정으로 test 접속 성공
        - cli
            - ``$ docker exec -it mongodb bash``
            - ``$ mongosh -u root -p``
            - password > $ 1234
                - root 계정으로 test 접속 성공
    - mongo cli로 쿼리 수행
        - 디비 목록 보여주기
            - ``$ show dbs``
        - 특정 디비 사용 설정
            - ``$ use test``
        - 현재 디비 확인
            - ``$ db``
        - db 밑에는 여러 개의 컬랙션(테이블)이 존재할 수 있다.
            - 테이블은 스키마를 통해서 생성할 수 있고, 데이터를 넣으면서 스키마가 적용될 수도 있다 => 자유롭다
            - 컬랙션 목록 보기
                - ``$ show collections``
            - 컬랙션 만들기
                - ``$ db.createCollection("users")``
                - ``$ show collections``
            - 문서 (도큐먼트 -> json) 삽입
                - ``$ db.users.insert({ "name" : "guest", "email" : "a@a.com" })``
                    - 위의 함수는 insertOne or insertMany로 대체 (Deprecation Warning 뜸)
                    -> ``$ db.users.insertOne({ "name" : "guest", "email" : "a@a.com" })``
                        ```
                        {
                            acknowledged: true,
                            insertedId: ObjectId('65bb4a5c7585f2106797efa4')
                        }
                        ```
            - 문서 검색
                - $ db.users.find({ "name" : "guest" })``
                ```
                [
                    {
                        _id: ObjectId('65bb4a017585f2106797efa3'),
                        name: 'guest',
                        email: 'a@a.com'
                    },
                ]
                ```
            - 문서 삭제
                - ``$ db.users.remove({ "name" : "guest" })``
                - ``$ db.users.removeOne({ "name" : "guest" })``
            - 문서 수정
                - updateOne, updateMany, ...
                - ``$ db.users.updateOne({ "name" : "guest2" }, { $set : { "email" : "ppp@ppp.com" }})``
                - ``$ db.users.find().pretty()`` <- pretty()는 좀 더 예쁘게 보여주는 옵션
            - 모든 문서 가져오기
                - ``$ db.users.find()``
            - 모든 문서의 수
                - ``$ db.users.countDocuments()``
            - 모든 문서 삭제
                - ``$ db.users.remove({}``) (Deprecation Warning 뜸)
                    -> ``$ db.users.deleteMany({})``
            - 컬렉션 삭제
                - ``$ db.users.drop()``
            - 데이터베이스 삭제
                - ``$ db.dropDatabase()``

# nodejs에서 mongodb access
- 프로젝트 생성
    - ``$ npm init -y``
        - package.json을 한 번에 생성
        - -y : 모든 옵션에 yes로 대답
    - ``$ npm i mongoose --save``
    - 테스트 페이지 생성
        - test.js
- 몽구스
    - ORM
- mongodb
    - 몽고디비 명령문 수행