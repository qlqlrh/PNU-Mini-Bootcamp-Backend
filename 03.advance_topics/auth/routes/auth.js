var express = require('express');
var router = express.Router();

// ORM 모듈 -> DB 연동
const User = require('../models/users');
// passport 모듈 -> 인증
const passport = require('passport');
// 암호화 모듈 -> 비밀번호
const bcrypt = require('bcrypt');
// 인증 여부를 판단하여, 진입할 수 있는 페이지 여부를 판단하는 모듈
// 개별 페이지에 각각 적용하겠다 -> 세세히 시나리오 맞춰서 컨트롤 가능
const {
    isLogin,
    isNotLogin,
} = require('./cusMiddle');

// 로그인 ( 로그인 안 한 상태에서 진입 )
router.route('/login')
.get(  isNotLogin, (req, res, next) => {
    res.render('login', { title: '로그인' });
})
.post( isNotLogin, (req, res, next) => {
    // 미들웨어 내에서 미들웨어를 콜백하기 위한 방법 : 끝에 (req, res, next)를 붙여서 구성
    // passport를 이용한 인증 진행
    // authError : 에러 정보가 세팅되어 전달됨
    // user      : 로그인한 회원 정보가 세팅되어 전달됨
    // info      : 오류 발생 시 메시지가 전달됨
    // passport.authenticate('local', 콜백)
    // local : ORM 사용해서 인증을 하겠다.
    // 콜백함수 : passport 폴더 내부에 있는 localStrategy.js를 call 함 -> 인증 진행
    // 이름이 정리(기본값이 고정) 되어서 자동 호출
    // -> 결과를 콜백함수에 담아서 전달
    passport.authenticate('local', (authError, user, info) => { // done() 콜백함수
        // authError, user, info 라는 값을 가지고 진행되는 내용을 기술
        // 1. authError가 존재하는 경우
        if ( authError ) {
            return next( authError );
        }
        // 2. user가 false인 경우
        if ( !user ) {
            return res.render('msg', { 'msg' : info.msg }) // TODO 안 되면 info => { 'msg' : info.msg } 바꾸기
        }
        // 3. 정상 인증 완료
        // passport를 등록하면서 생성된 함수
        return req.logIn( user, error => { // ./passport/index.js에 구성된 역직렬화 함수가 호출돼서 처리가 됨
            // passport 내부에서 로그인 처리 시 오류 발생한다면
            if ( error ) {
                console.error( error );
                return next( error );
            }
            // 저장된 세션 확인
            console.log( '저장된 세션 확인', req.session );
            return res.redirect('/');
        })
        // res.send('로그인 처리 완료');
    })(req, res, next); // 이렇게 붙여줌! => 미들웨어 내에 미들웨어를 콜백하기 위한 장치
})

// 회원가입 ( 로그인 안 한 상태에서 진입 )
router.route('/join')
.get(  isNotLogin, (req, res, next) => {
    res.render('join', { title: '회원가입' });
})
.post( isNotLogin, async (req, res, next) => {
    // ORM을 이용하여 회원가입 (다 순서대로 진행되어야 하니까 동기식!)
    // 1. 유저가 입력한 정보 추출
    const { email, password, nick } = req.body;
    console.log( email, nick, password );

    // 2. ORM의 기존 유저와 동일한 이메일 + nick 이 있는지 체크 => findOne()
        // => #TODO unique 설정있으니까 애초에 입력 거부하는 거 아닌가..?
        // => 내가 확인 안 하면, Validation error 뜸!
        // 파일 입출력이라 await + 에러 처리
    try {
        const emUser = await User.findOne({
            where: { email }
        });
        if ( emUser ) {
            return res.render('msg', { msg : '이미 사용 중인 이메일입니다.' });
        }
        const nkUser = await User.findOne({
            where: { nick }
        });
        if ( nkUser ) {
            return res.render('msg', { msg : '이미 사용 중인 닉네임입니다.' });
        }
        
        // 3. 비밀번호 암호화 => 서비스 운영 쪽에서도 비밀번호는 몰라야 한다
        const hash = await bcrypt.hash(password, 12); // TODO bcrypt.hashsync 랑 await 쓰는 거랑 뭐가 달라..?

        // 4. ORM의 회원가입(데이터 입력) 함수 호출 => 모델클래스.create()
        const result = await User.create({
            email,
            password: hash, // 해쉬값 만든 걸로 pw 세팅해주기
            nick,
        });
        if ( result ) {
            console.log( '가입 성공' );
        }
        
        // 5. 로그인 화면으로 이동
        return res.redirect('/auth/login');

    } catch (error) {
        console.error( error );
        return next( error ); // 서비스에서 세팅된 에러 페이지로 자동 처리
    }
        
})

// 로그아웃 ( 로그인한 상태에서 진입 )
router.get( '/logout', isLogin, (req, res, next) => {
    // 세션 제거, 세션 쿠키 제거
    req.logOut(() => { // TODO Q.?? 왜 바로 destroy 안 하고..?
        // 세션 정리
        req.session.destroy(() => {
            // 로그아웃 후 이동할 페이지를 지정
            res.redirect('/auth/login'); // 홈페이지로 이동
        });
    });
})

module.exports = router;