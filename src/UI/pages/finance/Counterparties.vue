<template>
  <div class="counterparties">
    <div class="box-container">
      <PageTitle>
        <template v-slot:default>Контрагенты</template>
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
                     @click="() => { handleAddModal(true); }">Добавить контрагента
          </a-button>
        </template>
      </PageTitle>
      <a-table
          style="margin-top: 24px;"
          bordered
          :columns="columns"
          :data-source="counterparties != null && counterparties.data != undefined ? counterparties.data : []"
          :pagination="pagination"
          :loading="!counterpartiesLoaded"
          @change="handleTableChange"
          v-if="!uploading"
      >
        <div
          slot="filterDropdown"
          slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
          style="padding: 8px"
        >
          <a-input
            v-ant-ref="c => (searchInput = c)"
            :placeholder="`Поиск ${column.title}`"
            :value="selectedKeys[0]"
            style="width: 188px; margin-bottom: 8px; display: block;"
            @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
            @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
          />
          <a-button
            type="primary"
            icon="search"
            size="small"
            style="width: 90px; margin-right: 8px"
            @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
          >
            Поиск
          </a-button>
          <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">
            Сбросить
          </a-button>
        </div>
        <a-icon
          slot="filterIcon"
          slot-scope="filtered"
          type="search"
          :style="{ color: filtered ? '#108ee9' : undefined }"
        />

        <template slot="contact_person" slot-scope="contact_person, record"> {{ contact_person }} <br> {{ record.phone }} <br> {{ record.email }}</template>
        <template slot="requisites" slot-scope="requisites, record"><span v-if="record.inn">ИНН: {{ record.inn }}</span> <br> <span v-if="record.kpp">КПП: {{ record.kpp }}</span></template>
        <template slot="balance" slot-scope="balance, record">
          <div class="flex j_cont_sp">
            <span>{{ balance }} ₽</span> 
            <a-icon @click="() => { show(record) }" theme="twoTone" type="edit" />
          </div> 
        </template>
      </a-table>
      <template v-else><a-skeleton /></template>
    </div>

    <ModalWrapper title="Добавить контрагента" :show="showAddModal" @handleModal="handleAddModal">
      <CounterpartiesAddComponent :form="form" @cancel="showAddModal = false" @submit="submit"/>
    </ModalWrapper>

    <ModalWrapper title="Обновить контрагента" :show="showUpdateModal" @handleModal="handleUpdateModal">
      <CounterpartiesUpdateComponent :form="updateForm" @cancel="showUpdateModal = false" @submit="updateSubmit"/>
    </ModalWrapper>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import PageTitle from "@/UI/components/common/PageTitle.vue";
import {ITableColumn} from "@/entity/table/table.types";
import {TablesStore} from "@/store/modules/Tables";
import CounterpartiesAddForm from "@/form/finance/counterparties/CounterpartiesAddForm";
import CounterpartiesUpdateForm from "@/form/finance/counterparties/CounterpartiesUpdateForm";
import CounterpartiesAddComponent from "@/UI/components/forms/finance/counterparties/CounterpartiesAddComponent.vue";
import CounterpartiesUpdateComponent from "@/UI/components/forms/finance/counterparties/CounterpartiesUpdateComponent.vue";
import {CounterpartiesStore} from "@/store/modules/Counterparties";
import {CounterpartiesTypeStore} from "@/store/modules/CounterpartiesType";
import ModalWrapper from "@/UI/components/common/ModalWrapper.vue";
import {ICounterparties, ICounterpartiesListItem} from "@/entity/finance/counterparties/counterparties.types";
import {ICounterpartiesType, CounterpartiesTypeResponseType} from "@/entity/finance/counterparties/counterpartiesType.types";

