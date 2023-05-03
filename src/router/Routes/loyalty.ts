import { RouterNameEnum } from '@/router/router.types';
export const LoyaltyRoutes=[
    {
        path: '/loyalty',
        redirect: '/loyalty/index',
        component: () => import('../../UI/layouts/MainLayout.vue'),
        meta: {
            auth: true,
        },
        children:[
            {
                path: '/loyalty',
                redirect: '/loyalty/loyaltyCert',
                meta: {
                    title: 'Лояльность',
                    breadcrumb: [{ name: 'Финансы' }]
                },
                name: RouterNameEnum.Loyalty
            },
            {
                path: '/loyalty/loyaltyCert',
                meta: {
                    title: 'Лояльность | Сертификат',
                    breadcrumb: [{ name: 'Сертификат' }]
                },
                name: RouterNameEnum.LoyaltyCert,
                component: () => import('../../UI/pages/loyalty/loyaltyCert.vue')
            },
            {
                path: '/loyalty/loyaltyCertType',
                meta: {
                    title: 'Лояльность | Типы сертификатов',
                    breadcrumb: [{ name: 'Типы сертификатов' }]
                },
                name: RouterNameEnum.LoyaltyCertType,
                component: () => import('../../UI/pages/loyalty/loyaltyCertType.vue')
            },
            {
                path: '/loyalty/loyaltySubscription',
                meta: {
                    title: 'Лояльность | Абонемент',
                    breadcrumb: [{ name: 'Абонемент' }]
                },
                name: RouterNameEnum.LoyaltySubscription,
                component: () => import('../../UI/pages/loyalty/loyaltySubscription.vue')
            },
            {
                path: '/loyalty/loyaltySubscriptionType',
                meta: {
                    title: 'Лояльность | Типы абонементов',
                    breadcrumb: [{ name: 'Типы абонементов' }]
                },
                name: RouterNameEnum.LoyaltySubscriptionType,
                component: () => import('../../UI/pages/loyalty/loyaltySubscriptionType.vue')
            },
            {
                path: '/loyalty/loyaltyBonus',
                meta: {
                    title: 'Лояльность | Бонусная программа',
                    breadcrumb: [{ name: 'Бонусная программа' }]
                },
                name: RouterNameEnum.LoyaltyBonus,
                component: () => import('../../UI/pages/loyalty/loyaltyBonus.vue')
            },
            {
                path: '/loyalty/loyaltyBonusType',
                meta: {
                    title: 'Лояльность | Типы бонусных программ',
                    breadcrumb: [{ name: 'Типы бонусных программ' }]
                },
                name: RouterNameEnum.LoyaltyBonusType,
                component: () => import('../../UI/pages/loyalty/loyaltyBonusType.vue')
            },
            {
                path: '/loyalty/loyaltyStock',
                meta: {
                    title: 'Лояльность | Акции',
                    breadcrumb: [{ name: 'Акции' }]
                },
                name: RouterNameEnum.LoyaltyStock,
                component: () => import('../../UI/pages/loyalty/loyaltyStock.vue')
            },

        ]
    }
]
