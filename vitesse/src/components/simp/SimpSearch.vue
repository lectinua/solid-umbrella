<script setup lang="ts">
import { cloneDeep } from 'lodash-es'
import type { PropType } from 'vue'

type SubmitFunc = (options: any) => void

const props = defineProps({
  title: String,
  onSubmit: Function as PropType<SubmitFunc>,
  onReset: Function,
  data: Object,
  submitOnStart: { type: Boolean, default: true }
})

let origin = props.data
const modified = ref<any>({})
const { t } = useI18n()

watch(() => props.data, curr => {
  origin = cloneDeep(curr)
  modified.value = cloneDeep(curr)
})

function submit() {
  if (props.onSubmit) {
    props.onSubmit(modified.value)
  }
}

function reset() {
  if (props.onReset) {
    props.onReset()
  } else {
    modified.value = cloneDeep(origin)
  }
}
reset()
if (props.submitOnStart)
  submit()
</script>

<template>
  <el-card>
    <template #header>
      <div flex>
        <span flex-1 text-left>{{ title }}</span>
        <div>
          <slot name="buttons" :submit="submit" :reset="reset">
            <el-button @click="submit">{{ t('simp.search.submit') }}</el-button>
            <el-button @click="reset">{{ t('simp.search.reset') }}</el-button>
          </slot>
        </div>
      </div>
    </template>
    <template #default>
      <el-form :model="modified" class="lc-simp-form">
        <slot :data="modified" />
      </el-form>
      <!-- eslint-disable-next-line vue/require-component-is -->
      <component is="style">
        .el-form-item { align-items: center }
      </component>
    </template>
  </el-card>
</template>
