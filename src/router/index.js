import {createRouter,createWebHashHistory} from "vue-router";

const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:"/",
            redirect:'/menu'
        },
        {
            name:'login',
            path:'/login',
            component:()=>import('@/views/login/index.vue')
        },
        {
            name:'menu',
            path:'/menu',
            redirect:'/home',
            component:()=>import('@/views/menu/index.vue'),
            children:[
                {
                    name:'home',
                    path:'/home',
                    component:()=>import('@/views/home/index.vue')
                },
                {
                    name:'set',
                    path:'/set',
                    component:()=>import('@/views/set/index.vue')
                },
                {
                    name:'overview',
                    path:'/overview',
                    component:()=>import('@/views/overView/index.vue')
                },
                {
                    name:'product_manage',
                    path:'/product_manage',
                    component:()=>import('@/views/user_manage/product_manage/index.vue')
                },
                {
                    name:'product_manage',
                    path:'/product_manage',
                    component:()=>import('@/views/user_manage/product_manage/index.vue')
                },
                {
                    name:'message_manage',
                    path:'/message_manage',
                    component:()=>import('@/views/user_manage/message_manage/index.vue')
                },

                {
                    name:'user_list',
                    path:'/user_list',
                    component:()=>import('@/views/user_manage/user_list/index.vue')
                },
                {
                    name:'users_manage',
                    path:'/users_manage',
                    component:()=>import('@/views/user_manage/users_manage/index.vue')
                },


            ]
        },
]
})

export default router