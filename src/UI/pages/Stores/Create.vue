<template>
  <div>
    <template v-if="this.formReady">
      <div class="box-container">
        <PageTitle>
          <template v-slot:default>Добавить склад</template>
          <template v-slot:button>
            <a-button type="primary" icon="plus" size="large" :disabled="form.disabled" @click="create">Создать</a-button>
          </template>
        </PageTitle>
        <StoreCreateFormComponent :form="form"/>
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
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import PageTitle from "@/UI/components/common/PageTitle.vue"

import { FormMix } from '@/UI/mixins/FormMix'
import { PaginationMix } from '@/UI/mixins/PaginationMix'
import { StoreTypeMix } from "@/UI/mixins/Store/StoreTypeMix"
import { SalonsMix} from "@/UI/mixins/SalonsMix";

import { StoreTableMix } from "@/UI/mixins/Store/StoreTableMix";

import StoreCreateFormComponent from "@/UI/components/forms/Store/StoreCreateFormComponent.vue";
import StoreCreateForm from '@/form/StoreCreate/StoreCreate'
import { StoresTypes } from "@/store/modules/Warehouse/StoresTypes";
import { SalonsStore } from "@/store/modules/Salons";
import { StoresStore } from "@/store/modules/Warehouse/Warehouse";
import { RouterNameEnum } from "@/router/router.types";
/*import {ClientsStore} from "@/warehouse/modules/Clients";
*/

@Component({
  components: { PageTitle, StoreCreateFormComponent }
})

export default class Index extends mixins( FormMix, PaginationMix, StoreTypeMix, StoreTableMix, SalonsMix) {
  form = new StoreCreateForm();

  async create(): Promise<void> {
    if (await this.form.submit(StoresStore.create)) {
      await this.$router.push({name: RouterNameEnum.Stores});
    }
  }

  async created(): Promise<void> {
    await StoresTypes.fetchAll()
    await SalonsStore.fetchAll()

    if (this.storeTypes && this.salons) {
      this.form.setFormData(this.storeTypes, this.salons)
      this.formReady = true
    }
  }
}
</script>