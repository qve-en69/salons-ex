import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export class DisplayMasks extends Vue {
     NumberForPhone(value: string):string | null {
         let val = ''
         const x: any = value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})/)
         if (!x[2] && x[1] !== '') {
            val = x[1] === '8' ? x[1] : '8' + x[1]
         } else {
            val = !x[3] ? x[1] + x[2] : x[1] + '(' + x[2] + ') ' + x[3] + (x[4] ? '-' + x[4] : '')
         }
         return val = '+'+val
    }
    stringTruncate(str:string, length:number):string {
        const dots = str.length > length ? '...' : '';
        return str.substring(0, length)+dots;
    }


}