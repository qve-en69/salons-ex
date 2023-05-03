<template>
    <div>
        <BaseDataForm :formReady='this.formReady'>
            <a-form-model
               ref='categoryForm'
               :model='form'
               :rules='rules'
            >
                <a-row>
                    <a-form-model-item ref="name" label="Наименование" prop="name">
                        <a-input
                            v-model="form.name"
                        />
                    </a-form-model-item>

                    <a-form-model-item ref="article" label="Артикул" prop="article">
                        <a-input
                            v-model="form.article"
                        />
                    </a-form-model-item>

                    <a-form-model-item ref="parent_id" label="Родительская категория" prop="parent_id">
                        <a-select
                            v-model="form.parent_id">
                            <template v-if="Categories">
                                <a-select-option v-for="item in Categories" :key="item.index">
                                    {{item.name}}
                                </a-select-option>
                            </template>

                        </a-select>
                    </a-form-model-item>
                </a-row>
                <a-row>
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
                </a-row>
            </a-form-model>
        </BaseDataForm>
    </div>
</template>

<script lang='ts'>
import { SimpleProxyForm } from "@/UI/components/Helpers/SimpleProxyForm"
import { Component, Prop, Watch } from "vue-property-decorator"
import { mixins } from "vue-class-component"
import { CategoryFormData, CategoryFormRules } from '@/form/Warehouse/Category/Category';
import BaseDataForm from '@/UI/components/Helpers/BaseForm/BaseDataForm.vue'
import { Select } from 'ant-design-vue';
import { ProductsCategoriesStore } from '@/store/modules/Warehouse/ProductsCategories';
import { IProductsCategoryTypes } from '@/entity/warehouse/Products/Category/Category.types';
import category from "@/entity/category/category";

@Component({
    components :{ BaseDataForm, 'a-select':Select, 'a-select-option': Select.Option }
})
export default class CategoryModal extends mixins(SimpleProxyForm) {
    @Prop() readonly mode!: number
    @Prop() readonly id!:number

    Category = ProductsCategoriesStore.dataCategory
    Categories = ProductsCategoriesStore.dataCategories
    form = new CategoryFormData()
    rules = CategoryFormRules

    get category():IProductsCategoryTypes | null
    {
      return ProductsCategoriesStore.dataCategory
    }


    @Watch('id')
    async wId(id:number){


        this.formReady = false

        this.form = this.Category as CategoryFormData
        //this.form = this.Category
        console.log('Data '+this.Category)
        this.formReady = true
    }


    async onSubmit(): Promise<void> {
        try {
            if (this.$props.mode===0) {
                //await ProductsStore.create(this.$props.form)
                try {
                    await ProductsCategoriesStore.create(this.form)
                } catch (e) {
                    console.log('Error create products categories')
                }
                this.$message.info('Категория успешно создан!');
            }
            if (this.$props.mode===1) {
                await ProductsCategoriesStore.update(this.form)
                this.$message.info('Категория успешно обновлена!');

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
        this.formReady = true
    }

    handleOk(e:any):any {
        this.$props.visible = false;
        /*this.loading = true;
        setTimeout(() => {
            this.visible = false;
            this.loading = false;
        }, 3000);*/
    }

    handleCancel(e:any):any {
        //this.$props.visible = false;
    }
}

</script>
