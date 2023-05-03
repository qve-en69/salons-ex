<template>
    <BaseDataForm :formReady='this.formReady'>
        <a-row>
            <PageTitle>
                <template v-slot:default>Товары</template>
                <template v-slot:button>
                    <a-dropdown style="margin-right: 12px;">
                        <a-button>Операции с Excel <a-icon type="down" /></a-button>
                        <a-menu slot="overlay">
                            <a-menu-item >
                                <a-icon type="download" />
                                Выгрузить
                            </a-menu-item>;
                        </a-menu>
                    </a-dropdown>
                    <a-button icon="plus-circle" type="primary" @click="$router.push({name: $routeRules.StoresProductsCreate, params: { fromCategory:1}})">Добавить товар
                    </a-button>
                </template>
            </PageTitle>
        </a-row>
        <a-row>
            <a-input-search style="margin-top: 0px;" placeholder="поиск по названию това, штрих коду или артиклу" enter-button  />
        </a-row>
        <a-row>
            <a-col :span="6">
                <div>
                    <a-row>
                        <p style="margin-top: 12px"><b>Действия</b></p>
                        <div style="margin-top: -10px">
                            <a-dropdown block class='ant-btn ant-btn-block'>
                                <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                                    <a-icon type="edit" />
                                    Быстрое управление
                                </a>
                                <a-menu slot="overlay">
                                    <a-menu-item key="0">
                                        <router-link :to="{ name: $routeRules.StoresProductsMassEdit}">
                                            <a>Массовое редактирование товаров</a>
                                        </router-link>
                                    </a-menu-item>
                                    <a-menu-item key="1">
                                        <router-link :to="{ name: $routeRules.StoresProductsArchived }">
                                            <a>Архив Товаров</a>
                                        </router-link>
                                    </a-menu-item>
                                </a-menu>
                            </a-dropdown>
                            <a-button block :disabled='!canArchived' style="margin-top: 2px">
                                Архивировать
                            </a-button>
                        </div>
                    </a-row>
                    <a-row>
                        <p style="margin-top: 15px"><b>Категории товаров</b></p>
                    </a-row>
                    <a-row>
                        <a-list
                            :columns="CategoryColumns"
                            :data-source="dataCategories">
                            <a-list-item slot="renderItem" slot-scope="item">
                                <a slot="actions"><a-icon type="edit" @click='editCategory(item.index)' />
                                </a>
                                <a-list-item-meta>
                                    <a slot="title" ><a-icon type="folder" /> {{ item.name }}</a>
                                </a-list-item-meta>
                            </a-list-item>
                        </a-list>
                    </a-row>
                    <a-row>
                        <a-button block  style="margin-top: 2px" @click='addCategory'>
                            <span style='margin-right: 8px'>+</span>{{$t(`products.category.addCategory`)}}
                        </a-button>
                    </a-row>
                </div>
            </a-col>
            <a-col :span="18">
                <a-table
                    style="margin-top: 24px;padding-left: 8px; padding-right: 8px;"
                    :columns="columns"
                    :data-source="products != undefined && products != null ? products.data : []"
                    :pagination="AppPageParams"
                    :loading="!this.tableLoad"
                    :row-selection="{type:'checkbox', onChange:rowOnChange}"
                    @change="handleTableChange"
                >
                    <template slot="operation" slot-scope="text, record">
                        <div class="editable-row-operations">
                            <router-link :to="{ name: 'StoresProductPage', id:record.id, params: { id: record.id }}">
                                  <span>
                                      <a-icon type="edit" />
                                  </span>
                            </router-link>
                        </div>
                    </template>
                </a-table>
            </a-col>
        </a-row>
        <a-modal v-model="this.showModal" :title="modalTitle"  @ok="onSubmit"
                 @cancel="handleCancel">
            <template slot="footer">
                <a-button key="back" @click="handleCancel">
                    Отмена
                </a-button>
                <a-button key="submit" type="primary" :loading="loading" @click="onSubmit">
                    Сохранить
                </a-button>
            </template>
                    <a-form-model
                        ref='categoryForm'
                        :model='form'
                        :rules='rules'
                    >
                            <a-form-model-item ref="name" :label="$t(`app.name`)" prop="name">
                                <a-input
                                    v-model="form.name"
                                />
                            </a-form-model-item>

                            <a-form-model-item ref="article" :label="$t(`products.category.article`)" prop="article">
                                <a-input
                                    v-model="form.article"
                                />
                            </a-form-model-item>

                            <a-form-model-item ref="parent_id" :label="$t(`products.category.parentCategory`)" prop="parent_id">
                                <a-select
                                    v-model="form.parent_id">
                                    <template v-if="Categories">
                                        <a-select-option v-for="item in Categories" :key="item.index">
                                            {{item.name}}
                                        </a-select-option>
                                    </template>

                                </a-select>
                            </a-form-model-item>

                    </a-form-model>
        </a-modal>

    </BaseDataForm>
</template>

<script lang="ts">

import { Component } from "vue-property-decorator"
import PageTitle from "@/UI/components/common/PageTitle.vue"
import AppSimpleLink from "@/UI/components/Link/AppSimpleLink.vue"
import { mixins } from "vue-class-component"

