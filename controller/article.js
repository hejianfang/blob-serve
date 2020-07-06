/**
 * @Author: hejianfang
 * @Description: 文章增删改查
 * @date 2020-06-05
 * @Varsion: 1.0
 * @Last modified by: hejian
 * @Last modified time: 2020-06-05
 */
const Article = require('../dataBase/modal/article');
// 添加草稿或者正式文章
const addArticle = async (ctx) => {
  let { name, author, keywords, cover, intro, articleType, original, tag, level, content } = ctx.request.body;
  let tempArticle = null;
  tempArticle = new Article({ name, author, keywords, cover, intro, articleType, original, tag, level, content })
  try {
    let res = await tempArticle.save()
    if (res) {
      ctx.body = { code: 200, msg: '发布或保存草稿成功', data: { id: res.id } }
    } else {
      ctx.body = { code: 400, msg: '发布或保存草稿失败' }
    }
  } catch (e) {
    ctx.body = { code: 403, msg: e }
  }
}
// 获取文章分页列表
const articleListPages = async (ctx) => {
  // 获取文章总数量
  const total = await Article.countDocuments()
  // 分页数据
  let { page, size, state, searchName } = ctx.request.query;//
  page = Number(page);//当前第几页
  size = Number(size);//每页显示的记录条数
  // 定义搜索条件
  let conditions = {
    $and: []
  }
  if (state) {
    conditions.$and.push({ $or: [{ state }] })
  }
  if (searchName) {
    const reg = new RegExp(searchName, 'i')
    conditions.$and.push({
      $or: [
        { name: { $regex: reg } },
        { intro: { $regex: reg } },
        { keywords: { $regex: reg } },
      ]
    })
  }
  if (!conditions.$and.length) {
    conditions = {}
  }
  let result = await Article.find(conditions).limit(size).skip((page - 1) * size)
  let loadMore = (total - (page - 1) * size) > size ? true : false
  ctx.body = {
    code: 200,
    total,
    loadMore,
    data: {
      list: result
    }
  }
}
// 根据id获取文章详情--管理端
const getArticleDetail = async ctx => {
  let {id} = ctx.request.query
  let result = await Article.findOne({id})
  if (result) {
    ctx.body = {
      code: 200,
      data: result
    }
  }
}
module.exports = {
  addArticle,
  articleListPages,
  getArticleDetail
}
