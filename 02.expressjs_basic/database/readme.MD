# 절차
- _npm init_
- _npm install mariadb --save_
- mariadb와 연동하여 sql 수행
- 풀링처리 (DB와 S/W를 미리 connection (100개, 200개)하여 요청 시 빌려주고 돌려받는 방식)
    - 커넥션풀 => 동적 수를 계산할 수 있다 => 기본 서버의 성능