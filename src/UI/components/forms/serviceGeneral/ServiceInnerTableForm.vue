<template>
    <div>
        <a-form-model>
            <FormGroup v-slot="attrs" :form="form" field="price_first" label="" show-custom-error>
                <a-input v-model="form[attrs.name]" v-bind="attrs" @input="attrs.change" id="one" />
            </FormGroup>
            <FormGroup v-slot="attrs" :form="form" field="price_second" label="" show-custom-error>
                <span>
                    <a-input v-model="form[attrs.name]" v-bind="attrs" @input="attrs.change" />
                </span>
            </FormGroup>
            <FormGroup v-slot="attrs" :form="form" field="service_duration" label="" show-custom-error>
                <a-time-picker
                    style="width: 100%"
                    placeholder="HH.mm"
                    @change="handleTimeChange"
                    :default-value="moment(form[attrs.name], 'HH:mm')"
                    :format="'HH:mm'"
                    size="large"
                    :minuteStep="5"
                />
            </FormGroup>
        </a-form-model>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import FormGroup from '@/UI/components/common/form/FormGroup.vue';
import ServiceGeneralForm from '@/form/serviceGeneral/serviceGeneral';
import moment from 'moment';

@Component({
    components: { FormGroup },
    methods: { moment }
})
export default class ServiceInnerTableFormComponent extends Vue {
    @Prop() readonly form!: ServiceGeneralForm;

    handleTimeChange(value: any): void {
        this.form.service_duration = value.format('HH:mm');
    }
}
</script>

<style lang="scss"></style>
