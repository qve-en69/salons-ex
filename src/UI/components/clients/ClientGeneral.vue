<template>
  <div>
    <template v-if="this.formReady">
        <PageTitle>
          <template v-slot:default><span style="font-size: 24px;">Общее</span></template>
          <template v-slot:button>
              <a-button type="primary" size="large" @click="submit" :disabled="form.disabled">Сохранить</a-button>
          </template>
        </PageTitle>
        <a-row :gutter="[68,8]">
          <a-col :span="14">
            <ClientGeneralFormComponent :form="form"/>
          </a-col>
          <br>
          <a-col :span="10">
                <Badge v-for="item in calls" :title="item.title">
                  <span>{{ item.text }}</span>
                </Badge>
          </a-col>
        </a-row>
    </template>
    <template v-else>

    </template>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import { mixins } from 'vue-class-component'

import PageTitle from "@/UI/components/common/PageTitle.vue";
import ClientGeneralForm from "@/form/clientGeneral/clientGeneral";
import ClientGeneralFormComponent from "@/UI/components/forms/clientGeneral/ClientGeneralForm.vue";
import {IClientsListItem} from "@/entity/clients/clients.types";

/*import { ISalons } from '@/entity/salons/salons.types';
import {SalonsStore} from "@/store/modules/Salons"*/

import { ISources } from '@/entity/sources/sources.types';
import { ICategory } from '@/entity/category/category.types';
import { ISalons } from '@/entity/salons/salons.types';

import { ClientsStore } from "@/store/modules/Clients";


import { SourcesStore } from '@/store/modules/Sources';
import { CategoryStore } from '@/store/modules/Category';
import { SalonsStore } from '@/store/modules/Salons'

import Badge from "@/UI/components/common/Badge.vue";
import { ClientCategoryStore} from "@/store/modules/ClientsCategory";
import { RouterNameEnum } from "@/router/router.types";
import { FormMix } from '@/UI/mixins/FormMix'


@Component({
  components: {ClientGeneralFormComponent, Badge, PageTitle}
})
export default class ClientGeneral extends mixins(FormMix) {
  @Prop() readonly client!: IClientsListItem;
  
  calls = [{title: 'Продано клиенту', text: '5 750 руб.'},
  {title: 'Оплачено', text: '5 000 руб.'},
  {title: 'Долг', text: '750 руб.'},
  {title: 'Визитов', text: '6'},
  {title: 'NPS', text: '27%'},
  {title: 'Дата последнего визита', text: '20.06.2021'},
  {title: 'Дата ближайшего визита', text: '29.07.2021'},
  {title: 'Дата регистрации', text: '01.05.2020'}];

  
  form = new ClientGeneralForm();
  
  get categories(): ICategory[] {
    return ClientCategoryStore.category;
  }
  get sources(): ISources[] {
    return SourcesStore.sources;
  }
  async submit(): Promise<void> {
    await this.form.submit(ClientsStore.update);
    await this.$router.push({name: RouterNameEnum.Clients});
  }
  async created(): Promise<void> {
    await ClientCategoryStore.fetchAll()
    await SourcesStore.fetchAll()
    //await SalonsStore.fetchAll()

    if (this.sources && this.categories && this.client) {
      console.log('setFormData ****')
      this.form.setFormData(this.sources, this.categories, this.client);
    }
    this.formReady = true;
  }
}
</script>

<style lang="scss" scoped>
</style>