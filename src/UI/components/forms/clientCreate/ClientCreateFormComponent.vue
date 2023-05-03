<template>
  <div>
    <a-form-model>
      <div class="client-general-form">

        <FormGroup v-slot="attrs" :form="form" field="salon_id" label="Студия"  show-custom-error>
          <a-select
              mode="select"
              size="large"

              v-model="form[attrs.name]"
              v-bind="attrs"
              @input="attrs.change"

          >
            <a-select-option v-for="item in form.salons.data" :value="item.id">
              {{item.name }}
            </a-select-option>
          </a-select>
        </FormGroup>
        <FormGroup v-slot="attrs" :form="form" field="name" label="ФИО" show-custom-error>
          <a-input
              size="large"
              v-model="form[attrs.name]"
              v-bind="attrs"
              @input="attrs.change"
          />
        </FormGroup>

        <FormGroup v-slot="attrs" :form="form" field="phone" label="Телефон" show-custom-error>
          <a-input
              size="large"
              v-model="form[attrs.name]"
              placeholder="+7 (___) ___-__-__"
              v-mask="['+7 (###) ###-##-##']"
              v-bind="attrs"
              @input="attrs.change"
          />
        </FormGroup>
        <FormGroup v-slot="attrs" :form="form" field="sex" label="Пол" show-custom-error>
          <a-select
              size="large"
              v-model="form[attrs.name]"
              v-bind="attrs"
              @input="attrs.change"
          >
            <a-select-option v-for="item in form.activeSex" :value="item.id">
              {{item.name }}
            </a-select-option>
          </a-select>
        </FormGroup>

        <FormGroup v-slot="attrs" :form="form" field="birthday_date" label="Дата рождения" show-custom-error>
          <a-date-picker
              size="large"
              v-model="form[attrs.name]"
              v-bind="attrs"
              @input="attrs.change"
          />
        </FormGroup>
        <FormGroup v-slot="attrs" :form="form" field="comment" label="Комментарий" show-custom-error>
          <a-textarea
              size="large"
              v-model="form[attrs.name]"
              v-bind="attrs"
              @input="attrs.change"
          />
        </FormGroup>

        <FormGroup v-slot="attrs" :form="form" field="source" label="Источники" show-custom-error>
          <a-select
              mode="multiple"
              v-model="form[attrs.name]"
              v-bind="attrs"
              @input="attrs.change"
              :showArrow = true
          >
            <a-select-option v-for="item in form.sources" :value="item.id">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </FormGroup>

        <FormGroup v-slot="attrs" :form="form" field="categor" label="Категории" show-custom-error>
          <a-select
              mode="multiple"
              v-model="form[attrs.name]"
              v-bind="attrs"
              @input="attrs.change"
              :showArrow = true
          >
            <a-select-option v-for="item in form.category" :value="item.id">
              {{item.name }}
            </a-select-option>
          </a-select>
        </FormGroup>

      </div>
    </a-form-model>
  </div>
</template>

<script lang="ts">

import {Component, Prop, Vue} from "vue-property-decorator";
import FormGroup from "@/UI/components/common/form/FormGroup.vue";
//import {VNode} from "vue";
import ClientCreateForm from "@/form/clientCreate/clientCreate";
@Component({
  components: {FormGroup}
})
export default class ClientCreateFormComponent extends Vue {
  @Prop() readonly form!: ClientCreateForm;
}
</script>

<style lang="scss" >
.client-general-form {
  max-width: 700px;
  width: 100%;
  .ant-form-item {
    width: 100%;
    max-width: 447px;
  }
  .form-group-input {
    width: 100%;
    max-width: 447px;
  }
  .form-input {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    .modal_label {
      margin-top: 10px;
      white-space: nowrap;
      font-weight: 400;
      margin-right: 16px;
      color: #595959;
      font-size: 16px;
    }
  }
}
</style>