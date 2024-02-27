const Sequelize = require('sequelize');
//const { Sequelize } = require('./index');

module.exports = class Comment extends Sequelize.Model {
    // 클레스 맴버로 static 함수 정의 => 정적함수, 객체 생성 없이 바로 사용가능 클레스명.함수
    static init(sequelize){
        // 테이블 설계
        return super.init({
            comment      :{          // 실제글
                type:Sequelize.STRING(100),
                allowNull:false,
            },
            created_at    :{
                type:Sequelize.DATE, // datetime
                allowNull:false,
                defaultValue:Sequelize.NOW, // default now()
            }
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            modelName: 'Comment',
            tableName: 'comments',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }
    static associate(db){
        // 테이블 실제 생성, 테이블간 관계 설정, 할당
        // 1:N 관계에서 N쪽 belongsTo()
        // 나중에 할당이 되면 db 객체의 맴버로 설정된다고 전제
        db.Comment.belongsTo( db.User, { foreignKey:'commenter', targetKey:'id' });
    }
}