/**
 * #TODO DB에 데이터 추가
 */
const { pool } = require('./pool');

// 객체 구조 분해를 함수 파라미터에 적용
async function insertUser( { no, uid, upw, name, ragdate } )
{
    let conn;
    let rows;       // 결과
    let err = {};   // 에러
    try {
        conn = await pool.getConnection();
        rows = await conn.query(`
            INSERT INTO
                users (no, uid, upw, name, ragdate)
            VALUES
                (?, ?, ?, ?, ?);
            ;            
        `, [no, uid, upw, name, ragdate]);
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
insertUser( {
    no: 2,
    uid: "super",
    upw: "0123",
    name: "슈퍼",
    ragdate: new Date()
} );