/**
 * 회원가입, 인증, 로그인, 로그아웃, 회원정보 수정, 마이페이지, ...
 *  - /users/signin, /users/auth, /users/signup, /users/signout, /users/modify,
 *  - /users/mypage
 * - 이렇게 설계 먼저하고, 시작해야 함 !
 */
var express = require('express');
var router = express.Router();
const { selectSignin } = require('../db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // http://127.0.0.1:3000/users
  // 회원 업무에 대한 모든 링크, 테스트 화면 제공 (개발용)
  res.render('users', { title: '회원 처리 메인' });
});

// 로그인 화면 (GET)
router.get('/signin', function(req, res, next) {
  // 실습 : 로그인 화면 준비 (아이디, 비번, 로그인 버튼)
  res.render('signin', { title: '로그인 화면'} );
});

function showMsg(res, msgStr) {
  res.render('msg', { msg: msgStr });
}

// 로그인 처리(POST) -> 포워딩 or 에러처리
router.post('/signin', function(req, res, next) {

  // 1. 아이디, 비번 정보 획득, 유효성 검사(데이터 누락 체크)
  const { uid, upw } = req.body;
  console.log(uid, upw);
  // 값을 검사해서 유효성 보장
  if( uid == null || upw == null || uid === '' || upw === '' ){
    console.log( `[${uid}]-[${upw}]` );
    // 에러메세지 전송 + 이전페이지(URL 상태로)로 되돌아 간다
    showMsg( res, '아이디 혹은 비밀번호를 정확하게 입력하세요' );    
    return;
  }

  // 2. 아이디, 비번 정보를 이용하여 데이터베이스의 쿼리 수행
  selectSignin( {
    uid: uid,
    upw: upw
  })
  .then ( ({err, rows }) => {
    if (rows.length > 0) { // 3. 계정 정보가 존재하면
      console.log('회원 정보 존재');
      //  3-1. 회원 정보 획득 (전부 or 일부)
      //  3-2. 로그 처리 등등 필요한 작업 수행
      //  3-3. 세션 처리, 필요 정보 저장
      //  3-4. 홈페이지로 이동
      res.redirect('/');
    } else { // 4. 계정 정보가 없다면
      console.log('회원 정보 없음');
      //  4-1. 오류 메시지 전송 -> 특정 페이지로 포워딩 or 뒤로 가게 처리
        showMsg( res, '일치하는 회원 정보가 없습니다.' );
        return;
    }
    console.log( rows );
  })
  // res.send('로그인 처리');
});

// 로그아웃
router.get('/signout', function(req, res, next) {
  res.send('로그아웃');
});

// 회원가입 화면
router.put('/signup', function(req, res, next) {
  res.send('회원가입 화면');
});
// 회원가입 처리
router.get('/signup', function(req, res, next) {
  res.send('회원가입 처리');
});
// 회원 탈퇴
router.delete('/signup', function(req, res, next) {
  res.send('회원 탈퇴');
});

// 인증
router.post('/auth', function(req, res, next) {
  res.send('인증');
});

// 마이페이지
router.get('/mypage', function(req, res, next) {
  res.send('마이페이지');
});

module.exports = router;