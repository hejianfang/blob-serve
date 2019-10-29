/**
 * @Author: hejianfang
 * @Description:
 * @date 2019-10-29
 * @Varsion: 1.0
 * @Last modified by: hejian
 * @Last modified time: 2019-10-29
 */
const Router = require('koa-router');
const router = new Router({
  prefix: '/api', // 统一前缀，接口全部为 /api/xxx 格式
});

const login = require('./login/login');
Object.keys(login).forEach(key => {
  router.all('/' + key, login[key]);   // router.all是允许所有的访问方式，如果需要限定则改为指定方式即可
});

module.exports = router;
