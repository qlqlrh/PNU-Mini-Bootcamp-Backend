var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// TODO expression-session
const session = require('express-session');
let FileStore = require('session-file-store')(session);

// TODO orm 시퀄라이즈 객체 획득
const { sequelize } = require('./models');

// TODO passport 모듈 가져오기
const passport = require('passport'); // 순수 passport
const passportProc = require('./passport'); // 우리가 만든 함수

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

var app = express();
// TODO passport 모듈(함수) 실행
passportProc();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// TODO ORM 디비 접속
// 시퀄라이즈 디비 접속 시도
sequelize.sync({ force:false} )
.then( async ()=>{
  console.log('접속 성공, 이제부터 ORM 사용 가능')
})
.catch((err)=>{
  console.log( '접속오류', err)
})

// TODO cookieParser 위치 조정
// OS상에 해당 이름으로 된 키가 저장되어 있다면
app.use(cookieParser(process.env.SECRET));
app.use(session({
  /*
  secret: process.env.COOKIE_SECRET || 'goodluck', // 키는 해시값으로 차후 대체
  resave: false,
  saveUninitialized: true,
  //store: new FileStore(),
  //rolling: true,
  cookie: { 
    httpOnly: true,
    secure: true
  }
  */
  secret: process.env.COOKIE_SECRET || 'goodluck', // 키는 해시값으로 차후대체
  resave: false,
  saveUninitialized: false, // 꼭 false 속성으로 !!
  store:new FileStore(),
  cookie: {
    httpOnly:true,
    secure: false 
  }
}))

// TODO passport 객체를 express에 연동 (세팅 절차)
// express-session 등록 후 진행하는 코드!
app.use(passport.initialize()); // 패스포트 설정을 등록
app.use(passport.session());    // 설정 쿠키를 기반으로 deserializeUser가 call됨

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

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

module.exports = app;
