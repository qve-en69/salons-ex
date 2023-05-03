<template>
  <div>
    <div>
    <a-form-model>
    <div class="box-container">
      <a-row :gutter="[32,8]">
        <a-col :span="18">  
       <FormGroup v-slot="attrs" :form="form" field="name" label="Название услуги" show-custom-error>
          <a-input
              size="large"
              v-model="form[attrs.name]"
              v-bind="attrs"
              @input="attrs.change"
          />
        </FormGroup>

        <FormGroup v-slot="attrs" :form="form" field="online_appointment_name" label="Название для онлайн записи" show-custom-error>
          <a-input
              size="large"
              v-model="form[attrs.name]"
              v-bind="attrs"
              @input="attrs.change"
          />
        </FormGroup>

        <FormGroup v-slot="attrs" :form="form" field="description" label="Описание" show-custom-error>

          <a-textarea 
              allow-clear  
              size="large"
              :rows="7"
              v-model="form[attrs.name]"
              v-bind="attrs"
              @input="attrs.change"
               />
        </FormGroup>

        <FormGroup v-slot="attrs" :form="form" field="category_id" label="Категория" show-custom-error>
            <a-select
              size="large"
              placeholder="Название категории"
              show-search
              v-model="form[attrs.name]"
              v-bind="attrs"
              @input="attrs.change"
            >
             <a-select-option v-for="item in servicesCategory.data" :value="item.id" v-bind:key="item.id">
              {{item.name}}
            </a-select-option>
          </a-select>
        </FormGroup>

        <FormGroup v-slot="attrs" :form="form" field="price_first" label="Стоимость у косметолога" show-custom-error>
          <a-input
              size="large"
              v-model="form[attrs.name]"
              v-bind="attrs"
              @input="attrs.change"
          />
        </FormGroup>

        <FormGroup v-slot="attrs" :form="form" field="price_second" label="Стоимость у ведущего косметолога" show-custom-error>
          <a-input
              size="large"
              v-model="form[attrs.name]"
              v-bind="attrs"
              @input="attrs.change"
          />
        </FormGroup>

        <FormGroup 
          v-slot="attrs" 
          :form="form" 
          field="service_duration" 
          label="Длительность услуги" 
          show-custom-error
          v-if="form.service_duration != null && form.service_duration != ''"
        >
              
              <a-time-picker  

                style="width: 100%"
                placeholder="HH.mm"
                @change="handleTimeChange"
                :default-value="moment(form[attrs.name], 'HH:mm')"
                :minuteStep="5"
                :format="'HH:mm'"
                size="large"
              />
        </FormGroup>

        <FormGroup 
          v-slot="attrs" 
          :form="form" 
          field="service_duration" 
          label="Длительность услуги" 
          show-custom-error
          v-if="form.service_duration == ''"
        >  
              <a-time-picker
              style="width: 100%"
              size="large"
              v-model="form[attrs.name]"
              v-bind="attrs"
              @input="attrs.change"
              :minuteStep="5"
              format="HH:mm" />
        </FormGroup>

        <FormGroup v-slot="attrs" :form="form" field="salon_id" label="Студия" show-custom-error>
            <a-select
              size="large"
              show-search
              v-model="form[attrs.name]"
              v-bind="attrs"
              placeholder="Выберите салон"
              @input="attrs.change"
          >
             <a-select-option v-for="item in salons.data" :value="item.id" v-bind:key="item.id">
              {{item.name}}
            </a-select-option>
          </a-select>
        </FormGroup>

        <FormGroup v-slot="attrs" :form="form" field="relevance" show-custom-error>
                      <a-checkbox   
                      v-model="form[attrs.name]"
                      v-bind="attrs"
                      @input="attrs.change" 
                      value="1" 
                      name="Активен">
                        Активен
                      </a-checkbox>
                 
        </FormGroup>

         <FormGroup v-slot="attrs" :form="form" field="online_appointment"  show-custom-error>
                      <a-checkbox 
                      v-model="form[attrs.name]"
                      v-bind="attrs"
                      @input="attrs.change"
                       value="1" 
                       name="Онлайн-запись">
                        Онлайн-запись
                      </a-checkbox>
        </FormGroup>

        <FormGroup v-if="form.online_payment_id" v-slot="attrs" :form="form" field="online_payment_id" label="Онлайн-оплата" show-custom-error>
           <a-select
              size="large"
              placeholder="Выберите из списка"
              v-model="form[attrs.name]"
              v-bind="attrs"
              @input="attrs.change"
          >
             <!-- <a-select-option v-for="item in form.payemtns" :value="item.id" v-bind:key="item.id">
              {{item.name}}
            </a-select-option> -->
                <a-select-option  :value="1">
                   Разрешена 
                </a-select-option>
                <a-select-option  :value="2">
                   Запрещена
                </a-select-option>
          </a-select>
        </FormGroup>

        <FormGroup v-else v-slot="attrs" :form="form" field="online_payment" label="Онлайн-оплата" show-custom-error>
           <a-select
              size="large"
              placeholder="Выберите из списка"
              v-model="form[attrs.name]"
              v-bind="attrs"
              @input="attrs.change"
          >
             <!-- <a-select-option v-for="item in form.payemtns" :value="item.id" v-bind:key="item.id">
              {{item.name}}
            </a-select-option> -->
                <a-select-option  :value="1">
                   Разрешена 
                </a-select-option>
                <a-select-option  :value="2">
                   Запрещена
                </a-select-option>
          </a-select>
        </FormGroup>

        <FormGroup v-slot="attrs" :form="form" field="repeatedly_appointment_status_id" label="Уведомление о повторном визите" show-custom-error>
           <a-select
              size="large"
              placeholder=""
              v-model="form[attrs.name]"
              v-bind="attrs"
              @input="attrs.change"
          >
             <!-- <a-select-option v-for="item in form.appointment_statuses" :value="item.id" v-bind:key="item.id">
              {{item.name}}
            </a-select-option> -->
                <a-select-option  :value="1">
                   1 день после визита
                </a-select-option>
                <a-select-option  :value="2">
                   1 неделя после визита
                </a-select-option>
                <a-select-option  :value="3">
                   1 месяц после визита
                </a-select-option>
          </a-select>
        </FormGroup>

         <a-modal v-model="visible" title="Добавить сотрудников" @ok="handleOk">
                
            <a-form-model>
              <FormGroup v-slot="attrs" :form="form" field="cosmetologists_id" label="Выберите сотрудников" show-custom-error>

                  <a-select
                      size="large"
                      mode="multiple"
                      v-model="form[attrs.name]"
                      v-bind="attrs"
                      @input="attrs.change"
                  >
                      <a-select-option v-for="item in staff.data.filter(e => e.category.id != null)" :value="item.id" v-bind:key="item.id">
                      {{item.name}}
                       <!-- {{item.name}} -->
                      </a-select-option>
                  </a-select>

              </FormGroup>
          </a-form-model>
                <template slot="footer">
                  <a-button key="back" @click="handleCancel">
                    Отмена
                  </a-button>
                  <a-button key="submit" type="primary"  @click="showStaff">
                    Сохранить
                  </a-button>
                </template>
          </a-modal>

    

        </a-col>
        <a-col :span="6">
    
            <a-upload
              name="avatar"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            
    
            >
             
              <div >
                <a-icon :type=" 'plus'" />
                <div class="ant-upload-text">
                  Upload
                </div>
              </div>
            </a-upload>
          
         

        </a-col>
      </a-row>
    </div>
        
        
     
    <br>
         <div class="box-container">
        <a-tabs type="card" >
        <a-tab-pane key="1" tab="Косметологи">
         
                <!-- <ServiceCosmetologistLayout /> -->
                <template>
                    <div>
                    <PageTitle>
                        <template v-slot:default>Косметологи</template>
                        <template v-slot:button>
                          <a-button type="primary" icon="plus" size="large"   @click="showModal">Добавить косметолога</a-button>
                        </template>
                      </PageTitle>
                      
                      <a-table
                      bordered
                      :columns="serviceWorkersColumns"
                      :data-source="staffAdded"
                      :pagination="false"
                      >
                    
                      <a-button class="action" slot="action" slot-scope="id" type="link" icon="delete" @click.stop="deletedWorker(id)" color="red">Удалить</a-button>
                      </a-table>
                    </div>
              </template>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Расходники">
        
         
        </a-tab-pane>
         <a-tab-pane key="3" tab="Документы">
        
           
           
        </a-tab-pane>
        <a-tab-pane key="4" tab="Анамнез">
        
           
           
        </a-tab-pane>
        <a-tab-pane key="5" tab="Алгоритм поведения">
        
            
           
        </a-tab-pane>
      </a-tabs>
      </div> 

      </a-form-model>

    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import FormGroup from "@/UI/components/common/form/FormGroup.vue";
