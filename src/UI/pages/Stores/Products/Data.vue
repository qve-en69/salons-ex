<template>
    <BaseDataForm :formReady='this.formReady'>
           <CreateProductForm :form="form" :mode="this.$props.mode"/>
    </BaseDataForm>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator"
import PageTitle from "@/UI/components/common/PageTitle.vue"
import { mixins } from "vue-class-component"
import FormGroup from "@/UI/components/common/form/FormGroup.vue"
import { SimpleProxyForm } from "@/UI/components/Helpers/SimpleProxyForm"

import BaseDataForm from '@/UI/components/Helpers/BaseForm/BaseDataForm.vue'
import CreateProductForm  from "@/UI/pages/Stores/Products/Form/CreateProductForm.vue"

import { ProductFormData } from "@/form/Warehouse/Products/Product"
@Component({
    components :{ PageTitle, FormGroup, CreateProductForm, BaseDataForm }
})
export default class Create extends mixins(SimpleProxyForm){
    @Prop() readonly mode!: number

    form = new ProductFormData()
    constructor() {
        super();
    }

    async created(): Promise<void> {
        this.formReady = true
    }
}


</script>