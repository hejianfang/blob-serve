const jwt = require('jsonwebtoken')

exports.setToken = async(userName, userId, autoLogin) => {
    let expiresIn = '2h'
    if (autoLogin) {
        expiresIn = '168h'
    }
    console.log(expiresIn)
    let token = await jwt.sign({ userName, userId }, 'my_token', { expiresIn })
    return token
}
exports.verToken = async(token) => {
    let myInfo = jwt.verify(token.split(' ')[1], 'my_token')
    return myInfo
}