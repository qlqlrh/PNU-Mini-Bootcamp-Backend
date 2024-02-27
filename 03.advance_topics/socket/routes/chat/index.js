const { custom_prompt, query } = require('../../openai');

// 서버 측 채팅 서버, 챗봇의 메인 코드
exports.createChatServer = server => {
    // 모듈 가져오기
    // http 서버를 넣어서 소켓 통신이 가능한 객체를 획득(생성)
    const io = require('socket.io')( server ); // 클로저, 함수 안의 함수 느낌
    
    // 서버 측에서 미리 방을 생성하여 제공 => 배열
    const GPT_ROOM_NAME = 'AI존(챗봇)';
    const rooms = ['대기실', '아시아존', '북미존', GPT_ROOM_NAME];
    
    // io로부터 이벤트를 등록
    io.on('connection', socket => {
        // 클라이언트가 접속 -> connection 발동 -> 접속한 소켓을 획득 -> 콜백함수 호출(소켓 전달)
        console.log( '서버 : 클라이언트가 한 명 접속하였다.' );
        
        // 방 입장 시 멘트 출력
        socket.on('cs_send_nname', (nickname, date) => { // 시간차가 있다 == 콜백을 걸어야 한다.
            // 사용자가 접속하면 -> 특정 room으로 접속 시킴 , 소켓에 개인정보를 기록
            console.log( `${nickname}님이 접속하셨습니다. - ${date}` )
            // 1. 접속한 유저의 정보를 socket에 추가
            socket.nickname = nickname; // socket이 객체라서 이렇게 추가 가능
            // 2. socket에 현재 속한 방정보를 소켓에 추가(임의로 rooms[0])
            socket.room = rooms[0];
            // 3. socket에 현재 방정보를 가지고 join
                // 접속한 유저를 방에 조인
            socket.join( socket.room );
            // 4. 방 안 원래 멤버들(현재 접속 중인 멤버들)에게 방송, 당사자 제외하고!
            socket.broadcast.to( socket.room )
            .emit('sc_send_msg', '관리자', `${socket.nickname}님이 입장하였습니다.`, new Date());
            // 5. 접속한 당사자에게 환영 메시지 전송 (1명한테 쏘는 건 socket.emit)
            socket.emit('sc_send_msg', '관리자', `${socket.nickname}님 환영합니다.`, new Date());
            // 6. 전체 방 목록 전송
            // console.log( rooms );
            socket.emit('sc_send_roominfo', rooms, socket.room);
        } );
        // 유저가 메시지를 보내면
        // 메시지를 보낸 유저와 같은 방에 있는 모든 유저에게 방송 (모든 유저에게 쏘는 건 io.emit)
        socket.on('cs_send_msg', (msg, date) => {
            console.log( '클라이언트가 보낸 메시지', msg );
            io.sockets.in( socket.room ).emit('sc_send_msg', socket.nickname, msg, new Date());
            if ( socket.room === GPT_ROOM_NAME ) {
                // TODO openai가 대답
                query( custom_prompt( msg) )
                .then( res => socket.emit('sc_send_msg', res.message.role, res.message.content, new Date()) )
                .catch( err => {
                    socket.emit('sc_send_msg', '관리자', '잠시 후에 다시 이용해주세요', new Date())
                })
                // socket.emit('sc_send_msg', 'AI', msg, new Date());
            }    
        });
        // 방 번경 요청
        socket.on('cs_send_roomchange', newRoom => {
            // 1. 기존 방에서 퇴장
            socket.leave( socket.room );
            // 2. 이 사실은 기존 방 멤버들에게 방송
            socket.broadcast.to( socket.room )
            .emit('sc_send_msg', '관리자', `${socket.nickname}님이 퇴장하였습니다.`, new Date());
            // 3. 소켓에 기록된 방 정보를 새로운 방 정보로 변경
            socket.room = newRoom;
            // 4. 새로운 방으로 join
            socket.emit('sc_send_clear');
            socket.join( socket.room );
            // 5. 새로운 방 멤버들에게 방송
            socket.broadcast.to( socket.room )
            .emit('sc_send_msg', '관리자', `${socket.nickname}님이 입장하였습니다.`, new Date());
            // 6. 나한테로 환영 메시지 방송
            if( newRoom === GPT_ROOM_NAME ) {
                socket.emit('sc_send_msg', 'AI', `${socket.nickname}님 무엇을 도와드릴까요?`, new Date());
            } else {
                socket.emit('sc_send_msg', '관리자', `${socket.nickname}님 환영합니다.`, new Date());
            }
            // 7. 방 정보 전송
            socket.emit('sc_send_roominfo', rooms, socket.room);
        })
    })
};