<template>
    <div>
        <template v-if="this.formReady">
            <a-form-model
                ref="productsForm"
                :model="form"
                :rules="rules"
            >
                <a-row>
                    <a-col :span="6">
                        <a-row>
                            <p style="margin-top: 15px"><b>Товары в категории</b></p>
                        </a-row>
                        <a-row>
                            <a-list
                                :columns="shortColumns"
                                :data-source="products != undefined && products != null ? products.data : []"
                            >
                                <a-list-item slot="renderItem" slot-scope="item">
                                    <a-icon type="gift" /> {{item.name}}
                                </a-list-item>
                            </a-list>

                        </a-row>
                    </a-col>
                    <a-col :span="18">
                        <a-row>
                            <a-form-model-item ref="name" label="Наименование" prop="name">
                                <a-input
                                    v-model="form.name"
                                />
                            </a-form-model-item>
                            <a-form-model-item ref="name" label="Название в чеке" prop="check">
                                <a-input v-model="form.check" />
                            </a-form-model-item>
                            <a-form-model-item ref="vendor_code" label="Артикул" prop="vendor_code">
                                <a-input
                                    v-model="form.vendor_code"

                                />
                            </a-form-model-item>
                            <a-form-model-item ref="barcode" label="Штрих код" prop="barcode">
                                <a-input
                                    v-model="form.barcode"

                                />
                            </a-form-model-item>

                            <a-form-model-item ref="barcode" label="Категория" prop="category_id">
                                <a-select
                                    v-model="form.category_id">
                                    <template v-if="productsCategoriesData">
                                        <a-select-option v-for="item in productsCategoriesData" :key="item.id">
                                            {{item.name}}
                                        </a-select-option>
                                    </template>

                                </a-select>
                            </a-form-model-item>
                        </a-row>
                        <a-row>
                            <a-col span="9">
                                <a-form-model-item ref="sale_unit_id" label="Для продажи" prop="sale_unit_id">
                                    <a-select
                                        v-model="form.sale_unit_id">
                                        <template v-if="productsUnitData">
                                            <a-select-option v-for="item in productsUnitData" :key="item.id">
                                                {{item.name}}
                                            </a-select-option>
                                        </template>
                                    </a-select>
                                </a-form-model-item>
                            </a-col>

                            <a-col span="6">
                                <a-form-model-item ref="sale_unit_value" label="Равно" prop="sale_unit_value">
                                    <a-input style="margin-left: 2px;" v-model="form.sale_unit_value">
                                        <a-icon slot="prefix" type="swap" />
                                    </a-input>
                                </a-form-model-item>
                            </a-col>
                            <a-col span="9">
                                <a-form-model-item ref="writeoff_unit_id" label="Для списания" prop="writeoff_unit_id">
                                    <a-select
                                        style="margin-left: 4px;" v-model="form.writeoff_unit_id">
                                        <a-select-option v-for="item in productsUnitData" :key="item.id">
                                            {{item.name}}
                                        </a-select-option>
                                    </a-select>
                                </a-form-model-item>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="12">
                                <a-form-model-item ref="net_weight" label="Масса нетто" prop="net_weight">
                                    <a-input v-model="form.net_weight">
                                    </a-input>
                                </a-form-model-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-model-item ref="gross_weight" label="Масса брутто" prop="gross_weight">
                                    <a-input v-model="form.gross_weight">
                                    </a-input>
                                </a-form-model-item>

                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="12">
                                <a-form-model-item ref="selling_price" label="Цена продажи" prop="selling_price">
                                    <a-input v-model="form.selling_price">
                                    </a-input>
                                </a-form-model-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-model-item ref="cost_price" label="Себестоимость" prop="cost_price">
                                    <a-input v-model="form.cost_price">
                                    </a-input>
                                </a-form-model-item>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="12">
                                <a-form-model-item ref="tax_system_id" label="Система налогооблажения" prop="tax_system_id">
                                    <a-select
                                        style="margin-left: 4px;"
                                        v-model="form.tax_system_id">
                                        <a-select-option v-for="item in productsTaxSystemData" :key="item.id">
                                            {{item.name}}
                                        </a-select-option>
                                    </a-select>
                                </a-form-model-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-model-item ref="tax_id" label="НДС" prop="tax_id">
                                    <a-select
                                        style="margin-left: 4px;"
                                        v-model="form.tax_id">
                                        <a-select-option v-for="item in productsTaxData" :key="item.id">
                                            {{item.name}}
                                        </a-select-option>
                                    </a-select>
                                </a-form-model-item>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="12">
                                <a-form-model-item ref="critical_remainder" label="Критический остаток" prop="critical_remainder">
                                    <a-input v-model="form.critical_remainder">
                                    </a-input>
                                </a-form-model-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-model-item ref="wish_remainder" label="Желаемый остаток" prop="wish_remainder">
                                    <a-input v-model="form.wish_remainder">
                                    </a-input>
                                </a-form-model-item>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-form-model-item ref="comment" label="Комментарий остаток" prop="comment">
                                <a-textarea v-model="form.comment"></a-textarea>
                            </a-form-model-item>
                        </a-row>

                        <template v-if='this.$props.mode===0'>
                            <a-row>
                                <a-button type="primary" @click="onSubmit">Сохранить</a-button>
                            </a-row>
                        </template>
                        <template v-if='this.$props.mode===1'>
                            <a-row>
                                <a-button type="primary" @click="onSubmit">Обновить</a-button>
                            </a-row>
                        </template>

                    </a-col>
                </a-row>
            </a-form-model>
        </template>
        <template v-else>
            <div>
                <a-alert
                    message="Подготовка данных"
                    type="info"
                />
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import { Select } from 'ant-design-vue';

