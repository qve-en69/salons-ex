<template>
  <div>
          <a-form-model>
            <FormGroup v-slot="attrs" :form="form" field="name" label="Название категории" show-custom-error>
              <a-input  
              v-model="form[attrs.name]"
              v-bind="attrs" 
              @input="attrs.change"
              id="one" />
            </FormGroup>

            <FormGroup v-slot="attrs" :form="form" field="online_appointment_name" label="Название для онлайн записи" show-custom-error>
              <a-input 
              v-model="form[attrs.name]"
              v-bind="attrs" 
              @input="attrs.change"
              id="two"/>
            </FormGroup>

      </a-form-model>              
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import FormGroup from "@/UI/components/common/form/FormGroup.vue";
import ServiceCategoryUpdateForm from "@/form/serviceCategoryGeneral/serviceCategoryUpdate";

@Component({
  components: {FormGroup}
})
export default class ServiceCategoryUpdateFormComponent extends Vue {
   @Prop() readonly form!: ServiceCategoryUpdateForm;
}
</script>

<style lang="scss" >

</style>