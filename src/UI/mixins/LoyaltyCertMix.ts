import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { ILoyaltyCert } from '@/entity/loyalty/loyaltyCert/loyaltyCert/LoyaltyCert.types';
import { LoyaltyCertStore } from '@/store/modules/LoyaltyCert';
import { PaginationMix } from '@/UI/mixins/PaginationMix';
import { FormMix } from '@/UI/mixins/FormMix';
import { mixins } from 'vue-class-component';

@Component
export class LoyaltyCertMix extends mixins(PaginationMix, FormMix) {
    get LoyaltyCert(): ILoyaltyCert | null {
        return LoyaltyCertStore.loyaltyCerts;
    }
}
