<template>
    <div :class="[classes ? classes : '' , 'form-input']">
        {{classes}}
        <slot :errorMessages="allErrorsMessages" :hasErrors="hasErrors" :success="hasAnyErrors" />
    </div>
</template>
<script lang="ts">
import { singleErrorExtractorMixin } from 'vuelidate-error-extractor';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    extends: singleErrorExtractorMixin,
})
export default class FormInput extends Vue {
    @Prop({ type: Array, default: () => [] }) serverErrors!: string[];
    @Prop() classes?: string;

    get allErrorsMessages(): string[] {
        return this.serverErrors.concat(this.activeErrorMessages);
    }

    get hasAnyErrors(): boolean {
        return this.isValid && !this.serverErrors.length;
    }
}
</script>
