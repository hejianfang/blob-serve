/**
 * @Author: hejianfang
 * @Description:
 * @date 2019-10-23
 * @Varsion: 1.0
 * @Last modified by: hejian
 * @Last modified time: 2019-10-23
 */
// koa
const Koa = require('koa');
require('./database/config');
const app = new Koa();
const serve = require('koa-static');
const koaJwt = require('koa-jwt');
const verToken = require('./public/token/index')
app.use(serve('./assets'));
// jwt
app.use(async(ctx, next) => {
    let token = ctx.header.authorization;
    if (token == 'undefined') {
        await next();
    } else {
        try {
            let data = await verToken.verToken(token);
            ctx.state = { data };
            await next();
        } catch (err) {
            await next();
        }
    }
})
app.use(async(ctx, next) => {
    return next().catch((err) => {
        if (401 == err.status) {
            ctx.status = 200;
            ctx.body = {
                code: 401,
                msg: '还未登录，请先登录！'
            }
        } else {
            throw err;
        }
    });
});

app.use(koaJwt({
    secret: 'my_token'
}).unless({
    path: ['/api/login'] //除了这个地址，其他的URL都需要验证
}));

// router
const router = require('./controller/index');
const bodyParser = require("koa-bodyparser");
app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods());


let server = app.listen(3000, function() {
    const host = server.address().address;
    const port = server.address().port;
    console.log('app start listening at http://%s:%s', host, port);
});