const Sequelize = require('sequelize');
//const { Sequelize } = require('./index');

module.exports = class User extends Sequelize.Model {
    // 클레스 맴버로 static 함수 정의 => 정적함수, 객체 생성 없이 바로 사용가능 클레스명.함수
    static init(sequelize){
        // 테이블 설계
        // 1번 인자 : 테이블 칼럼 상세 설정
        //    - 기본 칼럼 => id 자동 추가, 별도 설정 없이
        // 2번 인자 : 테이블명, 메타 정보들 (인코딩, 자동 추가 칼럼에 대한 설정, 모델명, ...)
        return super.init({
            email         :{
             type:Sequelize.STRING(32), // varchar(32)
             allowNull:false,
             unique:true, // userid 개념으로 고유하게 설정
            },
            nick          :{
             type:Sequelize.STRING(32),
             allowNull:false,
             unique:true,
            },
            password      :{
             type:Sequelize.STRING(128),
             allowNull:false,
            },
            comment      :{
             type:Sequelize.TEXT, // 65535
             allowNull:true,
            },
            created_at    :{
             type:Sequelize.DATE, // datetime
             allowNull:false,
             defaultValue:Sequelize.NOW, // default now()
            } 
         },{
            sequelize, // 시퀄즈 객체 삽입
            timestamps:false,  // true 라면 createdAt, updatedAt을 자동 추가시킴
            // 단 수동으로 넣었다면 필요 없음
            underscored:false, // 기본값, 테이블명, 컬럼명등은 카멜케이스로 만듬 
            modelName: 'User', // 테이블과 매핑이 되는 객체의 클레스명
            tableName: 'users', // 실제 테이블명
            paranoid: false, // true 이면 deleteAt이 생성, 
            // row 데이터 삭제시 완전히 삭제 X, deleteAt에 시간 설정
            // 값이 null이면 삭제되지 않은 정보로 판단 => 향후 복구를 위해 수행
            charset: 'utf8', // 기본 인코딩
            collate: 'utf8_general_ci', // 로별 인코딩
        });
    }
    static associate(db){
        // 테이블 실제 생성, 테이블간 관계 설정, 할당
        // 1:N에서 1을 담당 hasMany()
        // 1:1 => 앞에테이블이 hsaOne(), 뒤에테이블 belongsTo()
        // n:M => n:belongsMany(), M:belongsMany()
        db.User.hasMany( db.Comment, {foreignKey:'commenter', sourceKey:'id'} );
    }
}