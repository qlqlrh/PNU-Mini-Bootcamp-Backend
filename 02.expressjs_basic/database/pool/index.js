/**
 * #TODO mariaDB Pooling module
 *  - 환경변수 값을 읽어서(참조해서) 디비 연동값 세팅 (외부에서 관리)
 */
const mariadb = require('mariadb');
// 개별 모듈화
exports.pool = mariadb.createPool({
    host        : 'localhost',
    port        : 3306,
    database    : 'test', 
    user        : 'root', 
    password    : '12341234',
    connectionLimit: 5
})