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
                        Без ограничения срока действия
                    </a-select-option>
                    <a-select-option :value="2">
                        Фиксированная дата для всех экземпляров
                    </a-select-option>
                    <a-select-option :value="3">
                        Фиксированный срок действия с момента продажи
                    </a-select-option>
                </a-select>
            </FormGroup>
            <FormGroup
                v-slot="attrs"
                :form="form"
                field="active_to"
                label="Дата сгорания"
                show-custom-error
                :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
            >
                <a-date-picker
                    size="large"
                    @change="handleOpeningDateChange"
                    :format="'DD-MM-YYYY'"
                    v-model="form[attrs.name]"
                    v-bind="attrs"
                    @input="attrs.change"
                    style="width: 100%"
                />
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
                :style="{ display: 'inline-block', width: 'calc(100% - 12px)' }"
            >
                <a-checkbox value="1" v-model="form[attrs.name]" v-bind="attrs" @input="attrs.change" @change="onChange"
                    >Разрешить продажу сертификатов без кода
                </a-checkbox>
            </FormGroup>
            <FormGroup
                v-slot="attrs"
                :form="form"
                field="online_pay"
                show-custom-error
                :style="{ display: 'inline-block', width: 'calc(100% - 12px)' }"
            >
                <a-checkbox value="1" v-model="form[attrs.name]" v-bind="attrs" @input="attrs.change" @change="onChange"
                    >Доступность для продажи онлайн
                </a-checkbox>
                <a-divider orientation="left">
                    Действует в студиях
                </a-divider>
            </FormGroup>
            <FormGroup v-slot="attrs" :form="form" field="salons_id" show-custom-error>
                <a-select mode="multiple" v-model="form[attrs.name]" v-bind="attrs" @input="attrs.change">
                    <a-select-option v-for="item in form.salons.data" :value="item.id" :key="item.id">
                        {{ item.name }}
                    </a-select-option>
                </a-select>
            </FormGroup>
            <div class="d-flex just-end">
                <a-button style="margin-right: 8px;" size="large" @click="$emit('cancel')">Отмена</a-button>
                <a-button type="primary" :loading="form.sendingRequest" size="large" @click.prevent="$emit('submit')">
                    Сохранить
                </a-button>
            </div>
        </a-form-model>
    </div>
</template>
<script lang="ts">
//    :disabled="form.disabled"
import { Component, Prop, Vue } from 'vue-property-decorator';
import LoyaltyCertTypeAddForm from '@/form/loyalty/loyaltyCertType/LoyaltyCertTypeAddForm';
import FormGroup from '@/UI/components/common/form/FormGroup.vue';
import { TreeSelect } from 'ant-design-vue';
import moment from 'moment';

@Component({
    components: { FormGroup, TreeSelect },
    methods: { moment }
})
export default class LoyaltyCertTypeAddComponent extends Vue {
    // treeData: any[];
    // treeDataProduct: any = [];
    // value: any[];
    @Prop() form!: LoyaltyCertTypeAddForm;
    constructor() {
        super();
        // const SHOW_PARENT = TreeSelect.SHOW_PARENT;
        // this.value = ['0-0-0'];
        // console.log(TreeSelect.name);
        // (this.treeData = [
        //     {
        //         title: 'Аппаратное удаление волос женщины',
        //         value: '0-0',
        //         key: '0-0',
        //         children: [
        //             {
        //                 title: 'Бедра полностью',
        //                 value: '0-0-0',
        //                 key: '0-0-0'
        //             },
        //             {
        //                 title: 'Бедра частично',
        //                 value: '0-0-0',
        //                 key: '0-0-0'
        //             }
        //         ]
        //     },
        //     {
        //         title: 'Аппаратное удаление волос лица мужчины',
        //         value: '0-1',
        //         key: '0-1',
        //         children: [
        //             {
        //                 title: 'Бедра полностью',
        //                 value: '0-1-0',
        //                 key: '0-1-0',
        //                 disabled: true
        //             },
        //             {
        //                 title: 'Бедра частично',
        //                 value: '0-1-1',
        //                 key: '0-1-1'
        //             },
        //             {
        //                 title: 'Бедра',
        //                 value: '0-1-2',
        //                 key: '0-1-2'
        //             }
        //         ]
        //     }
        // ]),
        // (this.treeDataProduct = [
        //     {
        //         title: 'Основыне товары',
        //         value: '0-0',
        //         key: '0-0',
        //         children: [
        //             {
        //                 title: 'MESOMATRIX сыворотка МИКС из гиалуроновой кислоты, 100',
        //                 value: '0-0-0',
        //                 key: '0-0-0'
        //             },
        //             {
        //                 title: 'MESOMATRIX сыворотка МИКС из гиалуроновой кислоты, 30',
        //                 value: '0-0-0',
        //                 key: '0-0-0'
        //             }
        //         ]
        //     },
        //     {
        //         title: 'Расходники',
        //         value: '0-1',
        //         key: '0-1',
        //         children: [
        //             {
        //                 title: 'Шпатель деревянный А-И 100 шт/уп',
        //                 value: '0-1-0',
        //                 key: '0-1-0',
        //                 disabled: true
        //             },
        //             {
        //                 title: 'Бумага',
        //                 value: '0-1-1',
        //                 key: '0-1-1'
        //             },
        //             {
        //                 title: 'Бритва одноразовая',
        //                 value: '0-1-2',
        //                 key: '0-1-2'
        //             }
        //         ]
        //     }
        // ]);
    }
    handleOpeningDateChange(value: any): void {
        this.form.active_to = value.format('DD-MM-YYYY');
    }
}
</script>

<style lang="scss" scoped></style>
