import { CategoryResponseType, CategoryClientResponseType, ICategory } from '@/entity/category/category.types';

export default class Category implements ICategory {
    id: number | null;
    name: string;
    constructor(data: CategoryResponseType) {
        this.id = data.id;
        this.name = data.name;
    }
}
export class CategoryClient implements ICategory {
    id: number | null;
    name: string;
    constructor(data: CategoryClientResponseType) {
        this.id = data.id;
        this.name = data.name;
    }
}