<script setup lang="ts">
import type { PropType } from 'vue'
import { cloneDeep, isNull } from 'lodash-es'

type Func = (value: any) => void

const props = defineProps({
  title: String,
  width: { type: String, default: '30%' },
  height: { type: String, default: '150px' },
  beforeClose: Function,
  labelValue: String,
  labelSubmit: String,
  labelItem: String,
  onSearch: Function as PropType<Func>,
  onSubmit: Function as PropType<Func>,
  list: Array as PropType<Array<any>>,
  useRadio: { type: Boolean, default: false }
})

const { t } = useI18n()

const visible = ref(false)
const options = ref({})
const selected = ref<any>({})
const selectedRadio = ref('')
const selectedArray = ref<Array<any>>([])
const message = t('simp.selection.error', { name: props.labelItem })
const error = ref(false)
const table = templateRef<any>('table')
const list = ref<Array<any>>([])

watch(() => props.list, (value: Array<any> | undefined) => {
  if (Array.isArray(value))
    list.value = value.map((x, i) => {
      return { ...x, tempId: i }
    })
})

function checkError() {
  const isError = props.useRadio
    ? isNull(selected.value)
    : selectedArray.value.length === 0
  error.value = isError
  return isError
}

function handleSearch() {
  if (props.onSearch)
    props.onSearch(options.value)
}

function handleSubmit() {
  if (checkError())
    return

  if (props.onSubmit)
    props.onSubmit(props.useRadio
      ? selected.value
      : selectedArray.value
    )

  clearSelection()
  visible.value = false
}

function handleSelect(array: Array<any>) {
  selectedArray.value = array
  if (array.length > 0)
    checkError()
}

function handleClose(done: Function) {
  clearSelection()
  if (props.beforeClose)
    props.beforeClose()
  done()
}

function clearSelection() {
  props.useRadio
    ? selectedRadio.value = ''
    : table.value.clearSelection()
}

function radioChanged(id: any) {
  const filtered = list.value.filter(x => x.tempId === id)
  if (filtered.length > 0) {
    const value: any = cloneDeep(filtered[0])
    delete value.tempId
    selected.value = value
  }
}

function show() {
  error.value = false
  if (props.onSearch)
    props.onSearch({})
  visible.value = true
}
defineExpose({ show })
</script>

<template>
  <div>
    <el-dialog v-model="visible" :title="title" :width="width" :before-close="handleClose">
      <div text-right mb-3>
        <el-button @click="handleSearch">검색</el-button>
      </div>
      <slot name="search" :data="options">
        <el-descriptions :column="2" border>
          <el-descriptions-item :label="labelValue" label-align="right" align="center">
            <el-input v-model="options.value" />
          </el-descriptions-item>
          <el-descriptions-item label="사용여부" label-align="right" align="center">
            <el-radio-group v-model="options.useAt">
              <el-radio label="">전체</el-radio>
              <el-radio label="Y">사용</el-radio>
              <el-radio label="N">미사용</el-radio>
            </el-radio-group>
          </el-descriptions-item>
        </el-descriptions>
      </slot>
      <div mt-3 />
      <el-table ref="table" style="width: 100%" stripe
                :height="height" :data="list"
                :empty-text="t('simp.list.empty')" @selection-change="handleSelect">
        <el-table-column v-if="!useRadio" type="selection" width="50" header-align="center" />
        <el-table-column v-if="useRadio" label="선택" width="75" header-align="center">
          <template #default="scope">
            <div text-center>
              <el-radio v-model="selectedRadio" :label="scope.row.tempId" @change="radioChanged">
                <span />
              </el-radio>
            </div>
          </template>
        </el-table-column>
        <slot />
      </el-table>
      <div flex mt-3>
        <div flex-1 color-rose-500 :class="`lc-trans-in ${error ? 'op-100' : 'op-0'}`">
          {{ message }}
        </div>
        <el-button @click="handleSubmit">{{ labelSubmit }}</el-button>
      </div>
      <!-- eslint-disable-next-line vue/require-component-is -->
      <component is="style">
        .ep-dialog__header { border-bottom: 1px solid var(--ep-border-color-light); margin-right: 0 }
        .ep-dialog__body { padding-top: 10px !important }
      </component>
    </el-dialog>
  </div>
</template>

<style scoped>
.lc-trans-in { transition: opacity 0.5s ease-in-out }
</style>
