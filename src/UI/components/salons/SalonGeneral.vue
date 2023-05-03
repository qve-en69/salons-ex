<template>
  <div>
      <div class="box-container">
        <template v-if="this.formReady">
            <PageTitle>
              <template v-slot:default><span style="font-size: 24px;">Общее</span></template>
              <template v-slot:button>
                  <a-button type="primary" size="large" @click="submit" :disabled="form.disabled">Сохранить</a-button>
              </template>
            </PageTitle>
            <SalonGeneralFormComponent :form="form" @search="search" />
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
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import PageTitle from "@/UI/components/common/PageTitle.vue";
import SalonGeneralForm from "@/form/salonGeneral/salonGeneral";
import SalonGeneralFormComponent from "@/UI/components/forms/salonGeneral/SalonGeneralForm.vue";
import {TerritoryStore} from "@/store/modules/Territory";
import {ICity} from "@/entity/territory/territory.types";
import Territory from "@/entity/territory/territory";
import {ISalonsListItem} from "@/entity/salons/salons.types";
import {GroupsStore} from "@/store/modules/Groups";
import {CurrencyStore} from "@/store/modules/Currency";
import {ManagerStore} from "@/store/modules/Manager";
import {ICurrency} from "@/entity/currency/currency.types";
import {IManager} from "@/entity/manager/manager.types";
import {IGroups} from "@/entity/groups/groups.types";
import {SalonsStore} from "@/store/modules/Salons";

import { mixins } from 'vue-class-component'
import { FormMix } from '@/UI/mixins/FormMix'

@Component({
  components: {SalonGeneralFormComponent, PageTitle}
})
export default class SalonGeneral extends mixins( FormMix) {
  form = new SalonGeneralForm();
  @Prop() readonly salon!: ISalonsListItem;  
  
  loading = false;
  get cities(): ICity[] {
    return TerritoryStore.cities;
  }
  get currency(): ICurrency[] {
    return CurrencyStore.currency;
  }
  get manager(): IManager[] {
    return ManagerStore.manager;
  }
  get group(): IGroups[] {
    return GroupsStore.groups;
  }
  async search(str: string): Promise<void> {
    await TerritoryStore.fetchCity({limit: 10, filter: {name: str}});
    this.form.cities = this.cities;
  }
  async submit(): Promise<void> {
    await this.form.submit(SalonsStore.update);
  }
  async created(): Promise<void> {
    this.loading = false;
    await GroupsStore.fetchAll();
    await TerritoryStore.fetchCity({limit: 500});
    await CurrencyStore.fetchAll();
    await ManagerStore.fetchAll();
    if (this.cities.length > 0) {
      this.form.setFormData(this.cities, this.group, this.manager, this.currency, this.salon);
      this.loading = true;
      this.formReady = true;
    }

  }
}
</script>

<style lang="scss" scoped>
.spiner{
  text-align: center;
}
</style>
