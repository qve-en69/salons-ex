<template>
  <div class="payment_articles">
    <div class="box-container">
      <PageTitle>
        <template v-slot:default>Статьи платежей</template>
        <template v-slot:button>
          <a-button icon="plus-circle" type="primary" size="large"
                     @click="() => { handleAddModal(true) }">Добавить статью
          </a-button>
        </template>
      </PageTitle>
      <a-table
          style="margin-top: 24px;"
          bordered
          :columns="columns"
          :data-source="paymentArticles != null && paymentArticles.data != undefined ? paymentArticles.data : []"
          :pagination="pagination"
          :loading="!paymentArticlesLoaded"
          :customRow="customRow"
          @change="handleTableChange"
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

        <template slot="name" slot-scope="name, record"> {{ name }} <br> <span class="under_name">{{ record.comment }}</span></template>
        <template slot="type" slot-scope="type, record">
          <div class="flex j_cont_sp">
            <span>{{ type }}</span> 
            <a-icon @click="() => { show(record) }" theme="twoTone" type="edit" />
          </div> 
        </template>
      </a-table>
    </div>

    <ModalWrapper title="Добавить статью" :show="showAddModal" @handleModal="handleAddModal">
      <PaymentArticlesAddComponent :form="form" @cancel="showAddModal = false" @submit="submit"/>
    </ModalWrapper>

    <ModalWrapper title="Обновить статью" :show="showUpdateModal" @handleModal="handleUpdateModal">
      <PaymentArticlesUpdateComponent :form="updateForm" @cancel="showUpdateModal = false" @submit="updateSubmit"/>
    </ModalWrapper>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import PageTitle from "@/UI/components/common/PageTitle.vue";
import {ITableColumn} from "@/entity/table/table.types";
import {TablesStore} from "@/store/modules/Tables";
import PaymentArticlesAddForm from "@/form/finance/payment_articles/PaymentArticlesAddForm";
import PaymentArticlesUpdateForm from "@/form/finance/payment_articles/PaymentArticlesUpdateForm";
import PaymentArticlesAddComponent from "@/UI/components/forms/finance/payment_articles/PaymentArticlesAddComponent.vue";
import PaymentArticlesUpdateComponent from "@/UI/components/forms/finance/payment_articles/PaymentArticlesUpdateComponent.vue";
import {PaymentArticlesStore} from "@/store/modules/PaymentArticles";
import {PaymentArticlesTypeStore} from "@/store/modules/PaymentArticlesType";
import ModalWrapper from "@/UI/components/common/ModalWrapper.vue";
import {IPaymentArticles, IPaymentArticlesListItem} from "@/entity/finance/payment_articles/paymentArticles.types";
import { IPaymentArticlesType } from "@/entity/finance/payment_articles/paymentArticlesType.types";

@Component({
  components: {ModalWrapper,PageTitle, PaymentArticlesAddComponent, PaymentArticlesUpdateComponent}
})
export default class PaymentArticles extends Vue {
  form = new PaymentArticlesAddForm();
  updateForm = new PaymentArticlesUpdateForm();
  paymentArticle: IPaymentArticlesListItem | null = null;
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
    this.fetchTableItems();
  } 

  get columns(): ITableColumn[] {
    return TablesStore.paymentArticles;
  }

  get paymentArticles(): IPaymentArticles | null {
    return PaymentArticlesStore.items;
  }

  get paymentArticlesLoaded(): boolean {
    return PaymentArticlesStore.itemsLoaded;
  }

  async submit(): Promise<void> {
    if (await this.form.submit(PaymentArticlesStore.create)) {
      this.fetchTableItems();
      this.showAddModal = false;
      this.form = new PaymentArticlesAddForm();
    }
  }
  
  async updateSubmit(): Promise<void> {
    if (await this.updateForm.submit(PaymentArticlesStore.update)) {
      this.fetchTableItems();
      this.showUpdateModal = false;
      if(this.paymentArticles && this.paymentArticles.data){
        if(this.paymentArticle){
          for(let i = 0; i < this.paymentArticles.data.length; i++){
            if(this.paymentArticle.id == this.paymentArticles.data[i].id){
              this.paymentArticle = this.paymentArticles.data[i];
              break;
            }
          }
        }
      }
      this.updateForm = new PaymentArticlesUpdateForm();
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

    if(dataIndex == 'type[name]'){
      dataIndex = 'type_name';
    }

    data.filter[dataIndex] = this.searchText;

    this.fetchTableItems(data);
  }

  handleReset(clearFilters: any) {
    this.searchText = '';
    this.fetchTableItems();
    clearFilters();
  }

  async fetchTableItems(data?: any){
    let requestData: any = null;
    if(!data){
      requestData = {limit: this.pagination.pageSize};
    }else{
      requestData = data;
    }

    return await PaymentArticlesStore.fetchAll(requestData);
  }

  async handleTableChange(pagination: any, filters: any, sorter: any) {
      let skip = 0;
      let data = this.filterData;

      if(pagination && pagination.current > 0){
        skip = (pagination.current - 1) * pagination.pageSize;
      }

      data.skip = skip;
      data.limit = pagination.pageSize;

      this.fetchTableItems(data);
  }

  async handleAddModal(visible: boolean): Promise<void> {
    if(visible){
        this.form.setFormData(await this.paymentArticlesTypes());
    }
    this.showAddModal = visible;
  }

  async paymentArticlesTypes(data?: Record<string, any>): Promise<IPaymentArticlesType[]> {
    if(!PaymentArticlesTypeStore.items){
        await PaymentArticlesTypeStore.fetchAll();
    }

    if(PaymentArticlesTypeStore.items){
      return PaymentArticlesTypeStore.items;
    }else{
      return [];
    }
  }

  async handleUpdateModal(visible: boolean): Promise<void> {
    this.showUpdateModal = visible;
    this.updateForm.setFormData(this.paymentArticle, await this.paymentArticlesTypes());
  }

  show(paymentArticle: IPaymentArticlesListItem): void {
    this.paymentArticle = paymentArticle;
    this.handleUpdateModal(true);
  }
}
</script>

<style lang="scss" scoped>
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
