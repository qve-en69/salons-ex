<template>
    <div>
        <a-form-model>
            <FormGroup
                v-slot="attrs"
                :form="form"
                field="name"
                label="Название"
                show-custom-error
                :style="{ display: 'inline-block', width: 'calc(33% - 12px)', 'margin-right': '24px' }"
            >
                <a-input size="large" v-model="form[attrs.name]" v-bind="attrs" @input="attrs.change" />
            </FormGroup>
            <FormGroup
                v-slot="attrs"
                :form="form"
                field="writeoff_id"
                label="Тип списания"
                show-custom-error
                :style="{ display: 'inline-block', width: 'calc(33% - 12px)', 'margin-right': '23px' }"
            >
                <a-select
                    size="large"
                    v-model="form[attrs.name]"
                    v-bind="attrs"
                    placeholder="Не выбрано"
                    @input="attrs.change"
                >
                    <a-select-option :value="1">
                        Однократное списание
                    </a-select-option>
                    <a-select-option :value="2">
                        Многократное списание
                    </a-select-option>
                </a-select>
            </FormGroup>
            <FormGroup
                v-slot="attrs"
                :form="form"
                field="balance"
                label="Номинал"
                show-custom-error
                :style="{ display: 'inline-block', width: 'calc(33% - 12px)' }"
            >
                <a-input size="large" v-model="form[attrs.name]" v-bind="attrs" @input="attrs.change" />
            </FormGroup>
            <a-divider orientation="left">
                Добавить позицию
            </a-divider>
            <!-- <div :style="{ display: 'inline-block', width: 'calc(50% - 12px)', 'margin-right': '23px' }">
                <a-card title="Выбрать услугу из списка" :bordered="false">
                    <a-tree-select
                        v-model="value"
                        style="width: 100%"
                        :tree-data="treeData"
                        tree-checkable
                        :show-checked-strategy="SHOW_PARENT"
                        search-placeholder="Please select"
                    />
                </a-card>
            </div>
            <div :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }">
                <a-card title="Выбрать товар из списка" :bordered="false">
                    <a-tree-select
                        v-model="value"
                        style="width: 100%"
                        :tree-data="treeDataProduct"
                        tree-checkable
                        :show-checked-strategy="SHOW_PARENT"
                        search-placeholder="Please select"
                    />
                </a-card>
            </div> -->
            <FormGroup
                v-slot="attrs"
                :form="form"
                field="without_limit"
                label="Ограничение срока действия"
                show-custom-error
                :style="{
                    display: 'inline-block',
                    width: 'calc(50% - 12px)',
                    'margin-top': '50px',
                    'margin-right': '15px'
                }"
            >
                <a-select
                    size="large"
                    v-model="form[attrs.name]"
                    v-bind="attrs"
                    placeholder="Не выбрано"
                    @input="attrs.change"
                >
                    <a-select-option :value="1">
                        без ограничений
                    </a-select-option>
                    <a-select-option :value="2">
                        только услуги
                    </a-select-option>
                    <a-select-option :value="3">
                        только товары
                    </a-select-option>
                </a-select>
            </FormGroup>
            <FormGroup
                v-slot="attrs"
                :form="form"
                field="active_to"
                label="Срок действия с момента продажи"
                show-custom-error
                :style="{ display: 'inline-block', width: 'calc(25% - 12px)', 'margin-right': '15px' }"
            >
                <a-input size="large" v-model="form[attrs.name]" v-bind="attrs" @input="attrs.change" />
            </FormGroup>

            <!-- <FormGroup
                v-slot="attrs"
                :form="form"
                field="active_to"
                label="Срок действия с момента продажи"
                show-custom-error
                :style="{ display: 'inline-block', width: 'calc(25% - 12px)', 'margin-right': '15px' }"
            >
                <a-select
                    size="large"
                    v-model="form[attrs.name]"
                    v-bind="attrs"
                    placeholder="Не выбрано"
                    @input="attrs.change"
                >
                    <a-select-option :value="1">
                        Однократное списание
                    </a-select-option>
                    <a-select-option :value="2">
                        Многократное списание
                    </a-select-option>
                </a-select>
                  </FormGroup> -->
            <FormGroup
                v-slot="attrs"
                :form="form"
                field="pay_without_code"
                show-custom-error
                :style="{ display: 'inline-block', width: 'calc(33% - 12px)' }"
            >
                <a-checkbox v-model="form[attrs.name]" v-bind="attrs" @input="attrs.change" @change="onChange"
                    >Разрешить продажу сертификатов без кода
                </a-checkbox>
            </FormGroup>
            <FormGroup
                v-slot="attrs"
                :form="form"
                field="online_pay"
                show-custom-error
                :style="{ display: 'inline-block', width: 'calc(33% - 12px)' }"
            >
                <a-checkbox v-model="form[attrs.name]" v-bind="attrs" @input="attrs.change" @change="onChange"
                    >Доступность для продажи онлайн
                </a-checkbox>
            </FormGroup>
            <FormGroup v-slot="attrs" :form="form" field="services_id" label="Источники" show-custom-error>
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
            <div class="d-flex just-end">
                <a-button style="margin-right: 8px;" size="large" @click="$emit('cancel')">Отмена</a-button>
                <a-button type="primary" :loading="form.sendingRequest" size="large" @click.prevent="$emit('submit')"
                    >Сохранить</a-button
                >
            </div>
        </a-form-model>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import LoyaltyCertTypeUpdateForm from '@/form/loyalty/loyaltyCertType/LoyaltyCertTypeUpdateForm';
import FormGroup from '@/UI/components/common/form/FormGroup.vue';
@Component({
    components: { FormGroup }
})
export default class LoyaltyCertTypeUpdateComponent extends Vue {
    @Prop() readonly form!: LoyaltyCertTypeUpdateForm;
}
</script>

<style lang="scss" scoped></style>
