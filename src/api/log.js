import instance from '@/http/index.js'
//登录日志
export const loginLog = data =>{
    const {
        account,
        name,
        email
    } = data
    return instance({
        url:'/lLog/loginLog',
        method:'POST',
        data:{
            account,
            name,
            email
        }
    })
}
//获取登录日志的列表
export const loginLogList = () =>{
    return instance({
        url:'/lLog/loginLogList',
        method:'POST',
    })
}
//清空登录日志
export const clearLogList = () =>{
    return instance({
        url:'/lLog/clearLogList',
        method:'POST',
    })
}
//操作的日志
export const operationLog = data =>{
    const {operation_person,operation_content, operation_level} = data
    return instance({
        url:'/oLog/operationLog',
        method:'POST',
        data:{
            operation_person,operation_content, operation_level
        }
    })
}
//获取操作记录的表
export const operationLogList = () =>{
    return instance({
        url:'/oLog/operationLogList',
        method:'POST',
    })
}
//清空操作日志
export const clearoperationLogList = () =>{
    return instance({
        url:'/oLog/clearLogList',
        method:'POST',
    })
}
//返回登录最近的十条数据
export const searchLoginList = (account) =>{
    return instance({
        url:'/lLog/searchLoginList',
        method:'POST',
        data:{
            account,
        }
    })
}
//返回操作的最近十条数据
export const searchOperationList = (operation_person) =>{
    return instance({
        url:'/oLog/searchOperationList',
        method:'POST',
        data:{
            operation_person,
        }
    })
}

