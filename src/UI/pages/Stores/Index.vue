<template>
  <BaseDataForm :formReady='this.formReady'>
        <PageTitle>
          <template v-slot:default>Склады</template>
          <template v-slot:button>
            <a-button icon="plus-circle" type="primary"
                      @click="$router.push({name: $routeRules.CreateStore})">Добавить склад
            </a-button>
          </template>
        </PageTitle>
        <a-table
            style="margin-top: 24px;"
            bordered
            :columns="columns"
            :data-source="stores != undefined && stores != null ? stores.data : []"
            :pagination="AppPageParams"
            :loading="!this.tableLoad"
            @change="handleTableChange"
        >
        <div slot="menu">
          <a-icon type="menu" />
        </div>
         <a slot="action" slot-scope="text, record">
           <div>
             <a-icon type="swap" />
             переместить товары
             <AppSimpleLink :id="record.id" routeLink="StoreDetail" >
               <a-icon type="edit"  style="margin-left: 10px"/>
             </AppSimpleLink>
           </div>
        </a>

        </a-table>
  </BaseDataForm>


</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import  PageTitle  from "@/UI/components/common/PageTitle.vue"

import { StoreMix } from "@/UI/mixins/Store/StoreMix"
import { ProxyDataForm } from '@/UI/components/Helpers/ProxyDataForm'
import { StoreTableMix } from "@/UI/mixins/Store/StoreTableMix";
import { StoresStore } from "@/store/modules/Warehouse/Warehouse";
import  AppSimpleLink from '@/UI/components/Link/AppSimpleLink.vue'
import BaseDataForm from '@/UI/components/Helpers/BaseForm/BaseDataForm.vue';

@Component({
    components: { PageTitle, AppSimpleLink, BaseDataForm },

})
export default class Index extends mixins(  ProxyDataForm, StoreMix, StoreTableMix ) {
  async created(): Promise<void> {
    this.tableLoad = false
    await StoresStore.fetchAll({limit:this.AppPageParams.pageSize})
    this.formReady = true
    this.tableLoad = true
  }

}
</script>