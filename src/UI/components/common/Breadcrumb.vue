<template>
     <a-row>
       <a-col :span="18">
          <template v-for="(item, index) in list">
            <div :key="index" :class="['breadcrumb-item', !item.link && 'linked']" @click="proceed(index)">
              {{item.name}}
              <span class="divider" v-if="index !== list.length - 1">/</span>
            </div>
          </template>
       </a-col>

       <a-col :span="6">
           <template v-for="(item) in list">
            <template v-if="item.support!==undefined && item.support.length>0">
              <template v-for="(sitm, idx) in item.support">

                <template v-if="(sitm === 'studioselect')">
                    <StudioSelect :key="`itm-${idx}`" :options="{width:'200px'}"  >
                    </StudioSelect>
                </template>
                <template v-if="(sitm === 'closebutton')">
                    <a-button :key="`itm-${idx}`">
                      <a-icon type="close" />
                    </a-button>
                </template>
              </template>
            </template>
          </template>
       </a-col>
     </a-row>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import {IBreadcrumb} from "@/entity/common/breadcrumb.types";
import {RouterNameEnum} from '@/router/router.types';

import StudioSelect from "@/UI/components/Store/StudioSelect.vue";

@Component({
  components: {StudioSelect}
})
export default class Breadcrumb extends Vue {
  list: IBreadcrumb[] = [];

  @Watch('$route', {immediate: true})
  onRouteChange(): void {
    if (this.$route!.meta!.breadcrumb! === undefined) {
        this.list = this.$route.matched[this.$route.matched.length - 2].meta!.breadcrumb!;
    }else {
      this.list = this.$route!.meta!.breadcrumb!;
    }
  }

  /*cStudioSelect() {
    return () => import(`./BreadcrumbSupport/bStudioSelect.vue`);
  }*/

  proceed(index: number): void {
    const item = this.list[index];
    if (item.link !== undefined) {
      this.$router.push({name: item.link});
    }
  }
}
</script>

<style lang="scss" scoped>
.flex{
  display: flex;
  align-items: center;

  &.j_cont_sp{
    justify-content: space-between;
  }

  &.j_cont_sa{
    justify-content: space-around;
  }
}
.breadcrumb {
  display: flex;
  flex-direction: row;
  .breadcrumb-item {
    color: #8C8C8C;
    cursor: pointer;
    &.linked {
      color: #262626;
      cursor: default;
    }
    .divider {
      color: #8C8C8C;
      margin: 0 8px 0 4px;
    }
  }
}
</style>