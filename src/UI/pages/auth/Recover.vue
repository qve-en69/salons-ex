<template>
  <div class="overflow auth_overflow">
    <div class="auth_form_wrap">
      <RecoverMain :form="main" @submitPhone="submitPhone" v-if="!sendPhone"/>
      <template v-else>
        <RecoverCode :form="code" @submitCode="submitCode" @submitPhone="submitPhone" v-if="codeStep"/>
        <RecoverPassword :form="password" @submitPass="submitPass" v-else/>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import RecoverMainForm from "@/form/recover/recoverMain/recoverMain";
import RecoverCodeForm from "@/form/recover/recoverCode/recoverCode";
import RecoverPasswordForm from "@/form/recover/recoverPassword/recoverPassword";
import RecoverMain from "@/UI/components/forms/recover/RecoverMain.vue";
import RecoverCode from "@/UI/components/forms/recover/RecoverCode.vue";
import RecoverPassword from "@/UI/components/forms/recover/RecoverPassword.vue";
import {RecoverStore} from "@/store/modules/Recover";
import {AuthStore} from "@/store/modules/Auth";
@Component({
  components: {RecoverPassword, RecoverCode, RecoverMain}
})
export default class Recover extends Vue {
  main = new RecoverMainForm();
  code = new RecoverCodeForm();
  password = new RecoverPasswordForm();
  sendPhone = false;
  codeStep = false;
  async submitPhone(): Promise<void> {
    if (await this.main.submit(RecoverStore.checkCode)) {
      this.code.phone = this.main.phone;
      this.sendPhone = true;
      this.codeStep = true;
    }
  }
  async submitCode(): Promise<void> {
    if (await this.code.submit(RecoverStore.sendCode)) {
      this.password.phone = this.main.phone;
      this.codeStep = false;
    }
  }
  async submitPass(): Promise<void> {
    if (await this.password.submit(RecoverStore.recoverDo)) {
      await AuthStore.login({phone: this.password.phone, password: this.password.password});
    }
  }
}
</script>
<style lang="scss">
.modal_description{
  font-weight: 300;
  margin: 36px 0 12px 0;
  font-size: 16px;
  line-height: 24px;
  color: #8C8C8C;
  text-align: center;
  max-width: 340px;
}
.modal_link{
  text-align: center;
}
.code_is_gone{
  font-weight: 300;
  display: flex;
  align-self: flex-end;
  font-size: 16px;
  line-height: 24px;
  color: #BFBFBF;
}
.cursor{
  cursor: pointer;
}
.timer_run{
  font-weight: 300;
  font-size: 14px;
}
</style>
