import { Component} from 'vue-property-decorator';
import { mixins } from 'vue-class-component'
import { FormMix } from '@/UI/mixins/FormMix'

@Component
export class SimpleProxyForm extends mixins(FormMix){
    constructor() {
        super();
    }
}
