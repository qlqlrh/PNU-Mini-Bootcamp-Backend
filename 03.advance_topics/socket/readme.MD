# socket.io를 이용한 실시간 통신
- socket.io 사용
- socket은 전화기이다.
    - socket <---------------> socket (서버 포트를 리슨)
    - 채팅방 : 특정 공간에 모인 유저들에게 동시에 방송하는 트릭
        - 서버에서 하나의 공간(배열, 맵 등등)에 소켓을 모아넣고 방송
    - 실시간 통신, 요청과 응답의 개념X, 쌍방간 푸시 가능
- 예시
    - 채팅, 챗봇 (응답 기능 제공)
- 종류
    - web socket : html5 표준에서 제공, 보통 80 포트 사용
    - socket.io  : thrid part lib, 백엔드 서버의 포트 사용
        - express는 3000번 사용
# 설치
- ``$ npm i socket.io --save``


# openai 설치
- 패키지 설치
    - ``$ npm i openai --save``
- API KEY 설정
    - OS 레벨로 진행
    - window
        - 현재 node를 작동 중인 터미널에서 아래 내용 수행
        - 영구적인 설정은 OS 레벨의 환경 변수에 등록
        - setx OPENAI_API_KEY "sk..."