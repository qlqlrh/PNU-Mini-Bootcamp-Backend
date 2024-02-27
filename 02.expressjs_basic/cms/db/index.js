/**
 * #TODO 로그인(디비연동) 최종버전(select 기본모형)
 *  -  
 */
const { pool } = require('./pool')

// 객체 구조 분해를 함수 파라미터에 적용
// async function selectSignin( {uid, upw} ) 
// exports.selectSignin = async function ( {uid, upw} ) 
exports.selectSignin = async  ( {uid, upw} ) => 
{
    let conn;
    let rows;     // 결과 
    let err = {}; // 에러
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
    } catch (e) {
        console.log( 'sql 오류', e )
        err = e
    } finally {
        // 커넥션이 존재하면 반납하시오 (무조건 수행)
        if (conn) conn.release();
    }
    return {
        rows,
        err
    }
}

// 사용법
// 함수 호출시 데이터를 객체에 담아서 1개 파라미터 형태로 전송
/*
selectSignin( {
    uid:'guest',
    upw:'1234'
} )
.then( ({ err, rows }) => {
    // 에러체크 -> 처리?
    //if( err === {} ) { } // TODO 현재는 오류, 조건식 변경 요망
    if(rows.length ==0 ){
        console.log('회원 아님 혹은 아이디/비번 오류 혹은 내부오류')
    }
    // 정상이면 결과 확인및 다음단계 진행
    console.log( rows )
} )
*/

// 게시판용 쿼리 수행 함수
// 목록 가져오기
// 함수명 : selectCitys
// 인자   : 기준인구수(int), 페이지번호(int), 페이지당데이터개수(int)
// 출력   : [ { 데이터,.. },{},{},.. ]
//async function selectCitys ( {pop, pno, pcount} ) 
exports.selectCitys = async  ( {pop, pno, pcount} ) => 
{
    let conn;
    let rows;     // 결과 
    let err = {}; // 에러
    try {
        conn = await pool.getConnection();
        rows = await conn.query(`
            SELECT
                *
            FROM 
                city2
            WHERE
                city2.Population >= ?
            ORDER BY Population DESC
            LIMIT ?, ?
            ;
        `, [pop, (pno-1)*pcount, pcount]);  
    } catch (e) {
        console.log( 'sql 오류', e )
        err = e
    } finally {
        // 커넥션이 존재하면 반납하시오 (무조건 수행)
        if (conn) conn.release();
    }
    return {
        rows,
        err
    }
}

// 검색어 (여기서는 국가코드)를 넣어서 해당 국가의 도시를 추출한다
// 검색하면 => 도시명 + Id(primary key)를 가져온다
exports.selectCountryCode = async  ( {countryCode} ) => 
{
    let conn;
    let rows;     // 결과 
    let err = {}; // 에러
    try {
        conn = await pool.getConnection();
        // 별명을 부여해서 칼럼명을 간결하게, 숨김 등등 목적 (as)
        rows = await conn.query(`
            SELECT ID as id, NAME as nm, Population as popu FROM city2
            WHERE CountryCode=?
            ORDER BY Population DESC
            LIMIT 5;
        `, [countryCode]);
    } catch (e) {
        console.log( 'sql 오류', e )
        err = e
    } finally {
        // 커넥션이 존재하면 반납하시오 (무조건 수행)
        if (conn) conn.release();
    }
    return {
        rows,
        err
    }
}

// 함수명 selectCCode()
// 인자 X
// [ {code: 'KOR'}, ... ]
exports.selectCCode = async () =>
{
    let conn;
    let rows;     // 결과 
    let err = {}; // 에러
    try {
        conn = await pool.getConnection();
        rows = await conn.query(`
        SELECT DISTINCT CountryCode AS code
        FROM city2
        order by Population desc;
        `);
    } catch (e) {
        console.log( 'sql 오류', e )
        err = e
    } finally {
        // 커넥션이 존재하면 반납하시오 (무조건 수행)
        if (conn) conn.release();
    }
    return {
        rows,
        err
    }
}

// 특정 id의 해당하는 도시 정보와 그 도시가 속한 국가 정보를 리턴
exports.selectCityInfo = async ( id ) =>
{
    let conn;
    let rows;     // 결과 
    let err = {}; // 에러
    try {
        conn = await pool.getConnection();
        rows = await conn.query(`
            SELECT
                A.id, A.Name AS cityName, B.Code,
                A.CountryCode, B.Name, B.Region, B.surfaceArea
            FROM (SELECT * FROM city2 WHERE id=?) AS A
            JOIN country2 AS B
            ON A.CountryCode=B.Code;
        `, [ id ]); // ? 자리에 들어갈 파라미터 넣는 것
    } catch (e) {
        console.log( 'sql 오류', e )
        err = e
    } finally {
        // 커넥션이 존재하면 반납하시오 (무조건 수행)
        if (conn) conn.release();
    }
    return {
        rows,
        err
    }
}


/*
selectCitys( { 
    pop:1000000, 
    pno:1, 
    pcount:5
} )
.then( ({err, rows})=>{
    console.log( rows)
})
*/

// 국가 정보 업데이트
// 코드의 구성은 (수정, 추가, 삭제) 모두 동일
// 쿼리 수행 -> 커밋 (기본 루틴, DB에 실제적으로 적용하는 명령)
exports.updateCounrty = async ( {surfaceArea, Code} ) =>
{
    let conn;
    let result;     // 결과 
    let err = {}; // 에러
    try {
        conn = await pool.getConnection();
        result = await conn.query(`
            UPDATE country2
            SET SurfaceArea=?
            WHERE CODE=?;
        `, [ surfaceArea, Code ]); // ? 자리에 들어갈 파라미터 넣는 것
        // 수정, 삭제, 추가 수행을 했는데, 성공했다고 리턴 => 실제 디비에는 반영되지 않았다.
        let commit_result = await conn.commit();
        console.log(commit_result);
    } catch (e) {
        console.log( 'sql 오류', e )
        err = e
    } finally {
        // 커넥션이 존재하면 반납하시오 (무조건 수행)
        if (conn) conn.release();
    }
    return {
        result,
        err
    }
}