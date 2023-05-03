import { RouterNameEnum } from '@/router/router.types';
export const BaseRoutes=[
    {
        path: '/auth',
        redirect: '/auth/login',
        component: ():any => import('@/UI/layouts/AuthLayout.vue'),
        meta: { auth: false },
        children: [
            {
                path: 'login',
                name: RouterNameEnum.AuthLogin,
                meta: {
                    title: 'Логин'
                },
                component: ():any => import('@/UI/pages/auth/Login.vue')
            },
            {
                path: 'recover',
                name: RouterNameEnum.AuthRecover,
                meta: {
                    title: 'Восстановление пароля'
                },
                component: ():any => import('@/UI/pages/auth/Recover.vue')
            }
        ]
    },
    {
        path: '/',
        redirect: '/studios',
        component: ():any => import('@/UI/layouts/MainLayout.vue'),
        meta: {
            auth: true,
        },
    }
]
