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
        <FormGroup v-slot="attrs" :form="form" field="discount" label="Стоимость" show-custom-error>
        <a-input
            size="large"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        />
      </FormGroup>
      <FormGroup v-slot="attrs" :form="form" field="status" label="Срок действия" show-custom-error :style="{ display: 'inline-block', width: 'calc(50% - 12px)', 'margin-right': '24px' }">
        <a-input
            size="large"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        />
      </FormGroup>
       <FormGroup v-slot="attrs" :form="form" field="validity" label="Единица измерения" show-custom-error :style="{ display: 'inline-block', width: 'calc(50% - 12px)', 'margin-right': '24px' }">
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
      <FormGroup v-slot="attrs" :form="form" field="price" label="Учитывать срок действия" show-custom-error :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }">
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
        <FormGroup v-slot="attrs" :form="form" field="paid" label="Допускается ли заморозка абонементов" show-custom-error>
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
      <FormGroup v-slot="attrs" :form="form" field="sum" label="Доступно в филиалах" show-custom-error>
        <a-input
            size="large"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        >
        </a-input>
      </FormGroup>
         <FormGroup v-slot="attrs" :form="form" field="online_pay_relevance" label="Категории услуг" show-custom-error :style="{ display: 'inline-block', width: 'calc(50% - 12px)', 'margin-right': '24px' }">
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
      <FormGroup v-slot="attrs" :form="form" field="active_from" label="Услуга" show-custom-error :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }">
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
       <FormGroup v-slot="attrs" :form="form" field="active_to" label="Количество" show-custom-error :style="{ display: 'inline-block', width: 'calc(50% - 12px)', 'margin-right': '24px' }">
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
import LoyaltySubscriptionTypeUpdateForm from "@/form/loyalty/loyaltySubscriptionType/LoyaltySubscriptionTypeUpdateForm";
import FormGroup from "@/UI/components/common/form/FormGroup.vue";
@Component({
  components: {FormGroup},
})
export default class LoyaltySubscriptionTypeUpdateFormComponent extends Vue {
  @Prop() form!: LoyaltySubscriptionTypeUpdateForm;

}
</script>

<style lang="scss" scoped>

</style>