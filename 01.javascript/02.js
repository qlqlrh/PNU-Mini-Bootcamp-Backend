/**
 * 문자열 표현
 * 기존 : " .. ", ' .. '
 * 신규 : ` .. `
 *  - 여러줄 문자열 : 동적으로 html 구성할 때, 구조 유지 (sql, 등등)
 *  - formatting : ${ 값( 변수, 함수, 연산식 ) }
 * #TODO 문자열, 백틱, `
 */

// 포멧팅
const addr1 = '부산시';
const addr2 = '부산진구';
const addr3 = '중앙대로 1004';

// 위 상수 3개를 합하고, 그 사이에 공백 문자 1개씩 넣어서 하나의 문자열로 만들어서 출력하시오
console.log(addr1 + " " + addr2 + " " + addr3); // 기존 방식
console.log(`${addr1} ${addr2} ${addr3}`);      // 리뉴얼 방식

// 여러 줄, 구조 유지
const keyword = '한파';
console.log(`(서울=연합뉴스) 김기훈 기자 = 서울시는 21일 오후 9시를 기해 서울 전역에 ${keyword}주의보가 발효됨에 따라 ${keyword} 종합지원상황실을 가동하고 24시간 비상 대응체계에 들어간다고 밝혔다.

${keyword}주의보는 아침 최저기온이 영하 12도 이하로 이틀 이상 이어지거나 전날보다 10도 이상 기온이 내려 3도 이하가 예상될 때 발효된다.

22일과 23일 아침 기온은 전날보다 큰 폭으로 떨어지며 낮 기온도 대부분 영하권에 머물 전망이다.

시는 ${keyword}로 인한 피해가 없도록 상황총괄반, 생활지원반, 에너지복구반, 구조구급반, 의료방역반으로 구성된 ${keyword} 종합지원상황실을 운영한다.`)