<template>
  <router-link :to="{ name: 'ClientDetail', id:id, params: { id: id }}">
    {{caption}}
  </router-link>
</template>
<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class ClientLink extends Vue {
  @Prop() id!: number
  @Prop() caption!: string
}
</script>