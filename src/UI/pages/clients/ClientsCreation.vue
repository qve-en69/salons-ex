<template>
  <div>
    <template v-if="this.formReady">
      <div class="box-container">
        <PageTitle>
          <template v-slot:default>Создание клиента</template>
          <template v-slot:button>
            <a-button type="primary" icon="plus" size="large" :disabled="form.disabled" @click="create">Создать</a-button>
          </template>
        </PageTitle>
        <ClientCreateFormComponent :form="form"/>
      </div>
    </template>
    <template v-else>
      <a-alert
          message="Загрузка данных"
          type="info"
          show-icon
      />
    </template>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import PageTitle from "@/UI/components/common/PageTitle.vue";
import { ClientsStore } from "@/store/modules/Clients";
//import {SalonsStore} from "@/store/modules/Salons";
import { SourcesStore } from "@/store/modules/Sources";
import { ClientCategoryStore } from "@/store/modules/ClientsCategory";
import { RouterNameEnum } from "@/router/router.types";
import ClientCreateForm from "@/form/clientCreate/clientCreate";
import ClientCreateFormComponent from "@/UI/components/forms/clientCreate/ClientCreateFormComponent.vue";
//import { ISalons } from '@/entity/salons/salons.types';
import { ISources } from '@/entity/sources/sources.types';
import { ICategory } from '@/entity/category/category.types';

import { SalonsMix } from '@/UI/mixins/SalonsMix'
import { FormMix } from '@/UI/mixins/FormMix'

import { mixins } from "vue-class-component";
import { SalonsStore } from "@/store/modules/Salons";

@Component({
  components: {ClientCreateFormComponent, PageTitle}
})

export default class ClientsCreation extends mixins( SalonsMix, FormMix ) {
  form = new ClientCreateForm();

  get category(): ICategory[] {
    return ClientCategoryStore.category;
  }
  get source(): ISources[] {
    return SourcesStore.sources;
  }

  async create(): Promise<void> {
    if (await this.form.submit(ClientsStore.create)) {
      await this.$router.push({name: RouterNameEnum.Clients});
    }
  }
  async created(): Promise<void> {

    await SourcesStore.fetchAll();
    await ClientCategoryStore.fetchAll();
    await SalonsStore.fetchAll();

    if (this.source && this.category && this.salons) {
      this.form.setFormData(this.source, this.category, this.salons);
      this.formReady = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>