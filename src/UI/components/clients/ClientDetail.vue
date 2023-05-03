<template>
    <div>
      <StudioSelect :options="{width:'240px'}"/>
    </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
@Component
export default class ClientDetail extends Vue {

}
</script>