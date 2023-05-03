import { ISelectList } from '@/entity/common/select.types';
import { IScope} from "@/entity/common/scope.types";

type FilterType ='number' |'input' | 'select' | 'cascader' | 'levelcode' | 'datetime' | 'date' | 'datetimerange' | 'checkboxButton';





export interface ISalonFilters {
    id: number;
    filterValue: ISelectList[];
    filterName: string;
    filterType: FilterType | null;
    filterCode: string | null;
    scopedSlots: IScope<string> | null;
}
export interface IFilters {
    id: number;
    filterValue: ISelectList[];
    filterName: string;
    filterType: string | null;
    filterCode: string | null;
}
export enum FiltersSalonsNameEnum{
    Partner = 'Партнер',
    City = 'Город',
    Manager = 'Менеджер',
    Active = 'Активность',
    OpeningDateFrom = 'Дата открытия (от)',
    OpeningDateTo = 'Дата открытия (до)',

}
export enum FiltersSalonsFinanceNameEnum{
    Date = 'Дата',
    Type = 'Тип',
    Purpose = 'Назначение',
}
export enum FiltersSalonsClientsNameEnum{
    DateLast = 'Дата последнего визита',
    DateNext = 'Дата следующего визита',
}
export enum FiltersClientsNameEnum {
    Sex = 'Пол',
    Sold = 'Продано, ₽',
    Visited = 'Посещений',
    HaveNotes = 'Есть записи',
    NoHaveNotes = 'Нет записей'
}
export enum FiltersClientsNotesNameEnum {
    Cosmetologist = 'Косметолог',
    Create = 'Создал',
    Status = 'Статус',
    Service = 'Услуга',
    DateVisited = 'Дата визита'
}
//TODO::ReportFilterStudioNameEnum
export enum ReportFilterStudioNameEnum {
    Studio = 'Студия',
    Category = 'Категория',
    Specification = 'Детализация'
}