<template>
  <div>
    <a-form-model>
      <div class="salon-general-form">
        <FormGroup v-slot="attrs" :form="form" field="name" label="Наименование студии" show-custom-error>
          <a-input
              size="large"
              v-model="form[attrs.name]"
              v-bind="attrs"
              @input="attrs.change"
          />
        </FormGroup>
        <FormGroup v-slot="attrs" :form="form" field="city" label="Город" show-custom-error>
          <a-select
              size="large"
              show-search
              v-model="form[attrs.name]"
              v-bind="attrs"
              placeholder="Выберите город"
              option-filter-prop="children"
              :filter-option="false"
              @change="changeCity"
              @input="attrs.change"
              @search="filterOption"
          >
            <a-select-option v-for="item in form.cities" :value="item.id" v-bind:key="item.id">
              {{item.name}}
            </a-select-option>
          </a-select>
        </FormGroup>
        <FormGroup v-slot="attrs" :form="form" field="actualAddr" label="Адрес студии" show-custom-error>
          <a-input
              size="large"
              v-model="form[attrs.name]"
              v-bind="attrs"
              @input="attrs.change"
          />
        </FormGroup>
        <FormGroup v-slot="attrs" :form="form" field="opening_date" label="Дата открытия студии" show-custom-error v-if="form.opening_date != null && form.opening_date != ''">
          <a-date-picker
              style="width: 100%"
              placeholder="ДД.ММ.ГГГГ"
              @change="handleOpeningDateChange"
              :default-value="moment(form[attrs.name], 'DD.MM.YYYY')"
              :format="'DD.MM.YYYY'"
              size="large"
          />
        </FormGroup>
        <div class="form-input">
          <div class="modal_label">Ссылка на соц сеть студии</div>
          <a-form-model-item :prop="form.link">
            <a-input
                size="large"
                v-model="form.link"
            />
          </a-form-model-item>
        </div>
        <div class="form-input">
          <div class="modal_label">Активность</div>
          <a-form-model-item :prop="form.active">
            <a-select
                size="large"
                show-search
                v-model="form.active"
                placeholder="Выберите активность"
            >
              <a-select-option v-for="(item, index) in form.activeList" :value="item.id" v-bind:key="index">
                {{item.name}}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </div>
        <FormGroup v-slot="attrs" :form="form" field="currency" label="Валюта" show-custom-error>
          <a-select
              size="large"
              show-search
              v-model="form[attrs.name]"
              v-bind="attrs"
              placeholder="Выберите валюту"
              @input="attrs.change"
          >
            <a-select-option v-for="item in form.currencies" :value="item.id" v-bind:key="item.id">
              {{item.name + ` (${item.code})`}}
            </a-select-option>
          </a-select>
        </FormGroup>
      </div>
      <a-divider></a-divider>
      <div class="salon-general-form">
        <FormGroup v-slot="attrs" :form="form" field="manager" label="Менеджер сопровождения" show-custom-error>
          <a-select
              size="large"
              show-search
              v-model="form[attrs.name]"
              v-bind="attrs"
              placeholder="Выберите город"
              @input="attrs.change"
          >
            <a-select-option v-for="item in form.managers" :value="item.id" v-bind:key="item.id">
              {{item.name}}
            </a-select-option>
          </a-select>
        </FormGroup>
        <FormGroup v-slot="attrs" :form="form" field="group" label="Группа" show-custom-error>
          <a-select
              size="large"
              show-search
              v-model="form[attrs.name]"
              v-bind="attrs"
              placeholder="Выберите группу"
              @input="attrs.change"
          >
            <a-select-option v-for="item in form.groups" :value="item.id" v-bind:key="item.id">
              {{item.name}}
            </a-select-option>
          </a-select>
        </FormGroup>
      </div>
      <a-divider></a-divider>
      <div class="salon-general-form">
        <FormGroup v-slot="attrs" :form="form" field="partner" label="ФИО партнёра" show-custom-error>
          <a-input
              size="large"
              v-model="form[attrs.name]"
              v-bind="attrs"
              @input="attrs.change"
          />
        </FormGroup>
        <FormGroup v-slot="attrs" :form="form" field="mailPart" label="Контактные данные партнёра" show-custom-error>
              <a-input
                  size="large"
                  v-model="form[attrs.name]"
                  v-bind="attrs"
                  placeholder="mail@example.ru"
                  @input="attrs.change"
              >
              <a-icon slot="prefix" type="mail" />
            </a-input>
        </FormGroup>
        <FormGroup v-slot="attrs" :form="form" field="phonePart" label="" show-custom-error>
              <a-input
                  size="large"
                  v-model="form[attrs.name]"
                  v-bind="attrs"
                  placeholder="+7 (___) ___-__-__"
                  v-mask="['+# (###) ###-##-##']"
                  @input="attrs.change"
              >
            <a-icon slot="prefix" type="phone" />
            </a-input>
        </FormGroup>
        <div class="form-input">
          <div class="modal_label">Ссылка на личные соц сети</div>
          <a-form-model-item :prop="form.linkPart">
            <a-input
                size="large"
                v-model="form.linkPart"
            />
          </a-form-model-item>
        </div>
        <FormGroup v-slot="attrs" :form="form" field="conclusion_contract_date" label="Дата заключения договора" show-custom-error v-if="form.conclusion_contract_date != null && form.conclusion_contract_date != ''">
          <a-date-picker
              style="width: 100%"
              placeholder="ДД.ММ.ГГГГ"
              :default-value="moment(form[attrs.name], 'DD.MM.YYYY')"
              :format="'DD.MM.YYYY'"
              @change="handleCCDateChange"
              size="large"
          />
        </FormGroup>
        <FormGroup v-slot="attrs" :form="form" field="entity" label="Название юр. лица" show-custom-error>
          <a-input
              size="large"
              v-model="form[attrs.name]"
              v-bind="attrs"
              @input="attrs.change"
          />
        </FormGroup>
        <FormGroup v-slot="attrs" :form="form" field="legalAddr" label="Юр. адрес" show-custom-error>
          <a-input
              size="large"
              v-model="form[attrs.name]"
              v-bind="attrs"
              @input="attrs.change"
          />
        </FormGroup>
        <FormGroup v-slot="attrs" :form="form" field="inn" label="ИНН" show-custom-error>
          <a-input
              size="large"
              v-model="form[attrs.name]"
              v-bind="attrs"
              @input="attrs.change"
          />
        </FormGroup>
        <FormGroup v-slot="attrs" :form="form" field="kpp" label="КПП" show-custom-error>
          <a-input
              size="large"
              v-model="form[attrs.name]"
              v-bind="attrs"
              @input="attrs.change"
          />
        </FormGroup>
        <FormGroup v-slot="attrs" :form="form" field="bik" label="БИК" show-custom-error>
          <a-input
              size="large"
              v-model="form[attrs.name]"
              v-bind="attrs"
              @input="attrs.change"
          />
        </FormGroup>
        <FormGroup v-slot="attrs" :form="form" field="bank" label="Название банка" show-custom-error>
          <a-input
              size="large"
              v-model="form[attrs.name]"
              v-bind="attrs"
              @input="attrs.change"
          />
        </FormGroup>
        <FormGroup v-slot="attrs" :form="form" field="corr" label="Корр. счет" show-custom-error>
          <a-input
              size="large"
              v-model="form[attrs.name]"
              v-bind="attrs"
              @input="attrs.change"
          />
        </FormGroup>
        <FormGroup v-slot="attrs" :form="form" field="checkingAcc" label="Расчетный счет" show-custom-error>
          <a-input
              size="large"
              v-model="form[attrs.name]"
              v-bind="attrs"
              @input="attrs.change"
          />
        </FormGroup>
      </div>
    </a-form-model>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import FormGroup from "@/UI/components/common/form/FormGroup.vue";
import SalonGeneralForm from "@/form/salonGeneral/salonGeneral";
import moment from 'moment';
//import {VNode} from "vue";
@Component({
  components: {FormGroup},
  methods: {moment}
})
export default class SalonGeneralFormComponent extends Vue {
  @Prop() readonly form!: SalonGeneralForm;
  filterOption(input: string/*, option: VNode*/): void {
    this.$emit('search', input);
  }
  changeCity(val: any): void {
    console.log(val);
  }
  created(): void {
  }
  handleOpeningDateChange(value: any): void {
    this.form.opening_date = value.format('DD.MM.YYYY');
  }
  handleCCDateChange(value: any): void {
    this.form.conclusion_contract_date = value.format('DD.MM.YYYY');
  }
}
</script>

<style lang="scss" >
.salon-general-form {
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
