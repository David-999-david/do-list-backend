const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,{
    host : dbConfig.HOST,
    dialect : dbConfig.dialect,
    pool : {
        max : dbConfig.max,
        min : dbConfig.min,
        acquire : dbConfig.acquire,
        idle : dbConfig.idle
    }
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.list = require('./List.model.js')(sequelize,Sequelize);

db.user = require('./User.model.js')(sequelize,Sequelize);

module.exports = db;