/**
 * 함수
 *  - 기존 : 표준 함수, 익명(무명) 함수(변수대입), 콜백 함수(비동기처리가능), 고급 함수(클로저, ...)
 *  - 추가 : 에로우 함수(화살표 함수)
 *  - 특징 : 함수를 값처럼 사용 가능(변수 대입 OK, 함수의 인자로 전달 OK)
 *  #TODO 함수, 에로우 함수
 */

// 표준 함수
/*
[] => 생략 가능
function 함수명([인자, 인자, ...]) // 함수 선언부
{ // 코드 블럭
    [statement] // 수행문
    [return] [반환값]
}
*/

console.log(getName('부산')); // 표준함수는 정의 전, 호출 가능 함(적절하지는 X)
function getName( name ) {
    // name : 지역 변수, 함수의 인자(argument, parameter), 외부에서 함수 내부로 데이터를 전달하는 통로
    return `당신의 이름은 ${name}`;
}

// 함수는 정의 후(= 메모리에 상주된 후) 사용 가능하다
console.log(getName('부산대'));

// 익명 함수
// 함수의 이름이 없다 => 부를 수 있는 이름이 없다 => 콜백함수로 주로 사용된다 (1곳에서만 사용됨)
// 변수의 값으로 함수 부여
// console.log(getName2('커피')); // ReferenceError: Cannot access 'getName2' before initialization
const getName2 = function ( name ) {
    return `당신의 이름은 ${name}`;
}
console.log( getName2('커피') );

// 콜백 함수
// 비동기 처리를 위해서 사용됨
// 비동기 => 프로그램에서 외부 리소스와 통신할 때, 주로 발생
// 외부 리소스 : 데이터베이스, 파일, 네트워크 통신 => I/O (입출력) => 즉각적으로 수행할 수 없는 경우들
// 비동기적 상황에서는 응답이 즉각적으로 오지 않는다 (딜레이 발생)

// 예시 (비동기적 상황은 X, 콜백만 확인)
function test3( cb ) {
    console.log( cb() );
}
test3( getName2 ); // 함수를 인자로 전달
// test3( getName2('라떼') ) // TypeError: cb is not a function

function test4( cb ) {
    let name = '서면'; // 이 부분이 차후 비동기 코드로 대체된다
    console.log( cb(name) ); // 콜백함수에 결과를 넣고 호출한다 => 이 함수 test4에게 데이터 전달 가능
}
test4( getName2 ); // 함수를 인자로 전달

test4( function (name) {
    // 여기서부터 비동기로 전달된 데이터 name을 가지고 다음 작업이 가능하다
    return `당신의 이름은 ${name} + `
})

// 에로우 함수 생성법
/*
    - function 제거
    - 파라미터가 1개면 () 제거 가능, 파라미터가 아예 없으면 () 존재해야 함
    - ()와 {} 사이에 => 추가
    - {}는 수행문이 1개인 경우 생략 가능
    - 수행문이 1개이고, {}가 생략되어 있고, 값을 반환한다면 return 생략 가능
    - 함수명은 만드는 방식에 따라 존재 여부 다름
*/

const getName3 = ( name ) => `당신의 이름은 ${name}`;
console.log(getName3);

test3( name => {
    return `Person (name = '부산), age - 40`;
})

// 함수 인자에 기본값 처리
// 함수 인자의 타입을 제시 가능
function getPerson(name = '부산', age = 40) {
    console.log(` ${name}의 연식은 ${age}입니다.`);
}
getPerson('해운대', 40);
getPerson('해운대');
getPerson(100);
// getPerson(age=100); // 이렇게는 인식 안 됨

// 에로우 함수의 this 사용 주의
// this : (자기 자신 객체 표현 this or self)
// {} : 객체를 의미 (객체 리터럴)
var obj = {
    name: 'pusan',       // 멤버 변수 (객체명.멤버변수명)
    load: function() {   // 멤버 함수 (객체명.멤버함수명)
        setTimeout( function() {
            console.log( '=>', this.name ) // undefine
        }, 1000 * 0.1 ); // 단발성 timer, 1000은 1초
    }
};
console.log(obj);
obj.load();

// 특정 부분을 화살표 함수로 반환 처리
// this 사용시, 화살표 함수 위치에 따라 정상 작동 여부가 갈린다
var obj2 = {
    name: 'pusan',       // 멤버 변수 (객체명.멤버변수명)
    load: function() {   // 멤버 함수 (객체명.멤버함수명)
        setTimeout( () => console.log( '=>', this.name ), 1000 ); // pusan 출력
    }
};
console.log(obj2);
obj2.load();

// 순수(pure) 함수
// 클로저 (함수 안의 함수)를 만들기 위한 전제 조건 중 하나
// 전역 변수가 함수 내부에서 사용 X, 함수 자체로 뭔가 기능이 종결
function add( x, y ) {
    return x + y * 10;
}