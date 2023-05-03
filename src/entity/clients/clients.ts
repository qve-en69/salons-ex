import { IClients, IClientsListItem, ClientsResponseType } from '@/entity/clients/clients.types';

export default class Clients implements IClients {
    total: number;
    data: IClientsListItem[] = [];
    constructor(data: ClientsResponseType) {
        this.total = data.total;
        for (let i = 0; i < data.data.length; i++) {
            this.data.push(data.data[i]);
        }
    }
}
