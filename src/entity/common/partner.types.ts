export interface IPartner {
    id: number;
    name: string;
    phone: string;
    email: string;
    social_network: string;
}
export type PartnerResponseType = {
    id: number;
    name: string;
    phone: string;
    email: string;
    social_network: string;
}
export type PartnerRequestType = {
    name: string;
    phone: string;
    email: string;
    social_network: string;
}
