export interface ICategory {
    id: number | null;
    name: string;
}

export type CategoryResponseType = {
    id: number;
    name: string;
}
export type CategoryClientResponseType = {
    id: number;
    name: string;
    color: string | null;
    icon: string | null;
};