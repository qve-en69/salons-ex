<template>
    <FormInput v-slot="attrs" :messages="form.getMessages(field)" :server-errors="serverErrors" :validator="validator" :classes="classes">
      <div class="modal_label" v-if="label">
        {{label}}
      </div>
      <div class="form-group-input">
        <a-form-model-item :prop="field" :validate-status="anyError ? 'error' : ''">
          <slot v-bind="attributes(attrs)" />
        </a-form-model-item>
        <transition name="fade">
          <div v-show="showCustomError && attrs.errorMessages.length !== 0" class="has-error">
            <span v-for="(error, i) in attrs.errorMessages" :key="i" class="ant-form-explain"> {{ error }} </span>
          </div>
        </transition>
      </div>
    </FormInput>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Prop, Vue } from 'vue-property-decorator';
import FormInput from '@/UI/components/common/form/FormInput.vue';
import { Form } from '@/form/form';
import { Validation } from 'vuelidate';

@Component({
    components: { FormInput },
})
export default class FormGroup extends Vue {
    @Prop({ required: true }) readonly field!: string;
    @Prop({ required: true }) readonly form!: Form;
    @Prop({ type: Boolean, default: false }) readonly showCustomError!: boolean;
    @Prop() readonly label!: string;
    @Prop({default: ''}) classes!: string;
    @Prop({default: false}) readonly isPhone!: boolean;
    anyError = false;
    get validator(): Validation {
        this.anyError = this.form.$v[this.field] != undefined && this.form.$v[this.field].$anyError != undefined ? this.form.$v[this.field].$anyError : false;
        return this.form.$v[this.field];
    }

    get serverErrors(): string[] {
        return this.form.getErrors(this.field);
    }

    attributes(attrs: any): any {
        attrs.name = this.field;
        attrs.autocomplete = 'off';
        attrs.change = (): void => {
            if(this.form.$v[this.field]){
                this.form.$v[this.field].$touch();
            }
            this.form.clearErrors(this.field);
        };

        attrs.change2= (): void => {
            console.log('123')
            if(this.form.$v[this.field]){
                this.form.$v[this.field].$touch();
            }
            this.form.clearErrors(this.field);
        };

        return attrs;
    }
}
</script>
<style lang="scss" scoped>
.has-error {
  .desc {
    opacity: 0;
    transition: all 2s ease;
  }
}
</style>
