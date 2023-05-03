<template>
  <div class="cashboxes">
    <Breadcrumb @showAddCashbox="handleCashboxAddModal" />
    <template v-if="cashboxes != null && cashboxes.data != null">
      <div class="box-container" v-for="(item, index) in cashboxes.data" v-bind:key="index">
        <PageTitle>
          <template v-slot:default>{{ item.name }} <div style="cursor: pointer; margin-left: 15px;"><a-icon style="font-size: 19px;" @click="() => { showUpdateModal(item); }" type="edit" theme="twoTone" /></div></template>
        </PageTitle>
        <div class="flex">
          <div class="operations">
            <div class="operations_list">

              <div class="operations_item flex j_cont_sp" v-for="(operation, opIndex) in item.finance_operations" v-bind:key="opIndex">
                <div class="operation_day">
                  <span>{{ operation.week }}</span>
                </div>
                <div class="operation_date">
                  <a href="javascript:void(0)">{{ operation.date_formated }}</a>
                </div>
                <div class="operation_sum">
                  <span>{{ operation.sum }} ₽</span>
                </div>
              </div>

            </div>
            <div class="transaction_add">
              <button type="button" class="transaction_add__btn" @click="() => { handlePaymentAddModal(true, item.id) }">Новый платеж</button>
            </div>
          </div>
          <div class="chart">
            <LineChartComponent :index="Math.floor(Math.random() * 99999)" :data="item.chart_data"></LineChartComponent>
            <div class="cashbox_statistics flex j_cont_sp">
              <div class="statistics_item">
                <div class="title">Сейчас в кассе</div>
                <div class="value">{{ item.balance }} ₽</div>
              </div>
              <div class="statistics_item">
                <div class="title">Доходов за месяц</div>
                <div class="value">{{ item.total_inflow }} ₽</div>
              </div>
              <div class="statistics_item">
                <div class="title">Расходов за месяц</div>
                <div class="value">{{ item.total_outflow }} ₽</div>
              </div>
            </div>
          </div>
          <div class="pie_chart">
            <div class="title">
              Доходы/Расходы
            </div>
            <div class="description">
              Ниже приведена детализация по основным статьям доходов и расходов
            </div>
            <div class="flex j_cont_sa">
              <PieChartComponent :index="Math.floor(Math.random() * 99999)" :data="item.pie_data.inflow"></PieChartComponent>
              <PieChartComponent :index="Math.floor(Math.random() * 99999)" :data="item.pie_data.outflow"></PieChartComponent>
            </div>
            <div class="transaction_transfer">
              <button type="button" class="transaction_transfer__btn" @click="() => { showTransferModal(item.id, index) }" >Перевести средства</button>
            </div>
          </div>
        </div>
      </div>
    </template>
    
    <ModalWrapper title="Добавить кассу" :show="addCashboxModalVisible" @handleModal="handleCashboxAddModal">
      <CashboxAddComponent :form="form" @cancel="addCashboxModalVisible = false" @submit="submit"/>
    </ModalWrapper>
    <ModalWrapper title="Изменить кассу" :show="updateCashboxModalVisible" @handleModal="handleCashboxUpdateModal">
      <CashboxUpdateComponent :form="updateForm" @cancel="updateCashboxModalVisible = false" @submit="updateSubmit" @deleteCashbox="deleteCashbox"/>
    </ModalWrapper>
    <ModalWrapper title="Перевести средства" :show="transferModalVisible" @handleModal="handleCashboxTransferModal">
      <CashboxTransferComponent :form="transferForm" @cancel="transferModalVisible = false" @submit="transferSubmit"/>
    </ModalWrapper>

    <ModalWrapper title="Новый платеж" :show="addNewPaymentModalVisible" @handleModal="handlePaymentAddModal">
      <FinanceOperationsAddComponent :form="paymentForm" @cancel="addNewPaymentModalVisible = false" @submit="paymentAddSubmit" @searchTarget="searchTarget"/>
    </ModalWrapper>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import PageTitle from "@/UI/components/common/PageTitle.vue";
import LineChartComponent from '@/UI/components/finance/LineChartComponent.vue';
import PieChartComponent from '@/UI/components/finance/PieChartComponent.vue';
import Breadcrumb from "@/UI/components/finance/FinanceBreadcrumbLine.vue";
import ModalWrapper from "@/UI/components/common/ModalWrapper.vue";
import CashboxAddForm from "@/form/finance/cashbox/CashboxAddForm";
import CashboxUpdateForm from "@/form/finance/cashbox/CashboxUpdateForm";
import CashboxTransferForm from "@/form/finance/cashbox/CashboxTransferForm";
import CashboxAddComponent from "@/UI/components/forms/finance/cashbox/CashboxAddComponent.vue";
import CashboxUpdateComponent from "@/UI/components/forms/finance/cashbox/CashboxUpdateComponent.vue";
import CashboxTransferComponent from "@/UI/components/forms/finance/cashbox/CashboxTransferComponent.vue";
import {CashboxTypesStore} from "@/store/modules/Finance/CashboxTypes";
import {CashboxStore} from "@/store/modules/Finance/Cashbox";
import {UserStore} from "@/store/modules/User";
import {ICashboxListItem} from "@/entity/finance/cashbox/cashbox.types";
import {message} from "ant-design-vue";

