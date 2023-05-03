import Vue from 'vue'
import Component from 'vue-class-component'
import { IClients } from "@/entity/clients/clients.types";
import { ClientsStore } from '@/store/modules/Clients'

@Component
export class ClientsMix extends Vue {
    get clientsLoaded(): boolean {
        return ClientsStore.clientsLoaded;
    }
    get clients(): IClients | null {
        return ClientsStore.clients;
    }
}