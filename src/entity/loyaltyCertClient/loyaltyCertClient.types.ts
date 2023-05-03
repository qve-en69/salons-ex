export interface ILoyaltyCertClient {
    id: number | null;
    name: string;
}

export type LoyaltyCertClientResponseType = {
    id: number;
    name: string;
    link: string;
};
