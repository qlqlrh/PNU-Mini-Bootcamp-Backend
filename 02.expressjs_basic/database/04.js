/**
 * #TODO 로그인(디비 연동) 최종 버전 (select 기본 모형)
 */
const { pool } = require('./pool');

// 객체 구조 분해를 함수 파라미터에 적용
async function selectSignin( {uid, upw} )
{
    let conn;
    let rows;       // 결과
    let err = {};   // 에러
    try {
        conn = await pool.getConnection();
        rows = await conn.query(`
            select 
               no, uid, name, ragdate 
            from  
                users
            where
                uid=? and upw=?
            ;            
        `, [uid, upw]);
    } catch ( e ) {
        console.log( 'sql 오류', e );
        err = e;
    } finally {
        if ( conn ) conn.release();
    }
    return {
        rows,
        err
    }
}

// 사용법
// 함수 호출 시 데이터를 객체에 담아서 1개 파라미터 형태로 전송
selectSignin( {
    uid:'super',
    upw:'0123'
} )
.then( ({err, rows}) => {
    // 에러체크 -> 처리?
    // if (err === {}) {} // TODO 현재는 오류, 조건식 변경 요망
    if(rows.length ==0 ){
        console.log('회원 아님 혹은 아이디/비번 오류 혹은 내부 오류');
    }
    // 정상이면 결과 확인 및 다음 단계 진행
    console.log( rows );
} )