import { ProxyDataForm } from '@/UI/components/Helpers/ProxyDataForm'
import { ProductsMix } from "@/UI/mixins/Store/ProductsMix"
import { ProductsStore } from "@/store/modules/Warehouse/Products"
import { ProductsTableMix } from "@/UI/mixins/Store/ProductsTableMix"
import { ProductsCategoriesMix } from "@/UI/mixins/Store/ProductsCategoriesMix"
import { ProductsCategoriesStore } from "@/store/modules/Warehouse/ProductsCategories"
import { ProductsCategoriesTableMix } from "@/UI/mixins/Store/ProductsCategoriesTableMix"
import BaseDataForm from '@/UI/components/Helpers/BaseForm/BaseDataForm.vue';
import {WarehouseSupport} from "@/store/modules/Warehouse/Support/current"
import {
    IProductsCategoryTypes,
    ProductsCategoryUpdateRequestType
} from '@/entity/warehouse/Products/Category/Category.types';

import {
    Button, Menu, List, Table, Select
} from 'ant-design-vue';

import CategoryModal from '@/UI/pages/Stores/Products/Components/CategoryModal.vue';
import ModalWrapper from '@/UI/components/common/ModalWrapper.vue'
import { CategoryFormData, CategoryFormRules } from '@/form/Warehouse/Category/Category';
import i18n from '@/locales';

@Component({
    components: {
        'a-button': Button,
        'a-menu-item': Menu.Item,
        'a-list-item': List.Item,
        'a-list-item-meta': List.Item.Meta,
        'a-select':Select, 'a-select-option': Select.Option,
        'a-table': Table,

        PageTitle,
        BaseDataForm,
        AppSimpleLink,
        CategoryModal,
        ModalWrapper,
    }
})
export default class Products extends  mixins( ProxyDataForm,
    ProductsCategoriesTableMix, ProductsCategoriesMix, ProductsMix, ProductsTableMix ) {

    /*setup(){
        //const { locale, locales, i18n } = useI18n();
        const i18n = useI18n()
        return {
            ...i18n
        }
    }*/
    //route.title = i18n.t(`route.${route.title}`);


    dataCategories = ProductsCategoriesStore.dataCategories

    canArchived = false
    showModal = false
    categoryEditMode = 0
    categoryId = 0
    loading = true
    modalTitle = ''
    test = i18n.t('pdf.tips')

    //for Category Modal
    form = new CategoryFormData()
    rules = CategoryFormRules
    Category = ProductsCategoriesStore.dataCategory
    Categories = ProductsCategoriesStore.dataCategories
    //

    Wcd = WarehouseSupport

    get category():IProductsCategoryTypes | null
    {
        return ProductsCategoriesStore.dataCategory
    }

    async onSubmit(): Promise<void> {
        try {
            if (this.categoryEditMode === 0) {
                try {
                    await ProductsCategoriesStore.create(this.form)

                    await ProductsCategoriesStore.fetchAll({filter:{parent_id:0}})
                    ProductsCategoriesStore.fetchCategories()
                } catch (e) {
                    console.log('Error create products categories')
                }

                this.$message.info('Категория успешно создана!');
            }
            if (this.categoryEditMode === 1) {

                  let formData:ProductsCategoryUpdateRequestType = this.form
                  await ProductsCategoriesStore.update(formData)
                  await ProductsCategoriesStore.fetchAll({filter:{parent_id:0}})
                  ProductsCategoriesStore.fetchCategories()
                  this.$message.info('Категория успешно обновлена!');
            }
        }  catch(e) {
            console.log('Error save data -'+e)
        }
        this.showModal = false

    }
    handleCancel():void {
        this.showModal = false
    }

    async editCategory(id:number){
        console.log('11111 -'+id)
        await ProductsCategoriesStore.fetchData({filter:{id:id}}).then((data)=>{
            if (this.category!==null) this.form.setFormData(this.category)
        })
        this.modalTitle = 'изменить'
        //
        this.categoryEditMode = 1
        this.showModal = true
        this.loading = false

    }
    addCategory():void{
        this.form = new CategoryFormData()
        this.modalTitle = 'Создать категорию'
        this.categoryEditMode = 0

        this.showModal = true
        this.loading = false
    }
    handleUpdateModal(visible: boolean): void {
        console.log('Watch ***')

        this.showModal = visible;
        // this.updateForm.setFormData(this.counterparty);
    }
    rowOnChange(selectedRowKeys:any, selectedRows:any):void{
        this.canArchived = selectedRowKeys.length > 0
        console.log(selectedRowKeys)
    }

    async created(): Promise<void> {
        this.tableLoad = false
        try {
            await ProductsStore.fetchAll({limit:this.AppPageParams.pageSize, filter:{archived:false}})
            await ProductsCategoriesStore.fetchAll({filter:{parent_id:0}})

            ProductsCategoriesStore.fetchCategories()

            this.dataCategories.forEach((data, index:number) => {
                if (index===0){
                    console.log('установка id категории по умолчанию')
                    this.Wcd.setDefaultCategory(data.index)
                }
            })
            this.formReady = true
            this.tableLoad = true

        } catch (e){
            console.log('1233')
        }

    }
}

</script>