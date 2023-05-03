<template>
  <div  class="services">
    <div class="box-container">
    <PageTitle>
        <template v-slot:default>Услуги</template>
    
     
         <template v-slot:button>
           <a-button  icon="plus-circle" type="primary" size="large" @click="showModal">
             Добавить категорию
          </a-button>
          <!-- <a-button icon="plus-circle" type="primary" size="large"
                    @>Добавить категорию
          </a-button> -->
        </template>
    </PageTitle>
    <a-modal v-model="visible" title="Добавить категорию" @ok="handleOk">

    <ServiceCategoryCreateFormComponent :form="form"/>
              <template slot="footer">
                <a-button key="back" @click="handleCancel">
                  Отмена
                </a-button>
                <a-button key="submit" type="primary" @click="create">
                  Сохранить
                </a-button>
              </template>
    </a-modal>

    <a-modal v-model="visibleCategoryEdit" title="Изменить категорию" @ok="handleOk">
        <ServiceCategoryUpdateFormComponent :form="serviceUpdateForm"/>
              <template slot="footer">

                <a-row :gutter="[24,8]">
                  <a-col :span="6">
                    <a-button key="submit" icon="delete" ghost type="danger" @click="deleteCategory(categoryId)">
                      Удалить
                    </a-button>
                  </a-col>
                  <a-col :span="18">
                    <a-button key="back" @click="visibleCategoryEdit = false">
                      Отмена
                    </a-button>
                    <a-button key="submit" type="primary" @click="editCategory">
                      Сохранить
                    </a-button>
                  </a-col>
                </a-row>
              </template>
    </a-modal>
 
    <a-table
          :columns="columnsServiceCategory"
          :data-source="servicesCategory != undefined && servicesCategory != null ? servicesCategory.data : []"
          :pagination="false"
          :loading="!servicesCategoryLoaded"
          class="components-table-demo-nested"
         
      >

      <template slot="update" slot-scope="update, record">
          <a-button class="update_button"  icon="edit" type="link"  @click="showModalCategoryEdit(record)"></a-button>
      </template>
       
    <template v-slot:expandedRowRender="record">
        <a-table 
          slot="expandedRowRender"
          :columns="columns"
          :data-source="record.services"
          :customRow="customRow"
          :loading="!servicesCategoryLoaded"
          :pagination="false"
          :rowKey = 'record => record.id'
          
        >    
            <span slot="customTitle"><a-button icon="plus-circle" type="link"  @click="$router.push({name: $routeRules.ServicesCreation})">
              Добавить услугу
            </a-button>
            </span>  

          
            <template slot="price_first" slot-scope="text, record">
              <span v-if="record.editable">
                <ServiceInnerTableFormComponent :form="formGeneral" />
                <!-- <a-form-model >
                  <FormGroup  v-slot="attrs" :form="formGeneral" field="price_first" label="" show-custom-error>            
                                <a-input  
                                v-model="form[attrs.name]"
                                v-bind="attrs" 
                                @input="attrs.change"
                              
                                id="one" />   
                  </FormGroup>
                </a-form-model> -->
              </span>
              <span v-if="!record.editable">   
                  <p>{{record.price_first}} руб.</p>
              </span>
            </template>

            <template slot="price_second" slot-scope="text, record">
                <!-- <a-form-model v-if="record.editable">  
                  <FormGroup  v-slot="attrs" :form="formGeneral" field="price_second" label="" show-custom-error>               
                    <span >
                      <a-input  v-model="form[attrs.name]"
                                v-bind="attrs" 
                                @input="attrs.change"
                                
                                />
                    </span>
                  </FormGroup>
                </a-form-model> -->
              <span  v-if="!record.editable">   
                         <p>{{record.price_second}} руб.</p>
              </span>
            </template>

            <template slot="service_duration" slot-scope="text, record">             
              <!-- <a-form-model  v-if="record.editable">  
                  <FormGroup  v-slot="attrs" :form="formGeneral" field="service_duration" label="" show-custom-error> 
                            <a-time-picker  
                                v-model="form[attrs.name]"
                                v-bind="attrs" 
                                @input="attrs.change"
                            format="HH:mm"/>
                  </FormGroup> 
              </a-form-model> -->
              <span  v-if="!record.editable">   
                      <p>{{ record.service_duration.slice(0,-3)}}</p>
              </span>
            </template>
 
   
            <template slot="operation" slot-scope="text, record">
              <div class="editable-row-operations">
                <span v-if="record.editable">
                  <a-button  @click="() => saveService(record.id)">Save</a-button >
                  <a-button   @click="() => cancel(record.id)">Cancel</a-button >
                </span>
                
                <span v-if="!record.editable">
                  <a-button  class="update_button"  icon="edit" type="link" @click="() => edit(record.id)"></a-button>
                </span>
              </div>
            </template>

        </a-table>
        </template>
       
    </a-table>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {ITableColumn} from "@/entity/table/table.types";
