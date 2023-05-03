<template>
  <div>
    <template v-if="this.formReady">
      <PageTitle v-if="salon">
        <template v-slot:default>{{ salon.name }}</template>
        <template v-slot:button>
          <a-popconfirm placement="leftTop" title="Вы действительно хотите удалить студию?" @confirm="deleteSalon" ok-text="Удалить" cancel-text="Отмена">
            <a-button icon="delete" size="large">Удалить</a-button>
          </a-popconfirm>
        </template>
      </PageTitle>
      <div class="card-container">
        <a-tabs type="card" :default-active-key="tabs.find((el) => el.id === $route.name).id" @change="tabChanged">
          <a-tab-pane :tab="item.name" v-for="item in tabs" :key="item.id">
            <div class="box-container">
              <keep-alive>
                <router-view :salon="salon"></router-view>
              </keep-alive>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </template>
    <template v-else>
      <div>
        <a-alert
            message="Загрузка данных"
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
import {salonTabs} from "@/utils/tabs";
import {SalonsStore} from "@/store/modules/Salons";
import {ISalonsListItem} from "@/entity/salons/salons.types";
import {message} from "ant-design-vue";
import {RouterNameEnum} from "@/router/router.types";

import { mixins } from 'vue-class-component'
import { FormMix } from '@/UI/mixins/FormMix'

@Component({
  components: {PageTitle}
})
export default class SalonDetail extends mixins( FormMix ) {
  tabs = salonTabs
  get salon(): ISalonsListItem | null {
    return SalonsStore.salon;
  }
  async deleteSalon(): Promise<void> {
    if(await SalonsStore.delete({id: parseInt(this.$route.params.id)})) {
      message.success('Данные успешно удалены');
      await this.$router.push({name: RouterNameEnum.Salons});
    } else {
      message.error('Что то пошло не так...')
    }
  }
  async created(): Promise<void> {
    await SalonsStore.fetchData({filter: {id: parseInt(this.$route.params.id)}});
    if (this.salon) {
      document.title = this.salon.name + ' - *';
      this.$route.matched[this.$route.matched.length - 2]
          .meta.breadcrumb[this.$route.matched[this.$route.matched.length - 2]
          .meta.breadcrumb.length - 1].name = this.salon.name;
    }

    this.formReady = true
  }
  tabChanged(key: string): void {
    this.$router.push({name: key});
  }
}
</script>

<style lang="scss">
</style>
