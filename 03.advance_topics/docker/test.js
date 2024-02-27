// 1. 모듈 가져오기
const mongoose = require('mongoose');

// 2. 외부에 존재하는 몽고디비에 접근
//  몽고 디비 내부 설정 파일에 /etc/mongodb.conf
/*
    - 터미널
    - $ docker exec -it mongodb bas
    - $ root > cd etc
    - $ root/etc > ls -al
        ...
        mongodb.conf.orig
        ...
    - 편집기 오픈 (vi, nano, ...)
        - 설치
            - $ apt-get update
            - $ apt-get upgrade -y
            - $ apt install nano
            - $ nano mongod.conf.orig
                - 해서 nano 편집기 열기
                - bindIp: 127.0.0.1 => 이 IP로만 접속 가능함
                - bindIp: 0.0.0.0   => 전체 개방, 특정 IP를 넣어서 제한 가능함
*/

// 2. 접속 세팅 ('프로토콜명://아이디:비번@127.0.0.1:열어둔포트번호')
mongoose.connect('mongodb://root:1234@127.0.0.1:27017')

// 3. 사용
let db = mongoose.connection

// 4. 연결 상태 이벤트에 따른 리스너 등록 (콜백함수 등록)
db.on('open',  () => {
    console.log( '연결 성공' )
})
db.on('error', () => {
    console.log( '연결 실패' )
})