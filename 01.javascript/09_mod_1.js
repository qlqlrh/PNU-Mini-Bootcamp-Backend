// 변수, 상수, 함수 준비
// private 처리 됨, 이 모듈 내부에서만 사용됨, 외부 사용 X
let a    = 10;
const PI = 3.14;
function b(){};

// 외부 공개용
exports.a1  = 10;
exports.PI1 = 3.14;
exports.b1  = () => {};


// 외부로 공개하고 싶은 전체 내용을 하나의 객체로 묶어서 전달
// 대표(기본, default) 모듈화가 되어서, 개별 모듈화 한 내용이 전부 무시됨
module.exports = {
    age: 10,
};