@Component({
  components: {ModalWrapper, PageTitle, CounterpartiesAddComponent, CounterpartiesUpdateComponent}
})
export default class Counterparties extends Vue {
  form = new CounterpartiesAddForm();
  updateForm = new CounterpartiesUpdateForm();
  counterparty: ICounterpartiesListItem | null = null;
  searchText = '';
  searchInput: null;
  searchedColumn = '';
  showAddModal = false;
  showUpdateModal = false;
  filterData: any;
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
          console.log(event);
          //this.$router.push({name: RouterNameEnum.SalonDetail, params: {id: record.id}})
          alert('clicked');
        }
      }
    };
  }

  async created(): Promise<void> {
    await this.fetchTableItems();

    this.setPaginationTotal();
  }

  setPaginationTotal(): void {
    if(this.counterparties)
    {
      this.pagination.total = this.counterparties.total;
    }
  }

  async fetchTableItems(data?: any){
    let requestData: any = null;
    if(!data){
      requestData = {limit: this.pagination.pageSize};
    }else{
      requestData = data;
    }
    await CounterpartiesStore.fetchAll(requestData);
  }

  get columns(): ITableColumn[] {
    return TablesStore.financeCounterparties;
  }

  get counterparties(): ICounterparties | null {
    return CounterpartiesStore.counterparties;
  }

  get counterpartiesLoaded(): boolean {
    return true;
  }

  async handleAddModal(visible: boolean): Promise<void> {
    if(visible){
        this.form.setFormData(await this.counterpartiesTypes());
    }
    this.showAddModal = visible;
  }

  async handleUpdateModal(visible: boolean): Promise<void> {
    this.showUpdateModal = visible;

    if(visible){
      this.updateForm.setFormData(this.counterparty, await this.counterpartiesTypes());
    }
  }

  show(counterparty: ICounterpartiesListItem): void {
    this.counterparty = counterparty;
    this.handleUpdateModal(true);
    //this.visible = true;
  }

  async submit(): Promise<void> {
    if (await this.form.submit(CounterpartiesStore.create)) {
      this.fetchTableItems();
      this.showAddModal = false;
      this.form = new CounterpartiesAddForm();
    }
  }
  async updateSubmit(): Promise<void> {
    if (await this.updateForm.submit(CounterpartiesStore.update)) {
      this.fetchTableItems();
      this.showUpdateModal = false;
      if(this.counterparties && this.counterparties.data){
        if(this.counterparty){
          for(let i = 0; i < this.counterparties.data.length; i++){
            if(this.counterparty.id == this.counterparties.data[i].id){
              this.counterparty = this.counterparties.data[i];
              break;
            }
          }
        }
      }
      this.updateForm = new CounterpartiesUpdateForm();
    }
  }

  async handleSearch(selectedKeys: any, confirm: any, dataIndex: string) {
    //confirm();

    if(selectedKeys && selectedKeys.length){
      this.searchText = selectedKeys[0];
    }else{
      this.searchText = '';
    }

    let data: any = {
      limit: this.pagination.pageSize,
      filter: {}
    };

    data.filter[dataIndex] = this.searchText;

    this.fetchTableItems(data);
  }

  handleReset(clearFilters: any) {
    this.searchText = '';
    this.fetchTableItems();
    clearFilters();
  }

  async handleTableChange(pagination: any, filters: any, sorter: any) {
      let skip = 0;
      let data = this.filterData;

      if(pagination && pagination.current > 0){
        skip = (pagination.current - 1) * pagination.pageSize;
      }

      data.skip = skip;
      data.limit = pagination.pageSize;

      await this.fetchTableItems(data);
  }

  async counterpartiesTypes(data?: Record<string, any>): Promise<ICounterpartiesType[]> {
    if(!CounterpartiesTypeStore.items){
        await CounterpartiesTypeStore.fetchAll();
    }

    if(CounterpartiesTypeStore.items){
      return CounterpartiesTypeStore.items;
    }else{
      return [];
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
    let res = await CounterpartiesStore.import(this.importFile);
    if(res)
    {
      if(res.status)
      {
        await this.fetchTableItems();
        this.$message.success(res.response);
        this.setPaginationTotal();
      }else{
        this.$message.error(res.response);
      }
    }
    this.uploading = false;
  }

  async downloadFile(): Promise<void>
  {
    let res = await CounterpartiesStore.export();
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
  .flex{
    display: flex;
    align-items: center;

    &.j_cont_sp{
      justify-content: space-between;
    }
  }
</style>
