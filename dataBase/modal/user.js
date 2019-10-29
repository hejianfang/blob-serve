/**
 * @Author: hejianfang
 * @Description:
 * @date 2019-10-29
 * @Varsion: 1.0
 * @Last modified by: hejian
 * @Last modified time: 2019-10-29
 */
const mongoose = require('mongoose');
const userSchame = new mongoose.Schema({
  username:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  pwd:{
    type: String,
    required: true
  },
  avatar: {
    type: String,
  }
},{versionKey: false, timestamps: {createAt: "createTime", updateAt: "updateTime"}});

let Users = mongoose.model("Users",userSchame,"user");

module.exports = Users;
