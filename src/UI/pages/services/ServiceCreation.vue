<template>
  <div  class="servicesCreation">
    <div class="box-container">
       <PageTitle>
         
          <template v-slot:default>Создание услуги</template>
          <template v-slot:button>
            <div>
             <a-button size="large" @click="$router.push({name: $routeRules.Services})"> Отмена </a-button> 
            </div>

            <div>
            <a-button type="primary"  size="large"  @click="create">Сохранить</a-button>
            </div>

            
          </template>
        </PageTitle>
    </div>
      <div>
        <ServiceCreateFormComponent :form="form" />  
      </div>
  </div>
  
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {RouterNameEnum} from "@/router/router.types";
import {ServiceStore} from "@/store/modules/Services"
import PageTitle from "@/UI/components/common/PageTitle.vue";
import ServiceCreateForm from "@/form/serviceCreate/serviceCreate";
import ServiceCreateFormComponent from "@/UI/components/forms/serviceCreate/ServiceCreateFormComponent.vue";
import { IServicesCategory } from '@/entity/servicesCategory/services.category.types';
import {ServicesCategoryStore} from "@/store/modules/ServicesCategory";



@Component({
  components: {ServiceCreateFormComponent, PageTitle}
})
export default class ServicesCreation extends Vue {
  form = new ServiceCreateForm();

  async create(): Promise<void> {
    const token = localStorage.getItem('token');
      if (await this.form.submit(ServiceStore.create)) {
        await this.$router.push({name: RouterNameEnum.Services});
      }
    }
}
</script>
<style lang="scss" scoped>
</style>