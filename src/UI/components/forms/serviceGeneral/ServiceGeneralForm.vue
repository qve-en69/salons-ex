<template>
  <div>
      <a-row :gutter="[24,8]">
        <a-col :span="18">

 <a-form-model>
            <div>
                <h2 style="">Описание</h2>
                <p>{{form.description}}</p>
            </div>
        <br>
        <a-row :gutter="[16,16]">

            <a-col :span="8">
                <FormGroup v-slot="attrs" :form="form" field="online_appointment" label="Онлайн запись" show-custom-error>
                <a-select 
                v-model="form[attrs.name]"
                v-bind="attrs"
                @input="attrs.change" 
                size="large">
                     <a-select-option  :value="1">
                    Включена 
                    </a-select-option>
                    <a-select-option  :value="0">
                    Выключена
                    </a-select-option>
                </a-select>
                </FormGroup>
            </a-col>

            <a-col :span="8">
                <FormGroup v-slot="attrs" :form="form" field="online_payment_id" label="Онлайн оплата" show-custom-error>
                <a-select 
                v-model="form[attrs.name]"
                v-bind="attrs"
                @input="attrs.change" 
                size="large">
                         <a-select-option  :value="1">
                        Разрешена 
                        </a-select-option>
                        <a-select-option  :value="2">
                        Запрещена
                        </a-select-option>
                </a-select>
                </FormGroup>
            </a-col>

            <a-col :span="8">
                <FormGroup v-slot="attrs" :form="form" field="repeatedly_appointment_status_id" label="Уведомление о повторном визите" show-custom-error>
                <a-select 
                v-model="form[attrs.name]"
                v-bind="attrs"
                @input="attrs.change" 
                size="large">
                    <a-select-option  :value="1">
                    1 день после визита
                    </a-select-option>
                    <a-select-option  :value="2">
                    1 неделя после визита
                    </a-select-option>
                    <a-select-option  :value="3">
                    1 месяц после визита
                    </a-select-option>
                </a-select>
                </FormGroup>
            </a-col>
        </a-row>

      </a-form-model>    
        </a-col>

        <a-col :span="6">
 
            <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />

        </a-col>

        </a-row>
      

  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import FormGroup from "@/UI/components/common/form/FormGroup.vue";
import ServiceGeneralForm from "@/form/serviceGeneral/serviceGeneral";

@Component({
  components: {FormGroup},
})
export default class ServiceGeneralFormComponent extends Vue {
  @Prop() readonly form!:  ServiceGeneralForm;

   async created(): Promise<void> {
       console.log('form in detail');
       console.log(this.form.description);
    }

}

</script>

<style lang="scss" >
</style>
