<template>
    <div class="loyaltyBonus">
        <div class="card-container">
            <a-tabs type="card" :default-active-key="tabs.find(el => el.id === $route.name).id" @change="tabChanged">
                <a-tab-pane :tab="item.name" v-for="item in tabs" :key="item.id">
                    <keep-alive>
                        <router-view :loyalty="loyalty"></router-view>
                    </keep-alive>
                </a-tab-pane>
            </a-tabs>
        </div>
        <div class="box-container">
            <PageTitle>
                <template v-slot:default>Бонусная программа</template>
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
                        >Создать бонусную программу
                    </a-button>
                </template>
            </PageTitle>
            <a-table
                style="margin-top: 24px;"
                bordered
                :columns="columns"
                :data-source="loyaltyBonus != null && loyaltyBonus.data != undefined ? loyaltyBonus.data : []"
                :pagination="pagination"
                :loading="!loyaltyBonusLoaded"
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

        <ModalWrapper title="Создать бонусную программу" :show="showAddModal" @handleModal="handleAddModal">
            <LoyaltyBonusAddComponent :form="form" @cancel="showAddModal = false" @submit="submit" />
        </ModalWrapper>

        <ModalWrapper title="Обновить бонусную программу" :show="showUpdateModal" @handleModal="handleUpdateModal">
            <LoyaltyBonusUpdateComponent :form="updateForm" @cancel="showUpdateModal = false" @submit="updateSubmit" />
        </ModalWrapper>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PageTitle from '@/UI/components/common/PageTitle.vue';
import { loyaltyBonusTabs } from '@/utils/tabs';
import { ITableColumn } from '@/entity/table/table.types';
import { IClients } from '@/entity/clients/clients.types';
import { ClientsStore } from '@/store/modules/Clients';
import { ILoyaltyBonusType } from '@/entity/loyalty/loyaltyBonus/loyaltyBonusType/LoyaltyBonusType.types';
import { LoyaltyBonusTypeStore } from '@/store/modules/LoyaltyBonusType';

import { TablesStore } from '@/store/modules/Tables';
import LoyaltyBonusAddForm from '@/form/loyalty/loyaltyBonus/LoyaltyBonusAddForm';
import LoyaltyBonusUpdateForm from '@/form/loyalty/loyaltyBonus/LoyaltyBonusUpdateForm';
import LoyaltyBonusAddComponent from '@/UI/components/forms/loyalty/loyaltyBonus/loyaltyBonus/LoyaltyBonusAddComponent.vue';
import LoyaltyBonusUpdateComponent from '@/UI/components/forms/loyalty/loyaltyBonus/loyaltyBonus/LoyaltyBonusUpdateComponent.vue';
import { LoyaltyBonusStore } from '@/store/modules/LoyaltyBonus';
import ModalWrapper from '@/UI/components/common/ModalWrapper.vue';
import { ILoyaltyBonus, ILoyaltyBonusListItem } from '@/entity/loyalty/loyaltyBonus/loyaltyBonus/LoyaltyBonus.types';

@Component({
    components: { ModalWrapper, PageTitle, LoyaltyBonusAddComponent, LoyaltyBonusUpdateComponent }
})
export default class LoyaltyBonus extends Vue {
    tabs = loyaltyBonusTabs;
    form = new LoyaltyBonusAddForm();
    updateForm = new LoyaltyBonusUpdateForm();
    counterparty: ILoyaltyBonusListItem | null = null;
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
    tabChanged(key: string): void {
        this.$router.push({ name: key });
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
    get clients(): IClients | null {
        return ClientsStore.clients;
    }
    get loyaltyBonusTypes(): ILoyaltyBonusType | null {
        return LoyaltyBonusTypeStore.loyaltyBonusTypes;
    }
    async created(): Promise<void> {
        await LoyaltyBonusStore.fetchAll({ limit: this.pagination.pageSize });
        await ClientsStore.fetchAll({ limit: 9999});
        await LoyaltyBonusTypeStore.fetchAll();
        this.form.setFormData(this.clients, this.loyaltyBonusTypes);
        console.log(this.loyaltyBonus);
    }

    get columns(): ITableColumn[] {
        return TablesStore.loyaltyBonus;
    }

    get loyaltyBonus(): ILoyaltyBonus | null {
        return LoyaltyBonusStore.loyaltyBonuss;
    }

    get loyaltyBonusLoaded(): boolean {
        return true;
    }

    handleAddModal(visible: boolean): void {
        this.showAddModal = visible;
    }

    handleUpdateModal(visible: boolean): void {
        this.showUpdateModal = visible;

        // this.updateForm.setFormData(this.counterparty);
    }

    show(counterparty: ILoyaltyBonusListItem): void {
        this.counterparty = counterparty;
        this.handleUpdateModal(true);
        //this.visible = true;
    }

    async submit(): Promise<void> {
        if (await this.form.submit(LoyaltyBonusStore.create)) {
            await LoyaltyBonusStore.fetchAll({ limit: this.pagination.pageSize });
            this.showAddModal = false;
            this.form = new LoyaltyBonusAddForm();
        }
    }
    async updateSubmit(): Promise<void> {
        if (await this.updateForm.submit(LoyaltyBonusStore.update)) {
            await LoyaltyBonusStore.fetchAll({ limit: this.pagination.pageSize });
            this.showUpdateModal = false;
            // if (this.loyaltyBonus && this.loyaltyBonus.data) {
            //     if (this.counterparty) {
            //         for (let i = 0; i < this.loyaltyBonus.data.length; i++) {
            //             if (this.counterparty.id == this.loyaltyBonus.data[i].id) {
            //                 this.counterparty = this.loyaltyBonus.data[i];
            //                 break;
            //             }
            //         }
            //     }
            // }
            this.updateForm = new LoyaltyBonusUpdateForm();
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

        await LoyaltyBonusStore.fetchAll(data);
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
