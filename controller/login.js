/**
 * @Author: hejianfang
 * @Description:
 * @date 2019-10-29
 * @Varsion: 1.0
 * @Last modified by: hejian
 * @Last modified time: 2019-10-29
 */
const Users = require('../dataBase/modal/user');
const setToken = require('../public/token/index.js')
    // 注册接口
const register = async(ctx) => {
    let { username, email, pwd } = ctx.request.body;
    let data = await Users.findOne({ email });
    if (data) {
        ctx.body = { code: 400, message: '已经注册' }
    } else {
        let avatar = "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3289761550,697278018&fm=27&gp=0.jpg";
        let user = new Users({ username, email, pwd, avatar });
        let res = await user.save();
        if (res) {
            ctx.body = { code: 200, message: '注册成功' }
        } else {
            ctx.body = { code: 400, message: '注册失败' }
        }
    }
};
// 登录接口
const login = async ctx => {
    let { username, password, autoLogin } = ctx.request.body;
    let res = await Users.findOne({ username });
    if (res) {
        let { avatar, createdAt, updatedAt, pwd, _id } = res;
        if (password !== pwd) {
            ctx.body = { code: 400, msg: '密码不正确' }
        } else {
            setToken.setToken(username, _id, autoLogin).then(res => {
                ctx.body = { code: 200, msg: '登录成功', data: { token: res } }
            })
        }
    } else {
        ctx.body = { code: 400, msg: '用户不存在，请联系管理员开通用户！' }
    }
};
// 是否登录
const isLogin = async ctx => {
    let myInfo = ctx.state;
    if (!myInfo) {
        ctx.body = {
            code: 200,
            data: false
        }
    } else {
        ctx.body = {
            code: 200,
            data: true
        }
    }
}
module.exports = {
    register,
    login,
    isLogin
};