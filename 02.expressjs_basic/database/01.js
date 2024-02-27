/**
 * 기본 예제의 구성 이해
 *
 */
// mariaDB와 연결 처리 후, 쿼리 수행 등 작업하는 모듈 가져오기
const mariadb = require("mariadb");
// 풀링 처리용 모듈 (큐 구조를 내부적으로 사용) -> 크기 => 동적 수 (용량)
const pool = mariadb.createPool({
  host            : 'localhost',
  port            : 3306,
  database        : 'test',
  user            : 'root',
  password        : '12341234',
  connectionLimit : 5, // 필요 시 수치 증가
});

// DB에 액세스 해서 쿼리를 수행 => I/O => 비동기
async function asyncFunction()
{
  let conn;
  // I/O를 수행하는 코드는 반드시 예외 처리를 동반한다.
  try {
    // 1. pool을 통해서 커넥션을 구한다 (빌린다, pool은 커넥션이 없으면, 5개 미만으로 보유하면 커넥션 생성)
    conn = await pool.getConnection(); // pool에 5개가 다 차면 or 여유가 있으면 처리 속도가 빨라짐
    // 2. 쿼리
    const rows = await conn.query(`
      select
        no, uid, name, ragdate
      from
        users
      where
        uid='guest' and upw='1234'
      ;
    `);
    // 응답 결과에서 no, uid 등 값을 변수로 추출하시오
    // rows가 [] 이면 해당 내용이 없다. (회원 X, 검색 결과 X)
    // 내용이 있다면 rows.length > 0
    if ( rows.length > 0 ) {
      let { no, uid, name, ragdate } = rows[0];
      console.log( no, uid, name, ragdate );
    }
    console.log( rows );
  } catch (e) {
    // sql 구문 오류
    console.log( 'sql 오류', e );
  } finally {
    if ( conn ) conn.release; // release to pool
  }
}

asyncFunction();