import {TablesStore} from "@/store/modules/Tables";
import {RouterNameEnum} from "@/router/router.types";
import {IServices, IServicesListItem} from "@/entity/services/services.types";
import PageTitle from "@/UI/components/common/PageTitle.vue";
import FormGroup from "@/UI/components/common/form/FormGroup.vue";
import ServiceCategoryCreateForm from "@/form/serviceCategoryCreate/serviceCategoryCreate";
import ServiceGeneralForm from "@/form/serviceGeneral/serviceGeneral";
import ServiceCategoryGeneralForm from "@/form/serviceCategoryGeneral/serviceCategoryGeneral";
import {ServiceStore} from "@/store/modules//Services";
import {ServicesCategoryStore} from "@/store/modules/ServicesCategory";
import { IServicesCategory, IServicesCategoryListItem } from "@/entity/servicesCategory/services.category.types";
import ServiceCategoryUpdateForm from "@/form/serviceCategoryGeneral/serviceCategoryUpdate";

// import ServiceCreateFormComponent from "@/UI/components/forms/serviceCategoryCreate/ServiceCategoryFormComponent.vue";
import ServiceCategoryCreateFormComponent from "@/UI/components/forms/serviceCategoryCreate/ServiceCategoryCreateFormComponent.vue";
import ServiceCategoryUpdateFormComponent from "@/UI/components/forms/serviceCategoryCreate/ServiceCategoryUpdateFormComponent.vue";
import ServiceInnerTableFormComponent from "@/UI/components/forms/serviceGeneral/ServiceInnerTableForm.vue";
//import ServiceTableComponent from "@/UI/components/forms/services/ServiceTableComponent.vue";
import ServiceTableComponent from "../../components/services/ServiceTableComponent.vue";
import {message} from "ant-design-vue";
import moment from 'moment';


@Component({
  components: {FormGroup, ServiceInnerTableFormComponent, ServiceTableComponent, PageTitle, ServiceCategoryCreateFormComponent, ServiceCategoryUpdateFormComponent},
  methods: {moment}
})

export default class Services extends Vue {

   form                 = new ServiceCategoryCreateForm();
   formGeneral          = new ServiceGeneralForm();
   formCategoryGeneral  = new ServiceCategoryGeneralForm();
   serviceUpdateForm    = new ServiceCategoryUpdateForm();

   categoryId         : number;

   services: IServicesListItem | null = null;
   serviceCategory: IServicesCategoryListItem | null = null;
   
    visible: boolean;
    visibleCategoryEdit: boolean;
    services_contain: number[];
    expandedRowKeys?: string[];
    editingKey?: number;

        columns = [
        {
            dataIndex: 'name',
            key: 'name',
            slots: { title: 'customTitle' },
            //scopedSlots: { customRender: 'customTitle' },
        },
        {
            title: 'Цена, от',
            dataIndex: 'price_first',
            key: 'price_first',
            scopedSlots: { customRender: 'price_first' }
        },
        {
            title: 'Цена, до',
            dataIndex: 'price_second',
            key: 'price_second',
            scopedSlots: { customRender: 'price_second' }
        },
        {
            title: 'Длительность',
            format:"'HH:mm'",
            dataIndex: 'service_duration',
            key: 'service_duration',
            scopedSlots: { customRender: 'service_duration' }
        },
        {
            title: '',
            dataIndex: 'actions',
            scopedSlots: { customRender: 'operation' },
        },
    ];

    constructor() {
          super();
          this.visible = false;
          this.visibleCategoryEdit = false;
          this.services_contain = [1, 2, 3];
          this.categoryId = 0;
    }

    customRow = (record: any) => {
      return {
        on: {
          click: (event: any) => {
             let target = event.target;
            if(target.nodeName != 'BUTTON'){
              this.$router.push({name: RouterNameEnum.ServiceDetail, params: {id: record.id}})
            }
          }
        }
      };
    }

    async edit(id:any) {
      
      console.log(id);

      const newData = [...this.servicesCategory?.data != null ? this.servicesCategory?.data : [] ];
      var target;

      for(var item of newData) {
        for(var service of item.services){       
            // console.log('item services');
            // console.log(service);
            if(service.id == id){
              target = service;
              await ServiceStore.fetchData({filter: {id: parseInt(id)}});
              this.formGeneral.setFormData(this.serviceItem);
              
            }
        }
      }
      this.editingKey = id;
      if (target){
        target.editable = true;
        if(this.servicesCategory?.data != null){
          this.servicesCategory.data = newData;
          console.log('forma');
          console.log(ServiceStore);
        }
      }
    }

