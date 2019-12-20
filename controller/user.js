const Users = require('../dataBase/modal/user');

const getMyInfo = async ctx => {
    let myInfo = ctx.state;
    if (myInfo) {
        let data = await Users.findOne({ _id: myInfo.user.userId });
        let { username, email, avatar, createdAt } = data;
        ctx.body = {
            code: 200,
            data: { username, email, createdAt, avatar }
        }
    }
}
module.exports = {
    getMyInfo
};