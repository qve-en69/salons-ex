<template>
  <div>
    <template v-if="this.formReady">
      <div class="header" id="headerTitle">
          <div  class="box-container">
            <PageTitle v-if="service">
            <template v-slot:default>{{ service.name }}</template>
            <template v-slot:button>
                    <a-button icon="edit" size="large" @click="$router.push({name: $routeRules.ServiceUpdate, params: {id: service.id}})">Редактировать</a-button>
                <a-popconfirm placement="leftTop" title="Вы действительно хотите удалить услугу?" @confirm="deleteService" ok-text="Удалить" cancel-text="Отмена">
                    <a-button icon="delete" type="danger" ghost size="large">Удалить</a-button>
                </a-popconfirm>
                    <a-button icon="close" size="large" @click="$router.push({name: $routeRules.Services})"></a-button>
            </template>
            </PageTitle>
          </div>

    </div>
    <br>
        <div  class="box-container">
            <ServiceGeneralFormComponent :form="form"/>
        </div>
   <br>

    <a-row :gutter="[8,8]">
        <a-col :span="16">
            <div class="card-container">
            <a-tabs type="card" :default-active-key="tabs.find((el) => el.id === $route.name).id" @change="tabChanged">
                <a-tab-pane :tab="item.name" v-for="item in tabs" :key="item.id">
                <div class="box-container">
                    <keep-alive>
                    <router-view :service="service" ></router-view>
                    </keep-alive>
                </div>
                </a-tab-pane>
            </a-tabs>
            </div>
        </a-col>
        <a-col :span="8">
             <div class="card-container">
                <div  class="box-container">
                    <a-form-model>
                        <FormGroup v-slot="attrs" :form="form" field="relevance" label="Активность" show-custom-error>
                            <a-select 
                            v-model="form[attrs.name]"
                            v-bind="attrs"
                            @input="attrs.change" 
                            size="large">

                                <a-select-option  :value="1">
                                Активен 
                                </a-select-option>
                                <a-select-option  :value="0">
                                Выключен
                                </a-select-option>
                            
                            </a-select>
                            </FormGroup>
                            <FormGroup v-slot="attrs" :form="form" field="category_id" label="Категория" show-custom-error>
                            <a-select 
                            v-model="form[attrs.name]"
                            v-bind="attrs"
                            @input="attrs.change" 
                            size="large">
                            
                            </a-select>
                            </FormGroup>

                                  
                            <FormGroup  v-slot="attrs" :form="form" field="price_first" label="Стоимость у косметолога" show-custom-error>
                                <a-input  
                                v-model="form[attrs.name]"
                                v-bind="attrs" 
                                @input="attrs.change"
                                />
                            </FormGroup>
                                                
                            <FormGroup  v-slot="attrs" :form="form" field="price_second" label="Стоимость у ведущего косметолога" show-custom-error>               
                                <a-input  
                                v-model="form[attrs.name]"
                                v-bind="attrs" 
                                @input="attrs.change"
                                />
                            </FormGroup>
                                
                            <a-input-group compact>

                            </a-input-group>
                            

                            <FormGroup  v-slot="attrs" :form="form" field="service_duration" label="Длительность" show-custom-error v-if="form.service_duration != null && form.service_duration != ''"> 
                                <a-time-picker  
                                    style="width: 100%"
                                    placeholder="HH.mm"
                                    @change="handleTimeChange"
                                    :default-value="moment(form[attrs.name], 'HH:mm')"
                                    :format="'HH:mm'"
                                    size="large"
                                    :minuteStep="5"
                                >
                                </a-time-picker>  
                            </FormGroup> 
                    </a-form-model>
                </div>
            </div>
        </a-col>
    </a-row>
    </template>
    <template v-else>
        <div>
            <a-alert
            message="Загрузка данных"
            description="Additional description and informations about copywriting."
            type="info"
            show-icon
            />
        </div>
    </template>

  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import PageTitle from "@/UI/components/common/PageTitle.vue";
