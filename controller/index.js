/**
 * @Author: hejianfang
 * @Description:
 * @date 2019-10-29
 * @Varsion: 1.0
 * @Last modified by: hejian
 * @Last modified time: 2019-10-29
 */
const path = require('path');
const fs = require('mz/fs');
const Router = require('koa-router')
const router = new Router({
    prefix: '/api', // 统一前缀，接口全部为 /api/xxx 格式
});

const addControllers = (dir) => {
    //读取控制器所在目录所有文件
    let files = fs.readdirSync(path.join(__dirname, dir));
    //过滤出 .js 文件
    let js_files = files.filter(f => {
        return f.endsWith('.js') && !f.startsWith('index');
    });
    //遍历引入控制器模块并处理 路径-方法 的映射
    js_files.forEach(f => {
        //引入控制器模块
        let mapping = require(path.join(__dirname, dir, f));
        Object.keys(mapping).forEach(key => {
            router.all('/' + key, mapping[key]); // router.all是允许所有的访问方式，如果需要限定则改为指定方式即可
        });
    });
}
addControllers(''); // 引入当前目录的控制器
module.exports = router;
