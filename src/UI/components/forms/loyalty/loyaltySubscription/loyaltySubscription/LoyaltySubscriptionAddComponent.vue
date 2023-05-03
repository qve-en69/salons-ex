<template>
    <div>
        <a-form-model>
            <FormGroup v-slot="attrs" :form="form" field="client_id" label="Клиент" show-custom-error>
                <a-select
                    size="large"
                    v-model="form[attrs.name]"
                    v-bind="attrs"
                    placeholder="Не выбрано"
                    @input="attrs.change"
                >
                    <a-select-option v-for="item in form.clients.data" :value="item.id" :key="item.id">
                        {{ item.name }}
                    </a-select-option>
                </a-select>
            </FormGroup>
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
            <FormGroup v-slot="attrs" :form="form" field="abonement_type_id" label="Тип абонемента" show-custom-error>
                <a-select
                    size="large"
                    v-model="form[attrs.name]"
                    v-bind="attrs"
                    placeholder="Не выбрано"
                    @input="attrs.change"
                >
                    <a-select-option v-for="item in form.loyaltySubscriptionTypes.data" :value="item.id" :key="item.id">
                        {{ item.name }}
                    </a-select-option>
                </a-select>
            </FormGroup>
            <FormGroup v-slot="attrs" :form="form" field="discount" label="Скидка" show-custom-error>
                <a-input size="large" v-model="form[attrs.name]" v-bind="attrs" @input="attrs.change" addon-after="%" />
            </FormGroup>
            <FormGroup v-slot="attrs" :form="form" field="membership_number" label="Номер абонемента" show-custom-error>
                <a-input
                    disabled
                    suffix
                    size="large"
                    v-model="form[attrs.name]"
                    v-bind="attrs"
                    @input="attrs.change"
                    default-value="228228228"
                    addon-after="⟳"
                />
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
import LoyaltySubscriptionAddForm from '@/form/loyalty/loyaltySubscription/LoyaltySubscriptionAddForm';
import FormGroup from '@/UI/components/common/form/FormGroup.vue';
@Component({
    components: { FormGroup }
})
export default class LoyaltySubscriptionAddComponent extends Vue {
    @Prop() readonly form!: LoyaltySubscriptionAddForm;
    constructor() {
        super();
    }
}
</script>

<style lang="scss" scoped></style>
