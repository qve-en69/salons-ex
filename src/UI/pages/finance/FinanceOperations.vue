<template>
  <div class="finance_operations">
    <div class="box-container">
      <PageTitle>
        <template v-slot:default>Финансовые операции</template>
        <template v-slot:button>
          <a-dropdown style="margin-right: 12px;">
            <a-button size="large">Операции с Excel <a-icon type="down" /></a-button>
            <a-menu slot="overlay">
              <a-menu-item @click="downloadFile">
                <a-icon type="download" />
                Выгрузить
              </a-menu-item>
              <a-menu-item @click="triggerUpload">
                <a-icon type="upload" />
                Загрузить
                <a-upload
                  :showUploadList="false"
                  ref="uploadEvent"
                  name="import_file"
                  :file-list="fileList"
                  :multiple="false"
                  :before-upload="beforeUpload"
                  @change="handleImportFileChange"
                >
                </a-upload>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <a-button icon="plus-circle" type="primary" size="large"
                     @click="() => { handleAddModal(true); }">Новый платеж
          </a-button>
        </template>
      </PageTitle>
      <FinanceOperationsFilterComponent :pagination="pagination" @setFilterData="setFilterData" @setPagination="setPagination" />
      <a-table
          style="margin-top: 24px;"
          bordered
          :columns="columns"
          :data-source="financeOperations != null && financeOperations.data != undefined ? financeOperations.data : []"
          :pagination="pagination"
          :loading="!financeOperationsLoaded"
          :customRow="customRow"
          @change="handleTableChange"
          v-if="!uploading"
      >
        <template slot="date" slot-scope="date, record"> <a href="javascript:void(0)" @click="() => { show(record) }">{{ date }}</a> </template>
        <template slot="target" slot-scope="target, record"> {{ target && target.name ? target.name : '-' }} </template>
        <template slot="sum" slot-scope="sum, record"> {{ sum }} ₽</template>
        <template slot="remainder" slot-scope="remainder, record"> {{ remainder }} ₽</template>
        <template slot="visit" slot-scope="visit, record">
          <a href="javascript:void(0)" @click="showVisit">{{ visit }}</a>
        </template>
      </a-table>
      <template v-else><a-skeleton /></template>
    </div>

    <ModalWrapper title="Новый платеж" :show="showAddModal" @handleModal="handleAddModal">
      <FinanceOperationsAddComponent :form="form" @cancel="showAddModal = false" @submit="submit" @searchTarget="searchTarget"/>
    </ModalWrapper>

    <ModalWrapper title="Обновить платеж" :show="showUpdateModal" @handleModal="handleUpdateModal">
      <FinanceOperationsUpdateComponent :form="updateForm" @cancel="showUpdateModal = false" @submit="updateSubmit" @searchTarget="searchTarget"/>
    </ModalWrapper>
  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import PageTitle from "@/UI/components/common/PageTitle.vue";
import ModalWrapper from "@/UI/components/common/ModalWrapper.vue";
import {ITableColumn} from "@/entity/table/table.types";
import {TablesStore} from "@/store/modules/Tables";
import {message} from "ant-design-vue";

import FinanceOperationsFilterComponent from "@/UI/components/filter/FinanceOperationsFilterComponent.vue";
import FinanceOperationsAddForm from "@/form/finance/finance_operations/FinanceOperationsAddForm";
import FinanceOperationsUpdateForm from "@/form/finance/finance_operations/FinanceOperationsUpdateForm";
import FinanceOperationsAddComponent from "@/UI/components/forms/finance/finance_operations/FinanceOperationsAddComponent.vue";
import FinanceOperationsUpdateComponent from "@/UI/components/forms/finance/finance_operations/FinanceOperationsUpdateComponent.vue";
import {FinanceOperationsStore} from "@/store/modules/FinanceOperations";
import {IFinanceOperations, IFinanceOperationsListItem} from "@/entity/finance/finance_operations/financeOperations.types";

import {CounterpartiesStore} from "@/store/modules/Counterparties";
import {ICounterpartiesListItem} from "@/entity/finance/counterparties/counterparties.types";

import {PaymentArticlesStore} from "@/store/modules/PaymentArticles";
import {IPaymentArticlesListItem} from "@/entity/finance/payment_articles/paymentArticles.types";

import {WorkersStore} from "@/store/modules/Workers";
import {IWorkersListItem} from "@/entity/workers/workers.types";

import {ClientsStore} from "@/store/modules/Clients";
import {IClientsListItem} from "@/entity/clients/clients.types";

