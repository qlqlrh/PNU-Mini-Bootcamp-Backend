/**
 * Destructuring !! (중요🔥)
 *  - 객체 구조 분해 {}, 배열 구조 분해 []
 *  - {} : 데이터로 바라보면 json, 파이썬 딕셔너리, ...
 *  - [] : 데이터로 바라보면 json(내부에 배열로 존재 가능), 파이썬 리스트/ndarray, ...
 *  - 스프레드 연산( ... )
 *  - 응용
 *  - 데이터 덩어리가 전달되었을 때, 적절하게 추출, 변경(조작), 대체, 복사 등등 간편하게 처리
 * #TODO 객체구조분해, 배열구조분해, 스프레드연산
 */

// 데이터 준비 (배열, 객체)
let station = {                         // 객체
    s1: '서면역',                       // 문자열
    s2: '부전역', 
    s3: '양정역',
    s4: ['해운대역', '공항역', '센텀역'], // 배열
};
console.log( station );
// s1, s3 값을 출력하시오
console.log( `s1: ${station.s1}, s3: ${station.s3}` ); // 객체를 통해 변수에 접근

// 간결하게 값만 사용할 수 있게 처리해보자
// 1. 객체 구조 분해
// var|let {멤버변수명, ...} = 객체
var { s1, s2, s3, s4 } = station; // 객체에서 필요한 것만 추출해서 사용
console.log(s3);

// 추출한 변수의 값을 수정하면, 원본에 영향을 미치는가? (얕은 복사? 깊은 복사?)
s3 = '부산역';
console.log(station.s3); // 깊은 복사 (값을 복사해서 새로운 변수에 넣음, 원본과 상관 없음)

// 2. 배열 구조 분해
// var|let [ 변수명(임의로 지정 가능):순서대로 세팅됨 ] = 배열
console.log( s4 );
let [ st1, st2, st3 ] = station.s4; // 맨 앞에 있는 배열값부터 순차적으로 변수에 세팅됨
console.log( st1, st2, st3 );

// 마지막 값만 추출하고 싶다면? (제한적 사용)
let [ , , stt3 ] = s4; // 구현은 했지만, 비효율적 -> 멤버수가 많으면 적절 X
console.log( stt3 );

// 3. 스프레드 연산 ( ... )
var a1 = ['콜라', '물', '사이다'];
var a2 = ['밥', '햄버거'];

// 2개의 배열을 합쳐서 하나의 배열로 만드시오
console.log( a1 + a2 ); // 문자열이 돼서 의도대로 되지 않음

var a3 = [ a1, a2 ];
console.log( a3 ); // 2차원 배열

// 스프레드 연산을 통해서 새로운 배열을 생성
a3 = [ ...a1, ...a2 ];
console.log( a3 ); // 1차원 배열 !

// 원본 조작 진행
var a5 = ['콜라', '물', '사이다'];
console.log( a5.reverse() );         // 원본에 영향 O
// console.log( [...a5].reverse() ); // 원본에 영향 X
console.log( a5 );

let [drink] = [...a5].reverse(); // 원본 유지, 사본(deep copy)을 가지고 조작 + 배열 구조 분해
console.log(drink, a5);

// 구조 분해 + 스프레드 연동
// 추출값 제외한 나머지는 모두 스프레드로 표현된 변수로 세팅
let [ sst1, ...sst2 ] = a5;
console.log(`sst1: ${sst1}, sst2: ${sst2}`);

// 함수 인자에서의 스프레드 사용 !
// 배열로 값을 받는다 => 함수 호출시 인자를 가변하면 알아서 배열로 받는다 => 가변 인자 구현
function test4 ( ...args ) { // 가변 인자와 뉘앙스 비슷
    console.log(args);
}
test4( '콜라제로', '사이다제로', '에비앙' );

// 배열 구조 분해 응용
// 표준 함수, 인자 2개(a, b), 두 값을 더해서 리턴하는 함수, 함수명 test5
function test5(a, b) {
    return a + b;
}

// 데이터
const data = [1, 2, 3]; // 데이터가 n개의 정보를 가진 배열, 객체, 집합 등등인 경우 const로 받기도 한다
console.log(data);
data[0] = 10;           // const 배열인 경우, 값이 아니라 그 크기가 안 바뀌면 됨
console.log(data);

// 응용 테스트
console.log(test5(data[0], data[1])); // 데이터를 쪼개서 보냄 (귀찮)
console.log(test5(...data));          // 데이터를 통으로 보냄 (편안) => 배열 구조 분해가 돼서 앞에서부터 차례로 인자값에 세팅됨

// 객체 구조 분해 응용
function test6( { s1, s2 } ) { // 객체를 분해해서 바로 넣으려면  { 인자, 인자, .. } 구조로 파라미터 세팅 해야 함
    console.log( `${s1} ${s2}` );
}
test6( station );

// 함수 인자에서 일부는 지정해서 받고, 나머지는 한 번에 받기
function test7( a, b, ...arr ) {
    console.log(a, b, arr);
}
test7( 1,2,3,4,5,6,7,8,9 );