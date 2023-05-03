import { RouterNameEnum } from '@/router/router.types';
import { RouterProperties } from '@/router/routerProperties'
export const StoreRoutes=[
    {
        path: '/warehouse',
        redirect: '/warehouse/index',
        component: ():any => import('@/UI/layouts/MainLayout.vue'),
        meta: {
            auth: true,
        },
            children: [
                {
                    path: '/',
                    component: ():any => import('@/UI/pages/Stores/Index.vue'),
                    props:{ source:'warehouse' },
                    name: RouterNameEnum.Stores,
                    meta: {
                        title: 'Index',
                        breadcrumb: [{name: 'Склад', support: ['studioselect']}]
                    }
                },
                {
                    path: 'page/:page/:total/:filter',
                    component: ():any => import('@/UI/pages/Stores/Index.vue'),
                    props:{ source:'warehouse' },
                    name: RouterNameEnum.StoresPage,
                    meta: {
                        title: 'Index',
                        breadcrumb: [{name: 'Склад', support: ['studioselect']}]
                    }
                },


                {
                    path: 'Products',
                    component: ():any => import('@/UI/pages/Stores/Products/Index.vue'),
                    props:{ source:RouterProperties.products},
                    meta: {
                        title: 'Склады | Товары',
                        breadcrumb: [{name: 'Товары', link: RouterNameEnum.StoresProducts, support: ['studioselect']}]
                    },
                    name: RouterNameEnum.StoresProducts,

                },

                {
                    path: 'Products/page/:page/:total/:filter',
                    component: ():any => import('@/UI/pages/Stores/Products/Index.vue'),

                    props:{ source:RouterProperties.products},
                    name: RouterNameEnum.StoresProductsPage,
                    meta: {
                        title: 'Index',
                        breadcrumb: [{name: 'Товары', link: RouterNameEnum.StoresProducts, support: ['studioselect']}]
                    }
                },
                {
                    path: 'Products/Archived',
                    props:{ source:RouterProperties.products_archived },
                    meta: {
                        title: 'Склады | Товары Архив',
                        breadcrumb: [{name: 'Товары', link: RouterNameEnum.StoresProductsPage}]
                    },
                    name: RouterNameEnum.StoresProductsArchived,
                    component: ():any => import('@/UI/pages/Stores/Products/Archive.vue')
                },
                {
                    path: 'Products/Archived/page/:page/:total/:filter',
                    component: ():any => import('@/UI/pages/Stores/Products/Archive.vue'),
                    props:{ source:RouterProperties.products_archived },
                    name: RouterNameEnum.StoresProductsPageArchived,
                    meta: {
                        title: 'Index',
                        breadcrumb: [{name: 'Товары', link: RouterNameEnum.StoresProductsPage}]
                    }
                },

                {
                    path: 'Products/MassEdit',
                    props:{ source:RouterProperties.products_mass },
                    meta: {
                        title: 'Склады | Массовое редактирование',
                        breadcrumb: [{name: 'Склады', link: RouterNameEnum.Store}]
                    },
                    name: RouterNameEnum.StoresProductsMassEdit,
                    component: ():any => import('@/UI/pages/Stores/Products/mIndex.vue')
                },
                {
                    path: 'Products/MassEdit/:page/:total/:filter',
                    props:{ source:RouterProperties.products_mass },
                    meta: {
                        title: 'Склады | Массовое редактирование',
                        breadcrumb: [{name: 'Склады', link: RouterNameEnum.Store}]
                    },
                    name: RouterNameEnum.StoresProductsMassEditPage,
                    component: ():any => import('@/UI/pages/Stores/Products/mIndex.vue')
                },


                {
                    path: 'Products/Create/:fromCategory',
                    meta: {
                        title: 'Склады | Товары',
                        breadcrumb: [{name: 'Новый товар', link: RouterNameEnum.Store, support: ['closebutton']}]
                    },
                    props:{ source:'products', mode:0},
                    name: RouterNameEnum.StoresProductsCreate,
                    component: ():any => import('@/UI/pages/Stores/Products/Data.vue')
                },
                {
                    path: 'Products/Data/:id',
                    meta: {
                        title: 'Склады | Товары',
                        breadcrumb: [{name: 'товар', link: RouterNameEnum.Store, support: ['closebutton']}]
                    },
                    props:{ source:'products', mode:1},
                    name: RouterNameEnum.StoresProductPage,
                    component: ():any => import('@/UI/pages/Stores/Products/Data.vue')
                },

                {
                    path: 'operations',
                    meta: {
                        title: 'Склады | Перемещения',
                        breadcrumb: [{name: 'Склады', link: RouterNameEnum.Store}]
                    },
                    name: RouterNameEnum.StoreOperations,
                    component: ():any => import('@/UI/pages/Stores/Products/Index.vue')
                },

                {
                    path: 'creation',
                    meta: {
                        title: 'Склады | Добавить склад',
                        breadcrumb: [{name: 'Склады', link: RouterNameEnum.Store}]
                    },
                    name: RouterNameEnum.CreateStore,
                    component: ():any => import('@/UI/pages/Stores/Create.vue')
                },
                {
                    path: ':id',
                    name: RouterNameEnum.StoreDetail,
                    meta: {
                        title: '',
                        breadcrumb: [{name: 'Склад', link: RouterNameEnum.Store}, {name: ' Склад'}]
                    },
                    component: ():any => import('@/UI/pages/Stores/Edit.vue')
                }
            ]


    }
]