# CMS
- HelloExpress 프로젝트를 카피하여 구성
- adminLTE 템플릿 적용
- /public/index.html => views/index.ejs로 대체(교체)
- adminLTE 모든 리소스는 publid 폴더 이하에 카피
    - /public/*.html => /public/pages/*.html 이동
    - index.html을 읽어서 홈페이지(/) 요청 시 처리하는 게 우선되어서 혼선

# 디자인 적용
- 경로법 조정
    - href="dist/..." => href="/dist/..."
    - href, src 등등 조정
- 웹 페이지는 여러 페이지를 조립해서 구성
    - 페이지를 분해 -> 모듈화 -> 조립하여 하나의 페이지로 구성

# 로그인 연동
- 세션
    - 클라이언트의 정보를 서버 측에 저장
        - 서버 측 메모리(express-session), 서버 측 DB(redis, ...), 쿠키 연동(JWT 활용) 등등, passport 등 모듈
- 쿠키
    - 클라이언트 브라우저에 저장
        - 보안에 취약한 측면 존재, 만료 시간 존재, 응답 시 쿠키를 세팅해서 전송
- 로그인 UI + 세션처리
    - express-session 설치 + 사용
        - _npm install express-session --save_
    - UI 적용
- Rule
    - 로그인 해서 서버 측에 (or JWT, passport 등) 인증이 되지 않은 유저는 무조건 로그인 페이지로 redirect
    - 로그인 성공
        => 세션 생성 (JWT 생성 등등)
        => 홈페이지(특정 페이지에서 세션 만료된 경우, 이상 없으면 원래 머물렀던 페이지로 이동)로 redirect

# 세션유지
- 서버 재가동 시 세션이 유지되게 처리
    - 개발 시에만 적용
    - 세션을 서버 메모리가 아닌 파일에 저장
        - _npm i session-file-store --save_

# passport 적용
- 