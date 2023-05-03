import {ISalons, ISalonsListItem, SalonsResponseType} from "@/entity/salons/salons.types";

export default class Salons implements ISalons {
    total: number;
    data: ISalonsListItem[] = [];
    constructor(data: SalonsResponseType) {
        this.total = data.total;
        for (let i = 0; i < data.data.length; i++) {
            this.data.push(data.data[i]);
        }
    }
}