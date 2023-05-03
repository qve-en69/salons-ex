import { VNode } from 'vue';
import { ScopedSlot } from 'vue/types/vnode';
import { appPaginationStore } from "@/store/modules/appPagination"
import {AppFilters} from "@/UI/components/extFilter/AppFilters";

type FilterType = 'input' | 'select' |'source'| 'cascader' | 'levelcode' | 'datetime' | 'date' | 'datetimerange' | 'checkboxButton';

export interface FilterList {
    key: number;
    type: FilterType;
    label: string;
    placeholder: string | string[];
    defaultValue:any;
    style:string;
    value?: any;
    fieldNames?: any;
    modelName?: string;

    searchFieldName?: string;
    storeSource?: AppFilters;

    filtered: boolean;
    source?: any;
    options?: Array<{ value: any, label: string }>;
    onChange(value:any):void;
    onSearch(value:any):void;
    //change?: Function;
    //disabledTime?: (dates: [object, object], partial: 'start'|'end') => any;
}

export interface TableColumnFilter {
    text: string,
    value: any
}

export interface ColumnFilterItem {
    text?: string;
    value?: string;
    children?: any;
}

export declare type SortOrder = 'ascend' | 'descend';

