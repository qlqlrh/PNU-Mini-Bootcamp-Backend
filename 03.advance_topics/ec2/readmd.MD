# EC2 세팅
- 접속 후
- ``$ sudo apt-get update`` (생략, 아래 코드에 포함됨)
- ``$ sudo apt-get upgrade`` (생략, 아래 코드에 포함됨)
- node 주소 확인
    - https://deb.nodesource.com
    - 명령어 복사 후 실행
    ```
        sudo apt-get update && sudo apt-get install -y ca-certificates curl gnupg
        curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
        NODE_MAJOR=20
        echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
        sudo apt-get update && sudo apt-get install nodejs -y
    ```
- 소스 배포 (4가지 옵션 O)
    - ftp로 업로드
    - git clone
    - docker 컨테이너 생성
    - ci/cd로 구성
        - git 구성, 프로젝트 세팅
        - STEP0 :
            - github 로그인
            - 개별 PC에 여러 git 계정이 있다면, github client 사용 추천
        - STEP1 : CI 과정
            - 개발 -> commit -> push -> git에 업데이트됨 -> gitaction 작동 -> step별 검즘
        - STEP2 : CD 과정
            - AWS 세팅 -> 인증 추가 -> 코드에 필요파일 구성 -> STEP1에서 STEP2(배포단) 연결되도록 추가 구성
            - 사용 서비스 : IAM, s3, codedeploy, cloud9/ec2 
        => 코드를 수정하고 git에 올리면 서비스에도 바로 반영됨!