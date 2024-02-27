/**
 * #TODO 로그인 (디비 연동) 버전 업
 *  - 디비 컨텍션을 관리하는 풀을 모듀로하 처리
 *  - 디비에 로그인 쿼리를 수행하는 함수명 조정
 *      - selectionSignin
 */

const { pool } = require('./pool');

async function selectSignin() 
{
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(`
            select 
                no, uid, name, ragdate 
            from  
                users
            where
                uid='guest' and upw='1234'
            ;
        `);        
        if( rows.length > 0 ){
            let { no, uid, name, ragdate } = rows[0]
            console.log( no, uid, name, ragdate )
        }
        console.log( rows )
    } catch (e) {
        console.log( 'sql 오류', e )
    } finally {
        if (conn) conn.release();
    }
}

selectSignin();