var express = require('express');
var router = express.Router();
const User = require('../models/users');
const Comment = require('../models/comment');

/* GET users listing. */
router.route('/')
.get( async (req, res, next) => {
  // 모든 회원 정보 로드 -> User -> I/O -> 예외상황 동반
  try {
    const users = await User.findAll()
    res.json( users )
  } catch (error) {
    // 오류 발생시 에러 처리 페이로 요청을 넘김
    next(error)
  }
})
.post( async (req, res, next) => {
  // 회원 가입 용도
  let {name, age, married, comment} = req.body
  try {
    const user = await User.create({
      name,
      age,
      married,
      comment
    });
    console.log( user )
    // DB에 물리적으로 새로운 리소스가 발생했다 -> 작업은 성공했다 -> 통상 201번 응답
    // POST, PUT
    res.status(201).json( user )
  } catch (error) {
    next(error)
  }  
});

module.exports = router;