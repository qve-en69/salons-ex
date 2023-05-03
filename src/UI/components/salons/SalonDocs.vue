<template>
  <div>
    <PageTitle>
      <template v-slot:default><span style="font-size: 24px;">Документы</span></template>
      <template v-slot:button>
        <a-button icon="upload" size="large">Добавить документ</a-button>
      </template>
    </PageTitle>
    <a-table
        bordered
        :columns="salonDocsColumns"
        :data-source="data"
        :pagination="pagination"
        :loading="loading"
    >
      <div slot="action" slot-scope="text">
        <a-button type="link" icon="upload">Скачать</a-button>
        <a-button class="action" type="link" icon="delete">Удалить</a-button>
      </div>
    </a-table>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import PageTitle from "@/UI/components/common/PageTitle.vue";
import {ITableColumn} from "@/entity/table/table.types";
import {TablesStore} from "@/store/modules/Tables";
@Component({
  components: {PageTitle}
})
export default class SalonDocs extends Vue {
  loading=false;
  data: any[] = [];
  pagination = {
    showSizeChanger: true,
    pageSize: 10,
    total: 500,
  }
  get salonDocsColumns(): ITableColumn[] {
    return TablesStore.salonDocsColumns;
  }
  created(): void {
    for (let i = 0; i < 100; i++) {
      this.data.push({
        key: (i + 1).toString(),
        name: 'Документ важный.pdf',
        amount: '1.2 МБ',
        date: '26.07.2021',
      })
    }
    this.pagination.total = this.data.length;
  }
}
</script>

<style lang="scss" scoped>
.action {
  color: #FF4D4F !important;
}
</style>