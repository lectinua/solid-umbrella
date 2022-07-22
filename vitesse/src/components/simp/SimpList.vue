<script setup lang="ts">
import type { PropType } from 'vue'
import type { Pagination } from '~/apis/mock'
import { defaultPage } from '~/apis/mock'

const props = defineProps({
  title: String,
  height: { type: Number, default: 300 },
  onSubmit: Function,
  onSelect: Function,
  onSelectCheckbox: Function,
  onSelectRadio: Function,
  list: Array,
  isPaging: { type: Boolean, default: false },
  page: { type: Object as PropType<Pagination>, default: defaultPage },
  loading: Boolean
})

const { t } = useI18n()
const realList = ref(props.list)

watch(() => props.list, value => realList.value = value)

function handleSelect(data: any) {
  if (props.onSelect)
    props.onSelect(data)
}

function handleSelectCheckbox(array: any) {
  if (props.onSelectCheckbox)
    props.onSelectCheckbox(array)
}

function handleSelectRadio(data: any) {
  if (props.onSelectRadio)
    props.onSelectRadio(data)
}

function handleSubmit() {
  if (props.onSubmit)
    props.onSubmit(props.page)
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
          <div style="max-height: 24px">
            <slot name="buttons" />
          </div>
        </div>
      </template>
      <template #default>
        <el-table :data="realList" style="width: 100%" stripe :height="height" :empty-text="t('simp.list.empty')"
                  @selection-change="handleSelectCheckbox" @row-click="handleSelect" @current-change="handleSelectRadio">
          <slot />
        </el-table>
        <div v-if="isPaging" flex justify-center mt-2>
          <el-pagination v-model:page-size="page.cntPerPage"
                         v-model:current-page="page.nowPage"
                         background layout="prev, pager, next"
                         :total="page.total"
                         @current-change="handleSubmit" />
          <span ml-3>
            {{ t('simp.list.page') }}
            <el-select v-model="page.cntPerPage"
                       w-auto @change="handleSubmit">
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