import FinanceOperationsAddComponent from "@/UI/components/forms/finance/finance_operations/FinanceOperationsAddComponent.vue";
import FinanceOperationsAddForm from "@/form/finance/finance_operations/FinanceOperationsAddForm";
import {FinanceOperationsStore} from "@/store/modules/FinanceOperations";

import {CounterpartiesStore} from "@/store/modules/Counterparties";
import {ICounterpartiesListItem} from "@/entity/finance/counterparties/counterparties.types";

import {PaymentArticlesStore} from "@/store/modules/PaymentArticles";
import {IPaymentArticlesListItem} from "@/entity/finance/payment_articles/paymentArticles.types";

import {WorkersStore} from "@/store/modules/Workers";
import {IWorkersListItem} from "@/entity/workers/workers.types";

import {ClientsStore} from "@/store/modules/Clients";
import {IClientsListItem} from "@/entity/clients/clients.types";

@Component({
  components: {
    PageTitle, 
    LineChartComponent, 
    PieChartComponent, 
    Breadcrumb, 
    ModalWrapper, 
    CashboxAddComponent, 
    CashboxUpdateComponent,
    CashboxTransferComponent,
    FinanceOperationsAddComponent
  }
})
export default class AccountsAndCashboxes extends Vue {
  form = new CashboxAddForm();
  updateForm = new CashboxUpdateForm();
  transferForm = new CashboxTransferForm();
  paymentForm = new FinanceOperationsAddForm();
  addCashboxModalVisible = false;
  updateCashboxModalVisible = false;
  transferModalVisible = false;
  addNewPaymentModalVisible = false;
  searchText = '';
  searchTimeOut: any;
  pagination = {
    //showSizeChanger: true,
    pageSize: 20,
    total: 20,
  }

  async created() {
    await CashboxStore.fetchAll({limit: this.pagination.pageSize});
    //await UserStore.fetch();
  }

  async submit(): Promise<void> {
    if (await this.form.submit(CashboxStore.create)) {
      await CashboxStore.fetchAll({limit: this.pagination.pageSize});
      this.addCashboxModalVisible = false;
      this.form = new CashboxAddForm();
    }
  }

  async paymentAddSubmit(): Promise<void> {
    if (await this.paymentForm.submit(FinanceOperationsStore.create)) {
      await CashboxStore.fetchAll({limit: this.pagination.pageSize});
      this.addNewPaymentModalVisible = false;
      this.paymentForm = new FinanceOperationsAddForm();
    }
  }

  async updateSubmit(): Promise<void> {
    if (await this.updateForm.submit(CashboxStore.update)) {
      await CashboxStore.fetchAll({limit: this.pagination.pageSize});
      this.updateCashboxModalVisible = false;
      this.updateForm = new CashboxUpdateForm();
    }
  }

  async transferSubmit(): Promise<void> {
    if (await this.transferForm.submit(CashboxStore.transfer)) {
      await CashboxStore.fetchAll({limit: this.pagination.pageSize});
      this.transferModalVisible = false;
      this.transferForm = new CashboxTransferForm();
    }
  }

  get cashboxes() {
    return CashboxStore.items;
  }


  async handlePaymentAddModal(visible: boolean, id?: number): Promise<void> {
    if(visible){
      if(this.cashboxes){
        this.paymentForm.setFormData(await this.paymentArticles(), await this.counterparties({value: ''}), this.cashboxes.data, id);
      }
    }
    
    this.addNewPaymentModalVisible = visible;
  }

  async handleCashboxAddModal(visible: boolean): Promise<void> {
    if(visible)
    {
      await this.fetchCashboxTypes();

      if(CashboxTypesStore.itemsLoaded){
        this.form.setFormData(CashboxTypesStore.items)
      }
    }

    this.addCashboxModalVisible = visible;
  }

  handleCashboxUpdateModal(visible: boolean): void {
    this.updateCashboxModalVisible = visible
  }

  handleCashboxTransferModal(visible: boolean): void {
    this.transferModalVisible = visible
  }

  async fetchCashboxTypes(): Promise<void>
  {
    if(!CashboxTypesStore.itemsLoaded){
      await CashboxTypesStore.fetchAll();
    }
  }