import ServiceCreateForm from "@/form/serviceCreate/serviceCreate";
import {serviceCreateTabs} from "@/utils/tabs";
import ServiceCosmetologistLayout from "@/UI/components/forms/serviceCreate/ServiceCosmetologistLayout.vue";
import {SalonsStore} from "@/store/modules/Salons";
import { ISalons} from "@/entity/salons/salons.types";
import PageTitle from "@/UI/components/common/PageTitle.vue";
import { IServicesCategory } from '@/entity/servicesCategory/services.category.types';
import {ServicesCategoryStore} from "@/store/modules/ServicesCategory";
import {WorkersStore} from "@/store/modules/Workers";
import {IWorkers, IWorkersListItem} from "@/entity/workers/workers.types";
import WorkerAddForm from "@/form/workerAdd/workerAdd";
import {SalaryStore} from "@/store/modules/Salary";
import {StatusesStore} from "@/store/modules/Status";
import {PositionStore} from "@/store/modules/Position";
import {CategoryStore} from "@/store/modules/Category";
import {message} from "ant-design-vue";
import {IPosition} from "@/entity/position/position.types";
import {IStatus} from "@/entity/status/status.types";
import {ICategory} from "@/entity/category/category.types";
import {ISalaryScheme} from "@/entity/salaryScheme/salaryScheme.types";
import {TablesStore} from "@/store/modules/Tables";
import {ITableColumn} from "@/entity/table/table.types";
import moment from 'moment';

