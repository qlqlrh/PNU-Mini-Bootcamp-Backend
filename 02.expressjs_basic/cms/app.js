// #TODO 엔트리포인트, app.js, 각종 설정, 라우팅 설정, 정적위치 지정, 템플릿엔진설정

// 필요한 라이브러리 가져오기
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// TODO express-session 적용 파트
const session = require('express-session');
let FileStore = require('session-file-store')(session);

// 커스텀으로 구현한 모듈 ( 라우팅 처리, 비즈니스 로직 구현, DB )
// " 라우팅 " => 클라리언트가 요청 -> url -> url 해석 -> 누가 처리할지 할당
// 업무별로 세분화 하는 느낌 -> 메인 서비스, 고객 인증, cs, 메뉴별 상세 기능, ... => 업무 할당st
// var indexRouter = require('./routes/index');
var indexRouter = require('./routes'); // index 지워도 잘 돌아감! (index가 default라서~)
var usersRouter = require('./routes/users');
// 게시판을 위한 board 라우팅을 추가
var boardRouter = require('./routes/board');

// 객체 생성 express() => 내부적으로 객체를 생성해서 return 할 것
var app = express();

// TODO session 구동을 위한 기본 설정
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'asdfsdgfxhcghvbjnkiyftcbjcgx', // 해시값, 쿠키 암호값, 암호화 시 재료값, 키
  resave: false,
  saveUninitialized: true, // 세션에 저장할 내용이 없을 때라도 세션을 저장할 것인가?
  store: new FileStore(), // 세션 저장소를 메모리(기본) -> 파일(스토리지)
  rolling: true,
  cookie: { 
    maxAge: 600000,
    httpOnly: true,
    // secure: true
  } // 코드를 풀면 세션이 저장됨
}))

// 템플릿 엔진, 템플릿 파일 위치 지정
// view engine setup
// app.set( 키, 값 ) => 환경변수로 확장 가능 => 전역적으로 사용 가능하다
app.set('views', path.join(__dirname, 'views')); // 자료구조 Map 느낌?
app.set('view engine', 'ejs');

// 사용기능 설정 개발, json 처리, url 파싱, 쿠키 파싱 기능 사용하는 것으로 설정
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 정적 폴더 위치 지정
console.log( `__dirname ${__dirname}`); // node에서 제공하는 사전 정의된 전역 변수
// 현재 위치/public 으로 경로를 동적 구성해서 정적 위치 지정
app.use(express.static(path.join(__dirname, 'public')));

// [ express 3.x -> 4.x 추가된 기능 ]
// 블루프린트, 라우팅별 prefix 부여, url을 기본 경로로 설정

// http://도메인/users/x, http://도메인/users/xx, http://도메인/users, ...
// 로그인 등, 세션 없이도 접근 가능한 페이지만 이쪽으로 배치
app.use('/users', usersRouter);

// http://도메인/x, http://도메인/xx, http://도메인, ... => 이런 경로를 다 여기서 만듦!
// 세션 처리 => 진입로에서 요청을 분석해서 특정 prefix를 ~ ??
app.use('/', indexRouter);

// 게시판을 위한 prefix 추가
app.use('/board', boardRouter);

// 에러 핸들링 등록
// 주요 에러 코드(1XX, 2XX, 3XX, 4XX, 5XX)에 대응하는 함수를 공통적으로 구성, 필요 시 추가
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 객체 모듈화 -> 모듈의 대표 지정
module.exports = app;
