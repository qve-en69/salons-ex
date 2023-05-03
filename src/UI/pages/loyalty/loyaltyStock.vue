<template>
    <div class="loyaltyStock">
        <div class="box-container">
            <PageTitle>
                <template v-slot:default>Акции</template>
                <template v-slot:button>
                    <a-dropdown style="margin-right: 12px;">
                        <a-menu slot="overlay">
                            <a-menu-item>
                                <a-icon type="download" />
                                Выгрузить
                            </a-menu-item>
                            <a-menu-item>
                                <a-icon type="upload" />
                                Загрузить
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                    <a-button icon="plus-circle" type="primary" size="large" @click="showAddModal = true"
                        >Создать акцию
                    </a-button>
                </template>
            </PageTitle>
            <a-table
                style="margin-top: 24px;"
                bordered
                :columns="columns"
                :data-source="loyaltyStock != null && loyaltyStock.data != undefined ? loyaltyStock.data : []"
                :pagination="pagination"
                :loading="!loyaltyStockLoaded"
                @change="handleTableChange"
            >
                <div
                    slot="filterDropdown"
                    slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
                    style="padding: 8px"
                >
                    <a-input
                        v-ant-ref="c => (searchInput = c)"
                        :placeholder="`Поиск ${column.title}`"
                        :value="selectedKeys[0]"
                        style="width: 188px; margin-bottom: 8px; display: block;"
                        @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                        @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
                    />
                    <a-button
                        type="primary"
                        icon="search"
                        size="small"
                        style="width: 90px; margin-right: 8px"
                        @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
                    >
                        Поиск
                    </a-button>
                    <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">
                        Сбросить
                    </a-button>
                </div>
                <a-icon
                    slot="filterIcon"
                    slot-scope="filtered"
                    type="search"
                    :style="{ color: filtered ? '#108ee9' : undefined }"
                />
                <template slot="contact_person" slot-scope="contact_person, record">
                    {{ contact_person }} <br />
                    {{ record.phone }} <br />
                    {{ record.email }}</template
                >
                <template slot="balance" slot-scope="balance, record">
                    <div class="flex j_cont_sp">
                        <span>{{ balance }} ₽</span>
                        <a-icon
                            @click="
                                () => {
                                    show(record);
                                }
                            "
                            theme="twoTone"
                            type="edit"
                        />
                    </div>
                </template>
            </a-table>
        </div>

        <ModalWrapper title="Создать акцию" :show="showAddModal" @handleModal="handleAddModal">
            <LoyaltyStockAddComponent :form="form" @cancel="showAddModal = false" @submit="submit" />
        </ModalWrapper>

        <ModalWrapper title="Обновить акцию" :show="showUpdateModal" @handleModal="handleUpdateModal">
            <LoyaltyStockUpdateComponent :form="updateForm" @cancel="showUpdateModal = false" @submit="updateSubmit" />
        </ModalWrapper>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PageTitle from '@/UI/components/common/PageTitle.vue';
import { ITableColumn } from '@/entity/table/table.types';
import { TablesStore } from '@/store/modules/Tables';
import { ISalons } from '@/entity/salons/salons.types';
import { SalonsStore } from '@/store/modules/Salons';
import { IServices } from '@/entity/services/services.types';
import { ServiceStore } from '@/store/modules/Services';
import LoyaltyStockAddForm from '@/form/loyalty/loyaltyStock/LoyaltyStockAddForm';
import LoyaltyStockUpdateForm from '@/form/loyalty/loyaltyStock/LoyaltyStockUpdateForm';
import LoyaltyStockAddComponent from '@/UI/components/forms/loyalty/loyaltyStock/LoyaltyStockAddComponent.vue';
import LoyaltyStockUpdateComponent from '@/UI/components/forms/loyalty/loyaltyStock/LoyaltyStockUpdateComponent.vue';
import { LoyaltyStockStore } from '@/store/modules/LoyaltyStock';
import ModalWrapper from '@/UI/components/common/ModalWrapper.vue';
import { ILoyaltyStock, ILoyaltyStockListItem } from '@/entity/loyalty/loyaltyStock/LoyaltyStock.types';

