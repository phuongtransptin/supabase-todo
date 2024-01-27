const routes: Array<any> = [
    {
        name: 'home',
        path: '',
        component: () => import('../views/Home.vue'),
    },
    {
        name: 'accessAuth',
        path: '/access-auth',
        component: () => import('../views/AccessAuth.vue'),
    },
    {
        name: 'list',
        path: '/list',
        component: () => import('../views/List.vue'),
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('../views/Login.vue'),
    },
    {
        name: 'signIn',
        path: '/sign-in',
        component: () => import('../views/Register.vue'),
    },
];

export { routes };
