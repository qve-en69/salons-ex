import {IFilters} from '@/entity/filters/filters.types';
import Vue from 'vue';

export default class Filters extends Vue{
    filterBody: IFilters[] = [];
    default: string[] = [];

    constructor(data: IFilters[]) {
        super();
        for (let i = 0; i < data.length; i++) {
            this.default[i] = data[i].filterValue[0].key;
            this.filterBody.push(data[i]);
        }
    }
}
