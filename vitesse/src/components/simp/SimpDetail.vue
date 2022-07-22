<script setup lang="ts">
import type { PropType } from 'vue'
import { Detail } from '~/utils/simp'

const props = defineProps({
  onClose: Function,
  onSave: Function,
  onUpdate: Function,
  mode: { type: String as PropType<Detail>, default: Detail.Read }
})

const { t } = useI18n()

const mode = ref<Detail>(props.mode)
watch(() => props.mode, value => mode.value = value)
</script>

<template>
  <div>
    {{ mode }}
    <div v-if="mode === Detail.Read">
      <slot name="default" />
      <div text-right>
        <el-button @click="mode = Detail.Update">{{ t('simp.detail.modify') }}</el-button>
        <el-button @click="onClose">{{ t('simp.detail.list') }}</el-button>
      </div>
    </div>
    <div v-if="mode === Detail.Save">
      <slot name="save" />
      <div text-right>
        <el-button @click="onSave">{{ t('simp.detail.save') }}</el-button>
        <el-button @click="mode = Detail.Read">{{ t('simp.detail.cancel') }}</el-button>
      </div>
    </div>
    <div v-if="mode === Detail.Update">
      <slot name="update" />
      <div text-right>
        <el-button @click="onUpdate">{{ t('simp.detail.update') }}</el-button>
        <el-button @click="mode = Detail.Read">{{ t('simp.detail.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>
