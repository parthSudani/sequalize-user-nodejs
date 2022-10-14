const Sequelize = require("sequelize");
const dotenv = require('dotenv')
dotenv.config()
const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    operatorsAliases: 0,
    logging: false
});
sequelize.sync({ force: false }).then(() => {});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./userSchema')(sequelize, Sequelize)
db.device = require('./devideSchema')(sequelize, Sequelize)



module.exports = db