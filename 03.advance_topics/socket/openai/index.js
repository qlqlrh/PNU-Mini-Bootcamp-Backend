const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: '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' });

let test_prompt = `오늘 미국 연준에서 금리를 인하하지 않고 동결되었다. 이로 인해 나스닥이 2% 하락하였다.
이에 따른 향후 미국주식 시장의 전망을 해줘

3가지로 간단 명료하게 요약해줘
`

const custom_prompt = prompt => {
    return [        
        { 
            role: "system", // 페르소나 부여
            content: "You are a helpful assistant." // 구체적인 사전 내용 통보 -> 단기기억/장기기억 => 저장된 대화 내용에서 가져와서 세팅(파이어스(백터디비), 랭체인)
        },
        {
            role: "user",   // 사용자 
            content: prompt // 채팅메시지, 프럼프트, 질의 ....
        }
    ]
}

const query = async (prompt) => {
    const completion = await openai.chat.completions.create({
        // 전체적으로는 영어로 프럼프트를 구성, 페르소나 부여하는게 더 정확하다
        // 페르소나 부여, GPT에서 성격, 컨셉, 역활등등 부여
        // messages => 채팅방식으로 질의 -> prompt 항목 x => 향후방식은 채팅방식 업그레이드
        messages: prompt,
        model: "gpt-3.5-turbo",        
        temperature: 0,  // 무작위성, 0:정답있다. 1에 가까울수록 창의도가 올라감
        max_tokens: 500  // 500 토큰 이내로 답변해줘
    });
    console.log(completion.choices[0]);
    return completion.choices[0]
}

query( custom_prompt(test_prompt) )
.then( res => console.log( res ) )
.catch( err => console.log( err ))

// res.message.content
// res.message.role

module.exports = {
    custom_prompt,
    query
}