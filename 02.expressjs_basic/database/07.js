/**
 * #TODO DB 데이터 수정
 */
const { pool } = require('./pool');

// 객체 구조 분해를 함수 파라미터에 적용
async function updateUser( { name, uid } )
{
    let conn;
    let rows;       // 결과
    let err = {};   // 에러
    try {
        conn = await pool.getConnection();
        rows = await conn.query(`
            UPDATE
                test.users
            SET
                name=?
            WHERE
                uid=?
            ;            
        `, [name, uid]);
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
updateUser( {
    uid: "super",
    name: "슈퍼슈퍼",
} );