/**
 * Map, Set이 추가됨
 *  - Array만 존재하던 자료구조에서 2개 클래스가 추가됨
 *  - Map -> 순서 X, key: value의 쌍으로 데이터를 관리 (타언어에서의 dictionary)
 *      - key는 고유함 (중복 불가)
 *  - Set -> 중복된 값 제거
 *      - 모든 data는 고유함 (중복 없음)
 * #TODO Map, Set
 */

// map 객체 생성
let map = new Map();
// 데이터 추가
map.set('A', 1).set('B', 2); // chain처럼 연속해서 가능
for (let [ key, value ] of map.entries()) { // entries가 배열 형태로 나오므로 -> 배열 분해 구조 떠올리기!
    console.log( key, value );
}

// 동일한 키를 이용하여 데이터 삽입 (값 update, 덮어쓰기)
map.set('A', 4);
for (let [ key, value ] of map.entries()) {
    console.log( key, value );
}

// Set, 순서 X, 값 중복만 제거, 키 X
// 중복 제거용 ! => 이후 배열이나 Map으로 변환하여 사용
let set = new Set();
set.add('A').add('B').add('A');

for (let item of set.values()) {
    console.log( item );
}