import {Action, getModule, Module, MutationAction, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {ICategory} from "@/entity/category/category.types";

@Module({
    namespaced: true,
    name: 'category',
    store,
    dynamic: true,
})
class CategoryModule extends VuexModule {
    category: ICategory[] = [];
    categoryLoaded = false;
    categorLoaded = false;

    @MutationAction
    async fetchAll(): Promise<{ category: ICategory[]; categoryLoaded: boolean }> {
        const category = await store.$repository.category.fetchAll();
        let categoryLoaded = false;
        if (category.length > 0) {
            categoryLoaded = true;
        }
        return {category, categoryLoaded};
    }
}

export const CategoryStore = getModule(CategoryModule);
