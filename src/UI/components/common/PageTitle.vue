<template>
  <div>
    <div class="page-title">
      <div class="title">
        <slot></slot>
      </div>
      <div class="button-place">
        <slot name="menu"></slot>
        <slot name="button"></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
@Component
export default class PageTitle extends Vue {
}
</script>
<style lang="scss" scoped>
.page-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 24px;
  .title {
    display: flex;
    font-weight: 600;
    font-size: 30px;
    color: #262626;
  }
  .button-place {
    display: flex;
  }
}
</style>
