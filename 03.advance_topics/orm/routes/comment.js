var express = require('express');
var router = express.Router();
const User = require('../models/users');
const Comment = require('../models/comment');

// get : 특정 유저의 모든 글 조회
// post : 특정 유저의 글 등록
// patch : 특정 유저의 특정 글 수정(부분 수정(글내용))
// delete : 특정 유저의 특정 글 삭제
// 특정 글 삭제
router.route('/:id/comm')
.get(     async (req, res, next)=>{
  const { id } = req.params
  console.log( "id", id );
  // 특정 id를 가진 유저가 작성한 모든글을 가져오시오
  const comments = await Comment.findAll({
    include:{
      model:User,
      where:{ id } // commenter: id라고 하니까 에러뜸 => ????
    }
  })
  console.log( '작성된글 목록 ', comments )
  res.json( comments )
})
.post(    async (req, res, next)=>{
  // 특정 id를 가진 유저가 작성한 글을 등록
  let {id} = req.params
  let {comment} = req.body
  try {
    const commentObj = await Comment.create({
      commenter : id,
      comment
    });
    console.log( commentObj )
    // DB에 물리적으로 새로운 리소스가 발생했다 -> 작업은 성공했다 -> 통상 201번 응답
    // POST, PUT
    res.status(201).json( commentObj )
  } catch (error) {
    console.log( error )
    next(error)
  }
})
.patch(   async (req, res, next)=>{
  let { id } = req.params
  let { comment } = req.body
  try {
    // 결과는 영향을 받은 row의 수를 [] 형태로 반환, 0이면 수정 안 됨, 1이면 1개 수정됐다는 뜻
    const result = await Comment.update({ comment }, { where:{ id } })  // {어떤 글}, {어떤 사용자}
    res.json( result )
  } catch (error) {
    next(error)
  }  
})
.delete(  async (req, res, next)=>{
  let { id } = req.params
  try {
    // id는 특정 유저의 특정번호
    const result = await Comment.destroy( { where:{ id } } )
    res.json( result )
  } catch (error) {
    next(error)
  }  
})



module.exports = router;