import { Component, Prop, Vue } from "vue-property-decorator"
import PageTitle from "@/UI/components/common/PageTitle.vue"
import { mixins } from "vue-class-component"
import FormGroup from "@/UI/components/common/form/FormGroup.vue";
import { SimpleProxyForm } from "@/UI/components/Helpers/SimpleProxyForm";
import { PaginationMix } from "@/UI/mixins/PaginationMix";
import { ProductsTableMix } from "@/UI/mixins/Store/ProductsTableMix";
//import createProduct from "@/form/Warehouse/Products/createProduct"
import { ProductsStore } from "@/store/modules/Warehouse/Products";
import { ProductsMix } from "@/UI/mixins/Store/ProductsMix"
import { ProductsCategoriesMix } from "@/UI/mixins/Store/ProductsCategoriesMix"
import { ProductsTaxMix } from "@/UI/mixins/Store/ProductsTaxMix"
import { ProductsTaxSystemMix } from "@/UI/mixins/Store/ProductsTaxSystemMix"
import { ProductsUnitMix } from "@/UI/mixins/Store/ProductsUnitMix"

import { ProductsCategoriesStore } from "@/store/modules/Warehouse/ProductsCategories"
import { ProductsUnitStore } from "@/store/modules/Warehouse/ProductsUnit"
import { ProductsTaxStore } from "@/store/modules/Warehouse/Tax";
import { ProductsTaxSystemStore } from "@/store/modules/Warehouse/TaxSystem";

import { ProductFormData, FormRules } from "@/form/Warehouse/Products/Product";
import {RouterNameEnum} from "@/router/router.types";

@Component({
    components :{ PageTitle, FormGroup, 'a-select':Select, 'a-select-option': Select.Option }
})
export default class CreateProductForm extends mixins( SimpleProxyForm, PaginationMix,
    ProductsTableMix, ProductsMix, ProductsCategoriesMix, ProductsTaxMix, ProductsTaxSystemMix, ProductsUnitMix ){
    @Prop() readonly form!: ProductFormData;
    @Prop() readonly mode!: number

    other = ''
    rules = FormRules
    async onSubmit(): Promise<void> {
        try {
            if (this.$props.mode===0) {
                await ProductsStore.create(this.$props.form)
                this.$message.info('Товар успешно создан!');
                await this.$router.push({ name: this.$routeRules.StoresProductsPage })

            }
                if (this.$props.mode===1) {
                await ProductsStore.update(this.$props.form)
                this.$message.info('Товар успешно обновлен!');
                await this.$router.push({ name: this.$routeRules.StoresProductsPage })
               //await this.$router.push({name: RouterNameEnum.StoresProductsPage});
            }
        }  catch(e) {
            console.log('Error save data -'+e)
        }
    }

    constructor() {
        super();
    }
    async created(): Promise<void> {
        try {
            console.log('mode CreateProduct -'+ this.$props.mode)

            if (this.$props.mode===0) {
                await ProductsCategoriesStore.fetchAll({filter:{parent_id:this.$route.params.fromCategory}})

                await ProductsStore.fetchAll({limit:this.AppPageParams.pageSize,
                    filter:{category_id:this.$route.params.fromCategory}}
                )
            }
            if (this.$props.mode===1) {
                console.log('Id - '+this.$route.params.id)
                await ProductsStore.fetchData({filter: {id: parseInt(this.$route.params.id)}})
                this.$props.form = this.product
            }
            await ProductsTaxStore.fetchAll()
            await ProductsTaxSystemStore.fetchAll()
            await ProductsUnitStore.fetchAll()
            await ProductsTaxSystemStore.fetchAll()
            await ProductsTaxStore.fetchAll()

            ProductsCategoriesStore.fetchCategories()
            this.formReady = true
            this.tableLoad = true

        }  catch(e) {
            console.log('Error parse data -'+e)
        }
    }
}


</script>