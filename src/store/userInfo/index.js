import { defineStore} from "pinia";

import {getUserInfor} from '@/api/userInfo.js'
export const useUserInfoStore = defineStore('userInfo',{
    state:()=>{
        return  {
            imageUrl:'',
            name:'',
            sex:'',
            department:'',
            identity:'',
            account:'',
            email:'',
            id:''
        }
    },
    actions:{
        async userInfo(id){
            const res = await getUserInfor(id)
            console.log(res)
            this.imageUrl = res.image_url
            this.name = res.name
            this.sex = res.sex
            this.department = res.department
            this.identity = res.identity
            this.account = res.account
            this.email = res.email
        }
    }
},{
    persist:{
        enabled:true,//存储全部数据
        key:'userInfo',//这是关键字
        Storage:localStorage,
    }
})