/**
 * 모듈/단위 테스트 jest 사용
 * 단위 테스트용
 * CI에 적용해서 코드를 git에 반영 시 스크립트 및 스텝을 적용해두면 ( 테스트 하는 단계 지정 )
 * git action에서 검증한다.
 *  - 참고 : nodejs express Boilerplate 검색 후, git clone => 커스터 마이즈 => 사용
 * 단, 여기서는 기능 익히기가 목적 ( 비적용 )
 */
const { db, User, mongoClose } = require('./mongo');

// ORM 방식 데이터 추가, 변경, 조회, 삭제 (CRUD)
//  - 클래스가 정의되어야 함

// 데이터 추가
const insertUser = async data => {
    let newUser = new User ( data )
    console.log( '신규 데이터 준비', newUser )
    // 컬랙션에 데이터 추가
    let result = await newUser.save()
    console.log( '데이터 추가 결과', result )
}

// 데이터 조회 (컬랙션 내에 모든 문서를 가져오시오)
const selectAllUser = async () => {
    let docs = await User.find()
    // 모든 문서에서 이메일만 출력하시오
    docs.map( ( doc, idx ) => {
        console.log( idx, doc.email )
    })
    console.log( '모든 문서', docs )
}

// 데이터 가져오기
const selectUser = async data => {
    let doc = await User.findOne( data )
    console.log( '일치하는 하나의 문서', doc )
}

// 데이터 수정
const updateUser = async ( condi, { email }) => { // 객체 구조 분해 활용
    // 대상 조회
    let doc = await User.findOne( condi )
    if ( doc ) {
        // email만 수정한다
        doc.email = email
        let result = await doc.save()
        console.log( '수정된 데이터', result )
    }
}

// 기능 테스트
setTimeout( () => {
    // 데이터 삽입
    if (false)
        insertUser({
            email    : "a@a.com",
            password : "1234",
            age      : 100
        })

    // 데이터 조회
    // selectAllUser()

    // 특정 조건과 일치하는 1개의 문서 가져오기
    selectUser( { "email" : "a@a.com" }) // findOne() => {} 객체로 나올 것
    
    // 문서 정보 수정 (1개 조회 -> 수정)
    updateUser( { "_id" : "65bc48d4a79837d1821debe0" }, { "email" : "s@s.com" } )


}, 1000)

// 임의로 1초 후에 종료
setTimeout( () => {
    mongoClose( db );
}, 1000)