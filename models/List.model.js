module.exports = (sequelize, Sequelize) => {
    const List = sequelize.define('List',{
        title : {
            type : Sequelize.STRING
        },
        summary : {
            type : Sequelize.STRING
        },
        completed : {
            type : Sequelize.BOOLEAN
        }
            })
    return List;
}