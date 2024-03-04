import instance from '@/http/index.js'

//获取产品类别和总价的图
export const getCategoryAndNumber = () =>{
    return instance({
        url:'/ov/getCategoryAndNumber',
        method:'POST',
    })
}
//管理员和用户对比图
export const getAdminAndNumber = () =>{
    return instance({
        url:'/ov/getAdminAndNumber',
        method:'POST',
    })
}
//获取不同消息等级和等数量
export const getLevelAndNumber = () =>{
    return instance({
        url:'/ov/getLevelAndNumber',
        method:'POST',
    })
}
//每一天登陆的人数
export const getDayAndNumber = () =>{
    return instance({
        url:'/ov/getDayAndNumber',
        method:'POST',
    })
}