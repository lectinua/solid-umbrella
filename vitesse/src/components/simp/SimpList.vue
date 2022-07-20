<script setup lang="ts">
import type { PropType } from 'vue'
import { watch } from 'vue'
import { defaultPage } from '~/apis/mock'
import type { Pagination } from '~/apis/mock'

const props = defineProps({
  title: String,
  height: { type: Number, default: 300 },
  list: Array,
  onSubmit: Function,
  onSelect: Function,
  isPaging: { type: Boolean, default: false },
  page: Object as PropType<Pagination>,
  loading: Boolean,
  onSelectChange: Function
})

const { t } = useI18n()
const pagination = ref<Pagination | undefined>(props.page || defaultPage)

watch(() => props.page, (val: Pagination | undefined) => pagination.value = val)

function handleSelectionChange(array: any) {
  if (props.onSelectChange !== undefined) {
    props.onSelectChange(array)
  }
}

function handleSubmit() {
  if (props.onSubmit != null) {
    props.onSubmit(props.page)
  }
}
</script>

<template>
  <div v-loading="loading">
    <el-card>
      <template #header>
        <div flex>
          <span flex-1 text-left>
            {{ title }}
            <span v-if="isPaging" style="margin-left: 5px">( {{ t('simp.list.cnt', { cnt: page?.total || 0 }) }} )</span>
          </span>
          <el-button-group style="max-height: 24px">
            <slot name="buttons" />
          </el-button-group>
        </div>
      </template>
      <template #default>
        <el-table :data="list" style="width: 100%" stripe :height="height" :empty-text="t('simp.list.empty')" @selection-change="handleSelectionChange"
                  @row-click="onSelect">
          <slot />
        </el-table>
        <div v-if="isPaging" flex justify-center mt-2>
          <el-pagination v-model:page-size="pagination.cntPerPage" v-model:current-page="pagination.nowPage" background
                         layout="prev, pager, next" :total="pagination.total" @current-change="handleSubmit" />
          <span ml-3>
            {{ t('simp.list.page') }}
            <el-select v-model="pagination.cntPerPage" w-auto @change="handleSubmit">
              <el-option v-for="n in 5" :key="n" :value="n * 5 + 5" :label="n * 5 + 5" />
            </el-select>
          </span>
        </div>
        <div mt-3 flex justify-end>
          <slot name="buttons-bottom" />
        </div>
      </template>
    </el-card>
  </div>
</template>
