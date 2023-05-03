<template>
    <div class="loyaltySubscriptionType">
        <div class="card-container">
            <a-tabs type="card" :default-active-key="tabs.find(el => el.id === $route.name).id" @change="tabChanged">
                <a-tab-pane :tab="item.name" v-for="item in tabs" :key="item.id">
                    <keep-alive>
                        <router-view :loyaltySubscription="loyaltySubscription"></router-view>
                    </keep-alive>
                </a-tab-pane>
            </a-tabs>
        </div>
        <div class="box-container">
            <PageTitle>
                <template v-slot:default>Типы абонементов</template>
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
                        >Создать тип абонемента
                    </a-button>
                </template>
            </PageTitle>

            <a-table
                style="margin-top: 24px;"
                bordered
                :columns="columns"
                :data-source="
                    loyaltySubscriptionType != null && loyaltySubscriptionType.data != undefined
                        ? loyaltySubscriptionType.data
                        : []
                "
                :pagination="pagination"
                :loading="!loyaltySubscriptionTypeLoaded"
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

        <ModalWrapper width="1200px" title="Создать тип абонемента" :show="showAddModal" @handleModal="handleAddModal">
            <LoyaltySubscriptionTypeAddComponent :form="form" @cancel="showAddModal = false" @submit="submit" />
        </ModalWrapper>

        <ModalWrapper
            width="1200px"
            title="Обновить тип абонемента"
            :show="showUpdateModal"
            @handleModal="handleUpdateModal"
        >
            <LoyaltySubscriptionTypeUpdateComponent
                :form="updateForm"
                @cancel="showUpdateModal = false"
                @submit="updateSubmit"
            />
        </ModalWrapper>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PageTitle from '@/UI/components/common/PageTitle.vue';
import { loyaltySubscriptionTabs } from '@/utils/tabs';
import { ITableColumn } from '@/entity/table/table.types';
import { ISalons } from '@/entity/salons/salons.types';
import { IServicesCategory } from '@/entity/servicesCategory/services.category.types';
import { SalonsStore } from '@/store/modules/Salons';
import { ServicesCategoryStore } from '@/store/modules/ServicesCategory';
import { TablesStore } from '@/store/modules/Tables';
import LoyaltySubscriptionTypeAddForm from '@/form/loyalty/loyaltySubscriptionType/LoyaltySubscriptionTypeAddForm';
import LoyaltySubscriptionTypeUpdateForm from '@/form/loyalty/loyaltySubscriptionType/LoyaltySubscriptionTypeUpdateForm';
import LoyaltySubscriptionTypeAddComponent from '@/UI/components/forms/loyalty/loyaltySubscription/loyaltySubscriptionType/LoyaltySubscriptionTypeAddComponent.vue';
import LoyaltySubscriptionTypeUpdateComponent from '@/UI/components/forms/loyalty/loyaltySubscription/loyaltySubscriptionType/LoyaltySubscriptionTypeUpdateComponent.vue';
import { LoyaltySubscriptionTypeStore } from '@/store/modules/LoyaltySubscriptionType';
import ModalWrapper from '@/UI/components/common/ModalWrapper.vue';
import {
    ILoyaltySubscriptionType,
    ILoyaltySubscriptionTypeListItem
} from '@/entity/loyalty/loyaltySubscription/loyaltySubscriptionType/LoyaltySubscriptionType.types';

@Component({
    components: { ModalWrapper, PageTitle, LoyaltySubscriptionTypeAddComponent, LoyaltySubscriptionTypeUpdateComponent }
})
export default class LoyaltySubscriptionType extends Vue {
    tabs = loyaltySubscriptionTabs;
    form = new LoyaltySubscriptionTypeAddForm();
    updateForm = new LoyaltySubscriptionTypeUpdateForm();
    counterparty: ILoyaltySubscriptionTypeListItem | null = null;
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
    get salons(): ISalons | null {
        return SalonsStore.salons;
    }
    get servicesCategory(): IServicesCategory | null {
        return ServicesCategoryStore.serviceCategory;
    }
    async created(): Promise<void> {
        await LoyaltySubscriptionTypeStore.fetchAll({ limit: this.pagination.pageSize });
        await SalonsStore.fetchAll();
        await ServicesCategoryStore.fetchAll();
        this.form.setFormData(this.salons, this.servicesCategory);
        console.log(this.loyaltySubscriptionType);
    }

    get columns(): ITableColumn[] {
        return TablesStore.loyaltySubscriptionType;
    }

    get loyaltySubscriptionType(): ILoyaltySubscriptionType | null {
        return LoyaltySubscriptionTypeStore.loyaltySubscriptionTypes;
    }

    get loyaltySubscriptionTypeLoaded(): boolean {
        return true;
    }

    handleAddModal(visible: boolean): void {
        this.showAddModal = visible;
    }

    handleUpdateModal(visible: boolean): void {
        this.showUpdateModal = visible;

        // this.updateForm.setFormData(this.counterparty);
    }

    show(counterparty: ILoyaltySubscriptionTypeListItem): void {
        this.counterparty = counterparty;
        this.handleUpdateModal(true);
        //this.visible = true;
    }

    async submit(): Promise<void> {
        if (await this.form.submit(LoyaltySubscriptionTypeStore.create)) {
            await LoyaltySubscriptionTypeStore.fetchAll({ limit: this.pagination.pageSize });
            this.showAddModal = false;
            this.form = new LoyaltySubscriptionTypeAddForm();
        }
    }
    async updateSubmit(): Promise<void> {
        if (await this.updateForm.submit(LoyaltySubscriptionTypeStore.update)) {
            await LoyaltySubscriptionTypeStore.fetchAll({ limit: this.pagination.pageSize });
            this.showUpdateModal = false;
            if (this.loyaltySubscriptionType && this.loyaltySubscriptionType.data) {
                if (this.counterparty) {
                    for (let i = 0; i < this.loyaltySubscriptionType.data.length; i++) {
                        // if(this.counterparty.id == this.loyaltySubscriptionType.data[i].id){
                        //   this.counterparty = this.loyaltySubscriptionType.data[i];
                        //   break;
                        // }
                    }
                }
            }
            this.updateForm = new LoyaltySubscriptionTypeUpdateForm();
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

        await LoyaltySubscriptionTypeStore.fetchAll(data);
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