import {CashboxStore} from "@/store/modules/Finance/Cashbox";
import {ICashboxListItem} from "@/entity/finance/cashbox/cashbox.types";

@Component({
  components: {ModalWrapper,PageTitle, FinanceOperationsAddComponent, FinanceOperationsUpdateComponent, FinanceOperationsFilterComponent}
})
export default class FinanceOperations extends Vue {
  form = new FinanceOperationsAddForm();
  updateForm = new FinanceOperationsUpdateForm();
  financeOperation: IFinanceOperationsListItem | null = null;
  searchText = '';
  searchedColumn = '';
  showAddModal = false;
  showUpdateModal = false;
  filterData: any;
  searchTimeOut: any;
  pagination = {
    showSizeChanger: true,
    pageSize: 10,
    total: 10,
  }
  fileList: any = [];
  importFile: any = null;
  uploading: boolean = false;

  constructor() {
    super();

    this.filterData = {
      limit: this.pagination.pageSize,
    }
  }

  customRow = (record: any) => {
    return {
      on: {
        click: (event: any) => {
          //this.$router.push({name: RouterNameEnum.SalonDetail, params: {id: record.id}})
          //alert('clicked');
        }
      }
    };
  }

  async created(): Promise<void> {
    this.fetchData();
  } 

  get cashboxes() {
    return CashboxStore.items;
  }

  get columns(): ITableColumn[] {
    return TablesStore.financeOperations;
  }

  get financeOperations(): IFinanceOperations | null {
    return FinanceOperationsStore.items;
  }

  get financeOperationsLoaded(): boolean {
    return FinanceOperationsStore.itemsLoaded;
  }

  async submit(): Promise<void> {
    if (await this.form.submit(FinanceOperationsStore.create)) {
      this.fetchData();
      this.showAddModal = false;
      this.form = new FinanceOperationsAddForm();
    }
  }

  @Watch('$store.state.salon_id', {immediate: true})
  async onSalonChange(): Promise<void> {
    this.fetchData();
  }

  async fetchData()
  {
    let data = {
      limit: this.pagination.pageSize,
      filter: {}
    }
    if(this.$store.state.salon_id)
    {
      data.filter = {'salon_id': this.$store.state.salon_id};
    }
    await FinanceOperationsStore.fetchAll(data);
  }
  
  async updateSubmit(): Promise<void> {
    if (await this.updateForm.submit(FinanceOperationsStore.update)) {
      this.fetchData();
      this.showUpdateModal = false;
      if(this.financeOperations && this.financeOperations.data){
        if(this.financeOperation){
          for(let i = 0; i < this.financeOperations.data.length; i++){
            if(this.financeOperation.id == this.financeOperations.data[i].id){
              this.financeOperation = this.financeOperations.data[i];
              break;
            }
          }
        }
      }
      this.updateForm = new FinanceOperationsUpdateForm();
    }
  }

  async handleTableChange(pagination: any, filters: any, sorter: any) {
      let skip = 0;
      let data = this.filterData;

      if(pagination && pagination.current > 0){
        skip = (pagination.current - 1) * pagination.pageSize;
      }

      data.skip = skip;
      data.limit = pagination.pageSize;

      await FinanceOperationsStore.fetchAll(data);
  }

  async paymentArticles(): Promise<IPaymentArticlesListItem[]> {
    if(!PaymentArticlesStore.items){
      await PaymentArticlesStore.fetchAll({limit: 10});
    }

    if(PaymentArticlesStore.items){
      return PaymentArticlesStore.items.data;
    }else{
      return [];
    }
  }

  async counterparties(data: Record<string, any>): Promise<ICounterpartiesListItem[]> {
    if(!CounterpartiesStore.counterparties){
      await CounterpartiesStore.fetchAll({limit: 10, filter: {name: data.value}});
    }

    if(CounterpartiesStore.counterparties){
      return CounterpartiesStore.counterparties.data;
    }else{
      return [];
    }
  }

  async clients(data: Record<string, any>): Promise<IClientsListItem[]> {
    if(!ClientsStore.clients){
        await ClientsStore.fetchAll({limit: 10, filter: {name: data.value}});
    }

    if(ClientsStore.clients){
      return ClientsStore.clients.data;
    }else{
      return [];
    }
  }

  async staff(data: Record<string, any>): Promise<IWorkersListItem[]> {
    if(!WorkersStore.workers){
      await WorkersStore.fetchAll({limit: 10, filter: {name: data.value}});
    }

    if(WorkersStore.workers){
      return WorkersStore.workers.data;
    }else{
      return [];
    }
  }

