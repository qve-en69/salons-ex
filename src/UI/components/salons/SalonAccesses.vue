<template>
  <div>
    <PageTitle>
      <template v-slot:default><span style="font-size: 24px;">Доступы</span></template>
    </PageTitle>
    <a-divider orientation="left">АМО CRM</a-divider>
    <Badge v-for="item in amo" :title="item.title" copy>
      <a href="#" v-if="!item.text">https://***</a>
      <span v-else>{{item.text}}</span>
    </Badge>
    <a-divider orientation="left">Мои звонки</a-divider>
    <Badge v-for="item in calls" :title="item.title" copy>
      <span>{{item.text}}</span>
    </Badge>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import PageTitle from "@/UI/components/common/PageTitle.vue";
import Badge from "@/UI/components/common/Badge.vue";
@Component({
  components: {Badge, PageTitle}
})
export default class SalonAccesses extends Vue {
  amo = [{title: 'Ссылка', text: ''}, {title: 'Логин', text: 'admin'}, {title: 'Пароль', text: 'qwerty123'}];
  calls = [{title: 'Логин', text: 'admin'}, {title: 'Пароль', text: 'qwerty123'}];
}
</script>

<style lang="scss" scoped>
</style>
