<template>
  <div>
    <a-modal :width="width" :title="title" v-model="visible" :footer="null">
      <slot></slot>
    </a-modal>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class ModalWrapper extends Vue {
  @Prop() readonly title!: string;
  @Prop() readonly width!: string;
  @Prop() readonly show!: boolean;
  get visible(): boolean {
    return this.show;
  }
  set visible(visible: boolean) {
    this.$emit('handleModal', visible);
  }
}
</script>

<style lang="scss" scoped>
</style>