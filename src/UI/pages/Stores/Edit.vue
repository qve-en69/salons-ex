<template>
  <div>
    <template v-if="this.formReady">
      <div class="box-container">
        <PageTitle>
          <template v-slot:default> склад - <p>{{form.name}}</p></template>

          <template v-slot:button>
            <a-button type="primary" icon="file" :disabled="form.disabled" @click="submit">Сохранить</a-button>
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
import StoreCreateFormComponent from "@/UI/components/forms/Store/StoreCreateFormComponent.vue";
import { StoreMix } from "@/UI/mixins/Store/StoreMix";
import { StoreTypeMix } from "@/UI/mixins/Store/StoreTypeMix";
import { StoreTableMix } from "@/UI/mixins/Store/StoreTableMix";
import { StoresTypes } from "@/store/modules/Warehouse/StoresTypes";
import { SalonsStore } from "@/store/modules/Salons";
import StoreCreateForm from "@/form/StoreCreate/StoreCreate";
import { SalonsMix } from "@/UI/mixins/SalonsMix";

import { RouterNameEnum } from "@/router/router.types";
import { StoresStore } from "@/store/modules/Warehouse/Warehouse";

@Component({
  components: { PageTitle, StoreCreateFormComponent }
})
export default class Index extends mixins( FormMix, StoreMix, StoreTypeMix, StoreTableMix, SalonsMix ) {
  form = new StoreCreateForm();

  async submit(): Promise<void> {
    await this.form.submit(StoresStore.update);
    await this.$router.push({name: RouterNameEnum.Stores});
  }

  async created(): Promise<void> {
    await SalonsStore.fetchAll()
    await StoresTypes.fetchAll()
    await SalonsStore.fetchAll()
    await StoresStore.fetchData({filter: {id: parseInt(this.$route.params.id)}})

    if (this.storeTypes && this.salons && this.salons) {
      this.form.setUpdateFormData(this.storeTypes, this.salons, this.store)
      this.formReady = true
    }
  }

}
</script>