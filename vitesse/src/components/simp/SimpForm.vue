<script setup lang="ts">
import { cloneDeep, isEmpty } from 'lodash-es'
import type { FormInstance } from 'element-plus'
import { templateRef } from '@vueuse/core'

const props = defineProps({
  useReset: { type: Boolean, default: true },
  forceUpdate: { type: Boolean, default: false },
  forceRemove: { type: Boolean, default: false },
  onReset: Function,
  onSave: Function,
  onUpdate: Function,
  onRemove: Function,
  data: Object,
  rules: Object
})

const react = reactive({ modified: {}, isUpdateMode: false })
const { t } = useI18n()

watch(() => props.data, (curr: Object) => {
  react.modified = cloneDeep(curr)
  react.isUpdateMode = !isEmpty(curr)

  if (react.modified.newMode)
    react.isUpdateMode = false
})

const isButtonExists = computed(() => props.onSave || props.onUpdate || props.onRemove)
const canReset = computed(() => props.useReset)
const canSave = computed(() => props.onSave && !react.isUpdateMode)
const canUpdate = computed(() => (props.onUpdate && react.isUpdateMode) || props.forceUpdate)
const canRemove = computed(() => (props.onRemove && react.isUpdateMode) || props.forceRemove)

function reset() {
  if (props.onReset) {
    props.onReset()
  } else {
    react.modified = {}
  }
}

const form = templateRef<any>('form')
function validation(callback: () => any) {
  const el: FormInstance = form.value
  el.validate((valid, fields) => {
    valid
      ? callback()
      : console.log('submit error', fields)
  })
}
defineExpose({ validation })
</script>

<template>
  <div>
    <el-form ref="form" :model="react.modified" :rules="rules" class="lc-simp-form">
      <slot :data="react.modified" />
    </el-form>
    <div flex justify-end mt-3>
      <slot name="buttons" :data="react.modified">
        <div v-if="isButtonExists">
          <el-button v-if="canReset" @click="reset">{{ t('simp.form.reset') }}</el-button>
          <el-popconfirm v-if="canSave" :title="t('simp.form.save_msg')" @confirm="validation(() => onSave(react.modified))">
            <template #reference>
              <el-button>{{ t('simp.form.save') }}</el-button>
            </template>
          </el-popconfirm>
          <el-popconfirm v-if="canUpdate" :title="t('simp.form.update_msg')" @confirm="validation(() => onUpdate(react.modified))">
            <template #reference>
              <el-button>{{ t('simp.form.update') }}</el-button>
            </template>
          </el-popconfirm>
          <el-popconfirm v-if="canRemove" :title="t('simp.form.remove_msg')" @confirm="onRemove(react.modified)">
            <template #reference>
              <el-button>{{ t('simp.form.remove') }}</el-button>
            </template>
          </el-popconfirm>
          <slot name="buttons-etc" :data="react.modified" />
        </div>
      </slot>
    </div>
  </div>
</template>

