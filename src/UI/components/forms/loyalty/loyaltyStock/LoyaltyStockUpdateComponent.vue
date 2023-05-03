<template>
  <div>
    <a-form-model>
      <FormGroup v-slot="attrs" :form="form" field="name" label="Название" show-custom-error>
        <a-input
            size="large"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        />
      </FormGroup>
      <FormGroup v-slot="attrs" :form="form" field="service" label="Услуги" show-custom-error>
        <a-input
            size="large"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        />
      </FormGroup>
      <FormGroup v-slot="attrs" :form="form" field="goods" label="Товары" show-custom-error>
        <a-input
            size="large"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        />
      </FormGroup>
      <FormGroup v-slot="attrs" :form="form" field="sale" label="Скидка" show-custom-error>
        <a-input
            size="large"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        />
      </FormGroup>
      <FormGroup v-slot="attrs" :form="form" field="price" label="Цена" show-custom-error>
        <a-input
            size="large"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        />
      </FormGroup>
      <FormGroup v-slot="attrs" :form="form" field="timeSale" label="Период действия скидки" show-custom-error >
        <a-input
            size="large"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        />
      </FormGroup>
      <FormGroup v-slot="attrs" :form="form" field="days" label="Дни" show-custom-error >
        <a-input
            size="large"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        />
      </FormGroup>
      <FormGroup v-slot="attrs" :form="form" field="hours" label="Часы" show-custom-error >
        <a-input
            size="large"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        />
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
import LoyaltyStockUpdateForm from "@/form/loyalty/loyaltyStock/LoyaltyStockUpdateForm";
import FormGroup from "@/UI/components/common/form/FormGroup.vue";
@Component({
  components: {FormGroup},
})
export default class LoyaltyStockUpdateFormComponent extends Vue {
  @Prop() form!: LoyaltyStockUpdateForm;

}
</script>

<style lang="scss" scoped>

</style>