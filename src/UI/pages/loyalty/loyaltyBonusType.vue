<template>
    <div class="loyaltyBonusType">
        <div class="card-container">
            <a-tabs type="card" :default-active-key="tabs.find(el => el.id === $route.name).id" @change="tabChanged">
                <a-tab-pane :tab="item.name" v-for="item in tabs" :key="item.id">
                    <keep-alive>
                        <router-view :loyaltyBonus="loyaltyBonus"></router-view>
                    </keep-alive>
                </a-tab-pane>
            </a-tabs>
        </div>
        <div class="box-container">
            <PageTitle>
                <template v-slot:default>Типы бонусных программ</template>
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
                        >Создать тип бонусной программы
                    </a-button>
                </template>
            </PageTitle>
            <a-table
                style="margin-top: 24px;"
                bordered
                :columns="columns"
                :data-source="
                    loyaltyBonusType != null && loyaltyBonusType.data != undefined ? loyaltyBonusType.data : []
                "
                :pagination="pagination"
                :loading="!loyaltyBonusTypeLoaded"
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

        <ModalWrapper
            width="600px"
            title="Создать тип бонусной программы"
            :show="showAddModal"
            @handleModal="handleAddModal"
        >
            <LoyaltyBonusTypeAddComponent :form="form" @cancel="showAddModal = false" @submit="submit" />
        </ModalWrapper>

        <ModalWrapper
            width="600px"
            title="Обновить тип бонусной программы"
            :show="showUpdateModal"
            @handleModal="handleUpdateModal"
        >
            <LoyaltyBonusTypeUpdateComponent
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
import { loyaltyBonusTabs } from '@/utils/tabs';
import { ITableColumn } from '@/entity/table/table.types';
import { TablesStore } from '@/store/modules/Tables';
import LoyaltyBonusTypeAddForm from '@/form/loyalty/loyaltyBonusType/LoyaltyBonusTypeAddForm';
import LoyaltyBonusTypeUpdateForm from '@/form/loyalty/loyaltyBonusType/LoyaltyBonusTypeUpdateForm';
import LoyaltyBonusTypeAddComponent from '@/UI/components/forms/loyalty/loyaltyBonus/loyaltyBonusType/LoyaltyBonusTypeAddComponent.vue';
import LoyaltyBonusTypeUpdateComponent from '@/UI/components/forms/loyalty/loyaltyBonus/loyaltyBonusType/LoyaltyBonusTypeUpdateComponent.vue';
import { LoyaltyBonusTypeStore } from '@/store/modules/LoyaltyBonusType';
import ModalWrapper from '@/UI/components/common/ModalWrapper.vue';
import {
    ILoyaltyBonusType,
    ILoyaltyBonusTypeListItem
} from '@/entity/loyalty/loyaltyBonus/loyaltyBonusType/LoyaltyBonusType.types';

@Component({
    components: { ModalWrapper, PageTitle, LoyaltyBonusTypeAddComponent, LoyaltyBonusTypeUpdateComponent }
})
export default class LoyaltyBonusType extends Vue {
    tabs = loyaltyBonusTabs;
    form = new LoyaltyBonusTypeAddForm();
    updateForm = new LoyaltyBonusTypeUpdateForm();
    counterparty: ILoyaltyBonusTypeListItem | null = null;
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

    async created(): Promise<void> {
        await LoyaltyBonusTypeStore.fetchAll({ limit: this.pagination.pageSize });

        console.log(this.loyaltyBonusType);
    }

    get columns(): ITableColumn[] {
        return TablesStore.loyaltyBonusType;
    }

    get loyaltyBonusType(): ILoyaltyBonusType | null {
        return LoyaltyBonusTypeStore.loyaltyBonusTypes;
    }

    get loyaltyBonusTypeLoaded(): boolean {
        return true;
    }

    handleAddModal(visible: boolean): void {
        this.showAddModal = visible;
    }

    handleUpdateModal(visible: boolean): void {
        this.showUpdateModal = visible;

        // this.updateForm.setFormData(this.counterparty);
    }

    show(counterparty: ILoyaltyBonusTypeListItem): void {
        this.counterparty = counterparty;
        this.handleUpdateModal(true);
        //this.visible = true;
    }

    async submit(): Promise<void> {
        if (await this.form.submit(LoyaltyBonusTypeStore.create)) {
            await LoyaltyBonusTypeStore.fetchAll({ limit: this.pagination.pageSize });
            this.showAddModal = false;
            this.form = new LoyaltyBonusTypeAddForm();
        }
    }
    async updateSubmit(): Promise<void> {
        if (await this.updateForm.submit(LoyaltyBonusTypeStore.update)) {
            await LoyaltyBonusTypeStore.fetchAll({ limit: this.pagination.pageSize });
            this.showUpdateModal = false;
            // if(this.loyaltyBonusType && this.loyaltyBonusType.data){
            //   if(this.counterparty){
            //     for(let i = 0; i < this.loyaltyBonusType.data.length; i++){
            //       if(this.counterparty.id == this.loyaltyBonusType.data[i].id){
            //         this.counterparty = this.loyaltyBonusType.data[i];
            //         break;
            //       }
            //     }
            //   }
            // }
            this.updateForm = new LoyaltyBonusTypeUpdateForm();
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

        await LoyaltyBonusTypeStore.fetchAll(data);
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
