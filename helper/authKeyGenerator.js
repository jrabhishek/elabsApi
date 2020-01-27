var CryptoJS = require("crypto-js");

function generateAuthKey(data) {
  var date = new Date();
  authKey =
    CryptoJS.SHA256(date.getTime().toString())
      .toString(CryptoJS.enc.Base64)
      .substring(0, 16) + `${data.substring(0, 4)}`;
  return authKey;
}
module.exports = {
  generateAuthKey
};
