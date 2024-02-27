// app.js에서 이미 만들어진 express 모듈을 캐싱해서 사용함
var express = require('express');
// 라우팅을 하기 위해서 라우트 객체를 획득 -> prefix : http://도메인:3000/
var router = express.Router();

/*
  - router.매소드명()_ : 특정 매소드 방식의 라우터 처리 가능
    - get or post or put => 매소드라 부른다 => client가 server에게 요청할 때 데이터를 전달하는 방법/수단/의도
      - get  : 서버로 보내는 데이터의 크기가 작다, 프로토콜의 **헤더**를 통해서 데이터를 전송,
               중요 X 데이터 (의도를 알아도 문제 안 되는 데이터)를 사용, 가장 많이 사용
      - post : 서버로 보내는 데이터의 크기가 커도 된다 (클 수 있다, 파일 업로드),
               프로토콜의 **바디*를 통해서 데이터를 전송 (여러 번 나눠서 보낼 수 있다, 대용량 전송 가능)
               보안 이슈, 암호화 가능, 숨겨서 전송 가능, 로그인, 회원가입 등 민감한 정보 처리
      - put : 데이터를 입력 요청할 때 ( sql : insert into ~ )
      - delete : 데이터를 삭제 요청 할 때 ( sql : delete from ~ )
    - http, https 프로토콜에 정의되어 있다
*/
/**
* - GET 방식의 요청만 처리하는 페이지
  - home page를 뜻함 (http://도메인 이렇게 요청할 때 최초로 나오는 대문)
 * 
 * 아래에서 정의되는 경로는 http://도메인:포트 + prefix + 정의한 경로
 * router.get('url or url 경로', 콜백함수(요청 객체(전달), 응답 객체 준비, 포워딩을 위한 함수) { 응답처리 })
 */
router.get('/', function(req, res, next) {
  // 응답 객체를 통해서 index.ejs 파일을 읽고, 데이터를 넣어서 -> 렌더링 (템플릿 엔진이 동적 생성) -> 응답
  // SSR (Server Side Rendering)
  res.render('index', { title: { v:'Express 4'} });
});

// URL 새로 정의 -> 요구사항 정의서를 기반으로 설계
// /custom, get 방식, 내용은 custom.ejs를 읽어서 처리, 요구사항에 없는 부분은 재량적으로 자유 구현
// TODO 리소스(텍스트, 설정값) 등등 외부에서 관리하는 것
router.get('/custom', (req, res, next) => {
  res.render('custom', { title: '고객센터' })
});

/**
 * #TODO GET 방식 전송 테스트
 *  - 클라이언트가 데이터를 서버쪽으로 전송한다
 *  - 메소드
*     - get : http 헤더
*         1. <form> 전송 -> 화면 깜박 + 새로고침 마크가 X로 잠시 변경됨 <-> ajax로 처리됨
*         2. 링크 클릭
*         3. url에 입력 후 요청
*           - http://127.0.0.1:3000/gettest?no=1234&nm=부산대
*           - ? 은 url과 전송 데이터의 구분자
*           - & 는 데이터와 데이터의 구분자
*           - = 은 데이터를 표현하는 키와 값의 구분자 : Map
*         4. rest api 구성 시 테스트를 위한 요청 전문 툴 사용
*          - 브라우저 사용 X
*          - 툴에서 임의로 요청을 구성하여 수행 (비정상적인 접근)
*           - postman or thunderclient (확장앱)
*     - post, put, ... : http 바디
 *  - 동적 파라미터 (URL에 심어서 보냄)
 *    - prototype, 무한대의 URL을 생성해야 할 때
 *  - 웹소켓 (다음 주)
 *     - 채팅, 챗봇
*/
router.get('/gettest', (req, res, next) => {
  // 유저의 모든 전송 데이터는 req(요청객체)를 통해서 전달된다
  console.log( 'get 방식 전송 데이터 추출', req.query );
  // no값, nm값을 추출하여 터미널에 출력하시오
  console.log( req.query.no, req.query.nm );
  let { no, nm } = req.query;
  console.log( no, nm );
  res.render('custom', { title: 'get 방식 데이터 전송 테스트'} );
})


/*
  TODO 동적파라미터 전송 테스트
    - URL에 데이터를 심어서 전송
    - http의 헤더를 타고 전송
    - 데이터량이 작다, 노출되어도 문제 없는 데이터를 사용
    - get과 post에서 모두 사용 가능
    - 무한 URL을 만들어야 한다면, 특정 부분이 계속 변경되는 URL을 사용해야 한다면 => 프로토타입(초기)
    - 형식
      - url/:변수명
      - url/:변수명/a/:변수명 도 가능
*/
router.get('/dynamic/:nm', (req, res, next) => {
  // 서버가 res 처리가 없으면 클라이언트 계속 빙빙 돌면서 대기한다 -> timeout 제한 필요
  // res.end() 이 부분이 기본이고, 내재된 함수(render(), ...)들도 존재
  console.log( req.params );
  // 전달될 값을 추출해서 "hi 전달된 데이터"로 세팅하여 응답하시오
  let { nm } = req.params;
  res.json( {'msg': `hi ${nm}`} );
})
// 이런 식으로 무한확장 가능 ~ !
router.get('/dynamic/:nm/a/:no', (req, res, next) => {
  console.log( req.params );
  let { nm, no } = req.params;
  res.json( {'msg': `hi ${nm} ${no}`} );
})

/*
  TODO POST 방식 전송 테스트
  - body를 통해서 data 전송, 대량 data 전송 가능
  - 데이터를 숨기거나, 보안적 이슈가 있는 경우 사용
  - 다양한 형태로 전송할 수 있다.
*/
// 페이지가 없다 : 404
// 해당 url로 해당 매소드가 구성된 게 없다, 허락되지 않았다 : 405

router.post('/posttest', (req, res, next) => {
  // 데이터 추출
  let { uid, upw } = req.body;
  res.json({ 'uid': uid, 'upw': upw });
});
// url은 동일한데, 매소드만 다르다 => 다른 url로 인지함
router.get('/posttest', (req, res, next) => {
  res.render('custom', { title: 'post 전송 테스트', data: req.body });
});

// json으로 전송된 데이터 처리
router.post('/posttestjson', (req, res, next) => {
  console.log( req.body );
  let { uid, upw } = req.body;
  res.json({ 'uid': uid, 'upw': upw });
});

module.exports = router;