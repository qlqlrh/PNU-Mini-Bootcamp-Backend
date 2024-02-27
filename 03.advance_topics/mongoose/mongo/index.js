/**
 * 몽고디비 연결
 * 문서 작업 시 JSDOC 등 라이브러리 활용 => html로 생성, package.json의 scripts에 기술
*/
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
mongoose.connect('mongodb://root:1234@127.0.0.1:27017/admin')

// 3. 사용
let db = mongoose.connection

// 4. 연결 상태 이벤트에 따른 리스너 등록 (콜백함수 등록)
db.on('open',  () => {
    console.log( '연결 성공' )
})
db.on('error', () => {
    console.log( '연결 실패' )
})

/**
 * 몽고디비 연결 해제
 */
function mongoClose( db ) {
    if ( db )
        db.close()
        .then( e => console.log( '연결 닫기 완료' ))
        .catch( err => console.error ( '닫기 실패', err ));
    
}

/**
 * 스키마 (테이블 구조 구성 -> 클래스 매핑)
 * 몽고디비는 스키마 없이 컬랙션(RDB의 테이블) 생성 가능 (자유도가 높다)
 */
let userSchema = mongoose.Schema({
    email: "string",
    password: "string",
    age: "number",
})
let User = mongoose.model( "User", userSchema )

// 향후 데이터 삽입, 변경, 추가, 조회 등등 => 콜백 지원 X, async ~ await를 지원 ! (스타일의 변화 O)

module.exports = {
    db,
    mongoClose,
    User
}