import { ILoyaltyCertClient, LoyaltyCertClientResponseType } from '@/entity/loyaltyCertClient/loyaltyCertClient.types';

export default class SoyaltyCertClient implements ILoyaltyCertClient {
    id: number;
    name: string;
    constructor(data: LoyaltyCertClientResponseType) {
        this.id = data.id;
        this.name = data.name;
    }
}
