/**
 * 반복문 기능 추가
 * for ~ of
 * #TODO for ~ of/in, while
 */

// 열거할 수 있는 데이터(배열, 문자열, 맵, 집합)를 기반으로 for ~ of 사용 가능

// for : 지정된 횟수를 반복할 때 사용
for (var i = 10; i < 13; i++) {
    console.log( i );
}

// var 변수가 계속해서 이어진다
for (; i < 15; i++) {
    console.log( i );
}
console.log('---------')
// let 사용 => scope가 제한된다
// 위에 있는 var i와 서로 다른 i이다 (scope가 다름)
for (let i = 10; i < 13; i++) {
    console.log( i );
}
console.log('---------')
for (; i < 16; i++) {
    console.log( i );
}

// for ~ in : 열거 방식 지원
let arr = [ ..."hello" ] // 스프레드 연산을 통해 h e l l o를 원소로 만듦
console.log( arr );
for (let idx in arr) { // 데이터가 직접 뽑히지 않고, 인덱스가 순차적으로 나온다
    console.log( idx, arr[idx] );
}

// 이런 부분을 해결하기 위해 for ~ of 추가
for ( let item of "abcd" ) { // iterator한 data들은 모두 가능함
    console.log( item );
}

// while : 0 ~ 무한대
let j = 0;
while ( j < arr.length ) {
    console.log( arr[j] );
    if ( j == 2 ) break;
    j++;
}

// do ~ while : 1 ~ 무한대
j = 0;
do {
    console.log( arr[j] );
    if ( j == 2 ) break;
    j++;    
} while ( j < arr.length );