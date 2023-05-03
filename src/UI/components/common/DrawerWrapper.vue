<template>
  <div>
    <a-drawer :visible="visible" :closable="false" :width="width" @close="onClose">
      <div class="drawer-header">
        <div class="title">{{title}}</div>
        <div class="action-wrapper">
          <a-space size="small">
            <a-button icon="edit" size="large" @click="onEdit">Редактировать</a-button>
            <a-popconfirm title="Вы действительно хотите удалить сотрудника?" @confirm="onDelete" ok-text="Удалить" cancel-text="Отмена">
                <a-button icon="delete" size="large" ghost type="danger">Удалить</a-button>
            </a-popconfirm>
            <a-button icon="close" size="large" @click="onClose"/>
          </a-space>
        </div>
      </div>
      <div class="drawer-body">
        <slot></slot>
      </div>
    </a-drawer>
  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
@Component
export default class Reports extends Vue {
  @Prop({default: '80%'}) readonly width!: string;
  @Prop() readonly title!: string;
  @Prop({default: 'right'}) readonly placement!: string;
  @Prop() readonly visible!: boolean;
  onClose(): void {
    this.$emit('close');
  }
  onDelete(): void {
    this.$emit('delete');
  }
  onEdit(): void {
    this.$emit('edit');
  }
}
</script>
<style lang="scss">
.ant-drawer-content-wrapper {
  max-width: 1184px;
  .ant-drawer-wrapper-body {
    background: #F0F2F5;
  }
  .ant-drawer-body {
    padding: 0;
  }
}
.drawer-header {
  display: flex;
  background: #FFFFFF;
  justify-content: space-between;
  align-items: center;
  padding: 17px 24px;
  .title {
    color: #262626;
    font-size: 30px;
    font-weight: 600;
  }
  .drawer-body {
    padding: 24px;
  }
}
</style>