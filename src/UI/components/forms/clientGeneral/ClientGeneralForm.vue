<template>
  <div>
    <a-form-model>
      <div class="client-general-form">
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
              v-mask="['+# (###) ###-##-##']"
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
            <a-select-option v-for="item in form.activeSex" :value="item.id" v-bind:key="item.id">
              {{item.name }}
            </a-select-option>
          </a-select>
        </FormGroup>
        <FormGroup v-slot="attrs" :form="form" field="birthday_date" label="Дата рождения" show-custom-error v-if="form.birthday_date != null && form.birthday_date != ''">
          <a-date-picker
              style="width: 100%"
              placeholder="ДД.ММ.ГГГГ"
              @change="handleBirthDateChange"
              :default-value="moment(form[attrs.name], 'DD.MM.YYYY')"
              :format="'DD.MM.YYYY'"
              size="large"
          />
        </FormGroup>
        <FormGroup v-slot="attrs" :form="form" field="comment" label="Комментарий" show-custom-error>
          <a-input
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

        <FormGroup v-slot="attrs" :form="form" field="category" label="Категории" show-custom-error>
          <a-select
              mode="multiple"
              v-model="form[attrs.name]"
              v-bind="attrs"
              @input="attrs.change"
              :showArrow = true
          >
            <a-select-option v-for="item in form.categories" :value="item.id">
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

import ClientGeneralForm from "@/form/clientGeneral/clientGeneral";
import moment from 'moment';

@Component({
  components: { FormGroup },
  methods: { moment }
})

export default class ClientGeneralFormComponent extends Vue {
  @Prop() readonly form!: ClientGeneralForm;
  async created(): Promise<void> {

  }
  // filterOption(input: string, option: any): any {
  //   return (
  //       option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
  //   );
  // }
  handleBirthDateChange(value: any): void {
    this.form.birthday_date = value.format('DD.MM.YYYY');
  }
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