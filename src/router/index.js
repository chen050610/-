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
            name: 'menu',
            path: '/menu',
            redirect: '/home',
            component: () => import('@/views/menu/index.vue'),
            children: [
                {
                    name: 'home',
                    path: '/home',
                    component: () => import('@/views/home/index.vue')
                },
                {
                    name: 'set',
                    path: '/set',
                    component: () => import('@/views/set/index.vue')
                },
                {
                    name: 'overview',
                    path: '/overview',
                    component: () => import('@/views/overView/index.vue')
                },
                {
                    name: 'product_manage',
                    path: '/product_manage',
                    component: () => import('@/views/user_manage/product_manage/index.vue')
                },
                {
                    name: 'message_manage',
                    path: '/message_manage',
                    component: () => import('@/views/user_manage/message_manage/index.vue')
                },
                {
                    name: 'user_list',
                    path: '/user_list',
                    component: () => import('@/views/user_manage/user_list/index.vue')
                },
                {
                    name: 'users_manage',
                    path: '/users_manage',
                    component: () => import('@/views/user_manage/users_manage/index.vue')
                },
                {
                    name: 'product_list',
                    path: '/product_list',
                    component: () => import('@/views/product/product_list/index.vue')
                },
                {
                    name: 'out_product_manage_list',
                    path: '/out_product_manage_list',
                    component: () => import('@/views/product/out_product_manage_list/index.vue')
                },
                {
                    name: 'message_list',
                    path: '/message_list',
                    component: () => import('@/views/message/message_list/index.vue')
                },
                {
                    name: 'recycle',
                    path: '/recycle',
                    component: () => import('@/views/message/recycle/index.vue')
                },
                {
                    name: 'file',
                    path: '/file',
                    component: () => import('@/views/file/index.vue')
                },
                {
                    name: 'loginLog',
                    path: '/loginLog',
                    component: () => import('@/views/login_log/index.vue')
                },
                {
                    name: 'operationLog',
                    path: '/operationLog',
                    component: () => import('@/views/operation_log/index.vue')
                },
            ]
        }
        ]
})

export default router