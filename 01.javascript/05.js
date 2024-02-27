/**
 * 클래스
 *  - 객체를 생성하는 고전적인 방법 4가지 확인
 *  - class 키워드를 이용한 객체 생성 (react에서 주로 사용)
 * #TODO class
 */

// 객체 표현식 (기존 방식 4가지)
// 1. 객체 리터럴
var name1 = '부산대';
var age  = 100;

// 객체 리터럴 : 데이터를 담아서 통으로 전송할 때 사용
// 변수 = {}, 1회성으로 사용, 함수의 파라미터로 주로 사용
// 개선 사항 : 전역 변수들을 객체 리터럴의 멤버로 넣어서 객체 생성 가능하다.
var obj1 = {
    name1,
    age
};
console.log( obj1.name1, obj1.age );
console.log( obj1 );
// 중괄호 앞에 아무것도 없다 => 객체의 이름이 없다. 클래스명이 없다
// { name1: '부산대', age: 100 }

// 2. Object 객체를 확장해서 사용
//    Object : 모든 객체의 superclass
var obj2 = Object();
console.log( obj2 );
obj2.age = 10; // 멤버 변수를 만듦  
console.log( obj2 );

// 3. 생성자 함수를 이용한 객체 생성
// 4. 생성자 함수 + prototype을 이용한 객체 생성 <= 최종 형태 (내일 공부)

// 5. class 키워드를 이용한 객체 생성
class Food {
    // 생성자 : 객체 생성, 멤버 변수 초기화
    constructor (keyword, age) {
        // 멤버 변수 생성
        this.keyword = keyword;
        this.age     = age;
    }
    // 멤버 함수 생성
    info () {
        console.log( `${this.keyword} ${this.age}` );
    }
}

// 객체 생성
const food = new Food('사과', '400');
console.log( food ); // Food { keyword: '사과', age: '400' } => 클래스명이 출력된다.
// 멤버 접근
food.info();

// 상속 (extends), 재정의
class FoodEx extends Food {
    // 생성자 오버로딩
    constructor (keyword, age, national) {
        super(keyword, age); // 부모 생성자 호출
        this.national = national;
    }
    // 기존 멤버 함수 오버로딩
    info() {
        console.log(`${this.keyword} ${this.age} ${this.national}`);
    }
    // 새로운 기능(함수) 추가
    // static : 정적 + 함수 -> 객체 생성이 아니라, 클래스명으로 접근
    static info2() {
        console.log( `정적 함수 ${this.age}` );
    }
}
var foodex = new FoodEx('포도', '1000', '외국');
console.log( foodex );
foodex.info();
// foodex.info2(); // 정적 함수는 객체로 접근 불가능 TypeError: foodex.info2 is not a function
FoodEx.info2(); // 정적 함수 undefined