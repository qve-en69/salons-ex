<template>
    <div>
        <a-form-model>
            <FormGroup v-slot="attrs" :form="form" field="image" label="Фото" show-custom-error>
                <a-input size="large" v-model="form[attrs.name]" v-bind="attrs" @input="attrs.change" />
            </FormGroup>
            <FormGroup v-slot="attrs" :form="form" field="name" label="Название" show-custom-error>
                <a-input size="large" v-model="form[attrs.name]" v-bind="attrs" @input="attrs.change" />
            </FormGroup>
            <FormGroup v-slot="attrs" :form="form" field="text" label="Описание" show-custom-error>
                <a-input size="large" v-model="form[attrs.name]" v-bind="attrs" @input="attrs.change" />
            </FormGroup>
            <FormGroup v-slot="attrs" :form="form" field="salons_id"  label="Студии" show-custom-error>
                <a-select mode="multiple" v-model="form[attrs.name]"  v-bind="attrs" @input="attrs.change">
                    <a-select-option v-for="item in form.salons.data" :value="item.id" :key="item.id + item.id">
                        {{ item.name }}
                    </a-select-option>
                </a-select>
            </FormGroup>
            <FormGroup v-slot="attrs" :form="form" field="services_id " label="Услуги" show-custom-error>
                <a-select mode="multiple" v-model="form[attrs.name]" v-bind="attrs" @input="attrs.change">
                    <a-select-option v-for="item in form.service.data" :value="item.id" :key="item.id">
                        {{ item.name }}
                    </a-select-option>
                </a-select>
            </FormGroup>
            <FormGroup v-slot="attrs" :form="form" field="goods" label="Товары" show-custom-error>
                <a-select mode="multiple" v-model="form[attrs.name]" v-bind="attrs" @input="attrs.change">
                    <!-- <a-select-option v-for="item in form.sources" :value="item.id">
              {{ item.name }}
            </a-select-option> -->
                    <a-select-option :value="1">
                        Салон 1
                    </a-select-option>
                    <a-select-option :value="2">
                        Салон 2
                    </a-select-option>
                </a-select>
            </FormGroup>
            <FormGroup v-slot="attrs" :form="form" field="discount" label="Скидка, %" show-custom-error>
                <a-input size="large" v-model="form[attrs.name]" v-bind="attrs" @input="attrs.change" />
            </FormGroup>
            <FormGroup v-slot="attrs" :form="form" field="discount_price" label="Цена со скидккой" show-custom-error>
                <a-input size="large" v-model="form[attrs.name]" v-bind="attrs" @input="attrs.change" />
            </FormGroup>
            <FormGroup v-slot="attrs" :form="form" field="timeSale" label="Период действия скидки" show-custom-error>
                <a-input-group compact v-model="form[attrs.name]" v-bind="attrs" @input="attrs.change">
                    <a-date-picker style="width: 50%" placeholder="Начало" />
                    <a-date-picker style="width: 50%" placeholder="Окончание" />
                </a-input-group>
            </FormGroup>
            <FormGroup v-slot="attrs" :form="form" field="days" label="Дни" show-custom-error>
                <a-select mode="multiple" v-model="form[attrs.name]" v-bind="attrs" @input="attrs.change">
                    <a-select-option :value="1">
                        Пн
                    </a-select-option>
                    <a-select-option :value="2">
                        Вт
                    </a-select-option>
                    <a-select-option :value="3">
                        Ср
                    </a-select-option>
                    <a-select-option :value="4">
                        Чт
                    </a-select-option>
                    <a-select-option :value="5">
                        Пт
                    </a-select-option>
                    <a-select-option :value="6">
                        Сб
                    </a-select-option>
                    <a-select-option :value="7">
                        Вс
                    </a-select-option>
                </a-select>
            </FormGroup>
            <FormGroup v-slot="attrs" :form="form" field="days" label="Часы" show-custom-error>
                <a-input-group compact v-model="form[attrs.name]" v-bind="attrs" @input="attrs.change">
                    <a-time-picker style="width: 50%" placeholder="Начало" />
                    <a-time-picker style="width: 50%" placeholder="Окончание" />
                </a-input-group>
            </FormGroup>
            <FormGroup
                v-slot="attrs"
                :form="form"
                field="active"
                show-custom-error
                :style="{ display: 'inline-block', width: 'calc(100% - 12px)' }"
            >
                <a-checkbox value="1" v-model="form[attrs.name]" v-bind="attrs" @input="attrs.change" @change="onChange"
                    >Отображать на сайте
                </a-checkbox>
            </FormGroup>
            <div class="d-flex just-end">
                <a-button style="margin-right: 8px;" size="large" @click="$emit('cancel')">Отмена</a-button>
                <a-button
                    type="primary"
                    :loading="form.sendingRequest"
                    :disabled="form.disabled"
                    size="large"
                    @click.prevent="$emit('submit')"
                    >Сохранить</a-button
                >
            </div>
        </a-form-model>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import LoyaltyStockAddForm from '@/form/loyalty/loyaltyStock/LoyaltyStockAddForm';
import FormGroup from '@/UI/components/common/form/FormGroup.vue';
@Component({
    components: { FormGroup }
})
export default class LoyaltyStockAddComponent extends Vue {
    @Prop() readonly form!: LoyaltyStockAddForm;

}
</script>

<style lang="scss" scoped></style>
