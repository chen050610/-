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


            ]
        },
]
})

export default router