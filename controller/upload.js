/**
 * @Author: hejianfang
 * @Description:
 * @date 2020-06-04
 * @Varsion: 1.0
 * @Last modified by: hejian
 * @Last modified time: 2020-06-04
 */
const path = require('path');
const fs = require('fs');
const uploadfiles = async ctx => {
  // 上传多个文件
  let remotefilePath = null;
  if (ctx.request.files['file']) {
    // 创建可读流
    const reader = fs.createReadStream(ctx.request.files['file']['path']);
    let filePath = `${path.resolve(__dirname, '../uploads')}/${ctx.request.files['file']['name']}`;
    remotefilePath = `http://${ctx.req.headers.host}/${ctx.request.files['file']['name']}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
  }
  if (remotefilePath) {
    ctx.body = {
      code: 200,
      data: { filePath: remotefilePath },
      msg: '上传成功'
    }
  } else {
    ctx.body = {
      code: 400,
      msg: '上传失败'
    }
  }
}
module.exports = {
  uploadfiles
}
