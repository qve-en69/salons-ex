<template>
    <div>
        <a-form-model>
            <FormGroup v-slot="attrs" :form="form" field="name" label="Название" show-custom-error>
                <a-input size="large" v-model="form[attrs.name]" v-bind="attrs" @input="attrs.change" />
            </FormGroup>
            <FormGroup v-slot="attrs" :form="form" field="available_discount" label="Доступная скидка" show-custom-error>
                <a-input size="large" v-model="form[attrs.name]" v-bind="attrs" @input="attrs.change" addon-after="%" />
            </FormGroup>
            <a-divider orientation="left">
                Добавить позицию
            </a-divider>
            <div class="form-input">
                <div class="modal_label">Комментарий</div>
                <a-form-model-item :prop="form.comment">
                    <a-textarea placeholder="" :rows="4" size="large" v-model="form.comment" />
                </a-form-model-item>
            </div>
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
import LoyaltyBonusTypeAddForm from '@/form/loyalty/loyaltyBonusType/LoyaltyBonusTypeAddForm';
import FormGroup from '@/UI/components/common/form/FormGroup.vue';
@Component({
    components: { FormGroup }
})
export default class LoyaltyBonusTypeAddComponent extends Vue {
    @Prop() readonly form!: LoyaltyBonusTypeAddForm;
}
</script>

<style lang="scss" scoped></style>
