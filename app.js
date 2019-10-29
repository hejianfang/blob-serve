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
app.use(serve('./assets'));
// router
const router = require('./controller/index');
const bodyParser = require("koa-bodyparser");
app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods());


let server = app.listen(3000, function (){
  const host = server.address().address;
  const port = server.address().port;
  console.log('app start listening at http://%s:%s', host, port);
});
