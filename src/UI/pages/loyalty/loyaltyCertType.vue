<template>
    <div class="loyaltyCertType">
        <div class="card-container">
            <a-tabs type="card" :default-active-key="tabs.find(el => el.id === $route.name).id" @change="tabChanged">
                <a-tab-pane :tab="item.name" v-for="item in tabs" :key="item.id">
                    <keep-alive>
                        <!-- <router-view :loyaltyCert="loyaltyCert"></router-view> -->
                    </keep-alive>
                </a-tab-pane>
            </a-tabs>
        </div>
        <div class="box-container">
            <PageTitle>
                <template v-slot:default>Типы сертификатов</template>
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
                        >Создать тип сертификата
                    </a-button>
                </template>
            </PageTitle>
            <a-table
                style="margin-top: 24px;"
                bordered
                :columns="columns"
                :data-source="loyaltyCertType != null && loyaltyCertType.data != undefined ? loyaltyCertType.data : []"
                :pagination="pagination"
                :loading="!loyaltyCertTypeLoaded"
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

        <ModalWrapper width="1200px" title="Создать тип сертификата" :show="showAddModal" @handleModal="handleAddModal">
            <LoyaltyCertTypeAddComponent :form="form" @cancel="showAddModal = false" @submit="submit" />
        </ModalWrapper>

        <ModalWrapper
            width="1200px"
            title="Обновить тип сертификата"
            :show="showUpdateModal"
            @handleModal="handleUpdateModal"
        >
            <LoyaltyCertTypeUpdateComponent
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
import { loyaltyCertTabs } from '@/utils/tabs';
import { ITableColumn } from '@/entity/table/table.types';
import { ISalons } from '@/entity/salons/salons.types';
import { SalonsStore } from '@/store/modules/Salons';
import { TablesStore } from '@/store/modules/Tables';
import LoyaltyCertTypeAddForm from '@/form/loyalty/loyaltyCertType/LoyaltyCertTypeAddForm';
import LoyaltyCertTypeUpdateForm from '@/form/loyalty/loyaltyCertType/LoyaltyCertTypeUpdateForm';
import LoyaltyCertTypeAddComponent from '@/UI/components/forms/loyalty/loyaltyCert/loyaltyCertType/LoyaltyCertTypeAddComponent.vue';
import LoyaltyCertTypeUpdateComponent from '@/UI/components/forms/loyalty/loyaltyCert/loyaltyCertType/LoyaltyCertTypeUpdateComponent.vue';
import { LoyaltyCertTypeStore } from '@/store/modules/LoyaltyCertType';
import ModalWrapper from '@/UI/components/common/ModalWrapper.vue';
import {
    ILoyaltyCertType,
    ILoyaltyCertTypeListItem
} from '@/entity/loyalty/loyaltyCert/loyaltyCertType/LoyaltyCertType.types';
import moment from 'moment';

@Component({
    components: { ModalWrapper, PageTitle, LoyaltyCertTypeAddComponent, LoyaltyCertTypeUpdateComponent },
  methods: {moment}

})
export default class LoyaltyCertType extends Vue {
    tabs = loyaltyCertTabs;
    form = new LoyaltyCertTypeAddForm();
    updateForm = new LoyaltyCertTypeUpdateForm();
    loyaltyCertTyp: ILoyaltyCertTypeListItem | null = null;
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

    // customRow = (record: any) => {
    //   return {
    //     on: {
    //       click: (event: any) => {
    //         console.log(event);
    //         //this.$router.push({name: RouterNameEnum.SalonDetail, params: {id: record.id}})
    //         alert('clicked');
    //       }
    //     }
    //   };
    // }
    get salons(): ISalons | null {
        return SalonsStore.salons;
    }
    async created(): Promise<void> {
        await LoyaltyCertTypeStore.fetchAll({ limit: this.pagination.pageSize });
        await SalonsStore.fetchAll({ limit: 99999});
        this.form.setFormData(this.salons);

        console.log(this.loyaltyCertType);
    }

    get columns(): ITableColumn[] {
        return TablesStore.loyaltyCertType;
    }

    get loyaltyCertType(): ILoyaltyCertType | null {
        return LoyaltyCertTypeStore.loyaltyCertTypes;
    }

    get loyaltyCertTypeLoaded(): boolean {
        return true;
    }

    handleAddModal(visible: boolean): void {
        this.showAddModal = visible;
    }

    handleUpdateModal(visible: boolean): void {
        this.showUpdateModal = visible;

        // this.updateForm.setFormData(this.loyaltyCertTyp);
    }

    show(loyaltyCertTyp: ILoyaltyCertTypeListItem): void {
        this.loyaltyCertTyp = loyaltyCertTyp;
        this.handleUpdateModal(true);
        //this.visible = true;
    }

    async submit(): Promise<void> {
        if (await this.form.submit(LoyaltyCertTypeStore.create)) {
            await LoyaltyCertTypeStore.fetchAll({ limit: this.pagination.pageSize });
            this.showAddModal = false;
            this.form = new LoyaltyCertTypeAddForm();
        }
    }
    async updateSubmit(): Promise<void> {
        if (await this.updateForm.submit(LoyaltyCertTypeStore.update)) {
            await LoyaltyCertTypeStore.fetchAll({ limit: this.pagination.pageSize });
            this.showUpdateModal = false;
            // if (this.loyaltyCertType && this.loyaltyCertType.data) {
            //     if (this.loyaltyCertTyp) {
            //         for (let i = 0; i < this.loyaltyCertType.data.length; i++) {
            //             if (this.loyaltyCertTyp.id == this.loyaltyCertType.data[i].id) {
            //                 this.loyaltyCertTyp = this.loyaltyCertType.data[i];
            //                 break;
            //             }
            //         }
            //     }
            // }
            this.updateForm = new LoyaltyCertTypeUpdateForm();
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

        await LoyaltyCertTypeStore.fetchAll(data);
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
