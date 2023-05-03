<template>
  <div>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import DrawerWrapper from "@/UI/components/common/DrawerWrapper.vue";
import WorkerDetail from "@/UI/components/workerDetail/WorkerDetail.vue";
@Component({
  components: {WorkerDetail, DrawerWrapper}
})
export default class Reports extends Vue {
}
</script>
