<template>
  <div class="overflow auth_overflow">
    <div class="auth_form_wrap">
      <a-form-model>
        <div class="modal_header">
          <div class="modal_title">Авторизация</div>
        </div>
        <FormGroup v-slot="attrs" :form="form" field="phone" label="Телефон" show-custom-error>
          <a-input
              v-model="form[attrs.name]"
              placeholder="+7 (___) ___-__-__"
              v-mask="['+7 (###) ###-##-##']"
              v-bind="attrs"
              @input="attrs.change"
          />
        </FormGroup>
        <FormGroup v-slot="attrs" :form="form" field="password" label="Пароль" show-custom-error>
          <a-input-password
              placeholder="******"
              v-model="form[attrs.name]"
              v-bind="attrs"
              @input="attrs.change"
          />
        </FormGroup>
          <div class="d-flex spacer align-center">
            <router-link :to="{name: $routeRules.AuthRecover}">Восстановить доступ</router-link>
            <a-button type="primary" :loading="form.sendingRequest" :disabled="form.disabled" @click.prevent="submit">Войти</a-button>
          </div>
      </a-form-model>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import LoginForm from "@/form/login/login";
import FormGroup from "@/UI/components/common/form/FormGroup.vue";
import {AuthStore} from "@/store/modules/Auth";
import {message} from "ant-design-vue";
@Component({
  components: {FormGroup}
})
export default class Login extends Vue {
  form = new LoginForm();
  async submit(): Promise<void> {
    const resp = await AuthStore.login(this.form.getFormData());
    if (resp.data.status) {
      message.success(resp.data.response)
    } else {
      message.error(resp.data.response)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