import {serviceTabs} from "@/utils/tabs";
import {ServiceStore} from "@/store/modules/Services";
import {IServicesListItem} from "@/entity/services/services.types";
import {message} from "ant-design-vue";
import {RouterNameEnum} from "@/router/router.types";
import ServiceGeneralFormComponent from "@/UI/components/forms/serviceGeneral/ServiceGeneralForm.vue";
import ServiceGeneralForm from "@/form/serviceGeneral/serviceGeneral";
import FormGroup from "@/UI/components/common/form/FormGroup.vue";
import {ServicesCategoryStore} from "@/store/modules/ServicesCategory";
import { IServicesCategory, IServicesCategoryListItem } from "@/entity/servicesCategory/services.category.types";
import {IWorkers, IWorkersListItem} from "@/entity/workers/workers.types";
import {IPosition} from "@/entity/position/position.types";
import {IStatus} from "@/entity/status/status.types";
import {ICategory} from "@/entity/category/category.types";
import {ISalaryScheme} from "@/entity/salaryScheme/salaryScheme.types";
import {SalaryStore} from "@/store/modules/Salary";
import {StatusesStore} from "@/store/modules/Status";
import {PositionStore} from "@/store/modules/Position";
import {CategoryStore} from "@/store/modules/Category";
import {WorkersStore} from "@/store/modules/Workers";
import WorkerAddForm from "@/form/workerAdd/workerAdd";

import {IServiceCosmetologists} from '@/entity/serviceCosmetologists/serviceCosmetologists.types';
import {ServiceCosmetologistsStore} from "@/store/modules/ServiceCosmetologists";

import moment from 'moment';

@Component({
  components: {PageTitle, ServiceGeneralFormComponent, FormGroup},
  methods: {moment}
})
export default class ServiceDetail extends Vue {

    tabs = serviceTabs;
    form = new ServiceGeneralForm();
    formReady = false;

    constructor() {
        super();
        moment().locale('ru');
    }
    workerForm = new WorkerAddForm();
    worker: IWorkersListItem | null = null;
       

    get service(): IServicesListItem | null {
        return ServiceStore.services;
    }

    get servicesCategory(): IServicesCategory | null {
      return ServicesCategoryStore.serviceCategory;
    }
        
    async editService(): Promise<void> {
    if (await this.form.submit(ServiceStore.update)) {
        await ServicesCategoryStore.fetchAll();
        this.form = new ServiceGeneralForm();
        this.$router.push({name: this.$routeRules.Services})
      }
    }

    get staffLoaded(): boolean {
        return WorkersStore.workersLoaded;
    }
    get staff(): IWorkers | null {
        return WorkersStore.workers;
    }
    get positions(): IPosition[] {
        return PositionStore.position;
    }
    get statuses(): IStatus[] {
        return StatusesStore.status;
    }
    get categories(): ICategory[] {
        return CategoryStore.category;
    }
    get salary(): ISalaryScheme[] {
        return SalaryStore.salary;
    }

    // get service_cosmetologists(): IServiceCosmetologists | null{
    //     return ServiceCosmetologistsStore.serviceCosmetologist;
    // }

    async created(): Promise<void> {
        //await ServiceCosmetologistsStore.fetchAll();
        await ServiceStore.fetchData({filter: {id: parseInt(this.$route.params.id)}});
        await ServicesCategoryStore.fetchAll({limit: 20});

        await WorkersStore.fetchAll({limit: 10});
        let res = WorkersStore.workers;
        console.log(res);
        await StatusesStore.fetchAll();
        await CategoryStore.fetchAll();
        await PositionStore.fetchAll();
        await SalaryStore.fetchAll();
        // await ServiceCosmetologistsStore.fetchAll();

        if (this.service) {
            this.workerForm.setFormDataWithoutId(this.positions, this.categories, this.statuses, this.salary);
            this.form.setFormData(this.service);
               console.log("in form");
            console.log(this.form.staff);
        }
        
        this.formReady = true;
        console.log('formReady -'+ this.formReady)
    }

    handleTimeChange(value: any): void {
        this.form.service_duration = value.format('HH:mm');
    }

    async deleteService(): Promise<void> {
    if(await  ServiceStore.delete({id: parseInt(this.$route.params.id)})) {
      message.success('Данные успешно удалены');
      await this.$router.push({name: RouterNameEnum.Services});
    } else {
      message.error('Что то пошло не так...')
    }
  }

    tabChanged(key: string): void {
        this.$router.push({name: key});
    }

}

</script>
<style lang="scss" scoped>
</style>