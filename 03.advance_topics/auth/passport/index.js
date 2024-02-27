// passport 객체 획득
const passport = require('passport');
// 인증 방식 모듈을 가져오기, 로컬, 소셜
const localStrategy = require('./localStrategy');
const User = require('../models/users');

module.exports = () => { // 대표 모듈이 함수임
    // 로그인 이후 사용자 정보를 획득해서 사용하는 측면에서 작동될 듯
    // 이 모듈을 가져와서 호출하면 작동
    /**
     * - 서버 측 메모리가 한정적이므로, 최소 정보만 저장
     *  - 전체 정보는 DB 쿼리 (ORM)을 통해서 추후 획득하는 전략
        * 직렬화    : 객체의 직렬화 후, 전송 가능한 형태로 변환
        * 역직렬화  : 전송 가능 형태에서 객체로 복원
     */
    
    // req.logIn( user, 콜백함수 ) 호출 후 실행됨
    passport.serializeUser(( user, done ) => {
        // 저장할 최소 정보 => id만 획득 후 전달
        console.log( 'passport.serializeUser()');
        // req.session에 어떤 정보를 저장할지 결정
        done( null, user.id ); // 많은 것을 담으면 메모리 낭비
    });

    // serializeUser()에서 콜백함수의 인자인 done이 호출되거나
    // passport.session()이 실행되면 호출됨
    // 서버 요청이 올 때마다, 항상 실행됨 => id를 이용하여 유저 정보 획득
    /*
    passport.deserializeUser(( id, done ) => {
        // id => 전체 회원 정보 획득 후 전달
        // id를 넣어서 DB 상에서 일치되는 유저 정보를 획득하여 전달
        // User.findOne({ where : { id } })
        console.log( 'passport.deserializeUser()');
        User.findOne({
            where: { id }
        })
        .then(  user  => {
            console.log( '유저 정보 세팅 성공 ', user )
            done( null, user )
        })
        .catch( error => {
            console.log( '유저 정보 세팅 오류 ', error )
            done( error ) 
        }  )
        // 위 정보들은 모두 req.user에 저장됨
    });
    */
    passport.deserializeUser(( id, done )=>{
        console.log( 'passport.deserializeUser()' )
        // id => 전체 회원 정보 획득 후 전달
        // id를 넣어서 DB상에서 일치되는 유저 정보를 획득하여 전달
        User.findOne( { where : {id} } )
        .then( user => done(null, user) )
        .catch( err => done(err)  )
        // req.user 항목에 저장된다
    });
    // TODO passport에서 인증 방식 연결 지점: 호출을 통해서 연결
    localStrategy();
}