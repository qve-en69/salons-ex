export const MONTHS = [
    {id: 1, value: 'Января', defaultValue: 'Январь'},
    {id: 2, value: 'Февраля', defaultValue: 'Февраль'},
    {id: 3, value: 'Марта', defaultValue: 'Март'},
    {id: 4, value: 'Апреля', defaultValue: 'Апрель'},
    {id: 5, value: 'Мая', defaultValue: 'Май'},
    {id: 6, value: 'Июня', defaultValue: 'Июнь'},
    {id: 7, value: 'Июля', defaultValue: 'Июль'},
    {id: 8, value: 'Августа', defaultValue: 'Август'},
    {id: 9, value: 'Сентября', defaultValue: 'Сентябрь'},
    {id: 10, value: 'Октября', defaultValue: 'Октябрь'},
    {id: 11, value: 'Ноября', defaultValue: 'Ноябрь'},
    {id: 12, value: 'Декабря', defaultValue: 'Декабрь'},
];

export const TYPESTASK = [
    {id: 1, value: 'Входящие'},
    {id: 2, value: 'Сегодня'},
    {id: 3, value: 'Планы'},
    {id: 4, value: 'В любое время'},
    {id: 5, value: 'Когда-нибудь'},
    {id: 6, value: 'Журнала'},
];

export const TODOCOMPONENTS = [
    {id: 1, iconName: 'Income', component: 'TodoIncome', value: 'Входящие'},
    {id: 2, iconName: 'Star_small', component: 'TodoToday', value: 'Сегодня',},
    {id: 3, iconName: 'Plans', component: 'TodoPlans', value: 'Планы'},
    {id: 4, iconName: 'Any_times', component: 'TodoAnyTimes', value: 'В любое время'},
    {id: 5, iconName: 'Box', component: 'TodoSomeDay', value: 'Когда-нибудь'},
    {id: 6, iconName: 'Archive', component: 'TodoJournal', value: 'Журнал'},
]

export const YEARS = years();

function years(): string[] {
    const arr: string[] = [];
    const year = new Date().getFullYear();
    for (let i = year - 5; i < year + 5; i++) {
        arr.push(i.toString());
    }
    return arr;
}

export const PARENTCLASSES = ['content-main', 'todo__menu', 'container', 'v-main__wrap', 'items-title', 'title-text']


export const DAYS_WEEK = ['Вoскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

export const SHORT_DAYS_WEEK = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

export const WORKER_STATUS = [
    {id: null, name: 'Не выбрано',},
    {id: -1, name: 'Удален',},
    {id: 0, name: 'Уволен',},
    {id: 1, name: 'Активный',}
]
