import {RouterNameEnum} from "@/router/router.types";

const salonTabs = [
    {
        id: RouterNameEnum.SalonDetailCommon,
        name: 'Общее'
    },
    {
        id: RouterNameEnum.SalonDetailFinance,
        name: 'Финансы'
    },
    {
        id: RouterNameEnum.SalonDetailReports,
        name: 'Отчеты'
    },
    {
        id: RouterNameEnum.SalonDetailClients,
        name: 'Клиенты'
    },
    {
        id: RouterNameEnum.SalonDetailWorkers,
        name: 'Сотрудники'
    },
    {
        id: RouterNameEnum.SalonDetailPhoto,
        name: 'Фото'
    },
    {
        id: RouterNameEnum.SalonDetailDocs,
        name: 'Документы'
    },
    {
        id: RouterNameEnum.SalonDetailAllow,
        name: 'Доступы'
    },
]
const loyaltyBonusTabs = [
    {
        id: RouterNameEnum.LoyaltyBonus,
        name: 'Бонусная программа'
    },
    {
        id: RouterNameEnum.LoyaltyBonusType,
        name: 'Типы бонусных программ'
    }
];

const loyaltyCertTabs = [
    {
        id: RouterNameEnum.LoyaltyCert,
        name: 'Сертификаты'
    },
    {
        id: RouterNameEnum.LoyaltyCertType,
        name: 'Типы сертификатов'
    }
];

const loyaltySubscriptionTabs = [
    {
        id: RouterNameEnum.LoyaltySubscription,
        name: 'Абонементы'
    },
    {
        id: RouterNameEnum.LoyaltySubscriptionType,
        name: 'Типы абонементов'
    }
];
const workerTabs = [
    {
        id: 0,
        name: 'Записи',
        component: 'WorkerNotes'
    },
    {
        id: 1,
        name: 'Задачи',
        component: 'WorkerTasks'
    },
    {
        id: 2,
        name: 'График работы',
        component: 'WorkerSchedule'
    },
    {
        id: 3,
        name: 'Услуги',
        component: 'WorkerServices'
    },
    {
        id: 4,
        name: 'Файлы',
        component: 'WorkerDocs'
    },
]
const clientTabs = [
    {
        id: RouterNameEnum.ClientDetailCommon,
        name: 'Общее'
    },
    {
        id: RouterNameEnum.ClientDetailHistory,
        name: 'История посещений'
    },
    {
        id: RouterNameEnum.ClientDetailNotes,
        name: 'Записи'
    },
    {
        id: RouterNameEnum.ClientDetailTasks,
        name: 'Задачи'
    },
    {
        id: RouterNameEnum.ClientDetailDocuments,
        name: 'Документы'
    },
    {
        id: RouterNameEnum.ClientDetailPhoto,
        name: 'Фото'
    },
    {
        id: RouterNameEnum.ClientDetailContraindications,
        name: 'Противопоказания'
    },
    {
        id: RouterNameEnum.ClientDetailLoyalty,
        name: 'Лояльность'
    }
];
const serviceCreateTabs = [
    {
        id: RouterNameEnum.ServicesCreationCosmetologists,
        name: 'Косметологи'
    },
    {
        id: RouterNameEnum.ServicesCreationConsumables,
        name: 'Расходники'
    },
    {
        id: RouterNameEnum.ServicesCreationDocuments,
        name: 'Документы'
    },
    {
        id: RouterNameEnum.ServicesCreationAnamnez,
        name: 'Анамнез'
    },
    {
        id: RouterNameEnum.ServicesCreationAlgoritm,
        name: 'Алгоритм проведения'
    },
];
const serviceTabs = [
    {
        id: RouterNameEnum.ServiceDetailWorkers,
        name: 'Сотрудники'
    },
    {
        id: RouterNameEnum.ServiceDetailProducts,
        name: 'Расходники'
    },
    {
        id: RouterNameEnum.ServiceDetailDocuments,
        name: 'Документы'
    },
    {
        id: RouterNameEnum.ServiceDetailAnamnez,
        name: 'Анамнез'
    },

];
export {
    salonTabs,
    loyaltyBonusTabs,
    loyaltyCertTabs,
    loyaltySubscriptionTabs,
    workerTabs,
    clientTabs,
    serviceCreateTabs,
    serviceTabs,
}