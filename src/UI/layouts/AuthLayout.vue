<template>
    <div class="content auth">
      <router-view></router-view>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AuthLayout extends Vue {
}
</script>
<style lang="scss">
.auth {
}
</style>
