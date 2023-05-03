й<template>
  <div id="app">
    <a-config-provider :locale="ru_RU">
      <router-view></router-view>
    </a-config-provider>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { AuthStore } from "@/store/modules/Auth";

//Ant-Design localization
import { ConfigProvider } from 'ant-design-vue';
import ru_RU from "ant-design-vue/lib/locale-provider/ru_RU";


import moment from 'moment'
import 'moment/locale/ru';

@Component({
  components: {
    'a-config-provider': ConfigProvider
  },
})
export default class App extends Vue {
  data():any {
    return {
      ru_RU,
    };
  }
  created(): void {
    AuthStore.load();
  }
}
</script>
<style lang="scss">
#app {
  height: 100%;
}
</style>
