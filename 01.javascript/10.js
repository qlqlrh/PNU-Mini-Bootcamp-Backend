/**
 * 객체를 생성하는 3, 4번째 유형
 *  - 생성자 함수를 이용한 객체 생성
 *  - 생성자 함수 + prototype 을 이용한 객체 생성 (최종 완성형)
 *      - class XX {} 과 동일 표현
 *  - prototype를 이용하면 객체에 변수, 함수, 클레스까지 모두 확장 가능
 * #TODO 생성자함수 객체생성 prototype
 */

// 생성자 함수
// 1. 함수명을 클레스와 동일하게 첫글자 대문자(옵션)
// 2. 함수 내부에서 this를 사용하여 맴버 구성

// 3번 유형
function Persion()
{
    this.type = '인간',
    this.getName = ()=>{
        console.log( this.type )
    }
}
let obj = new Persion()
console.log( obj ) // Persion { type: '인간', getName: [Function (anonymous)] }
obj.getName() // 인간

// 4번유형
function Persion2( nm )
{
    // nm 값이 존재하면 이값으로, 없으면 '인간' 기본값으로 세팅
    this.type = nm || '인간'
}
let obj2 = new Persion2( '한파' )
console.log( obj2 ) // Persion2 { type: '한파' }
// 확장
Persion2.prototype.age = 10
// 모든 객체들이 공유하여 해당 함수 사용 가능 => 메모리 절약 효과
Persion2.prototype.getName = function () {
    console.log( this.type )
}
console.log( obj2 )
console.log( obj2.age )
obj2.getName()