import instance from '@/http/index.js'

//发布消息
export const publishMessage = data =>{
    const {
        message_title,
        ...message_level
    } = data
    return instance({
        url:'/msg/publishMessage',
        method:'POST',
        data:{
            message_title,
            ...message_level
        }
    })
}
//获取公司的消息
export const companyMessageList = () =>{
    return instance({
        url:'/msg/companyMessageList',
        method:'POST',
    })
}
//获取系统的消息
export const systemMessageList = () =>{
    return instance({
        url:'/msg/systemMessageList',
        method:'POST',
    })
}
//编辑公告
export const editMessage = data =>{
    const {
        message_title,
        ...id
    } = data
    return instance({
        url:'/msg/editMessage',
        method:'POST',
        data:{
            message_title,
            ...id
        }
    })
}

////通过部门进行筛选
export const searchMessageBydepartment = message_publish_department =>{
    return instance({
        url:'/msg/searchMessageBydepartment',
        method:'POST',
        data:{
            message_publish_department,
        }
    })
}
//通过发布的当即进行筛选
export const searchMessageByLevel = message_level =>{
    return instance({
        url:'/msg/searchMessageByLevel',
        method:'POST',
        data:{
            message_level,
        }
    })
}

//获取公告系统消息
export const getMessage = id =>{
    return instance({
        url:'/msg/getMessage',
        method:'POST',
        data:{
            id,
        }
    })
}
// 更新点击率
export const updateClick = (message_click_number,id) =>{
    return instance({
        url:'/msg/updateClick',
        method:'POST',
        data:{
            message_click_number,id
        }
    })
}
//初次删除，第一次额删除就会在回收站
export const firstDelete = id =>{
    return instance({
        url:'/msg/firstDelete',
        method:'POST',
        data:{
            id
        }
    })
}
//获取回收站的列表
export const recyleList = () =>{
    return instance({
        url:'/msg/recyleList',
        method:'POST',
    })
}

//还原操作
export const recover = id =>{
    return instance({
        url:'/msg/recover',
        method:'POST',
        data:{
            id
        }
    })
}
//最后的删除的操作
export const deleteMessage = id =>{
    return instance({
        url:'/msg/deleteMessage',
        method:'POST',
        data:{
            id
        }
    })
}
//获取公司总长
export const getCompanyMessageLength = () =>{
    return instance({
        url:'/msg/getCompanyMessageLength',
        method:'POST',
    })
}
//获取系统消息总长
export const getSystemMessageLength = () =>{
    return instance({
        url:'/msg/getSystemMessageLength',
        method:'POST',
    })
}
//返回公司公告的消
export const returnCompanyListData = pager =>{
    return instance({
        url:'/msg/returnCompanyListData',
        method:'POST',
        data:{
            pager
        }
    })
}
//返回系统消息的消
export const returnSystemListData = pager =>{
    return instance({
        url:'/msg/returnSystemListData',
        method:'POST',
        data:{
            pager
        }
    })
}
//回收站的总长度
export const getRecyleMessageLength = () =>{
    return instance({
        url:'/msg/getRecyleMessageLength',
        method:'POST',
    })
}
//返回回收站的数据
export const returnRecycleListData = pager =>{
    return instance({
        url:'/msg/returnRecycleListData',
        method:'POST',
        data:{
            pager
        }
    })
}