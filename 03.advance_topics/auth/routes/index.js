var express = require('express');
var router = express.Router();
const {
  isLogin,
  isNotLogin,
} = require('./cusMiddle');

/* GET home page. */
// isLogin => 로그인을 했을 때만 진입하겠다.
router.get('/', isLogin, function(req, res, next) {
  console.log( 'req.session', req.session );
  console.log( 'req.user', req.user );
  res.render('index', { title: 'Express' });
});

module.exports = router;
