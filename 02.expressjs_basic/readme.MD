# 개요
- 순수 nodejs로 백엔드를 구성하는 것은 많은 시간이 소요된다.
- 일일이 만들어 줄 기능이 많다.
- 결론
    - Third Party Framework를 이용해서 개발
    - expressjs 제품을 사용
        - 오래되었음
        - 사용자 수가 많다
        - 개발된 사이트도 많다
        - 참고 자료가 많다
        - [https://expressjs.com/](https://expressjs.com/)
    - VS nextjs, ...

# Third Party Module 검색 및 등록
- [https://www.npmjs.com/](https://www.npmjs.com/)
- 특정 기능을 사용하기 위해 원하는 모듈을 찾아서 사용 가능


# 패키지 관리자
- Third Party Module 검색, 설치, 유명도, 관리
- 설치하는 명령어
    - npm  ( 파이썬의 pip or conda, 리눅스의 apt )
    - yarn ( npm의 보안 이슈를 해결한 패키지 관리자)

# node 프로젝트 생성
- 기본 가이드
    ```
    $ mkdir svr1
    $ cd svr1
    $ npm init
    ```
        - package.json 생성됨
        - 생성시 내용 입력 가능, 생성 후 수정 가능
        - package.json은 이 프로젝트를 설명하는 메타 정보
            - 타인 코드 참고 시 1순위로 확인해야 할 파일 ! 🔥
            - 텍스트 파일이므로 수정 가능
            - json 형식
            - 엔트리 포인트, 앱의 이름, 버전, 사용 패키지, 명령어 나열되어 있음
    - 필요한 패키지 기술 (필요 시 언제든지 추가 가능)
        - 버전 명시한 패키지명
        - "dependencies" or "devdependencies" 등 항목 추가
            - dependencies    : 서비스 개발에 사용하는 패키지
            - devdependencies : 개발에 사용하는 패키지, 도구, 유틸, 실제 서비스에는 사용 X
                - nodejs에서 ESNext(2016 ~ ) 기능 중, 미지원하는 부분 서포트 패키지
                    - ex) import ~ from ~
        - npm 명령어를 통해서 추가 가능 -> #TODO 차후 확인
    - _npm install_ (필요 시 언제든지 추가)
        - 맥유저
            - _sudo npm install_
        - 기본적으로 설치해야 할 모듈이 설치됨 (Third Party, 해당 프로젝트만 해당)
        - 이 명령어 실행 결과로 나온 내용
            - node_modules
                - 이하 모듈 설치
            - 이 부분은 git에 업로드 X (크기가 매우 큼) => .gitignore 파일에 기술 !
    - 코드 작성
        - 엔트리 포인트부터 작성
            - package.json에 npm start 명령어 추가
            - index.js 등등
    - _npm start_
- yarn으로 프로젝트 구성
    - 사전 작업 (1회성)
        - npm을 이용하여 글로벌(<-> 로컬)하게 설치
        - _npm install yarn -g_ ( g : global option )
    - _mkdir svr2_
    - _cd svr2_
    - _yarn init_
    - 필요한 패키지 기술 (필요 시 언제든지 추가)
    - _yarn install_ (필요 시 언제든지 추가)
    - 코드 작성
    - _yarn start_
- 문제점
    - 제로베이스에서 백엔드 프로젝트 기반을 만드는 것은 많은 시간이 소요/검증이 필요
    - 제안
        - 특정 플랫폼 기반 generator 사용
            - express-generator 사용
        - git 기반으로 공개된 보일러플레이트 사용

# express 개발 환경 구축
- 설치
    - yarn
        - 최신 버전으로 설치
            - _yarn global add express express-generator_
        - 특정 버전 설치
            - _yarn global add express@x.x.x express-generator@x.x.x_
    - npm
        - 최신 버전으로 설치
            - _npm install -g express express-generator_
        - 특정 버전 설치
            - _npm install -g express@x.x.x express-generator@x.x.x_
- 프로젝트 생성
    - _express --help_
        - 명령 옵션 체크
    - _mkdir helloExpress_
    - _cd helloExpress_
    - express 기반 웹서비스 프로젝트 프레임워크 구성 + 템플릿엔진은 ejs 사용
        - _express -e_
    - _yarn install_ or _npm install_
    - _npm start_

- 프로젝트 구조 이해
    - _tree > 프로젝트구조.txt_

- 개발 동선 upgrade
    - 코드 수정 -> 자동 reload -> 새로고침 -> 변경 내용 확인
    - **nodemon** 사용 ! ( or forever, ... )
    - _yarn global add nodemon_ or _npm install nodemon -g_
    - package.json
        - Script > start 항목 값을 수정
        - _"start": nodemon ./bin/www_


# 데이터 베이스 연동
- 데이터
    - 구조와 형식
        - 정형   => RDS, 스키마 존재
        - 비정형 => no SQL, 바이너리, 로그, ... 문서
        - 반정형 => 구조 + 데이터 결합 (JSON, XML)
    - 데이터 내용
        - 정량 데이터
        - 정성 데이터
- npmjs.com에서 해당 db 제품명 검색 -> 지원 패키지 검색됨
    - 전용(ORM, SQL 지원, 속도유리), 범용(ORM 스타일로 지원 -> 느림, 유지보수는 유리함)
- RDS (행 기반 데이터베이스) => ERD 구성, 모델링 => SQL 구성
    - 관계형 데이터베이스
    - Oracle
    - mysql, **mariadb**, 오로라(AWS)
    - mssql
    - postgress
    - ...
- No-SQL
    - Key-Value
        - **Redis**, AWS Dynamic DB
    - Document
        - **MongoDB**
    - Column-Family
        - Cassandra, HBase
    - Graph
        - sns(계열)
- 하둡 (HDFS) <- 빅데이터를 상징
    - 대용량 비정형 데이터 저장
- 검색 기반 데이터 스토어
    - 엘라스틱 서치
    - 스플렁크
- 열기반 데이터 베이스
    - 아마존 레드시프트, 스노우프레이크, 버티카, ...

# mariadb 설치
- https://mariadb.com/kb/en/postdownload/
- 설치 중 주의사항
    - root 계정 비번 따로 체크
    - 원격 접속 옵션 허용
    - UTF-8 기본 인코딩 허용
- 접속
    - 터미널 (MYSQL Clinet)
        - 비밀번호 입력
        - _show databases;_
        - _create database test;_
        - _show databases;_
        ```
            +--------------------+
            | Database           |
            +--------------------+
            | information_schema |
            | mysql              |
            | performance_schema |
            | sys                |
            | test               |
            +--------------------+
        ```
        - _use test;_
        - MariaDB [test]> 쿼리 작업 진행
            ```
                # 회원 테이블 생성
                CREATE TABLE `users` (
                    `no` INT(11) NOT NULL AUTO_INCREMENT,
                    `uid` VARCHAR(32) NOT NULL COLLATE 'utf8mb4_general_ci',
                    `upw` VARCHAR(128) NOT NULL COLLATE 'utf8mb4_general_ci',
                    `name` VARCHAR(32) NOT NULL COLLATE 'utf8mb4_general_ci',
                    `ragdate` TIMESTAMP NOT NULL,
                    PRIMARY KEY (`no`) USING BTREE,
                    UNIQUE INDEX `uid_upw` (`uid`, `upw`) USING BTREE
                )
                COMMENT='회원 테이블'
                COLLATE='utf8mb4_general_ci'
                ENGINE=InnoDB
                ;

                # 회원가입
                INSERT INTO `test`.`users` (`uid`, `upw`, `name`, `ragdate`) VALUES ('guest', '1234', '게스트', now());

                # 로그인
                SELECT
                    `no`, uid, `name`, ragdate
                FROM
                    users
                WHERE
                    uid='guest' and upw='1234'
                ;

                # 회원 탈퇴
                DELETE FROM
                    test.users
                WHERE
                    uid = 'guest' and upw = '1234'
                ;
                
                # 회원 정보 수정
                UPDATE
                    test.users
                SET
                    name='게스트게스트'
                WHERE
                    uid='guest'
                ; 
            ```
    - GUI 클라이언트 툴 사용
        - db 설치 + 클라이언트 툴 같이 세팅됨
        - IDE에 확장 프로그램으로 설치
        - mac은 mariadb 설치 후, Sequel Pro 따로 설치 필요


# nodejs에서 mariadb access 방법
- sql 사용
    - mariadb 패키지 사용
    - _npm install mariadb --save_
        - --save : 패키지 이름, 버전을 package.json > dependencies 항목에 추가 + 패키지 설치
        - --save--dev : 개발 시에만 사용하는 devdependencies에 항목 추가 + 패키지 설치
    - https://www.npmjs.com/package/mariadb

- orm 사용
    - sequelize 패키지 사용 ()

# 프런트 사이드 JS
- 브라우저에서 작동
    - 해당 브라우저가 특정 기능을 지원하는 여부 !!
    - 가장 안전한 것은 순수 JS로 작성, 대부분 기능을 지원하는 프레임워크 사용
- jQuery 프레임워크 사용
    - jQuery.com
    - cdn
        - <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
        - <head> 태그 내에 삽입
- 순수 JS로 구현
- 프런트 사이드에서 JS 구현 코드 위치
    - <haed> 요소 내부에 기술
        - 이벤트를 구현해서 (윈도우가 모두 로드되었다 등) 이런 상황에서 나머지 코드가 진행되도록 구현
    - </body> 바로 직전(위)에서 기술
        - 액세스 하는 모든 요소 (DOM tree)가 메모리에 적재된 다음 위치
    - 간혹 급하게 구성
        - 액세스 하는 요소 바로 밑에서 구현

# 금주 예정
- 1 Day
    - HelloExpress
        - 수정, 삭제, 추가 연동
        - express 프로젝트 생성, 라우팅, RDS 디비 연동(CRUD), 스타일
        - 프런트, jQuery, ajax, form 전송
    - CMS
        - adminLTE(부트스트랩 기반 UI) 적용
            - 디자인을 백엔드 서버에 세팅
            - 반응형 US (모바일, PC 버전 모두 제공)
        - 로그인 UI + 세션처리
- 2 Day
    - 인증
        passport.js 적용
            - 미들웨어 이해
            - mariadb 연동
                - SQL로 연동, DB와 직접적인 연동 패키지를 이용하여 처리 : mariadb 모듈
                - ORM 방식 연동, 쿼리문 작성 X, 객체 지향적으로 연동    : sequlize <-> mariadb.js <-> mariadb (물리적 제품)
                    - 테이블 생성
                        - 테이블 => 객체 모델에 대입해서 설계
                        - 서비스가 가동 => 테이블 생성
                        - 필요 시 테이브로가 테이블 간에 관계 설정
                            - 1:N : 사용자 1명, 작성된 글은 N개
                            - N:M : 사용자가 작성한 글 N개, 글에 작성한 해시태그 M개
                            - ...
                    - 기능
                        - 회원가입
                            - 입력한 아이디가 고유한지 체크
                            - 이상 없으면 가입 처리
                        - 로그인
                            - 아이디와 비번 유일한 1개 데이터 획득
                        - 글 작성, 글 삭제, 글 수정, ...
            - 인증
                - 로컬 인증
                    - 자체 데이터베이스와 연동
                - 외부 인증 (필요 시 외부 인증 -> 구글, 네이버 등등)
                    - 카카오, 네이버 등등 정보를 활용
                        - dev.naver.com, dev.kakao.com, google api 등에서 신청 -> 프로젝트 생성 -> 권한을 받고 구현
                - 기본은 서버 메모리에 저장
                    - 최소 정보만 저장 -> 로그인 확인 후에는 개인 정보를 불러오는 전략
        - JWT 적용
            - 쿠키
            - passport + jwt 연동
                - jwt를 활용 -> 쿠키에 암호화 하여 저장, 만료시간 설정, 해독을 위한 키는 서버 측에서 관리
                - jwt에 사용자 정보 (필요한 만큼) 암호화해서 클라이언트에게 저장시킨다
            - 비번 암호화
        - 순서
            - ORM -> passport -> jwt
- 3 Day
    - 실시간 소켓
        - websocket
            - TCP/IP 스타일 통신
            - 패킷 설계 필요 -> 프로토콜 정의 등 ...
        - socket.io
            - js 스타일의 이벤트 기반 통신
            - 자유도 높고, 채팅 관련 기능 다양하게 제공 -> 쉽다
    - 채팅 -> 챗봇 확장
        - GPT 연동 ( 확인 후 진행 ), AI 서비스 제공
- 4 Day
    - 몽고디비 연동
        - Docker -> Docker 파일 -> Docker 컴포즈 (3-Tier) -> 쿠버네티스 (생략)
            - CLI 기준
        - 몽고디비 세팅/마리아 디비 세팅
        - 몽고디비 + 몽구스 (JS라이브러리)
            - CRUD
            - express와 연동하는 일련의 작업들
- 5 Day
    - AWS (클라우드에 배포 및 운영 (간단하게))
        - CI/CD
            - git => CI
                - 코드 스타일, 단위 테스트, 바벨 적용 => 보일러 플레이트 (전체 적용된 표본)
            - gitAction => CD
        - AWS
            - Ec2 vs Cloud9 (Ec2 + IDE + Docker 컴포즈 연습)
            - RDS (조심! => 과금 사고가 여기서 많이 발생함)
            - Lamda (서버리스 => GPT 연동)
            - s3 (storage, 파일 업로드)
            - 메시징, CDN 서비스 (옵션)
            - VPC 이해 => 네트워크 구축 => 서비스 구성 => 인프라 구성 : 인프라 팀
                - ??
                - ??