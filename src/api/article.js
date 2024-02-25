// 获取文章分类
import request from '@/utils/request.js'
export const artGetChannelsService = ()=> {
    return request.get('/my/cate/list')
}
// 添加文章分类
export const artAddChannelsService = (data) => {
    return request.post('/my/cate/add', data)
}
// 更新文章分类
export const artEditChannelsService = (data) => {
    return request.put('/my/cate/info',data)
}
// 删除文章
export const artDeleteChannelsService = (id) => {
    return request.delete('/my/cate/del', {params:{id}})
}
