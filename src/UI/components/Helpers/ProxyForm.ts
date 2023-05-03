import { Component} from 'vue-property-decorator';
import { mixins } from 'vue-class-component'
import { FormMix } from '@/UI/mixins/FormMix'
import { PaginationMix } from '@/UI/mixins/PaginationMix'

@Component
export class ProxyForm extends mixins(FormMix, PaginationMix){
 constructor() {
   super();
 }
}
