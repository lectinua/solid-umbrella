<script setup lang="ts">
import { cloneDeep } from 'lodash-es'

const props = defineProps({
  title: String,
  onSubmit: Function,
  onReset: Function,
  data: Object,
  rules: Object
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
</script>

<template>
  <el-card>
    <template #header>
      <div flex>
        <span flex-1 text-left>{{ title }}</span>
        <el-button-group>
          <slot name="buttons" :submit="submit" :reset="reset">
            <el-button @click="submit">{{ t('simp.search.submit') }}</el-button>
            <el-button @click="reset">{{ t('simp.search.reset') }}</el-button>
          </slot>
        </el-button-group>
      </div>
    </template>
    <template #default>
      <el-form :model="modified" :rules="rules">
        <slot :data="modified" />
      </el-form>
      <!-- eslint-disable-next-line vue/require-component-is -->
      <component is="style">
        .el-form-item { align-items: center }
      </component>
    </template>
  </el-card>
</template>
