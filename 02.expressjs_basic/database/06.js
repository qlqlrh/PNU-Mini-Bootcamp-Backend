/**
 * #TODO DB 데이터 삭제
 */
const { pool } = require('./pool');

// 객체 구조 분해를 함수 파라미터에 적용
async function deleteUser( { uid, upw } )
{
    let conn;
    let rows;       // 결과
    let err = {};   // 에러
    try {
        conn = await pool.getConnection();
        rows = await conn.query(`
            DELETE FROM
                test.users
            WHERE
                uid = ? and upw = ?
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
deleteUser( {
    uid: "super",
    upw: "0123",
} );