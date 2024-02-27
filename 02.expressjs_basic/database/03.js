/**
 * #TODO 로그인 (디비 연동) 버전 업
 *  - sql문에 전달되는 파라미터를 동적으로 입력해서 최종 sql문을 만드는 기능 처리
 *      - sql문에 인자 전달
 *  - 매번 값이 바뀌는 파라미터를 함수 외부에서 전달하게 구성
 */

const { pool } = require('./pool');

// 객체 구조 분해를 함수 파라미터에 적용
async function selectSignin( {uid, upw} )
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
                uid=? and upw=?
            ;
        `, [uid, upw]);
        // uid=`${uid}` and upw=`${upw}`  <-- SQL에 직접 데이터 세팅 예시
        if ( rows.length > 0 ) {
            let { no, uid, name, ragdate } = rows[0];
            console.log( no, uid, name, ragdate );
        }
        console.log( rows );
    } catch ( e ) {
        console.log( 'sql 오류', e );
    } finally {
        // 커넥션이 존재한다면 반납하시오 (무조건 수행)
        if ( conn ) conn.release();
    }
}

selectSignin({
    uid: 'guest',
    upw: '1234'
});