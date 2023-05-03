<template>
  <div  class="servicesCreation">
  <template v-if="this.formReady">  
    
    
        <div class="box-container">
          <PageTitle>
            
              <template v-slot:default>Редактирование услуги</template>
              <template v-slot:button>
                <div>
                <a-button size="large" @click="$router.push({name: $routeRules.Services})"> Отмена </a-button> 
                </div>

                <div>
                <a-button type="primary"  size="large"  @click="editService">Сохранить</a-button>
                </div>

                
              </template>
            </PageTitle>
        </div>
        <div>
            <ServiceCreateFormComponent :form="form" />  
        </div>

  </template>
  <template v-else>
        <div>
            <a-alert
            message="Загрузка данных"
            description="Additional description and informations about copywriting."
            type="info"
            show-icon
            />
        </div>
    </template>
  </div>
  
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {RouterNameEnum} from "@/router/router.types";
import {ServiceStore} from "@/store/modules/Services"
import PageTitle from "@/UI/components/common/PageTitle.vue";
import ServiceCreateFormComponent from "@/UI/components/forms/serviceCreate/ServiceCreateFormComponent.vue";
import ServiceGeneralForm from "@/form/serviceGeneral/serviceGeneral";
import {IServicesListItem} from "@/entity/services/services.types";
import {ServicesCategoryStore} from "@/store/modules/ServicesCategory";


@Component({
  components: {ServiceCreateFormComponent, PageTitle}
})
export default class ServicesUpdate extends Vue {

    form = new ServiceGeneralForm();
    formReady = false;

    get service(): IServicesListItem | null {
        return ServiceStore.services;
    }

    async created(): Promise<void> {
        //await ServiceCosmetologistsStore.fetchAll();
        await ServiceStore.fetchData({filter: {id: parseInt(this.$route.params.id)}});
        this.form.setFormData(this.service);
           // await ServiceCosmetologistsStore.fetchAll();
        
        this.formReady = true;   
        
        console.log('update');
        console.log(this.form);
    }

    async editService(): Promise<void> {
    if (await this.form.submit(ServiceStore.update)) {
        await ServicesCategoryStore.fetchAll();
        this.form = new ServiceGeneralForm();
        this.$router.push({name: this.$routeRules.Services})
      }
    }
}
</script>
<style lang="scss" scoped>
</style>