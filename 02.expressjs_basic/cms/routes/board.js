/**
 * #TODO 게시판 기능 제공
 * 목록 표기, 검색, 데이터 보기, 데이터 수정, 데이터 쓰기, ..
 */
var express = require('express');
var router = express.Router();
let { 
    selectCitys,
    selectCountryCode,
    selectCCode,
    selectCityInfo,
    updateCounrty
} = require('../db');

// 게시판 홈페이지
// 전달된 데이터는 무조건 문자열이다 !! (바이너리 제외하고)
router.get('/', (req, res, next) => {
    // selectCitys 정보를 조회해서 (기본값 1000000, 1, 10) 데이터 가져오기
    // 삼항연산자 or ||
    let { pop, pno, pcount } = req.query;
    selectCitys( {
        pop: Number(pop) || 1000000,
        pno: Number(pno) || 1,
        pcount: Number(pcount) || 10
    } )
    .then( ({err, rows}) => {
        // console.log( rows.length, rows[0]);
        // 데이터를 가지고 화면 처리
        res.render( 'board', { title: '게시판', citys: rows } );
    })
    // res.send('홈페이지');
});

// ajax <-> 서버(API, 서버 혹은 단순 쿼리 연산 or 연산 후 결과만 리턴, 즉 화면 X)
router.post('/search', (req, res, next) => {
    // 1. json으로 전송된 데이터 추출
    let { keyword } = req.body; // 검색어가 input에서 name=keyword 이므로 keyword로 받기
    console.log( `keyword => ${keyword}` );
    // 2. 처리(검색, DB query)
    selectCountryCode( {
        countryCode: keyword.trim(), // 좌우공백제거 (데이터 클리닝 작업)
    } ) // <- promise 패턴이므로 then이 나와야 함
    .then( data => {
        // 3. 응답 (json)
        res.json( data );
    })
});

// 국가 코드만 출력하는 일종의 API
router.get('/ccode', (req, res, next) => {
    selectCCode().then( data => { res.json( data ); } ) // then 안에는 콜백함수 들어와야 함
});

// 상세 페이지
router.get('/detail/:id', (req, res, next) => {
    let { id } = req.params;
    res.render('detail', { title: '상세페이지', id: id });
})

// 1개 city의 정보 나타내기 (상세페이지의 세부 내용 제공)
router.post('/detail', (req, res, next) => {
    let { id } = req.body; // json 객체로 넘어오니까 body에서 id 값 꺼내기
    // 상세 정보를 가져오는 함수에 id를 넣어서 처리
    selectCityInfo( id )
    .then( data => {
        res.json( data || {}); // 만약 data가 비어있으면 {}라도 보내라
        res.render( 'detail', { title: '게시판'} );
    })
})

router.post('/modify', (req, res, next) => {
    let { ID } = req.body;
    console.log( req.body );
    updateCounrty( req.body )
    .then( ({ err, result } ) => {
        // 에러 체크는 생략
        console.log( result );
        if ( result.affectedRows == 0 ) { // 영향 받은 row가 없다
            res.render('msg', {msg: '수정 실패'})
            return
        }
        // 상세보기 페이지로 이동
        // 만약 ~ ??
        res.render('alert', {msg: '수정 성공', url: `/board/detail/${ID}`});
        // res.redirect(`/board/detail/${ID}`);
    })
});
// res.send('modify 요청');

// 객체 모듈화
module.exports = router;