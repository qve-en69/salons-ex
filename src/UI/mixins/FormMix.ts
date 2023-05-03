import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export class FormMix extends Vue {
    token = localStorage.getItem('token');
    formReady = false;
    tableLoad = false;


    async created(): Promise<void> {
        this.$message.warning('подождите немного');
    }


}
