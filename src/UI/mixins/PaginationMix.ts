import Vue from 'vue'
import Component from 'vue-class-component'
import { appPaginationStore } from '@/store/modules/appPagination'
@Component
export class PaginationMix extends Vue {
    AppPageParams = appPaginationStore.PageParams
    AppTableParams = appPaginationStore.TableParams

    calcSkip(pagination:any):number {
        let skip = 0;
        if(pagination && pagination.current > 0){
            skip = (pagination.current - 1) * pagination.pageSize;
        }
        return skip
    }
    calcSkipPage(page:number):number {
        //let skip = 0
        return  (page - 1) * this.AppPageParams.pageSize;

    }

}