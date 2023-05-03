import { RouterNameEnum } from '@/router/router.types';

export const menu = [
    {
        id: 0,
        name: 'Студии',
        icon: 'shop',
        icon_component: '',
        link: RouterNameEnum.Salons
    },
    {
        id: 1,
        name: 'Журнал записи',
        icon: 'calendar',
        icon_component: '',
        link: RouterNameEnum.Visits
    },
    {
        id: 2,
        name: 'Отчеты',
        icon: 'file',
        icon_component: '',
        link: RouterNameEnum.Reports,
        children:[
            {
                id: 0,
                name: 'Продажи по услугам',
                icon: '',
                icon_component: '',
                link: RouterNameEnum.ReportSalesByService   
            }
        ]
    },
    {
        id: 3,
        name: 'Клиенты',
        icon: 'user',
        icon_component: '',
        link: RouterNameEnum.Clients
    },
    {
        id: 4,
        name: 'Лояльность',
        icon: 'percentage',
        icon_component: '',
        link: RouterNameEnum.Loyalty,
        children: [
            {
                id: 5,
                name: 'Сертификат',
                icon: '',
                icon_component: '',
                link: RouterNameEnum.LoyaltyCert
            },
            {
                id: 6,
                name: 'Абонемент',
                icon: '',
                icon_component: '',
                link: RouterNameEnum.LoyaltySubscription
            },
            {
                id: 7,
                name: 'Бонусная программа',
                icon: '',
                icon_component: '',
                link: RouterNameEnum.LoyaltyBonus
            },
            {
                id: 8,
                name: 'Акции',
                icon: '',
                icon_component: '',
                link: RouterNameEnum.LoyaltyStock
            }
        ]
    },
    {
        id: 5,
        name: 'Финансы',
        icon: '',
        icon_component: `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M4.87714 9.24162C4.92557 9.29006 5.00526 9.29006 5.0537 9.24162L6.64433 7.65099L7.98964 8.99787C8.03808 9.04631 8.11776 9.04631 8.1662 8.99787L11.7021 5.4588C11.7506 5.41037 11.7506 5.33068 11.7021 5.28224L11.1271 4.70724C11.0787 4.6588 10.999 4.6588 10.9506 4.70724L8.0787 7.58224L6.73339 6.23537C6.68495 6.18693 6.60526 6.18693 6.55683 6.23537L4.30214 8.49006C4.2537 8.53849 4.2537 8.61818 4.30214 8.66662L4.87714 9.24162Z" fill="currentColor"/>
<path d="M14.125 2.5H8.5625V1.5C8.5625 1.43125 8.50625 1.375 8.4375 1.375H7.5625C7.49375 1.375 7.4375 1.43125 7.4375 1.5V2.5H1.875C1.59844 2.5 1.375 2.72344 1.375 3V11.125C1.375 11.4016 1.59844 11.625 1.875 11.625H7.44375V12.125L4.86875 13.8141C4.81094 13.8516 4.79531 13.9281 4.83281 13.9859L5.30625 14.7234V14.725C5.34375 14.7828 5.42188 14.7984 5.47969 14.7609L8 13.1078L10.5203 14.7609C10.5781 14.7984 10.6562 14.7828 10.6938 14.725V14.7234L11.1672 13.9859C11.2047 13.9281 11.1875 13.8516 11.1313 13.8141L8.5625 12.1297V11.625H14.125C14.4016 11.625 14.625 11.4016 14.625 11.125V3C14.625 2.72344 14.4016 2.5 14.125 2.5ZM13.5 10.5H2.5V3.625H13.5V10.5Z" fill="currentColor"/>
</svg>`,
        link: RouterNameEnum.Finance,
        children: [
            {
                id: 0,
                name: 'Счета и кассы',
                icon: '',
                icon_component: '',
                link: RouterNameEnum.AccountsAndCashboxes
            },
            {
                id: 1,
                name: 'Контрагенты',
                icon: '',
                icon_component: '',
                link: RouterNameEnum.Counterparties
            },
            {
                id: 2,
                name: 'Статьи платежей',
                icon: '',
                icon_component: '',
                link: RouterNameEnum.PaymentArticles
            },
            {
                id: 3,
                name: 'Документы',
                icon: '',
                icon_component: '',
                link: RouterNameEnum.FinanceDocuments
            },
            {
                id: 4,
                name: 'Финансовые операции',
                icon: '',
                icon_component: '',
                link: RouterNameEnum.FinanceOperations
            }
        ]
    },
    {
        id: 6,
        name: 'Склад',
        icon: 'file',
        icon_component: '',
        link: RouterNameEnum.Store,
        children:[
            {
                id: 0,
                name: 'Склады',
                icon: '',
                icon_component: '',
                link: RouterNameEnum.Stores
            },
            {
                id: 1,
                name: 'Товары',
                icon: '',
                icon_component: '',
                link: RouterNameEnum.StoresProducts
            },
            {
                id: 2,
                name: 'Складские операции',
                icon: '',
                icon_component: '',
                link: RouterNameEnum.StoreOperations
            }
        ]
    },

    {
        id: 7,
        name: 'Услуги',
        icon: 'appstore',
        icon_component: '',
        link: RouterNameEnum.Services
    },
    {
        id: 8,
        name: 'Настройки',
        icon: 'setting',
        icon_component: '',
        link: RouterNameEnum.Settings
    }
];
