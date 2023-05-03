<template>
  <div>
    <a-space size="middle">
      <slot name="search-start"></slot>
        <div class="">
          <div class="modal_label">Дата</div>
          <a-date-picker
            addon-before="с"
            style="width: 100%; height: 32px"
            placeholder="С"
            @change="(value) => { handleChange(value, 'date_from') }"
            @openChange="visibleHandler"
            :format="'DD.MM.YYYY'"
            size="default"
          />
        </div>
        <div class="">
          <div class="modal_label"> </div>
          <a-date-picker
            addon-before="по"
            style="width: 100%; height: 32px"
            placeholder="По"
            @change="(value) => { handleChange(value, 'date_to') }"
            @openChange="visibleHandler"
            :format="'DD.MM.YYYY'"
            size="default"
          />
        </div>
        <div class="">
          <div class="modal_label">Назначение</div>
          <a-select 
            :default-value="0" 
            style="width: 352px;" 
            @change="(value) => { handleChange(value, 'article_payment_id') }" 
            @dropdownVisibleChange="visibleHandler">

            <template v-for="(item, idx) in filter.types">
              <a-select-option :value="item.id" v-bind:key="idx">
                {{item.name}}
              </a-select-option>
            </template>

          </a-select>
        </div>
        <div class="">
          <div class="modal_label">Получатель</div>
          <a-select 
            :default-value="0" 
            style="width: 352px;" 
            @change="(value) => { handleChange(value, 'target_id'); changeTarget(value); }" 
            @dropdownVisibleChange="visibleHandler">

            <template v-for="(item, idx) in filter.targets">
              <a-select-option :value="item.id" v-bind:key="idx">
                {{item.name}}
              </a-select-option>
            </template>
            
          </a-select>
        </div>
    </a-space>
    <a-space size="middle" style="margin-top: 15px">
      <slot name="search-start"></slot>
        <div class="">
          <div class="modal_label">Касса</div>
          <a-select 
            :default-value="0" 
            style="width: 536px;" 
            @change="(value) => { handleChange(value, 'cashbox_id') }" 
            @dropdownVisibleChange="visibleHandler">

            <template v-for="(item, idx) in filter.cashboxes">
              <a-select-option :value="item.id" v-bind:key="idx">
                {{item.name}}
              </a-select-option>
            </template>
            
          </a-select>
        </div>
        <div class="">
          <div class="modal_label">Поиск по номеру {{ targetName.toLowerCase() }}</div>

            <a-input
                size="default"
                style="width: 536px;"
                v-model="targetValue"
                v-mask="['+7 (###) ###-##-##']"
                @change="(value) => { handleChange(value, 'target_value'); }"
            >
            </a-input>
        </div>
      <slot name="search-end"></slot>
    </a-space>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {PaymentArticlesStore} from "@/store/modules/PaymentArticles";
import {IPaymentArticlesListItem} from "@/entity/finance/payment_articles/paymentArticles.types";
import {CashboxStore} from "@/store/modules/Finance/Cashbox";
import {ICashboxListItem} from "@/entity/finance/cashbox/cashbox.types";
import {FinanceOperationsStore} from "@/store/modules/FinanceOperations";

import Filters from "@/entity/filters/filters";
@Component
export default class FinanceOperationsFilterComponent extends Vue {
  //@Prop({required: true}) readonly filters!: Filters;
  @Prop({required: false}) readonly pagination!: Record<string, any>;
  filter: any = {};
  filterData: any = {};
  targetValue = '';
  targetName = 'Контрагента';
  timer: any;

  async created() {

    let paymentArticles = await this.paymentArticles();
    let types = [ { id: 0, name: 'Все' } ];
    if(paymentArticles.length){
      for(var i = 0; i < paymentArticles.length; i++){
        types.push(paymentArticles[i]);
      }
    }

    let cashboxes = await this.cashboxes();
    let cashboxesFilters = [ { id: 0, name: 'Все' } ];
    if(cashboxes && cashboxes){
      for(var i = 0; i < cashboxes.length; i++){
        cashboxesFilters.push(cashboxes[i]);
      }
    }

    this.filter = {
      'cashboxes': cashboxesFilters,
      'types': types,
      'targets': [ { id: 0, name: 'Не указано' }, { id: 1, name: 'Контрагент' }, { id: 2, name: 'Клиент' }, { id: 3, name: 'Сотрудник' } ],
    };
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
  async cashboxes(): Promise<ICashboxListItem[]> {
    if(!CashboxStore.items){
      await CashboxStore.fetchAll({limit: 20});
    }

    if(CashboxStore.items){
      return CashboxStore.items.data;
    }else{
      return [];
    }
  }

  changeTarget(value: string): void {
    for(let i = 0; i < this.filter.targets.length; i++)
    {
      if(value && value == this.filter.targets[i].id)
      {
        this.targetName = this.filter.targets[i].name + 'а';
      } 
      else if(!value && !this.filter.targets[i].id)
      {
        this.targetName = 'Контрагента';
      }
    }
  }

  handleChange(value: string, code: string, event?: any): void {
    let val: any = value;
    if(code.includes('date') && val){
      val = val.format('DD.MM.YYYY');
    }

    if(code == 'target_value')
    {
      val = val.target.value;
      //this.targetValue = val;
    }

    if(this.filterData[code] != undefined && (val == '0' || !val)){
      delete this.filterData[code]; 
    }else{
      if(code == 'active'){
        this.filterData[code] = val == '1' ? true : false;
      }else{
        this.filterData[code] = val;
      }
    }

    let data: Record<string, any> = {
      limit: this.pagination.pageSize,
      filter: this.filterData
    };

    clearTimeout(this.timer);
    this.timer = setTimeout(async () => {

      this.renderFinanceOperations(data);

    }, 600);
  }

  visibleHandler(open: any): void {
    let element = document.getElementsByClassName('layout ant-layout-content');

    if(open){
      element[0].classList.add('disable-scroll');
    }else{
      element[0].classList.remove('disable-scroll');
    }
  }

  async renderFinanceOperations(data: Record<string, any>): Promise<void>{
    await FinanceOperationsStore.fetchAll(data);

      console.log(FinanceOperationsStore.items)
    if(FinanceOperationsStore.items){
      console.log(FinanceOperationsStore.items)
      this.$emit('setPagination', FinanceOperationsStore.items.total);
    }
  }
  
}
</script>

<style lang="scss" scoped>
.modal_label {
  margin-bottom: 8px;
  min-height: 22px;
}
</style>