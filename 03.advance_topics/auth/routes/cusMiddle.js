/**
 * 사용자가 정의한 미들웨어
 * (req, res, next) => {}
 */

// 개별 모듈화 구현
// 판단 여부를 이분법으로 정의 => 접두사 b(boolean) or is 사용

// 로그인한 이후 접근 가능한 페이지
// 
exports.isLogin    = (req, res, next) => {
    // passport가 자동으로 만들어주는 인증 여부를 체크하는 함수 존재 (isAuthenticated())
    console.log('req.isAuthenticated()', req.isAuthenticated())
    if (req.isAuthenticated()) { // 로그인 되었다
        next(); // 로그인 되어있으니까 통과 -> 다음 미들웨어에서 처리
    } else {
        // 접근 불가 처리
        res.redirect('/auth/login');
    }
};

// 로그인 없이 접근 가능한 페이지
// 회원가입, 로그인
exports.isNotLogin = (req, res, next) => {
    console.log( 'req.isAuthenticated()', req.isAuthenticated() );
    // passport가 자동으로 만들어주는 인증 여부를 체크하는 함수 존재 (isAuthenticated())
    if (!req.isAuthenticated()) { // 인증이 안 되었다
        next(); // 로그인 안 되어있으니까 통과 -> 다음 미들웨어에서 처리
    } else {
        // 접근 불가 처리
        res.render('msg', { msg: '로그인 상태로 접근 불가' });
    }
};