import {Component, Prop} from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import {ProxyForm} from "@/UI/components/Helpers/ProxyForm"
import {RouterNameEnum} from "@/router/router.types"
import {RouterProperties} from '@/router/routerProperties'
import {appPaginationStore} from "@/store/modules/appPagination"
import {appFiltersStore} from "@/store/modules/appFilters"

@Component
export class ProxyDataForm extends mixins(ProxyForm){
    @Prop() source!: string
    constructor() {
        super();
    }
    async created(): Promise<void> {

        console.log('Proxy Data Form')
        if (this.$route.params.filter!==undefined && this.$route.params.filter.length >2){
            if (this.$props.source === RouterProperties.salons){
                await appFiltersStore.setfiltersSalons(JSON.parse(this.$route.params.filter))
                //routeName=RouterNameEnum.SalonsPage
                //filter = appFiltersStore.salons
            }
            if (this.$props.source === RouterProperties.clients){
                //routeName=RouterNameEnum.ClientsPage
                await appFiltersStore.setfiltersClients(JSON.parse(this.$route.params.filter))
            }
            if (this.$props.source === RouterProperties.stores){
                //routeName=RouterNameEnum.Stores
                await appFiltersStore.setfilterStores(JSON.parse(this.$route.params.filter))
            }
            if (this.$props.source === RouterProperties.products){
                await appFiltersStore.setfilterProducts(JSON.parse(this.$route.params.filter))
            }
            if (this.$props.source === RouterProperties.products_mass){
                await appFiltersStore.setfilterProducts(JSON.parse(this.$route.params.filter))
            }
            if (this.$props.source === RouterProperties.products_archived){
                await appFiltersStore.setfilterProducts(JSON.parse(this.$route.params.filter))
            }

        }
        if (this.$route.params.page!==undefined) {
            try {
                const filter=JSON.parse(this.$route.params.filter)
                let source = this.$props.source

                if (source ===RouterProperties.products_mass) source = 'products'
                if (source ===RouterProperties.products_archived) source ='products'

                console.log('Parse data from -'+ source)

                if (this.$route.params.filter.length>2) {
                    await this.$store.dispatch( source +'/fetchAll',{skip:this.calcSkipPage(Number(this.$route.params.page)),
                        limit:this.AppPageParams.pageSize, filter:filter} )
                } else
                {
                    await this.$store.dispatch( source +'/fetchAll',{skip:this.calcSkipPage(Number(this.$route.params.page)),
                        limit:this.AppPageParams.pageSize })
                }

                await this.$store.dispatch('appPagination/setTotal', Number(this.$route.params.total))
                await this.$store.dispatch('appPagination/setCurrent', Number(this.$route.params.page))
            } catch (e) {
                console.log('Proxy DataForm set Pagination Error -'+e)
            }

        }
        else {
            try {
                let source = this.$props.source
                if (source === RouterProperties.products_mass) source = 'products'
                if (source === RouterProperties.products_archived) source ='products'

                await this.$store.dispatch( source +'/fetchAll',{limit:this.AppPageParams.pageSize})
                await this.$store.dispatch('appPagination/setCurrent', 1)
            } catch (e) {
                console.log('Proxy DataForm dispatch data error -'+e)
            }

            try {
                if (this.$props.source === RouterProperties.salons){
                    await this.$store.dispatch('appPagination/setTotal', Number(this.$store.state.salons.salons.total))
                }
                if (this.$props.source === RouterProperties.clients){
                    await this.$store.dispatch('appPagination/setTotal', Number(this.$store.state.clients.clients.total))
                }
                if (this.$props.source === RouterProperties.warehouse){
                    await this.$store.dispatch('appPagination/setTotal', Number(this.$store.state.warehouse.warehouse.total))
                }
                if (this.$props.source === RouterProperties.products){
                    await this.$store.dispatch('appPagination/setTotal', Number(this.$store.state.products.products.total))
                }
                if (this.$props.source === RouterProperties.products_mass){
                    await this.$store.dispatch('appPagination/setTotal', Number(this.$store.state.products.products.total))
                }
                if (this.$props.source === RouterProperties.products_archived){
                    await this.$store.dispatch('appPagination/setTotal', Number(this.$store.state.products.products.total))
                }

            } catch (e) {
                console.log('Proxy DataForm set Pagination Error -'+e)

            }

        }
    }

    async handleTableChange(pagination: any, filters: any, sorter: any){
        this.tableLoad = false
        let routeName = ''
        let filter = {};

        if (this.$props.source === RouterProperties.salons){
            routeName=RouterNameEnum.SalonsPage
            filter = appFiltersStore.salons
        }
        if (this.$props.source === RouterProperties.clients){
            routeName=RouterNameEnum.ClientsPage
            filter = appFiltersStore.clients
        }
        if (this.$props.source === RouterProperties.stores){
            routeName=RouterNameEnum.StoresPage
            filter = appFiltersStore.stores
        }
        if (this.$props.source === RouterProperties.products){
            routeName=RouterNameEnum.StoresProductsPage
            filter = appFiltersStore.products
        }
        if (this.$props.source === RouterProperties.products_mass){
            routeName=RouterNameEnum.StoresProductsMassEditPage
            filter = appFiltersStore.products
        }
        if (this.$props.source === RouterProperties.products_archived){
            routeName=RouterNameEnum.StoresProductsPageArchived
            filter = appFiltersStore.products
        }

        let source = this.$props.source
        if (source === RouterProperties.products_mass) source = 'products'
        if (source === RouterProperties.products_archived) source ='products'



        this.$router.push({name: routeName,  params: { page: pagination.current, total:pagination.total, filter:JSON.stringify(filter)}})
        try {
            await this.$store.dispatch( source +'/fetchAll',{skip:this.calcSkip(pagination),
                limit:pagination.pageSize, filter:filter})
            appPaginationStore.setCurrent(pagination.current)
        } catch (e) {
            console.log('Pagination | Parse data error ')
        }


        this.tableLoad = true
    }

}