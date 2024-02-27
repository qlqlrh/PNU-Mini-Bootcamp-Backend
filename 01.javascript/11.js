/**
 * 기타 표현, 연산
 *  - ?.(옵셔널 체이닝), 3항연산자, ||, ??
 * #TODO ?. ?? 기타표현
 */

// 삼항 연산자
// 조건은 이분법, 값을 리턴 => 이런 경우에 사용
// 조건식 ? 참일때값 : 거짓일때값
const a = 10 > 0 ? 'big' : 'small'
console.log( a )

// 옵셔널 체이닝
const A = {
    name:'AA',
    proc:{
        id:'code',
        msg:{
            code:2024
        }
    }
}
// code를 출력
console.log( A.proc.msg.code )
// 타언어에서는 널세이프라고도 표현
// 데이터를 받아서 동적으로 객체가 생성(변환)후 데이터 접근시 활용
console.log( A.proc?.msg?.code )

// 조건식에서 거짓 : false, '', 0, null, undefined(?)
console.log( 'AA' || 'hi' )
console.log( null || 'hi' )
console.log( '' || 'hi' ) // ''도 일종의 빈값인데 조건식으로 보고 무시된다
console.log( 0 || 'hi' )  // 0도 일종의 0값인데 조건식으로 보고 무시된다

// 실제 값이 존재하는 여부로 판단한다면, 0, ''도 존재하는것 -> 그대로 판단해서 처리하고 싶다
// ??를 사용
console.log( 0 ?? 'hi' )
console.log( '' ?? 'hi' )