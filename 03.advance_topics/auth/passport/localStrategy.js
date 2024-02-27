/**
 * 로컬 인증 전략을 구현하는 모듈
 *  - ORM을 이용한 로그인 처리
 */

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt'); // 암호화
const User = require('../models/users');

// 객체 형태로 반환
module.exports = () => {
    console.log( 'LocalStrategy 호출' );
    // /auth/login url을 post 방식으로 호출 (직접 작성한 부분)
    // => passport.authenticate('local', () => {}) 호출
    // => 이 함수가 호출됨
    // passport.use( new LocalStrategy( {}, () => {} ) );
    passport.use( new LocalStrategy( {
        // 로그인에 필요한 정보 세팅 (email, pw)
        // req.body.email or req.body.password
        usernameField: 'email',
        passwordField: 'password'
    }, async ( email, password, done ) => {
        // email, password : 사용자가 입력한 정보
        // done : 콜백함수
        // 4가지 case 존재 : DB 오류, 미가입회원, 비번 틀림, 정상 유저 => done() 콜백함수 : (authError:오류, user:유저객체, info:메시지)
        try {
            // 1. ORM을 이용하여 가입 여부 확인 (email 확인) => 가입된 회원인지 확인 (필요 시 닉네임 체크가능 : 생략)
            const existUser = await User.findOne({
                where: { email }
            })
            if ( existUser ) {
                // 2. 아이디, 비번 넣고 조회(쿼리 수행 한 번 더 함) or 비번 비교(즉시 수행 : 찾아낸 existUser 사용)
                const isEqual = await bcrypt.compare( password, existUser.password ); // 원래 pw와 해쉬 거친 pw 넣기
                if ( isEqual ) {
                    // 정상 유저
                    done( null, existUser )
                } else {
                    // 비번 틀림, false를 넣는 것은 JS가 타입 추론형임을 활용한 것 (객체, 불린을 세팅)
                    done( null, false, { msg : '비밀번호가 틀립니다.' } );
                }
            } else {
                // 미가입회원
                done( null, false, { msg : '미가입 회원입니다.' } )
            }
            
        } catch (error) {
            // DB 오류
            console.error( '인증시 DB 오류 발생', error );
            done( error );
        }
    }));
}