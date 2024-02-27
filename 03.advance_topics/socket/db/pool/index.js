/**
 * #TODO 마리아디비풀링모듈
 *  - 환경변수값을 읽어서(참조해서) 디비 연동값 세팅(외부에서 관리)
 */
const mariadb = require('mariadb');
// 개별 모듈화
exports.pool  = mariadb.createPool({ 
    host        : 'localhost',
    port        : 3307,
    database    : 't1', 
    user        : 'root', 
    password    : '12341234',
    // 서비스가 구동되고 최초 요청 or 요청이 5개 이상 동시에 진행될 때 -> 풀로 채워짐
    // 요청 -> 커넥션을 빌려줌 -> 사용 -> 반납 -> 다시 사용할 수 있는 상태가 됨
    connectionLimit: 5
});