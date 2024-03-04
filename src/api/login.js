import instance from '@/http/index.js'

//注册接口
export const register = data =>{
    const {
        account,
        password,
    } = data
    return instance({
        url:'/api/register',
        method:'POST',
        data:{
            account,
            password
        }
    })
}

//登录接口
export const login = data =>{
    const {
        account,
        password,
    } = data
    return instance({
        url:'/api/login',
        method:'POST',
        data:{
            account,
            password
        }
    })
}

//忘记密码验证
export const verify = data =>{
    const {
        account,
        email,
    } = data
    return instance({
        url:'/user/varifyAccountAndEmail',
        method:'POST',
        data:{
            account,
            email
        }
    })
}
//密码重置
export const rePassword = data =>{
    const {
        id,
        newPassword
    } = data
    return instance({
        url:'/user/changePasswordInlogin',
        method:'POST',
        data:{
            id,
            newPassword
        }
    })
}

// export const returnMenuList = id =>{
//     return instance({
//         url:'/api/returnMenuList',
//         method:'POST',
//         data:{
//             id,
//         }
//     })
// }