    cancel(id:any) {

      const newData = [...this.servicesCategory?.data != null ? this.servicesCategory?.data : [] ];
      var target;

      for(var item of newData) {
        for(var service of item.services){       
            // console.log('item services');
            // console.log(service);
            if(service.id == id){
            target = service;
            }
        }
      }
      this.editingKey = id;
      if (target){
        target.editable = true;
        delete target.editable;
        if(this.servicesCategory?.data != null){
          this.servicesCategory.data = newData;
        }
      }
    }

    async saveService(id:any): Promise<void> {
    if (await this.formGeneral.submit(ServiceStore.update)) {

        const newData = [...this.servicesCategory?.data != null ? this.servicesCategory?.data : [] ];
        var target;
        for(var item of newData) {
          for(var service of item.services){       
              if(service.id == id){
              target = service;
              }
          }
        }
        await ServicesCategoryStore.fetchAll();
        if(target)
          delete target.editable;
      }
    }


    showModal() {
      this.visible = true;
    }

    handleUpdateModal(visible: boolean): void {
        this.visibleCategoryEdit = visible;
        this.serviceUpdateForm.setFormData(this.serviceCategory);
    }

    showModalCategoryEdit(serviceCategory: IServicesCategoryListItem): void {
      this.serviceCategory = serviceCategory;
      this.categoryId = serviceCategory.id;
      this.handleUpdateModal(true);
    }

    handleOk(e:any) {
    //  console.log(e);
      this.visible = false;
    }

    handleCancel() {
      this.visible = false;
    }

    async deleteCategory(id:number): Promise<void> {
      if(await  ServicesCategoryStore.delete({id: id})) {
        message.success('Данные успешно удалены');
        this.visibleCategoryEdit = false;
        await ServicesCategoryStore.fetchAll({limit: 20});
      } else {
        message.error('Что то пошло не так...')
      }
    }

    async editCategory(): Promise<void> {
    if (await this.serviceUpdateForm.submit(ServicesCategoryStore.update)) {
        await ServicesCategoryStore.fetchAll();
        this.visibleCategoryEdit = false;
        this.serviceUpdateForm = new ServiceCategoryUpdateForm();
      }
    }

    get servicesCategory(): IServicesCategory | null {
      //console.log(ServicesCategoryStore.serviceCategory?.['data'][0].services);
      return ServicesCategoryStore.serviceCategory;
    }

    get service(): IServices | null {
    //  console.log(ServiceStore.service?.data);
      return ServiceStore.service;
    }

    get serviceItem(): IServicesListItem | null {
           console.log("SERVICE LOG");
      console.log(ServiceStore.services);
        return ServiceStore.services;
    }
    

    get servicesLoaded(): boolean{
      return ServiceStore.serviceLoaded;
    }


    get servicesCategoryLoaded(): boolean{
      return ServicesCategoryStore.serviceCategoryLoaded;
    }

    get columnsServiceCategory(): ITableColumn[] {
        return TablesStore.servicesCategoryColumns;
    }

    get columnsServices(): ITableColumn[] {
        return TablesStore.servicesColumns;
    }

    
    async create(): Promise<void> {
      if (await this.form.submit(ServicesCategoryStore.create)) {
        this.visible = false;
        await ServicesCategoryStore.fetchAll({limit: 20});
        // this.handleCancel();
        // await this.$router.push({name: RouterNameEnum.Services});
      }
    }

    async created(): Promise<void> {
    const token = localStorage.getItem('token');
    await ServicesCategoryStore.fetchAll({limit: 20});
    await ServiceStore.fetchAll({limit:20});
    // if(this.servicesCategory)
    // {
    //   this.formCategoryGeneral.setFormData(this.servicesCategory);
    // }
    }
}
</script>
<style lang="scss" scoped>
.editable-row-operations a {
  margin-right: 8px;
}

#serviceCategoryTable {
  /* Table / *Group* */


/* Auto Layout */

display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

position: static;
width: 1088px;
height: 329px;
left: 24px;
top: 90px;

/* Gray / gray-4 */

background: #F0F0F0;
/* Gray / gray-4 */

border: 1px solid #F0F0F0;
border-radius: 2px;

/* Inside Auto Layout */

flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
margin: 24px 0px;


.update_button {
  /* Button */


/* Auto Layout */

display: flex;
flex-direction: column;
align-items: center;
padding: 0px;

position: static;
width: 16px;
height: 16px;
left: 8px;
top: 19px;

border-radius: 2px;

/* Inside Auto Layout */

flex: none;
order: 1;
flex-grow: 0;
margin: 0px 16px;
}
}
</style>