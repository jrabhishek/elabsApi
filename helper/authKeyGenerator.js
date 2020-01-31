var CryptoJS = require("crypto-js");

String.prototype.hexEncode = function() {
  var hex, i;

  var result = "";
  for (i = 0; i < this.length; i++) {
    hex = this.charCodeAt(i).toString(16);
    result += hex;
  }

  return result;
};
function generateAuthKey(data) {
  var date = new Date();
  console.log(data);
  authKey = CryptoJS.SHA256(date.getTime().toString())
    .toString(CryptoJS.enc.Base64)
    .substring(0, 11);
  authKey = authKey.hexEncode() + `${data.substring(0, 2)}`;
  console.log(authKey);
  return authKey;
}
module.exports = {
  generateAuthKey
};
