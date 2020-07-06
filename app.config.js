/**
 * @Author: hejianfang
 * @Description:
 * @date 2020-06-04
 * @Varsion: 1.0
 * @Last modified by: hejian
 * @Last modified time: 2020-06-04
 */
const { argv } = require('yargs');
exports.MONGODB = {
  uri: `mongodb://127.0.0.1:${argv.dbport || '27017'}/blob`,
  username: argv.db_username || 'admin',
  password: argv.db_password || '123456',
}