  showTransferModal(id: number, index: number): void {

    if(this.cashboxes){
      let targetId: number | null;
      if(this.cashboxes.data[index + 1]){
        targetId = this.cashboxes.data[index + 1].id;
      }else if(this.cashboxes.data[index - 1]){
        targetId = this.cashboxes.data[index - 1].id;
      }else{
        targetId = id;
      }
      this.transferForm.setFormData(this.cashboxes.data, id, targetId);
    }

    this.transferModalVisible = true;
  }

  async showUpdateModal(record: ICashboxListItem): Promise<void> {

    await this.fetchCashboxTypes();

    if(CashboxTypesStore.itemsLoaded){
      this.updateForm.setFormData(CashboxTypesStore.items, record)
    }
    this.updateCashboxModalVisible = true;
  }

  async deleteCashbox(id: number): Promise<void>
  {
    let response = await CashboxStore.delete(id);
    if (response && response.status) {
      message.success('Касса успешно удалена');
      await CashboxStore.fetchAll({limit: this.pagination.pageSize});
    } else  {
      message.error(response.response)
    }
  }

  async searchTarget(data: Record<string, any>): Promise<void> {
    
    clearTimeout(this.searchTimeOut);
    this.searchTimeOut = setTimeout(async () => {

      switch(data.type){
        case 1:
          this.paymentForm.targets = await this.counterparties(data);
          break;
        case 2:
          this.paymentForm.targets = await this.clients(data);
          break;
        case 3:
          this.paymentForm.targets = await this.staff(data);
          break;
        default:
          break;
      }

    }, 600);
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
    if(!CounterpartiesStore.counterparties || data.value){
      await CounterpartiesStore.fetchAll({limit: 10, filter: {name: data.value}});
    }

    if(CounterpartiesStore.counterparties){
      return CounterpartiesStore.counterparties.data;
    }else{
      return [];
    }
  }

  async clients(data: Record<string, any>): Promise<IClientsListItem[]> {
    if(!ClientsStore.clients || data.value){
        await ClientsStore.fetchAll({limit: 10, filter: {name: data.value}});
    }

    if(ClientsStore.clients){
      return ClientsStore.clients.data;
    }else{
      return [];
    }
  }

  async staff(data: Record<string, any>): Promise<IWorkersListItem[]> {
    if(!WorkersStore.workers || data.value){
      await WorkersStore.fetchAll({limit: 10, filter: {name: data.value}});
    }

    if(WorkersStore.workers){
      return WorkersStore.workers.data;
    }else{
      return [];
    }
  }

}
</script>

<style lang="scss" scoped>
  .box-container{
    
    margin: 24px 0 0 0;

    &:first-child{
      margin: 0;
    }
  }
  .line_wrap{
    width: 500px;
    height: 250px;
  }
  .operations{
    min-width: 240px;
    margin-right: 24px;
  }
  .operations_item{
    padding: 16px 0px;
    border-bottom: 1px solid #F0F0F0; 

    &:first-child{
      padding: 0px 0px 16px 0px;
    }

    &:last-child{
      border: none;
    }
  }
  .flex{
    display: flex;
    align-items: center;

    &.j_cont_sp{
      justify-content: space-between;
    }

    &.j_cont_sa{
      justify-content: space-around;
    }
  }
  .transaction_add, .transaction_transfer{
    margin-top: 18px;
    .transaction_add__btn, .transaction_transfer__btn{
      padding: 8px 62px;
      min-width: 240px;
      background-color: transparent;
      border: 1px solid #D9D9D9;
      border-radius: 2px;
      cursor: pointer;
      font-size: 16px;

      &::focus{
        outline:none;
      }
    }
  }
  .operation_day{
    background-color: #E6F7FF;
    border: 1px solid #91D5FF;
    border-radius: 2px;
    padding: 0px 8px;

    span{
      font-size: 12px;
      line-height: 20px;
      color: #1890FF; 
    }
  }

  .operation_date{
    a{
      font-size: 14px;
      line-height: 22px;
    }
  }

  .operation_sum{
    span{
      font-size: 14px;
      line-height: 22px;
    }
  }

  .cashbox_statistics{
    margin: 24px 0 0 0;
  }

  .statistics_item{
    .title{
      font-size: 14px;
      color: #8C8C8C;
      margin: 0px 0px 5px 0px;
    }
    .value{
      font-size: 24px;
      line-height: 32px;
      color: #262626;
    }
  }
  .pie_chart{
    margin-left: 26px;
    align-self: baseline;
    .title{
      font-size: 16px;
      line-height: 24px;
      margin: 0 0 6px 0;
    }
    .description{
      color: #8C8C8C;
      font-size: 12px;
      line-height: 20px;
      margin: 0 0 16px 0;
    }
  }
</style>
