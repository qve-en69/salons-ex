<template>
    <div class="BaseDataForm">
        <template v-if="formReady">
            <slot></slot>
        </template>
        <template v-else>
            <div>
                <a-alert
                    message="Загрузка данных"
                    type="info"
                />
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import { Prop,Component,Vue } from 'vue-property-decorator';
@Component
export default class BaseDataForm extends Vue {
    @Prop() readonly formReady!: boolean;
}
</script>
