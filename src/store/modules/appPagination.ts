import { Action, getModule, Module, MutationAction,Mutation, VuexModule } from 'vuex-module-decorators';
import store from '@/store';

@Module({
    namespaced: true,
    name: 'appPagination',
    store,
    dynamic: true
})
class appPagination extends VuexModule {
    pageSizeList = ['5', '10', '15', '20', '50', '100'];

    TableFilters: {
        clients: any;
        salons: any;
        stores: any;
        loyaltyCert : any;
    } = {
        stores: [],
        clients: [],
        salons: [],
        loyaltyCert: []
    };

    TableParams: {
        load: boolean;
    } = {
        load: false
    };

    PageParams: {
        current: number;
        pageSize: number;
        pageNum: number;
        page: boolean;
        showQuickJumper: true;
        showSizeChanger: true;
        total: number;
        pageSizeOptions: Array<string>;
        //pageSizeOptions: ['10', '20', '30', '40'],
    } = {
        current: 1,
        pageSize: 10,
        pageNum: 1,
        page: false,
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: this.pageSizeList,
        total: 0
    };

    @Mutation
    public setSalonsFilter(val: any) {
        this.TableFilters.salons = val;
    }

    @Action
    public setLoad(val: boolean) {
        this.TableParams.load = !val;
    }
    @Action
    public setTotal(val: number) {
        this.PageParams.total = val;
    }
    @Action
    public setCurrent(val: number) {
        this.PageParams.current = val;
    }

    calcSkip(pagination: any) {
        let skip = 0;
        if (pagination && pagination.current > 0) {
            skip = (pagination.current - 1) * pagination.pageSize;
        }
        return skip;
    }
}
export const appPaginationStore = getModule(appPagination)