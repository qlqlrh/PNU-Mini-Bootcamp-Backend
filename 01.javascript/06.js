/**
 * 콜백헬
 *  - 하나의 함수(모듈) 안에서 많은 콜백이 호출되면
 *  > 형태로 코드가 깊어지는 것
 *  - 해결방안
 *      - Promise
 *      - generator
 *      - async ~ await : 가장 많이 사용
 * #TODO 콜백헬, async, await, Promise, generator
 */
const fs = require('node:fs');

class Test {
    constructor () {
        this.file1 = './dir/a.txt';
        this.file2 = './dir/b.txt';
        this.file3 = './dir/c.txt';
    }
    // 기본 nodejs api를 이용하여 파일을 읽는다
    // 요구사항 : a.txt 읽고 -> 출력 -> b.txt 읽고 -> 출력 -> c.txt 읽고 -> 출력
    // 위의 요구사항을 처리할 수 있는 normal() 함수를 구현하시오
    normal() {
        // 콜백헬 샘플 : 비동기 작업이 연속적으로 진행, 앞의 결과를 뒤에서 사용하는 경우 
        fs.readFile(this.file1, (err, data) => {
            if (err) throw err;
            console.log( this.toStr( data ) );
            fs.readFile(this.file2, (err, data) => {
                if (err) throw err;
                console.log( this.toStr( data ) );
                fs.readFile(this.file3, (err, data) => {
                    if (err) throw err;
                    console.log( this.toStr( data ) );
                });
            });
        });
    }
    
    // 파일을 읽은 값을 원래 값으로 인코딩 처리
    toStr( data ) {
        return new String( data ).toString(); // cpp에서는 to_string( data )
    }

    // Promise 패턴
    // 비동기 상황을 Promise 객체로 구성하여
    // Promise ~ then을 이용하여 처리
    init_promise( filename ) {
        return new Promise(( cb ) => {
            // 비동기적인 내용 넣기 (파일 읽기)
            // err : 오류가 발생하면 값이 채워진다
            // data : 읽은 내용
            fs.readFile(filename, (err, data) => {
                cb( data );
            });
        });
    }
    test_promise() {
        // Promise ~ then 형식으로 사용
        // chaining 지원 : ().().(). ... 이런 식으로 연속적인 사슬형태로 코드가 전개됨
        this.init_promise( this.file1 )
        .then( ( data ) => {
            console.log( this.toStr( data ) ); // 읽은 내용 출력
            return this.init_promise( this.file2 );
        } )
        .then( ( data ) => {
            console.log( this.toStr( data ) );
            return this.init_promise( this.file3 );
        } )
        .then( ( data ) => {
            console.log( this.toStr( data ) );            
        } ) // 3번째 data 출력
    }

    // async ~ await (비동기 코드를 동기식으로 change! )
    // await 뒤에는 비동기 코드 사용 (여기서는 promise 활용)
    // await가 사용된 코드를 감싸는 함수에 async 표시
    async test_async_await() {
        // 코드를 동기식으로 (순차적으로) 작성하여 직관적으로 로직 구성 가능
        console.log( this.toStr( await this.init_promise( this.file1 ) ) ); // init_promise 안에 비동기 코드가 있음
        console.log( this.toStr( await this.init_promise( this.file2 ) ) ); // await : 결과 값이 return 될 때까지 기다려.
        console.log( this.toStr( await this.init_promise( this.file3 ) ) );
    }

    // generator ~ yield (응답할 때까지 대기)
    test_generator() {
        // 비동기 처리 구성
        // g : generator 객체
        function create_process( g, filename ) {
            fs.readFile( filename, (err, data) => {
                // generator 객체에서 제공하는 기능, 이전 단계가 완료되면 다음 단계로 전개하는 역할
                g.next( data );
            });
        }
        // 읽어야 될 파일 지역 변수로 구성
        const { file1, file2, file3 } = this; // 객체 구조 분해 ! (멤버변수와 이름 같아야 함)
        const toStr = data => new String( data ).toString();

        // generator 구성
        const g = ( function * () {
            console.log( toStr( yield create_process(g, file1) ) );
            console.log( toStr( yield create_process(g, file2) ) );
            console.log( toStr( yield create_process(g, file3) ) );
        })();
        g.next();
    }
}

// 객체 생성
const obj = new Test();
// obj.normal();
// obj.test_promise();
// obj.test_async_await();
obj.test_generator();

// (함수)() <-- 소괄호 2개 나오면 반응하기!! (즉각적으로 실행하는 구나~)
// 이 안에 있는 코드(함수)를 바로 실행해라
// 다른 코드와 변수, 함수명에 출동 없이 수행되도록 하는 역할
// 전역 변수, 전역 함수가 되지 않게 방지하는 역할
// IIFE (Immediately-invoked function expression)
console.log( (function t() { return 'hi' })() );
console.log( (function t(a, b, c) { return `${a}-${b}-${c}` })(1, 2) ); // 데이터 전달해서 수행

// generator
console.log( function * (){} );