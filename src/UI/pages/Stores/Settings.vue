<template>
  <div class="box-container">
    <template v-if="this.formReady">
    </template>
    <template v-else>
    </template>

  </div>
</template>

<script lang="ts">
import { FormMix } from '@/UI/mixins/FormMix'
import { Component } from "vue-property-decorator";
import PageTitle from "@/UI/components/common/PageTitle.vue";
import AppSimpleLink from "@/UI/components/Link/AppSimpleLink.vue";
import { mixins } from "vue-class-component";
import { PaginationMix } from "@/UI/mixins/PaginationMix";

@Component({
  components: { PageTitle, AppSimpleLink }
})
export default class Index extends mixins( FormMix, PaginationMix ) {
  async created(): Promise<void> {
    this.formReady = true
  }
}

</script>