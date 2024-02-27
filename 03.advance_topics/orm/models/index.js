'use strict';

const Sequelize = require('sequelize'); // ORM 처리용 모듈 가져오기
const User = require('./users');
const Comment = require('./comment');

const env = process.env.NODE_ENV || 'development'; // 현재 서버 모드 가져오기 (개발용/테스트용/배포용)
// node에서 제공하는 전역 변수들 바로 사용 가능 (_xxxxx)
// 구성객체['development']
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize; // 디비 접속용
db.Sequelize = Sequelize; // 테이블 생성용, API 사용

// 테이블 생성(없다면), 테이블과 객체 연결
db.User = User;
db.Comment = Comment;

// 테이블 생성
User.init( sequelize );
Comment.init( sequelize );

// 테이블간 연결 할당
User.associate( db );
Comment.associate( db );

module.exports = db;
