<template>
  <div>
    <a-form-model>
      <FormGroup v-slot="attrs" :form="form" field="bonus_programm_type_id" label="Тип" show-custom-error>
        <a-select
            size="large"
            v-model="form[attrs.name]"
            v-bind="attrs"
            placeholder="Не выбрано"
            @input="attrs.change"
        >
          <a-select-option v-for="item in form.types" :key="item.id">
            {{item.name}}
          </a-select-option>
        </a-select>
      </FormGroup>
      <FormGroup v-slot="attrs" :form="form" field="client_id" label="Клиент" show-custom-error>
        <a-select
            size="large"
            v-model="form[attrs.name]"
            v-bind="attrs"
            placeholder="Не выбрано"
            @input="attrs.change"
        >
          <a-select-option v-for="item in form.types" :key="item.id">
            {{item.name}}
          </a-select-option>
        </a-select>
      </FormGroup>
      <FormGroup v-slot="attrs" :form="form" field="phone" label="Клиент" show-custom-error>

      <div class="form-input">
        <div class="modal_label">Номер телефона</div>
        <a-form-model-item :prop="form.phone">
          <a-input
              v-model="form.phone"
              placeholder="+7 (___) ___-__-__"
              v-mask="['+7 (###) ###-##-##']"
          />
        </a-form-model-item>
      </div>
      </FormGroup>

      <div class="d-flex just-end">
        <a-button style="margin-right: 8px;" size="large" @click="$emit('cancel')">Отмена</a-button>
        <a-button type="primary" :loading="form.sendingRequest" :disabled="form.disabled" size="large" @click.prevent="$emit('submit')">Сохранить</a-button>
      </div>
    </a-form-model>
  </div>
</template>


<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import LoyaltyBonusUpdateForm from "@/form/loyalty/loyaltyBonus/LoyaltyBonusUpdateForm";
import FormGroup from "@/UI/components/common/form/FormGroup.vue";
@Component({
  components: {FormGroup},
})
export default class LoyaltyBonusUpdateFormComponent extends Vue {
  @Prop() form!: LoyaltyBonusUpdateForm;

}
</script>

<style lang="scss" scoped>

</style>