<template>
  <div class="badge-container">
    <div class="badge-title">
      <div class="badge">{{title}}</div>
    </div>
    <div class="badge-body">
      <slot></slot>
    </div>
    <a-icon type="copy" style="cursor: pointer" v-if="copy"></a-icon>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class Badge extends Vue {
  @Prop({default: false, type: Boolean}) readonly copy!: boolean;
  @Prop() readonly title!: string;
}
</script>

<style lang="scss" scoped>
.badge-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  color: #262626;
  align-items: center;
  .badge-title {
    align-self: baseline;
    width: 100%;
    max-width: 193px;
    min-width: 193px;
    .badge {
      width: 100%;
      line-height: 22px;
      background: #F5F5F5;
      padding: 6px 16px;
    }
  }
  .badge-body {
    line-height: 22px;
    display: flex;
    padding: 8px 16px;
  }
}
</style>