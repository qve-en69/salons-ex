<template>
      <div>
       <PageTitle>
          <template v-slot:default>Сотрудники</template>
          <template v-slot:button>
            <a-button type="primary" icon="plus" size="large"   @click="showModal">Добавить сотрудника</a-button>
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

        <!-- <a-modal v-model="visible" title="Добавить сотрудников" @ok="handleOk">
        <a-form-model>
            <FormGroup v-slot="attrs" :form="form" field="cosmetologists_id" label="Выберите сотрудников" show-custom-error>

                <a-select
                    size="large"
                    mode="multiple"

                    v-model="form[attrs.name]"
                    v-bind="attrs"
                    @input="attrs.change"
                >
                    <a-select-option v-for="item in staff.data" :value="item.id" v-bind:key="item.id">
                    {{item.name }}
                    </a-select-option>
                </a-select>

            </FormGroup>
        </a-form-model>
              <template slot="footer">

                <a-button key="back" @click="handleCancel">
                  Отмена
                </a-button>
                <a-button key="submit" type="primary" :loading="loading" @click="showStaff">
                  Сохранить
                </a-button>
              </template>
        </a-modal> -->

      </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import PageTitle from "@/UI/components/common/PageTitle.vue";
import FormGroup from "@/UI/components/common/form/FormGroup.vue";
import {TablesStore} from "@/store/modules/Tables";
import {ITableColumn} from "@/entity/table/table.types";
import {message} from "ant-design-vue";
import {WorkersStore} from "@/store/modules/Workers";
import {IWorkers, IWorkersListItem} from "@/entity/workers/workers.types";
import WorkerAddForm from "@/form/workerAdd/workerAdd";
import {StatusesStore} from "@/store/modules/Status";
import {PositionStore} from "@/store/modules/Position";
import {SalaryStore} from "@/store/modules/Salary";
import {CategoryStore} from "@/store/modules/Category";
import {IPosition} from "@/entity/position/position.types";
import {IStatus} from "@/entity/status/status.types";
import {ICategory} from "@/entity/category/category.types";
import {ISalaryScheme} from "@/entity/salaryScheme/salaryScheme.types";
import ServiceCreateForm from "@/form/serviceCreate/serviceCreate";

@Component({
    components: { PageTitle, FormGroup}
})
export default class ServiceCosmetologistLayout extends Vue {
    form = new ServiceCreateForm();
    workerForm = new WorkerAddForm();
    visible: boolean;
    staffAdded: object[];
    worker: IWorkersListItem | null = null;

    constructor() {
          super();
          this.visible = false;
          this.staffAdded = [];
    }

    // async saveStaff(){
    //     await this.form.submit(ServicesCategoryStore.create);
    // }

    show(staff: IWorkersListItem): void {
        this.worker = staff;
    }

    showStaff() {
        
        // WorkersStore.workers!.data.forEach(el => {
        //    if(el.id === )
        // });
        //   statuses.forEach(el => this.statusList.push(el));
        
        // if(this.staffAdded)
        // {
        //     for(let i = 0; i < this.staffAdded.length; i++)
        //     {
        //         delete this.staffAdded[i];
        //     }
        // }

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
          console.log(this.form.cosmetologists_id+"cosmetologist in form");
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

    get serviceWorkersColumns(): ITableColumn[] {
        return TablesStore.serviceWorkersColumns;
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

    async deleteWorker(id: number): Promise<void> {
    if ((await WorkersStore.delete(id)).status) {
        message.success('Сотрудник успешно удален');
        await WorkersStore.fetchAll({limit: 10, filter: {salon_id: parseInt(this.$route.params.id)}});
    } else  {
        message.error('Что то пошло не так...')
    }

    }
      async created(): Promise<void> {
        await WorkersStore.fetchAll({limit: 10});
        let res = WorkersStore.workers;
        console.log(res);
            await StatusesStore.fetchAll();
            await CategoryStore.fetchAll();
            await PositionStore.fetchAll();
            await SalaryStore.fetchAll();
            this.workerForm.setFormDataWithoutId(this.positions, this.categories, this.statuses, this.salary);
    }



}
</script>
<style lang="scss" scoped>

</style>