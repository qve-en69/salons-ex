<template>
  <div>
    <a-dropdown :trigger="[trigger]" v-if="!button">
      <div class="dropdown-link" @click="e => e.preventDefault()">
        <slot name="body"></slot><a-icon type="down" two-tone-color />
      </div>
      <a-menu slot="overlay">
        <a-menu-item v-for="(item, index) in items" :key="index" @click="$emit('do', index)">
          {{item}}
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <a-dropdown v-else>
      <a-menu slot="overlay">
        <a-menu-item v-for="(item, index) in items" :key="index" @click="$emit('do', index)">
          {{item}}
        </a-menu-item>
      </a-menu>
      <a-button style="margin-left: 8px"> {{text}} <a-icon type="down" /> </a-button>
    </a-dropdown>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class DropDown extends Vue {
  @Prop() readonly items!: string[];
  @Prop({default: 'click'}) readonly trigger!: string;
  @Prop({default: false, type: Boolean}) readonly button!: boolean;
}
</script>

<style lang="scss" scoped>

</style>