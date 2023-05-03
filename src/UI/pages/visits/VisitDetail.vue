<template>
  <div  class="servicesCreation">
    <div class="box-container">
       <PageTitle>
         
          <template v-slot:default>Запись клиента</template>
          <template v-slot:button>
            <a-popconfirm placement="leftTop" title="Вы действительно хотите удалить услугу?" @confirm="deleteService" ok-text="Удалить" cancel-text="Отмена">
              <a-button icon="delete" type="danger" ghost size="large">Удалить</a-button>
            </a-popconfirm>
            <div>
              <a-button type="primary"  size="large"  @click="create">Сохранить</a-button>
            </div>
         
              <a-button icon="close" size="large" @click="$router.push({name: $routeRules.Visits})"></a-button>
            
          </template>
        </PageTitle>
    </div>
      <div>
         <br>
        <VisitDetailFormComponent :form="visitForm" />  
      </div>
  </div>
  
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {RouterNameEnum} from "@/router/router.types";
import PageTitle from "@/UI/components/common/PageTitle.vue";

import VisitDetailFormComponent from "@/UI/components/forms/visits/VisitDetailFormComponent.vue";
import VisitGeneralForm from "@/form/visits/visitGeneral";
import VisitCreateForm from "@/form/visits/visitCreate";
import { VisitsStore } from "@/store/modules/Visits";

@Component({
  components: {PageTitle, VisitDetailFormComponent}
})
export default class VisitDetail extends Vue {
  form = new VisitGeneralForm();
  visitForm  = new VisitCreateForm();

    async create(): Promise<void> {
    const token = localStorage.getItem('token');
      if (await this.visitForm.submit(VisitsStore.create)) {
      }
    }
}
</script>
<style lang="scss" scoped>
</style>