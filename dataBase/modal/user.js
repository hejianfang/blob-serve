/**
 * @Author: hejianfang
 * @Description:
 * @date 2019-10-29
 * @Varsion: 1.0
 * @Last modified by: hejian
 * @Last modified time: 2019-10-29
 */
const { mongoose } = require('../config');
const autoIncrement = require('mongoose-auto-increment');
const userScheme = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  pwd: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
  },
  phone: {
    type: [String, Number]
  },
  type: [String, Number],
  introduce: String
}, { versionKey: false, timestamps: { createAt: "createTime", updateAt: "updateTime" } });
// 自增 ID 插件配置
userScheme.plugin(autoIncrement.plugin, {
  model: 'Users',
  field: 'id',
  startAt: 1,
  incrementBy: 1,
});
module.exports = mongoose.model("Users", userScheme, "user");
