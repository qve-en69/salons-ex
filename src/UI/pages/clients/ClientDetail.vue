<template>
  <div>
    <template v-if="this.formReady">
      <PageTitle v-if="client">
        <template v-slot:default>{{ client.name }}</template>
        <template v-slot:button>
          <a-popconfirm placement="leftTop" :title="clientDeleteMessage(client.name)" @confirm="deleteClient" ok-text="Удалить" cancel-text="Отмена">
            <a-button icon="delete" size="large">Удалить</a-button>
          </a-popconfirm>
        </template>
      </PageTitle>
      <div class="card-container">
        <a-tabs type="card" :default-active-key="tabs.find((el) => el.id === $route.name).id" @change="tabChanged">
          <a-tab-pane :tab="item.name" v-for="item in tabs" :key="item.id">
            <div class="box-container">
              <keep-alive>
                <router-view :client="client"></router-view>
              </keep-alive>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </template>
    <template v-else>
      <div>
        <a-alert
            message="Загрузка данных клиента"
            type="info"
            show-icon
        />
      </div>
    </template>

  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import PageTitle from "@/UI/components/common/PageTitle.vue";
import {clientTabs} from "@/utils/tabs";

import { ClientsStore } from "@/store/modules/Clients";

import {IClientsListItem} from "@/entity/clients/clients.types";
import {message} from "ant-design-vue";
import {RouterNameEnum} from "@/router/router.types";
import { FormMix } from '@/UI/mixins/FormMix'

@Component({
  components: {PageTitle}
})
export default class ClientDetail extends  (FormMix) {
  formReady = false;

  clientDeleteMessage( client:string ):string {
    return 'Вы действительно хотите удалить '+ client
  }


  tabs = clientTabs
  get client(): IClientsListItem | null {
    return ClientsStore.client;
  }
  async deleteClient(): Promise<void> {
    if(await ClientsStore.delete({id: parseInt(this.$route.params.id)})) {
      message.success('Данные успешно удалены');
      await this.$router.push({name: RouterNameEnum.Clients});
    } else {
      message.error('Что то пошло не так...')
    }
  }
  async created(): Promise<void> {
    await ClientsStore.fetchData({filter: {id: parseInt(this.$route.params.id)}});
    if (this.client) {

      document.title = this.client.name + ' - ***';
      this.$route.matched[this.$route.matched.length - 2]
          .meta.breadcrumb[this.$route.matched[this.$route.matched.length - 2]
          .meta.breadcrumb.length - 1].name = this.client.name;

      this.formReady = true;
    }

  }
  tabChanged(key: string): void {
    this.$router.push({name: key});
  }
}
</script>

<style lang="scss">
</style>