@Component({
  components: {FormGroup, ServiceCosmetologistLayout, PageTitle},
  methods: {moment}
})
export default class ServiceCreateFormComponent extends Vue {
  @Prop() readonly form!: ServiceCreateForm;

    tabs = serviceCreateTabs;

    appointmantSeed   : number[];
    onlinepaymentSeed : number[];

    visible: boolean;
    staffAdded: object[];
    worker: IWorkersListItem | null = null;

    workerForm = new WorkerAddForm();
 
    constructor() {
          super();
          this.visible = false;
          this.staffAdded = [];
          this.appointmantSeed    = [1, 2, 3];
          this.onlinepaymentSeed  = [1, 2, 3];    
    }

    show(staff: IWorkersListItem): void {
        this.worker = staff;
    }

    showStaff() {
        var staff    = WorkersStore.workers!.data;
        var cosmetologists = this.form.cosmetologists_id;

          for(let i = 0; i < staff.length; i++)
          {
              for(let j = 0; j < cosmetologists.length; j++)
              {
                  if(staff[i].id == cosmetologists[j])
                  {
                    this.staffAdded.push(staff[i])
                  } 
              }
          }
          console.log(this.staffAdded);
          this.visible = false;
    }

    showModal() {
      this.visible = true;
    }

    handleOk(e:any) {
      console.log(e);
      this.visible = false;
    }

    handleCancel(e:any) {
      this.visible = false;
    }

    deletedWorker(id:number) {
        var staff    = WorkersStore.workers!.data;
        var cosmetologists = this.form.cosmetologists_id;

        for(let i = 0; i < staff.length; i++)
        {
            if(id == staff[i].id)
            {
                delete staff[i];
            }
        }
        for(let j = 0; j < cosmetologists.length; j++)
        {
            if(id == cosmetologists[j])
            {
                delete cosmetologists[j];
            } 
        }
    }

    handleTimeChange(value: any): void {
        this.form.service_duration = value.format('HH:mm');
    }

    get serviceWorkersColumns(): ITableColumn[] {
        return TablesStore.serviceWorkersColumns;
    }

    get staffLoaded(): boolean {
        return WorkersStore.workersLoaded;
    }
    get staff(): IWorkers | null {
        console.log("staf");
      console.log(WorkersStore.workers);

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

    async deleteWorker(id: number): Promise<void> {
    if ((await WorkersStore.delete(id)).status) {
        message.success('Сотрудник успешно удален');
        await WorkersStore.fetchAll({limit: 10, filter: {salon_id: parseInt(this.$route.params.id)}});
    } else  {
        message.error('Что то пошло не так...')
    }

    }

    get salons(): ISalons | null {
      return SalonsStore.salons;
    }

   get servicesCategory(): IServicesCategory | null {
    // var u = ServicesCategoryStore.serviceCategory;
     //console.log(u);
      return ServicesCategoryStore.serviceCategory;
    }
    
   async created(): Promise<void>{
    
    await SalonsStore.fetchAll({limit: 10});
    await ServicesCategoryStore.fetchAll();
    await WorkersStore.fetchAll({limit: 10});
  //  let res = WorkersStore.workers;
  //  console.log(res);
    await StatusesStore.fetchAll();
    await CategoryStore.fetchAll();
    await PositionStore.fetchAll();
    await SalaryStore.fetchAll();
    this.workerForm.setFormDataWithoutId(this.positions, this.categories, this.statuses, this.salary);
    console.log(this.workerForm);
  }
}

</script>

<style lang="scss" >
.avatar-uploader > .ant-upload {
  width: 228px;
  height: 228px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>