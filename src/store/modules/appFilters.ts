import { Action, getModule, Module, MutationAction,Mutation, VuexModule } from 'vuex-module-decorators';
import store from '@/store';
import { SalonsStore } from "@/store/modules/Salons"
import { ProductsStore } from "@/store/modules/Warehouse/Products"
import { appPaginationStore } from "@/store/modules/appPagination"
import { ClientsStore } from "@/store/modules/Clients";
import { RouterNameEnum } from "@/router/router.types";
import { router } from '@/router/router';

@Module({
    namespaced: true,
    name: 'appFilters',
    store,
    dynamic: true,
})


class appFilters extends VuexModule {
    public salons: { [s: string]: string } = {};
    public clients:{ [c: string]: string } = {};
    public stores:{ [t: string]: string } = {};
    public products:{[p: string]: string } = {};
    //cities: any

    @Mutation
    public isFilter(val:any):boolean{

        let result = false
        if (val.source==='salons'){
            result = val.key in this.salons
        }
        if (val.source==='clients'){
            result = val.key in this.clients
        }
        if (val.source==='stores'){
            result = val.key in this.clients
        }
        console.log('result -'+result)
        return  result
    }

    @Mutation
    public async clearAllfiltersClients(){
        this.clients = {}
    }

    @Mutation
    public async clearAllfiltersSalon(){
        this.salons = {}
    }
    @Mutation
    public async clearfilterSalonField(field:any)
    {
        appPaginationStore.setLoad(false)
        delete this.salons[field]
        await SalonsStore.fetchAll({limit:appPaginationStore.PageParams.pageSize, filter:this.salons});
        appPaginationStore.setTotal(SalonsStore.salons!.total)
        appPaginationStore.setLoad(true)
    }

    @Mutation
    public async clearfilterSalon(value:any)
    {
        appPaginationStore.setLoad(false)
        const key=Object.keys(value)[0]
        delete this.salons[key]
        await SalonsStore.fetchAll({ limit:appPaginationStore.PageParams.pageSize, filter:this.salons});
        appPaginationStore.setTotal(SalonsStore.salons!.total)
        appPaginationStore.setLoad(true)
    }
    @Mutation
    public async setfiltersSalons(value:any)
    {
        this.salons = value
    }
    @Mutation
    public async setfiltersClients(value:any)
    {
        this.clients = value
    }
    @Mutation
    public async setfiltersStores(value:any)
    {
        this.stores = value
    }


    @Mutation
    public async setfilterProducts(value:any){
        appPaginationStore.setLoad(false)
        const key=Object.keys(value)[0]
        this.products[key] = value[Object.keys(value)[0]]
        appPaginationStore.setCurrent(1)
        await ProductsStore.fetchAll({limit:appPaginationStore.PageParams.pageSize, filter:this.products});
        appPaginationStore.setTotal(ProductsStore.products!.total)

        router.push({name: RouterNameEnum.StoresProductsPage,  params: { page: "1", total:appPaginationStore.PageParams.total.toString() , filter:JSON.stringify(this.products)}})
        appPaginationStore.setLoad(true)
    }
    @Mutation
    public async setfilterSalons(value:any){
        appPaginationStore.setLoad(false)
        const key=Object.keys(value)[0]
        this.salons[key] = value[Object.keys(value)[0]]
        //appPaginationStore.setSalonsFilter(this.salons)
        appPaginationStore.setCurrent(1)

        await SalonsStore.fetchAll({    limit:appPaginationStore.PageParams.pageSize, filter:this.salons});
        appPaginationStore.setTotal(SalonsStore?.salons!.total)
        const routeName=RouterNameEnum.SalonsPage

        router.push({name: routeName,  params: { page: "1", total:appPaginationStore.PageParams.total.toString() , filter:JSON.stringify(this.salons)}})
        appPaginationStore.setLoad(true)
    }
    @Mutation
    public async setfilterClients(value:any){

        appPaginationStore.setLoad(false)
        const key=Object.keys(value)[0]
        this.clients[key] = value[Object.keys(value)[0]]
        //appPaginationStore.setSalonsFilter(this.salons)
        appPaginationStore.setCurrent(1)

        await ClientsStore.fetchAll({limit:appPaginationStore.PageParams.pageSize, filter:this.clients});
        appPaginationStore.setTotal(ClientsStore.clients!.total)
        router.push({name: RouterNameEnum.ClientsPage,  params: { page: "1", total:appPaginationStore.PageParams.total.toString() , filter:JSON.stringify(this.clients)}})

        appPaginationStore.setLoad(true)
        /*const key=Object.keys(value)[0]
        this.clients[key] = value[Object.keys(value)[0]]*/
    }
    @Mutation
    public setfilterStores(value:any){
        const key=Object.keys(value)[0]
        this.stores[key] = value[Object.keys(value)[0]]
    }




    get SalonsFilter(){
        return this.salons
    }
    get ClientsFilter(){
        return this.clients
    }
    get StoresFilter(){
        return this.stores
    }
    get ProductsFilter() {
        return this.products
    }


}
export const appFiltersStore = getModule(appFilters)