/**
 * @Author: hejianfang
 * @Description:
 * @date 2019-10-29
 * @Varsion: 1.0
 * @Last modified by: hejian
 * @Last modified time: 2019-10-29
 */
const Users = require('../../dataBase/modal/user');
const register = async (ctx) => {
  let {username,email,pwd} = ctx.request.body;
  let data = await Users.findOne({email})
  if (data) {
    ctx.body = {code: 400, message: '已经注册'}
  } else {
    let user = new Users({username,email,pwd});
    let res = await user.save();
    if (res) {
      ctx.body = {code: 200, message: '注册成功'}
    } else {
      ctx.body = {code: 400, message: '注册失败'}
    }
  }
};
const login = async ctx => {
  let {username} = ctx.request.body;
  let res = await Users.findOne({username});
  if (res) {
    ctx.body = {code: 200, msg: '登录成功', data: {username}}
  } else {
    ctx.body = {code: 400, msg: '用户不存在，请先注册！'}
  }
};
module.exports = {
  register,
  login
};
