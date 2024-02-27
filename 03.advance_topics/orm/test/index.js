const { sequelize } = require('../models');

// 시퀄라이즈 디비 접속 시도
sequelize.sync({ force: false })
.then( async () => {
    console.log('접속 성공, 이제부터 ORM 사용 가능');
} )
.catch( (err) => {
    console.log( '접속 오류', err );
} )