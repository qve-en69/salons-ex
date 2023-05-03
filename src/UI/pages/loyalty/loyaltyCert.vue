<template>
    <div class="loyaltyCert">
        <div class="card-container">
            <a-tabs type="card" :default-active-key="tabs.find(el => el.id === $route.name).id" @change="tabChanged">
                <a-tab-pane :tab="item.name" v-for="item in tabs" :key="item.id">
                    <keep-alive>
                        <router-view :loyaltyCert="loyaltyCert"></router-view>
                    </keep-alive>
                </a-tab-pane>
            </a-tabs>
        </div>
        <div class="box-container">
            <PageTitle>
                <template v-slot:default>Сертификат</template>
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
                        >Создать Сертификат
                    </a-button>
                </template>
            </PageTitle>

            <a-table
                style="margin-top: 24px;"
                bordered
                :columns="columns"
                :data-source="loyaltyCert != null && loyaltyCert.data != undefined ? loyaltyCert.data : []"
                :pagination="AppPageParams"
                :loading="!this.tableLoad"
                @change="handleTableChange"
            >
                <span slot="statuus" slot-scope="statuus">
                    <a-tag :color="statuus ? 'green' : 'red'">
                        {{ statuus ? 'Активирован' : 'Недействителен' }}
                    </a-tag>
                </span>
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

        <ModalWrapper title="Создать сертификат" :show="showAddModal" @handleModal="handleAddModal">
            <LoyaltyCertAddComponent :form="form" @cancel="showAddModal = false" @submit="submit" />
        </ModalWrapper>

        <ModalWrapper title="Обновить сертификат" :show="showUpdateModal" @handleModal="handleUpdateModal">
            <LoyaltyCertUpdateComponent :form="updateForm" @cancel="showUpdateModal = false" @submit="updateSubmit" />
        </ModalWrapper>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PageTitle from '@/UI/components/common/PageTitle.vue';
import { loyaltyCertTabs } from '@/utils/tabs';
import { ITableColumn } from '@/entity/table/table.types';
import { IClients } from '@/entity/clients/clients.types';
import { ILoyaltyCertType } from '@/entity/loyalty/loyaltyCert/loyaltyCertType/LoyaltyCertType.types';
import { TablesStore } from '@/store/modules/Tables';
import { ClientsStore } from '@/store/modules/Clients';
import { LoyaltyCertTypeStore } from '@/store/modules/LoyaltyCertType';
import LoyaltyCertAddForm from '@/form/loyalty/loyaltyCert/LoyaltyCertAddForm';
import LoyaltyCertUpdateForm from '@/form/loyalty/loyaltyCert/LoyaltyCertUpdateForm';
import LoyaltyCertAddComponent from '@/UI/components/forms/loyalty/loyaltyCert/loyaltyCert/LoyaltyCertAddComponent.vue';
import LoyaltyCertUpdateComponent from '@/UI/components/forms/loyalty/loyaltyCert/loyaltyCert/LoyaltyCertUpdateComponent.vue';
import { LoyaltyCertStore } from '@/store/modules/LoyaltyCert';
import ModalWrapper from '@/UI/components/common/ModalWrapper.vue';
import { ILoyaltyCert, ILoyaltyCertListItem } from '@/entity/loyalty/loyaltyCert/loyaltyCert/loyaltyCert.types';
import {ProxyDataForm} from '@/UI/components/Helpers/ProxyDataForm'
import {mixins} from 'vue-class-component'
import AppFilterTable from '@/UI/components/extFilter/AppFilterTable.vue'
import {LoyaltyCertMix} from "@/UI/mixins/LoyaltyCertMix";

@Component({
    components: { ModalWrapper, PageTitle, LoyaltyCertAddComponent, LoyaltyCertUpdateComponent, AppFilterTable }
})
export default class LoyaltyCert extends mixins(ProxyDataForm, LoyaltyCertMix ) {
    tabs = loyaltyCertTabs;
    form = new LoyaltyCertAddForm();
    updateForm = new LoyaltyCertUpdateForm();
    counterparty: ILoyaltyCertListItem | null = null;
    searchText = '';
    searchInput: null;
    searchedColumn = '';
    showAddModal = false;
    showUpdateModal = false;
    filterData: any;

    constructor() {
        super();
    }

    tabChanged(key: string): void {
        this.$router.push({ name: key });
    }

    customRow = (record: any) => {
        return {
            on: {
                click: (event: any) => {
                    console.log(event);
                    alert('clicked');
                }
            }
        };
    };
    get clients(): IClients | null {
        return ClientsStore.clients;
    }
    get loyaltyCertTypes(): ILoyaltyCertType | null {
        return LoyaltyCertTypeStore.loyaltyCertTypes;
    }
    async created(): Promise<void> {
        this.tableLoad = false;
        await LoyaltyCertStore.fetchAll({ limit: this.AppPageParams.pageSize });
        await ClientsStore.fetchAll({ limit: 9999});
        await LoyaltyCertTypeStore.fetchAll({ limit: 9999});
        // this.form.setFormData(this.clients, this.loyaltyCertTypes, this.LoyaltyCert);
        this.formReady = true;
        this.tableLoad = true;
    }

    get columns(): ITableColumn[] {
        return TablesStore.loyaltyCert;
    }

    get loyaltyCert(): ILoyaltyCert | null {
        return LoyaltyCertStore.loyaltyCerts;
    }

    get loyaltyCertLoaded(): boolean {
        return true;
    }

    handleAddModal(visible: boolean): void {
        this.showAddModal = visible;
    }

    handleUpdateModal(visible: boolean): void {
        this.showUpdateModal = visible;

        // this.updateForm.setFormData(this.counterparty);
    }

    show(counterparty: ILoyaltyCertListItem): void {
        this.counterparty = counterparty;
        this.handleUpdateModal(true);
        //this.visible = true;
    }

    async submit(): Promise<void> {
        if (await this.form.submit(LoyaltyCertStore.create)) {
            this.showAddModal = false;
            this.form = new LoyaltyCertAddForm();
        }
    }
    async updateSubmit(): Promise<void> {
        if (await this.updateForm.submit(LoyaltyCertStore.update)) {
            this.showUpdateModal = false;
            // if(this.loyaltyCert && this.loyaltyCert.data){
            //   if(this.counterparty){
            //     for(let i = 0; i < this.loyaltyCert.data.length; i++){
            // if(this.counterparty.id == this.loyaltyCert.data[i].id){
            //   this.counterparty = this.loyaltyCert.data[i];
            //   break;
            // }
            // }
            //}
            //}
            this.updateForm = new LoyaltyCertUpdateForm();
        }
    }
    //test
    handleSearch(selectedKeys: any, confirm: any, dataIndex: any) {
        confirm();
        this.searchText = selectedKeys[0];
        this.searchedColumn = dataIndex;
    }

    handleReset(clearFilters: any) {
        clearFilters();
        this.searchText = '';
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
