<template>
    <div>
      <a-form layout="inline" >
        <template v-for="(filter) in filtersData" >

          <template v-if="(filter.type === 'date')">
            <a-form-item
                :key="`itmd-${filter.key}`"
                :label="filter.label"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-date-picker
                  :key="filter.key"
                  :style="filter.style"
                  placeholder="ДД.ММ.ГГГГ"
                  @change="filter.onChange"
                  :format="'DD.MM.YYYY'"
                  size="default"
              />
            </a-form-item>
          </template>
          <template v-if="(filter.type === 'input')" >
            <a-form-item
                :key="`itmd-${filter.key}`"
                :label="filter.label"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input
                  :key="filter.key"
                  :placeholder="filter.placeholder"
                  :style="filter.style"
                  :data="filter"
                  @change="filter.onChange"
                  @search="filter.onSearch"
              />
            </a-form-item>
          </template>

          <template v-if="(filter.type === 'source')" >
            <a-form-item
                :key="`itmd-${filter.key}`"
                :label="filter.label"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-select
                  show-search
                  :placeholder="filter.placeholder"
                  :show-arrow="true"
                  :filter-option="false"
                  :not-found-content="null"
                  :style="filter.style"
                  @change="filter.onChange"
                  @search="filter.onSearch"


                  :key="filter.key">
                <template v-if="filter.source" >
                  <a-select-option v-for="d in filter.source" :key="d.id">
                    {{d.name}}
                  </a-select-option>
                </template>
              </a-select>

            </a-form-item>
          </template>

          <template v-if="(filter.type === 'select')" >
            <a-form-item
                :key="`itmd-${filter.key}`"
                :label="filter.label"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-select
                  show-search
                  :placeholder="filter.placeholder"
                  :show-arrow="true"
                  :filter-option="false"
                  :not-found-content="null"
                  :style="filter.style"
                  @change="filter.onChange"
                  @search="filter.onSearch"
                  :key="filter.key"
              >
                <a-select-option v-for="d in filter.value" :key="d.key">
                  {{d.label}}
                </a-select-option>

              </a-select>
              <a-button v-show="showFilterBtn(filter.fieldNames)">
                cls
              </a-button>

            </a-form-item>
          </template>
        </template>
        <a-form-item>
          <a-button @click="clearFilter">Очитсить фильтр</a-button>
        </a-form-item>
      </a-form>
    </div>
</template>

<script lang="ts">

import {Component, Prop, Vue, Watch } from "vue-property-decorator"
import { FilterList } from "@/entity/filters/extFilter";
@Component
export class aFilter extends Vue {
    @Prop({required: true}) readonly filtersData!: FilterList[];
    name = "aFilter";
}
</script>