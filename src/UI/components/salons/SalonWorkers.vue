<template>
  <div>
    <PageTitle>
      <template v-slot:default><span style="font-size: 24px;">Сотрудники</span></template>
      <template v-slot:button>
        <a-button icon="plus-circle" size="large" type="primary" @click="showAddModal = true">Добавить сотрудника</a-button>
      </template>
    </PageTitle>
    <a-table
        v-if="staffLoaded"
        bordered
        :columns="salonWorkersColumns"
        :data-source="staff.data"
        :pagination="pagination"
        :loading="!staffLoaded"
        :customRow="customRow"
    >
      <span slot="status" slot-scope="status">
          <a-tag
              :color="status.color"
          >
            {{status.name}}
          </a-tag>
      </span>
      <a-popconfirm slot="action" slot-scope="id" title="Вы действительно хотите удалить сотрудника?" @confirm="deleteWorker(id)" ok-text="Удалить" cancel-text="Отмена">
        <a-button class="action" type="link" icon="delete" color="red">Удалить</a-button>
      </a-popconfirm>
    </a-table>
    <DrawerWrapper :title="worker ? worker.fio : ''" :visible="visible" @close="onClose" @edit="onWorkerEdit" @delete="onWorkerDelete">
      <WorkerDetail :worker="worker" :status-name="statuses" :position="positions" :scheme="salary"/>
    </DrawerWrapper>
    <ModalWrapper title="Добавить сотрудника" :show="showAddModal" @handleModal="handleAddModal">
      <StaffAddFormComponent :form="form" @cancel="showAddModal = false" @submit="submit"/>
    </ModalWrapper>
    <ModalWrapper title="Редактировать сотрудника" :show="showUpdateModal" @handleModal="handleUpdateModal">
      <StaffUpdateFormComponent :form="updateForm" @cancel="showUpdateModal = false" @submit="updateSubmit"/>
    </ModalWrapper>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import PageTitle from "@/UI/components/common/PageTitle.vue";
import {ITableColumn} from "@/entity/table/table.types";
import {TablesStore} from "@/store/modules/Tables";
import {RouterNameEnum} from "@/router/router.types";
import DrawerWrapper from "@/UI/components/common/DrawerWrapper.vue";
import WorkerDetail from "@/UI/components/workerDetail/WorkerDetail.vue";
import ModalWrapper from "@/UI/components/common/ModalWrapper.vue";
import StaffAddFormComponent from "@/UI/components/forms/Staff/StaffAddFormComponent.vue";
import StaffUpdateFormComponent from "@/UI/components/forms/Staff/StaffUpdateFormComponent.vue";
import WorkerAddForm from "@/form/workerAdd/workerAdd";
import StaffUpdateForm from "@/form/staff/StaffUpdate";
import {WorkersStore} from "@/store/modules/Workers";
import {IRoles} from "@/entity/roles/roles.types";
import {RolesStore} from "@/store/modules/Roles";
import {IWorkers, IWorkersListItem} from "@/entity/workers/workers.types";
import {WORKER_STATUS} from "@/utils";
import {CategoryStore} from "@/store/modules/Category";
import {ICategory} from "@/entity/category/category.types";
import {StatusesStore} from "@/store/modules/Status";
import {PositionStore} from "@/store/modules/Position";
import {IPosition} from "@/entity/position/position.types";
import Position from "@/entity/position/position";
import {IStatus} from "@/entity/status/status.types";
import {SalaryStore} from "@/store/modules/Salary";
import {ISalaryScheme} from "@/entity/salaryScheme/salaryScheme.types";
import SalaryScheme from "@/entity/salaryScheme/salaryScheme";
import {message} from "ant-design-vue";
@Component({
  components: {StaffAddFormComponent, StaffUpdateFormComponent, ModalWrapper, WorkerDetail, DrawerWrapper, PageTitle}
})
export default class SalonWorkers extends Vue {
  form = new WorkerAddForm();
  updateForm = new StaffUpdateForm();
  workerStatuses = WORKER_STATUS;
  worker: IWorkersListItem | null = null;
  showAddModal = false;
  showUpdateModal = false;
  pagination = {
    showSizeChanger: true,
    pageSize: 10,
    total: 500,
  }
  visible = false;
  customRow = (record: IWorkersListItem) => {
    return {
      on: {
        click: (event: any) => {
          let target = event.target;
          if(target.nodeName != 'BUTTON'){
            this.show(record)
          }
        }
      }
    };
  }
  get salonWorkersColumns(): ITableColumn[] {
    return TablesStore.salonWorkersColumns;
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
  show(staff: IWorkersListItem): void {
    this.worker = staff;
    this.visible = true;
  }
  handleAddModal(visible: boolean): void {
    this.showAddModal = visible;
  }
  handleUpdateModal(visible: boolean): void {
    this.showUpdateModal = visible;
    this.updateForm.setFormData(this.positions, this.categories, this.statuses, this.salary, this.worker);
  }
  async deleteWorker(id: number): Promise<void> {
    if ((await WorkersStore.delete(id)).status) {
      message.success('Сотрудник успешно удален');
      await WorkersStore.fetchAll({limit: 10, filter: {salon_id: parseInt(this.$route.params.id)}});
    } else  {
      message.error('Что то пошло не так...')
    }
  }
  async submit(): Promise<void> {
    if (await this.form.submit(WorkersStore.create)) {
      await WorkersStore.fetchAll({limit: 10, filter: {salon_id: parseInt(this.$route.params.id)}});
      this.showAddModal = false;
      this.form = new WorkerAddForm();
    }
  }
  async updateSubmit(): Promise<void> {
    if (await this.updateForm.submit(WorkersStore.update)) {
      await WorkersStore.fetchAll({limit: 10, filter: {salon_id: parseInt(this.$route.params.id)}});
      this.showUpdateModal = false;
      if(this.staff && this.staff.data){
        if(this.worker){
          for(let i = 0; i < this.staff.data.length; i++){
            if(this.worker.id == this.staff.data[i].id){
              this.worker = this.staff.data[i];
              break;
            }
          }
        }
      }
      this.updateForm = new StaffUpdateForm();
    }
  }
  async created(): Promise<void> {
    await WorkersStore.fetchAll({limit: 10, filter: {salon_id: parseInt(this.$route.params.id)}});
    console.log('1');
    this.pagination.total = this.staff!.total;
    await StatusesStore.fetchAll();
    await CategoryStore.fetchAll();
    await PositionStore.fetchAll();
    await SalaryStore.fetchAll();
    this.form.setFormData(this.positions, this.categories, this.statuses, this.salary, +this.$route.params.id);
  }
  onClose(): void {
    this.visible = false;
    this.worker = null;
  }
  onWorkerEdit(): void {
    this.handleUpdateModal(this.visible);
  }
  onWorkerDelete(): void {
    if(this.worker){
      this.deleteWorker(this.worker.id);
      this.onClose();
    }
  }
}
</script>

<style lang="scss" scoped>
.action {
  color: #FF4D4F !important;
}
</style>
