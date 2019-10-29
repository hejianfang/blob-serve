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
  let loginUser = ctx.request.body;
  await Users.findOne({'email': loginUser.email}).then(async data => {
    if (data) {
      ctx.body = {
        code: 400,
        message: '已经注册'
      }
    } else {
      let user = new Users({
        username: loginUser.username,
        email: loginUser.email,
        pwd: loginUser.pwd,
      });
      await user.save().then(data=>{
        ctx.body={
          code : 200,
          message : '成功',
          data
        }
      }).catch(err=>{
        ctx.body={
          code : 300,
          message : '不成功'
        }
      });
    }
  }).catch(err => {
    ctx.body={
      code : 500,
      message : '失败'
    }
  })
};

module.exports = {
  register
};
