import router from './router/index'


//beforeEach是前置守卫
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    if (to.name !== 'login' && !token) next({ name: 'login' })
    else next()
})

