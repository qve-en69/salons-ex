<template>
    <BaseDataForm :formReady='this.formReady'>
            <PageTitle>
                <template v-slot:default>Массовое редактирование товаров</template>
            </PageTitle>
            <a-table
                style="margin-top: 24px;padding-left: 8px; padding-right: 8px;"
                :columns="mColumns"
                :data-source="products != undefined && products != null ? products.data : []"
                :pagination="AppPageParams"
                :loading="!this.tableLoad"
                @change="handleTableChange"
            >
                <template
                    v-for="col in ['vendor_code', 'barcode', 'selling_price','net_weight','gross_weight','cost_price']"
                    :slot="col"
                    slot-scope="text, record"
                >
                    <div :key="col">
                        <a-input
                            style="margin: -5px 0"
                            v-model="record[col]"
                            :value="text"
                            @change="e => handleChange(e.target.value, record.key, col)"
                        />
                    </div>
                </template>

                <template slot="operation" slot-scope="text, record">
                    <div class="editable-row-operations">
                      <a-button @click='store(record)'>
                        <span>
                          <a-icon type="check" />
                      </span>

                      </a-button>
                    </div>
                </template>
            </a-table>
    </BaseDataForm>
</template>
<script lang='ts'>
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import  PageTitle  from "@/UI/components/common/PageTitle.vue"
import { ProductsTableMix } from "@/UI/mixins/Store/ProductsTableMix"
import { ProxyDataForm } from '@/UI/components/Helpers/ProxyDataForm'
import { ProductsStore } from '@/store/modules/Warehouse/Products'
import { ProductsMix } from '@/UI/mixins/Store/ProductsMix'
import BaseDataForm from '@/UI/components/Helpers/BaseForm/BaseDataForm.vue'

@Component({
    components: { PageTitle, BaseDataForm }
})
export default class Index extends mixins(  ProxyDataForm, ProductsTableMix, ProductsMix, ) {

    handleChange(value:any, key:any, column:any) {
        /*const newData = [...this.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target[column] = value;
            this.data = newData;
        }*/
    }
    edit(key:any) {
        /*const newData = [...this.data];
        const target = newData.filter(item => key === item.key)[0];
        this.editingKey = key;
        if (target) {
            target.editable = true;
            this.data = newData;
        }*/
    }
    save(key:any) {
        /*const newData = [...this.data];
        const newCacheData = [...this.cacheData];
        const target = newData.filter(item => key === item.key)[0];
        const targetCache = newCacheData.filter(item => key === item.key)[0];
        if (target && targetCache) {
            delete target.editable;
            this.data = newData;
            Object.assign(targetCache, target);
            this.cacheData = newCacheData;
        }
        this.editingKey = '';*/
    }
    cancel(key:any) {
        /*const newData = [...this.data];
        const target = newData.filter(item => key === item.key)[0];
        this.editingKey = '';
        if (target) {
            Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
            delete target.editable;
            this.data = newData;
        }*/
    }
    async store(record:any): Promise<void> {
    try {
        await ProductsStore.update(record)
        this.$message.info('Товар успешно обновлен!');
    } catch (e) {
        this.$message.warning('Ошибка записи !!!')
    }
      console.log('record -'+record)
    }


    async created(): Promise<void> {
        this.tableLoad = false
        try {
            await ProductsStore.fetchAll({limit:this.AppPageParams.pageSize})

        } catch (e) {
            console.log('*******')
        }
        //await StoresStore.fetchAll({limit:this.AppPageParams.pageSize})
        this.formReady = true
        this.tableLoad = true
    }

}
</script>
