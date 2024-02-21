import instance from '@/http/index.js'

//注册接口
export const getAllSwiper = ()=>{
    return instance({
        url:'/set/getAllSwiper',
        method:'POST',
    })
}
//获取公司名称
export const getCompanyName= ()=>{
    return instance({
        url:'/set/getCompanyName',
        method:'POST',
    })
}
//修改公司的名字
export const changeCompanyName= (set_value)=>{
    return instance({
        url:'/set/changeCompanyName',
        method:'POST',
        data:{
            set_value
        }
    })
}
//修改公司的介绍
export const changeCompanyIntroduce= (set_text,set_name)=>{
    return instance({
        url:'/set/changeCompanyIntroduce',
        method:'POST',
        data:{
            set_text,
            set_name,
        }
    })
}
//修改单公司的介绍
export const getCompanyIntroduce= (set_name)=>{
    return instance({
        url:'/set/getCompanyIntroduce',
        method:'POST',
        data:{
            set_name
        }
    })
}
//修改所有公司的介绍
export const getAllCompanyIntroduce= ()=>{
    return instance({
        url:'/set/getAllCompanyIntroduce',
        method:'POST',
    })
}