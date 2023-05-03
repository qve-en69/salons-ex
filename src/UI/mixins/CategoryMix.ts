import Vue from 'vue'
import Component from 'vue-class-component'
import { ICategory } from '@/entity/category/category.types';
import {IFilters} from "@/entity/filters/filters.types"
import {FiltersStore} from "@/store/modules/Filters"
import {CategoryStore} from "@/store/modules/Category"

@Component
export class CategoryMix extends Vue {
 
  /* get filtersSalons(): IFilters[] {
    return FiltersStore.filtersSalons;
  } */
  get category(): ICategory[]  {
    return CategoryStore.category;
  }
  
}