  async searchTarget(data: Record<string, any>): Promise<void> {
    clearTimeout(this.searchTimeOut);
    this.searchTimeOut = setTimeout(async () => {

      switch(data.type){
        case 1:
          this.form.targets = await this.counterparties(data);
          break;
        case 2:
          this.form.targets = await this.clients(data);
          break;
        case 3:
          this.form.targets = await this.staff(data);
          break;
        default:
          break;
      }
      this.updateForm.targets = this.form.targets;

    }, 600);
  }

  async handleAddModal(visible: boolean): Promise<void> {
    
    if(visible){
      if(this.cashboxes && this.cashboxes.total > 0){
        this.form.setFormData(await this.paymentArticles(), await this.counterparties({value: ''}), this.cashboxes.data);
      }else{
        message.error('Нет доступных касс.')
      }
    }
    
    this.showAddModal = visible;
  }

  async handleUpdateModal(visible: boolean): Promise<void> {
    if(visible){
      await CashboxStore.fetchAll({limit: this.pagination.pageSize});

      if(this.cashboxes && this.cashboxes.total > 0){
        this.updateForm.setFormData(await this.paymentArticles(), [], this.cashboxes.data, this.financeOperation);
      }else{
        message.error('Нет доступных касс.')
      }

      if(this.financeOperation && this.financeOperation.target){
        let type = this.financeOperation.target.id;
        await this.searchTarget({value: '', type: type});
      }
    }

    this.showUpdateModal = visible;

  }

  show(financeOperation: IFinanceOperationsListItem): void {
    this.financeOperation = financeOperation;
    this.handleUpdateModal(true);
  }

  showVisit(): void {
    alert('В разработке');
  }

  setPagination(val: any): void {
    this.pagination.total = val;
  }

  setFilterData(data: any): void {
    this.filterData = data;
  }
  
  setPaginationTotal(): void {
    if(this.financeOperations)
    {
      this.pagination.total = this.financeOperations.total;
    }
  }
  
  handleImportFileChange(info: any): void {
    /*if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.$message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      this.$message.error(`${info.file.name} file upload failed.`);
    }*/
  }

  beforeUpload(file: any): boolean {
    this.uploading = true;
    this.importFile = file;
    this.fileList = [file];
    this.confirmUploadFile();
    return false;
  }

  async uploadFile(): Promise<void>
  {
    let res = await FinanceOperationsStore.import(this.importFile);
    if(res)
    {
      if(res.status)
      {
        this.fetchData();
        this.$message.success(res.response);
        this.setPaginationTotal();
        if(res.additional && res.additional.length)
        {
          const node = this.$createElement;
          let nodes = [];

          for(let i = 0; i < res.additional.length; i++)
          {
            nodes.push(node('p', res.additional[i]));
          }

          this.$warning({
            title: 'Не удалось сохранить эти строки',
            content: node('div', {
              style: {
                'font-size': '12px',
                'height': '500px',
                'overflow-y': 'auto'
              }
            }, nodes),
            width: 560,
            maskClosable: true
          })
        }
      }else{
        this.$message.error(res.response);
      }
    }
    this.uploading = false;
  }

  async downloadFile(): Promise<void>
  {
    let res = await FinanceOperationsStore.export();
    if(res && !res.status)
    {
      this.$message.error(res.response);
    }else{
      let fileUrl = res.response;
      var fileLink = document.createElement('a');

      fileLink.href = fileUrl;
      fileLink.setAttribute('download', 'file.pdf');
      document.body.appendChild(fileLink);

      fileLink.click();
      fileLink.remove();
    }
  }

  confirmUploadFile(): void {
    if(window.confirm("Файл готов к загрузке. Продолжить загрузку?"))
    {
      this.uploadFile();
    }
    else
    {
      this.uploading = false;
      this.fileList = [];
      this.importFile = null;
    }
  }

  triggerUpload(): void 
  {
    let elem = this.$refs.uploadEvent;
    if(elem)
    {
      // @ts-ignore
      elem.$el.querySelector('input').click();
    }

  }
}
</script>

<style lang="scss">
  .ant-table {

    td {
      font-size: 12px;
    }
  }
  .flex{
    display: flex;
    align-items: center;

    &.j_cont_sp{
      justify-content: space-between;
    }
  }
  .under_name{
    color: #595959;
    font-size: 12px;
    opacity: .8;
  }
</style>
