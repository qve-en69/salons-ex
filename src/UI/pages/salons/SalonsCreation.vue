<template>
  <div>
    <div class="box-container">
      <PageTitle>
        <template v-slot:default>Создание студии</template>
      </PageTitle>
      <SalonCreateFormComponent :form="form" @search="search"/>
      <!-- <a-row type="flex" justify="center">
        <a-col :span="1"> -->

      <template>
        <a-button id="buttonSave" type="primary" :disabled="form.disabled" @click="create">Сохранить</a-button>
      </template>
      <!--
            </a-col>
          </a-row> -->

    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import PageTitle from "@/UI/components/common/PageTitle.vue";
import {TerritoryStore} from "@/store/modules/Territory";
import {ICity} from "@/entity/territory/territory.types";
import {SalonsStore} from "@/store/modules/Salons";
import {RouterNameEnum} from "@/router/router.types";
import {GroupsStore} from "@/store/modules/Groups";
import {CurrencyStore} from "@/store/modules/Currency";
import {ManagerStore} from "@/store/modules/Manager";
import {ICurrency} from "@/entity/currency/currency.types";
import {IManager} from "@/entity/manager/manager.types";
import {IGroups} from "@/entity/groups/groups.types";
import SalonCreateForm from "@/form/salonCreate/salonCreate";
import SalonCreateFormComponent from "@/UI/components/forms/salonCreate/SalonCreateFormComponent.vue";
@Component({
  components: {SalonCreateFormComponent, PageTitle}
})
export default class SalonsCreation extends Vue {
  form = new SalonCreateForm();
  get city(): ICity[] {
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
  async create(): Promise<void> {
    if (await this.form.submit(SalonsStore.create)) {
      await this.$router.push({name: RouterNameEnum.Salons});
    }
  }
  async search(str: string): Promise<void> {
    await TerritoryStore.fetchCity({limit: 10, filter: {name: str}});
    this.form.cities = this.city;
  }
  async created(): Promise<void> {
    await GroupsStore.fetchAll();
    await TerritoryStore.fetchCity({limit: 10});
    await CurrencyStore.fetchAll();
    await ManagerStore.fetchAll();
    if (this.currency.length > 0) {
      this.form.setFormData(this.city, this.group, this.manager, this.currency);
    }
  }
}
</script>

<style lang="scss" scoped>
#buttonSave {
  width: 450px;
  margin-left: 250px;
}
</style>
