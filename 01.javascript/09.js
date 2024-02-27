/**
 * 모듈화, 모듈 가져오기
 *  - 모듈화        : 다른 곳에서 사용하게끔 만든 로직, 기능, 모듈, 라이브러리, ...
 *  - 모듈 가져오기 :다른 곳에서 만든 js를 가져와서 내 코드에서 사용하는 방식
 *  - 스타일
 *      - common.js라는 스타일, 바로 사용 가능, require() <-> exports !
 *      - 최신 문법 스타일 표현 가능 (nodejs 상에서는 별도 추가 모듈이 필요)
 *          - imports ~ from ~ : 리액트에서 많이 사용 <-> export !
 * #TODO 모듈화, require, exports, import from, export
 */


// 모듈화 코드, ./9_mod_1.js, ./mod/index.js
// require('라이브러리명|커스텀모듈(*[.js]|./패키지명/[index.js])')
// 폴더를 지정하면 해당 폴더 밑의 index.js를 자동으로 찾는다
const mod1 = require('./09_mod_1.js');
console.log( mod1 );
const { age } = require('./09_mod_1.js');
console.log( age );

// 실습상 대표 모듈을 만들어서 아래 부분은 주석처리함
// const {
//     a1,
//     PI,
//     b1,
// } = require('./09_mod_1');
// console.log( mod1 ); // {} : 빈 객체로 출력 or { a1: 10, PI1: 3.14, b1: [Function (anonymous)] }
// console.log( mod1.a1 );
// console.log( a1 );

// react 등에서 사용하는 모듈을 가져오는 법
// import A, { PI } from './09_mod_2.js'

// const { AI } = require('./mod/index');
const { AI } = require('./mod/index.js'); // index라는 이름은 통상 기본값으로 보고 생략한다. (위 코드와 같은 의미)
console.log( AI );