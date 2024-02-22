import instance from '@/http/index.js'

//获取用户信息
export const getUserInfor = id=>{
    return instance({
        url:'/user/getUserInfo',
        method:'POST',
        data:{
            id
        }
    })
}

//修改性别
export const changeSex= (sex,id)=>{
    return instance({
        url:'/user/changeSex',
        method:'POST',
        data:{
            id,
            sex
        }
    })
}
//绑定图片地址跟账号
export const bind = (account,onlyId,url)=>{
    return instance({
        url:'/user/bindAccount',
        method:'POST',
        data:{
            account,
            onlyId,
            url
        }
    })
}

//修改密码
export const changePassword =(id,oldPassword,newPassword) =>{
    return instance({
        url:'/user/changePassword',
        method:'POST',
        data:{
            id,
            oldPassword,
            newPassword,
        }
    })
}
//修改姓名
export const  changeName = (name,id)=>{
    return instance({
        url:'/user/changeName',
        method:'POST',
        data:{
            id,
            name
        }
    })
}
//修改邮箱
export const changeEmail = (email , id)=>{
    return instance({
        url:'/user/changeEmail',
        method:'POST',
        data:{
            id,
            email
        }
    })
}

// -----------------------------------用户管理
//添加管理员
export const createAdmin = data=>{
    const {account,...identity} = data
    return instance({
        url:'/api/createAdmin',
        method:'POST',
        data: {
            account,
            ...identity,
        }
    })
}
//获取管理员列表
export const getAdminList = identity=>{
    return instance({
        url:'/api/getAdminList',
        method:'POST',
        data:{
            identity,
        }
    })
}
// 编辑管理员
export const editAdmin = data=>{
    const {id,...department} = data
    return instance({
        url:'/api/editAdmin',
        method:'POST',
        data:{
            id,
            ...department
        }
    })
}
////对管理员进型降职,参数id
export const changeIdentityToUser = id=>{
    return instance({
        url:'/api/changeIdentityToUser',
        method:'POST',
        data:{
            id,
        }
    })
}
//对用户进行赋权
export const changeIdentityToAdmin = (is,identity)=>{
    return instance({
        url:'/api/changeIdentityToAdmin',
        method:'POST',
        data:{
            id,
            identity
        }
    })
}
// 通过账号对用户进行搜索
export const searchUser = account=>{
    return instance({
        url:'/api/searchUser',
        method:'POST',
        data:{
            account,
        }
    })
}
//通过部门
export const searchUserDepartment = department=>{
    return instance({
        url:'/api/searchUserDepartment',
        method:'POST',
        data:{
            department,
        }
    })
}
//冻结用户
export const banUser = id=>{
    return instance({
        url:'/api/banUser',
        method:'POST',
        data:{
            id,
        }
    })
}
//解冻用户
export const hotUser = id=>{
    return instance({
        url:'/api/hotUser',
        method:'POST',
        data:{
            id,
        }
    })
}
// 获取冻结用户列表
export const getBanList = ()=>{
    return instance({
        url:'/api/getBanList',
        method:'POST',
    })
}
//删除用户的操作
export const deleteUser = (id,account)=>{
    return instance({
        url:'/api/deleteUser',
        method:'POST',
        data:{
            id,
            account
        }
    })
}
//获取对应身份的额总人数 identity
export const getAdminListLength = (identity)=>{
    return instance({
        url:'/api/getAdminListLength',
        method:'POST',
        data:{
            identity,
        }
    })
}
//返回数据
export const returnListData = (pager,identity)=>{
    return instance({
        url:'/api/returnListData',
        method:'POST',
        data:{
            pager,identity
        }
    })
}


//部门 设置
