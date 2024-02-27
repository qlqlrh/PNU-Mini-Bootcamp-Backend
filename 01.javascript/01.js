/**

* 주석, 변수 표기법 (카멜 표기법(java..) <-> 스네이크 표기법(c, c++, python))
* 변수 키워드
* 스코프 (범위)
* #TODO 주석, 변수, 상수, let, const, scope

*/

// 1줄 주석

/*
    n줄 주석
*/

// 변수 선언
// var 변수명 (카멜 표기법 : 첫글자 소문자 + 이어지는 단어 첫글자 대문자)
// 문장이 끝났다 --> ; or 생략 가능
var yourName;   // 카멜 표기법
var your_name;  // 스네이크 표기법

// 변수를 선언하고, 값을 넣어서 초기화 하지 않으면 => undefined
console.log( yourName, your_name );

// type 추론형 (javascript, python, ...)
// <-> 타입을 부여하여 변수 선언 (int a) -> 타입을 제약, 명확하게 부여
// 변수 선언시 변수 키워드가 있던지, 없던지 둘 중 하나
// 변수 선언, 초기화 => 값 부여 => type 추론 => 변수의 type이 결정됨
// var or let or const
var b = 10; // b는 type이 정수형이다 !
console.log( b );

// 정수값을 가진 변수에 문자열을 넣으면 ?
// js는 변수의 여러 타입(함수, 객체)의 값을 담을(가리킬) 수 있다.
// 주의 !!! -> 이런 행위는 안 하는 것으로 !
b = "hi";
console.log( b );

// 동일 변수가 여러번 선언 되는 case
// 전역 변수 -> 코드 전체에서 의미를 가진다.
var c = 1;
console.log( c );
function test() {
    console.log( c );   // 전역 변수는 안 찍힘 (undefine)
    var c = 10;
    var b = 11;
    console.log( c, b ); // 지역 변수 -> 해당 변수는 함수 내부에서만 의미를 가진다.
}
test();
console.log( c )
console.log( b )

function test2() {
    var name = 'A';
    var name = 'B';
    console.log( name ); // var은 중복되는 변수명 선언 OK -> 다른 관점에서는 오류
    let name1 = 'A'; 
    // let name1 = 'B';  // let을 통해서 오류를 처리할 수 있다 -> 사용 불가
}
test2();

// ECMA에서는 let, const 사용을 권장
// 변수 여러 개를 한 줄에 표현 가능
let a1 = 1, b1 = 2, c1 = 3;
console.log( a1, b1, c1 );

// let : 변수(알파벳 or _로 시작, 2번째 문자부터 숫자 가능) 표현 키워드,
//        var이 가진 많은 오류를 잡았음
let ani = 'cat';
console.log( ani );
ani = 'dog';
console.log( ani );
ani = 1;    // 변수의 타입까지 고려한다면 -> TS에서 해결
console.log( ani );

// 상수 : 값이 세팅되면 변하지 않는다 -> 변수명은 모두 대문자, 스네이크 표기법이 어울림
//        -  용도 : 환경변수
const HOST_NAME = 'localhost';
const IPADDR    = '127.0.0.1';
console.log( HOST_NAME, IPADDR );
// IPADDR = ''; // TypeError: Assignment to constant variable.

// scope - var
var a2 = '노드';
console.log( a2 );
if ( a2 ) { 
    var a2 = '백엔드';
    console.log( a2 );
}
console.log( a2 );

// 함수 or 클래스 내부를 제외한 모든 코드 상에서는 동일 변수를 선언하면 같은 변수로 본다 -> var의 문제점
// => let로 해결

// scope - let
let a3 = '노드';
console.log( a3 );
if ( a3 ) { 
    // let를 부여하면 범위가 {} 안으로 제약된다
    // 반복문에서 주로 이 문제를 해결할 수 있다
    let a3 = '백엔드';
    console.log( a3 );
}
console.log( a3 );