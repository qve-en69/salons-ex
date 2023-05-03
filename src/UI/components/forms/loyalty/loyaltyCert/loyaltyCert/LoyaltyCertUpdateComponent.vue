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
            <FormGroup v-slot="attrs" :form="form" field="type" label="Тип сертификата" show-custom-error>
                <a-select
                    size="large"
                    v-model="form[attrs.name]"
                    v-bind="attrs"
                    placeholder="Не выбрано"
                    @input="attrs.change"
                >
                    <a-select-option v-for="item in form.loyaltyCertTypes.data" :value="item.id" :key="item.id">
                        {{ item.name }}
                    </a-select-option>
                </a-select>
            </FormGroup>
            <FormGroup v-slot="attrs" :form="form" field="balance" label="Номинал" show-custom-error>
                <a-input size="large" v-model="form[attrs.name]" v-bind="attrs" @input="attrs.change" />
            </FormGroup>
            <FormGroup v-slot="attrs" :form="form" field="code" label="Код" show-custom-error>
                <a-input
                    disabled
                    suffix
                    size="large"
                    v-model="form[attrs.name]"
                    v-bind="attrs"
                    @input="attrs.change"
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
import LoyaltyCertUpdateForm from '@/form/loyalty/loyaltyCert/LoyaltyCertUpdateForm';
import FormGroup from '@/UI/components/common/form/FormGroup.vue';
@Component({
    components: { FormGroup }
})
export default class LoyaltyCertUpdateFormComponent extends Vue {
    @Prop() form!: LoyaltyCertUpdateForm;
}
</script>

<style lang="scss" scoped></style>
