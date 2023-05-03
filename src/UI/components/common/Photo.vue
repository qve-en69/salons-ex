<template>
  <div class="photo-block">
    <div class="photo" :style="{background: `url(${src})`}">
      <div class="actions" v-if="action">
        <a-icon type="eye" class="action-icon"></a-icon>
        <a-icon type="delete" class="action-icon"></a-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class Photo extends Vue {
  @Prop() readonly src!: string;
  @Prop({default: false, type: Boolean}) readonly action!: boolean;
}
</script>

<style lang="scss" scoped>
.photo-block {
  background: #FFFFFF;
  border: 1px solid #D9D9D9;
  box-sizing: border-box;
  border-radius: 2px;
  padding: 12px;
  &:hover {
    .photo {
      .actions {
        opacity: 0.65;
      }
    }
  }
  .photo {
    content: '';
    position: relative;
    height: 137px;
    width: 100%;
    background-position: center;
    background-size: contain;
    .actions {
      background: #000000;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition: all 0.2s ease;
      .action-icon {
        cursor: pointer;
        color: #FFFFFF;
        font-size: 34px;
        margin-right: 16px;
        &:nth-last-child(1) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>