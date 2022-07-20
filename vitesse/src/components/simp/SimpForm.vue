<script setup lang="ts">
import { cloneDeep } from 'lodash-es'

const props = defineProps({
  useReset: { type: Boolean, default: true },
  onReset: Function,
  onSave: Function,
  onUpdate: Function,
  onRemove: Function,
  data: Object,
  rules: Object
})

const react = reactive({ modified: {}, isUpdateMode: false })
const { t } = useI18n()

watch(() => props.data, (curr: Object) => react.modified = cloneDeep(curr))

const isButtonExists = computed(() => props.onSave || props.onUpdate || props.onRemove)
const canReset = computed(() => props.useReset)
const canSave = computed(() => props.onSave && !react.isUpdateMode)
const canUpdate = computed(() => props.onUpdate && react.isUpdateMode)
const canRemove = computed(() => props.onRemove && react.isUpdateMode)

function reset() {
  if (props.onReset) {
    props.onReset()
  } else {
    react.modified = {}
    react.isUpdateMode = false
  }
}
</script>

<template>
  <div>
    <el-form :model="react.modified" :rules="rules">
      <slot :data="react.modified" />
    </el-form>
    <div flex justify-end mt-3>
      <slot name="buttons" :data="react.modified">
        <div v-if="isButtonExists">
          <el-button v-if="canReset" @click="reset">{{ t('simp.form.reset') }}</el-button>
          <el-popconfirm v-if="canSave" :title="t('simp.form.save_msg')" @confirm="onSave(react.modified)">
            <template #reference>
              <el-button>{{ t('simp.form.save') }}</el-button>
            </template>
          </el-popconfirm>
          <el-popconfirm v-if="canUpdate" :title="t('simp.form.update_msg')" @confirm="onUpdate(react.modified)">
            <template #reference>
              <el-button>{{ t('simp.form.update') }}</el-button>
            </template>
          </el-popconfirm>
          <el-popconfirm v-if="canRemove" :title="t('simp.form.remove_msg')" @confirm="onRemove(react.modified)">
            <template #reference>
              <el-button>{{ t('simp.form.remove') }}</el-button>
            </template>
          </el-popconfirm>
        </div>
      </slot>
    </div>
  </div>
</template>
