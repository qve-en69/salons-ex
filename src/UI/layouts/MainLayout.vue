<template>
  <a-layout style="height: 100%">
    <Header/>
    <a-layout>
      <SideBar/>
      <a-layout-content class="layout">
        <div class="main">
          <Breadcrumb v-if="this.$route.name != 'AccountsAndCashboxes'"/>
          <div class="main-content">
            <router-view></router-view>
          </div>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import Header from "@/UI/components/header/Header.vue";
import SideBar from "@/UI/components/sideBar/SideBar.vue";
import Breadcrumb from "@/UI/components/common/Breadcrumb.vue";

@Component({
  components: {
    Breadcrumb,
    SideBar,
    Header
  }
})
export default class MainLayout extends Vue {

  @Watch('$route.name')
  onChangeRoute(): void {
    window.scrollTo(0,0);
  }
}
</script>
<style lang="scss">
.layout {
  display: flex;
  overflow: overlay;
  justify-content: center;
  background: #F0F2F5;
  .main {
    max-width: 1184px;
    width: 100%;
    height: max-content;
    padding: 16px 24px 30px 24px;
    .main-content {
      margin-top: 16px;
    }
  }
}
.disable-scroll {
  overflow: hidden;
  height: 100%;
}
</style>
