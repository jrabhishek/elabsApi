const Sequelize = require("sequelize");
const sequelize = new Sequelize("kiitelabs_db", "root", "", {
  host: "localhost",
  dialect: "mysql"
});

// const sequelize = new Sequelize('d8jdid3lo4jlcd','jgxmpjrwvuwydy','a2d7125605031eca9320725ef4f1aa9d4be27ac1493cc0a89333208df045de3c',{
// 	host: 'ec2-23-21-13-88.compute-1.amazonaws.com',
// 	dialect: 'postgres'
// })

// const sequelize = new Sequelize('postgres://jgxmpjrwvuwydy:a2d7125605031eca9320725ef4f1aa9d4be27ac1493cc0a89333208df045de3c@ec2-23-21-13-88.compute-1.amazonaws.com:5432/d8jdid3lo4jlcd')
module.exports = sequelize;
