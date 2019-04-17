let crypto  = require("crypto");
module.exports = pwd=>{
    let md5 = crypto.createHash("md5");
    md5.update(pwd)
    return md5.digest("hex")
}