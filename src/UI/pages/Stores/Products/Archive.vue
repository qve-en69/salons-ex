<template>
    <BaseDataForm :formReady='this.formReady'>
        <a-row>
            <a-col :span="6">
                <div>
                    <a-row>
                        <p style="margin-top: 12px"><b>Действия</b></p>
                        <div style="margin-top: -10px">
                            <a-button block style="margin-top: 2px">
                                Архивировать
                            </a-button>
                        </div>
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
                    :row-selection="{type:'checkbox'}"
                    @change="handleTableChange"
                >
                    <template slot="operation" slot-scope="text, record">
                        <div class="editable-row-operations">
                            <a-button>
                                восстановить
                            </a-button>
                        </div>
                    </template>
                </a-table>
            </a-col>
        </a-row>


    </BaseDataForm>
</template>


<script lang='ts'>

import { ProductsMix } from "@/UI/mixins/Store/ProductsMix"
import { ProductsStore } from "@/store/modules/Warehouse/Products"
import { ProductsTableMix } from "@/UI/mixins/Store/ProductsTableMix"
import { ProductsCategoriesMix } from "@/UI/mixins/Store/ProductsCategoriesMix"
import { ProductsCategoriesTableMix } from "@/UI/mixins/Store/ProductsCategoriesTableMix"
import { Component } from 'vue-property-decorator';
import PageTitle from '@/UI/components/common/PageTitle.vue';
import AppSimpleLink from '@/UI/components/Link/AppSimpleLink.vue';
import { mixins } from 'vue-class-component';
import BaseDataForm from '@/UI/components/Helpers/BaseForm/BaseDataForm.vue';
import { ProxyDataForm } from "@/UI/components/Helpers/ProxyDataForm"

@Component({
    components: { PageTitle, AppSimpleLink, BaseDataForm }
})
export default class Archive extends mixins( ProductsCategoriesTableMix, ProductsCategoriesMix,  ProductsMix, ProductsTableMix, ProxyDataForm )
{
    async created(): Promise<void> {
        this.tableLoad = false
        try {
            await ProductsStore.fetchAll({limit:this.AppPageParams.pageSize, filter:{archived:true}})
        } catch (e) {
            console.log('Parse Data load error')
        }

        this.formReady = true
        this.tableLoad = true
    }
}
</script>