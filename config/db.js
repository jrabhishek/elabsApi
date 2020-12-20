const Sequelize = require("sequelize");
const sequelize = new Sequelize("sql12383155", "sql12383155", "UtkK3xHEdr", {
  host: "sql12.freesqldatabase.com",
  dialect: "mysql",
  logging: true
});
//const sequelize = new Sequelize('sqlite:elabs.db');

// const sequelize = new Sequelize('d8jdid3lo4jlcd','jgxmpjrwvuwydy','a2d7125605031eca9320725ef4f1aa9d4be27ac1493cc0a89333208df045de3c',{
// 	host: 'ec2-23-21-13-88.compute-1.amazonaws.com',
// 	dialect: 'postgres'
// })
//sql12383155
//sql12383155

// const sequelize = new Sequelize(
//   "postgres://rfgmyblwqlxhjt:cbf252808c4d10b6302e0772d6eb802d69c2b171406bbe04d77c07d21e602ca1@ec2-52-203-98-126.compute-1.amazonaws.com:5432/d2j68q9rfgttrj"
// );
module.exports = sequelize;
