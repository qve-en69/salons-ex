import { RouterNameEnum } from '@/router/router.types';
export const ClientRoutes=[
    {
        path: '/clients',
        redirect: '/clients/index',
        component: () => import('../../UI/layouts/MainLayout.vue'),
        meta: {
            auth: true,
        },
        children: [
            {
                path: '/clients',
                meta: {
                    title: 'Клиенты',
                    breadcrumb: [{name: 'Клиенты'}]
                },
                props:{source:'clients'},
                name: RouterNameEnum.Clients,
                component: () => import('../../UI/pages/clients/Index.vue')
            },

            {
                path: '/clients/page/:page/:total/:filter',
                meta: {
                    title: 'Клиенты',
                    breadcrumb: [{name: 'Клиенты'}]
                },
                props:{source:'clients'},
                name: RouterNameEnum.ClientsPage,
                component: () => import('../../UI/pages/clients/Index.vue')
            },

            {
                path: '/clients/creation',
                meta: {
                    title: 'Клиенты | Создание',
                    breadcrumb: [{name: 'Клиенты', link: RouterNameEnum.Clients}, {name: 'Создание'}]
                },
                name: RouterNameEnum.ClientCreation,
                component: () => import('../../UI/pages/clients/ClientsCreation.vue')
            },
            {
                path: '/clients/:id',
                redirect: '/clients/:id/general',
                name: RouterNameEnum.ClientDetail,
                meta: {
                    title: '',
                    breadcrumb: [{name: 'Клиенты', link: RouterNameEnum.Clients}, {name: 'Детальная'}]
                },
                component: () => import('../../UI/pages/clients/ClientDetail.vue'),
                children: [
                    {
                        path: 'general',
                        name: RouterNameEnum.ClientDetailCommon,
                        component: () => import('../../UI/components/clients/ClientGeneral.vue')
                    },
                    {
                        path: 'history',
                        name: RouterNameEnum.ClientDetailHistory,
                        component: () => import('../../UI/components/clients/ClientsHistory.vue')
                    },
                    {
                        path: 'notes',
                        name: RouterNameEnum.ClientDetailNotes,
                        component: () => import('../../UI/components/clients/ClientNotes.vue')
                    },
                    {
                        path: 'tasks',
                        name: RouterNameEnum.ClientDetailTasks,
                        component: () => import('../../UI/components/clients/ClientTasks.vue')
                    },
                    {
                        path: 'documents',
                        name: RouterNameEnum.ClientDetailDocuments,
                        component: () => import('../../UI/components/clients/ClientDocuments.vue')
                    },
                    {
                        path: 'photo',
                        name: RouterNameEnum.ClientDetailPhoto,
                        component: () => import('../../UI/components/clients/ClientPhoto.vue')
                    },
                    {
                        path: 'contraindications',
                        name: RouterNameEnum.ClientDetailContraindications,
                        component: () => import('../../UI/components/clients/ClientContraindications.vue')
                    },
                    {
                        path: 'loyalty',
                        name: RouterNameEnum.ClientDetailLoyalty,
                        component: () => import('../../UI/components/clients/ClientLoyalty.vue')
                    }
                ]
            }
        ]
    }
]