@Component({
    components: { ModalWrapper, PageTitle, LoyaltyStockAddComponent, LoyaltyStockUpdateComponent }
})
export default class LoyaltyStock extends Vue {
    form = new LoyaltyStockAddForm();
    updateForm = new LoyaltyStockUpdateForm();
    counterparty: ILoyaltyStockListItem | null = null;
    searchText = '';
    searchInput: null;
    searchedColumn = '';
    showAddModal = false;
    showUpdateModal = false;
    filterData: any;
    pagination = {
        showSizeChanger: true,
        pageSize: 10,
        total: 10
    };

    constructor() {
        super();

        this.filterData = {
            limit: this.pagination.pageSize
        };
    }

    customRow = (record: any) => {
        return {
            on: {
                click: (event: any) => {
                    console.log(event);
                    //this.$router.push({name: RouterNameEnum.SalonDetail, params: {id: record.id}})
                    alert('clicked');
                }
            }
        };
    };
    get salons(): ISalons | null {
        return SalonsStore.salons;
    }
    get service(): IServices | null {
        return ServiceStore.service;
    }
    async created(): Promise<void> {
        await LoyaltyStockStore.fetchAll({ limit: this.pagination.pageSize });
        await SalonsStore.fetchAll( { limit: 9999});
        await ServiceStore.fetchAll();
        this.form.setFormData(this.salons, this.service);

        console.log(this.loyaltyStock);
    }

    get columns(): ITableColumn[] {
        return TablesStore.loyaltyStock;
    }

    get loyaltyStock(): ILoyaltyStock | null {
        return LoyaltyStockStore.loyaltyStocks;
    }

    get loyaltyStockLoaded(): boolean {
        return true;
    }

    handleAddModal(visible: boolean): void {
        this.showAddModal = visible;
    }

    handleUpdateModal(visible: boolean): void {
        this.showUpdateModal = visible;

        // this.updateForm.setFormData(this.counterparty);
    }

    show(counterparty: ILoyaltyStockListItem): void {
        this.counterparty = counterparty;
        this.handleUpdateModal(true);
        //this.visible = true;
    }

    async submit(): Promise<void> {
        if (await this.form.submit(LoyaltyStockStore.create)) {
            await LoyaltyStockStore.fetchAll({ limit: this.pagination.pageSize });
            this.showAddModal = false;
            this.form = new LoyaltyStockAddForm();
        }
    }
    async updateSubmit(): Promise<void> {
        if (await this.updateForm.submit(LoyaltyStockStore.update)) {
            await LoyaltyStockStore.fetchAll({ limit: this.pagination.pageSize });
            this.showUpdateModal = false;
            // if(this.loyaltyStock && this.loyaltyStock.data){
            //   if(this.counterparty){
            //     for(let i = 0; i < this.loyaltyStock.data.length; i++){
            //       if(this.counterparty.id == this.loyaltyStock.data[i].id){
            //         this.counterparty = this.loyaltyStock.data[i];
            //         break;
            //       }
            //     }
            //   }
            // }
            this.updateForm = new LoyaltyStockUpdateForm();
        }
    }

    handleSearch(selectedKeys: any, confirm: any, dataIndex: any) {
        confirm();
        this.searchText = selectedKeys[0];
        this.searchedColumn = dataIndex;
    }

    handleReset(clearFilters: any) {
        clearFilters();
        this.searchText = '';
    }

    async handleTableChange(pagination: any, filters: any, sorter: any) {
        let skip = 0;
        let data = this.filterData;

        if (pagination && pagination.current > 0) {
            skip = (pagination.current - 1) * pagination.pageSize;
        }

        data.skip = skip;
        data.limit = pagination.pageSize;

        await LoyaltyStockStore.fetchAll(data);
    }
}
</script>

<style lang="scss" scoped>
.flex {
    display: flex;
    align-items: center;

    &.j_cont_sp {
        justify-content: space-between;
    }
}
</style>
