<template>
    <div>
        <a-form-model>
            <FormGroup v-slot="attrs" :form="form" field="name" label="Название" show-custom-error>
                <a-input size="large" v-model="form[attrs.name]" v-bind="attrs" @input="attrs.change" />
            </FormGroup>
            <FormGroup v-slot="attrs" :form="form" field="price" label="Стоимость" show-custom-error>
                <a-input
                    size="large"
                    v-model="form[attrs.name]"
                    v-bind="attrs"
                    @input="attrs.change"
                    default-value="0"
                    addon-after="₽"
                />
            </FormGroup>
            <FormGroup
                v-slot="attrs"
                :form="form"
                field="validity"
                label="Срок действия"
                show-custom-error
                :style="{ display: 'inline-block', width: 'calc(33% - 12px)', 'margin-right': '24px' }"
            >
                <a-input size="large" v-model="form[attrs.name]" v-bind="attrs" @input="attrs.change" />
            </FormGroup>
            <FormGroup
                v-slot="attrs"
                :form="form"
                field="dimension"
                label="Единица измерения"
                show-custom-error
                :style="{ display: 'inline-block', width: 'calc(33% - 12px)', 'margin-right': '24px' }"
            >
                <a-select
                    size="large"
                    v-model="form[attrs.name]"
                    v-bind="attrs"
                    placeholder="Не выбрано"
                    @input="attrs.change"
                >
                    <a-select-option :value="1">
                        День
                    </a-select-option>
                    <a-select-option :value="2">
                        Месяц
                    </a-select-option>
                </a-select>
            </FormGroup>
            <FormGroup
                v-slot="attrs"
                :form="form"
                field="validity_period"
                label="Учитывать срок действия"
                show-custom-error
                :style="{ display: 'inline-block', width: 'calc(33% - 13px)' }"
            >
                <a-select
                    size="large"
                    v-model="form[attrs.name]"
                    v-bind="attrs"
                    placeholder="Не выбрано"
                    @input="attrs.change"
                >
                    <a-select-option :value="1">
                        С первого посещения
                    </a-select-option>
                    <a-select-option :value="2">
                        В другое время
                    </a-select-option>
                </a-select>
            </FormGroup>
            <FormGroup
                v-slot="attrs"
                :form="form"
                field="membership_freezing"
                label="Допускается ли заморозка абонементов"
                show-custom-error
                :style="{ display: 'inline-block', width: 'calc(50% - 13px)', 'margin-right': '24px' }"
            >
                <a-select
                    size="large"
                    v-model="form[attrs.name]"
                    v-bind="attrs"
                    placeholder="Не выбрано"
                    @input="attrs.change"
                >
                    <a-select-option :value="1">
                        Да
                    </a-select-option>
                    <a-select-option :value="2">
                        Нет
                    </a-select-option>
                </a-select>
            </FormGroup>
            <FormGroup
                v-slot="attrs"
                :form="form"
                field="membership_freezing_period"
                label="Максимальный общий период заморозки"
                show-custom-error
                :style="{ display: 'inline-block', width: 'calc(50% - 13px)' }"
            >
                <a-select
                    size="large"
                    v-model="form[attrs.name]"
                    v-bind="attrs"
                    placeholder="Не выбрано"
                    @input="attrs.change"
                >
                    <a-select-option :value="1">
                        Не ограничен
                    </a-select-option>
                    <a-select-option :value="2">
                        Имеет ограничения
                    </a-select-option>
                </a-select>
            </FormGroup>
            <FormGroup
                v-slot="attrs"
                :form="form"
                field="online_pay_relevance"
                label="Абонемент должен быть доступен в филиале"
                show-custom-error
                :style="{ display: 'inline-block', width: 'calc(100% - 12px)' }"
            >
                <a-checkbox value="1" v-model="form[attrs.name]" v-bind="attrs" @input="attrs.change" @change="onChange"
                    >Доступность для продажи онлайн
                </a-checkbox>
            </FormGroup>
            <FormGroup v-slot="attrs" label="Доступно в филиалах" :form="form" field="active_from" show-custom-error>
                <a-select mode="multiple" v-model="form[attrs.name]" v-bind="attrs" @input="attrs.change">
                    <a-select-option v-for="item in form.salons.data " :value="item.id" :key="item.id">
                        {{ item.name }}
                    </a-select-option>
                </a-select>
            </FormGroup>

            <FormGroup
                v-slot="attrs"
                :form="form"
                field="active_to"
                label="Категории услуг"
                show-custom-error
                :style="{ display: 'inline-block', width: 'calc(33% - 12px)', 'margin-right': '24px' }"
            >
                <a-select
                    size="large"
                    v-model="form[attrs.name]"
                    v-bind="attrs"
                    placeholder="Не выбрано"
                    @input="attrs.change"
                >
                    <a-select-option v-for="item in form.serviceCategory.data" :key="item.id">
                        {{ item.name }}
                    </a-select-option>
                </a-select>
            </FormGroup>
            <FormGroup
                v-slot="attrs"
                :form="form"
                field="service"
                label="Услуга"
                show-custom-error
                :style="{ display: 'inline-block', width: 'calc(33% - 12px)', 'margin-right': '24px' }"
            >
                <a-select
                    size="large"
                    v-model="form[attrs.name]"
                    v-bind="attrs"
                    placeholder="Не выбрано"
                    @input="attrs.change"
                >
                    <a-select-option :value="1">
                        Все
                    </a-select-option>
                    <a-select-option :value="2">
                        Определенные
                    </a-select-option>
                </a-select>
            </FormGroup>
            <FormGroup
                v-slot="attrs"
                :form="form"
                field="amount"
                label="Количество"
                show-custom-error
                :style="{ display: 'inline-block', width: 'calc(33% - 13px)' }"
            >
                <a-input size="large" v-model="form[attrs.name]" v-bind="attrs" @input="attrs.change" />
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
import LoyaltySubscriptionTypeAddForm from '@/form/loyalty/loyaltySubscriptionType/LoyaltySubscriptionTypeAddForm';
import FormGroup from '@/UI/components/common/form/FormGroup.vue';
@Component({
    components: { FormGroup }
})
export default class LoyaltySubscriptionTypeAddComponent extends Vue {
    @Prop() readonly form!: LoyaltySubscriptionTypeAddForm;
}
</script>

<style lang="scss" scoped></style>
