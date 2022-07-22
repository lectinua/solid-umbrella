<script setup lang="ts">
const props = defineProps({
  title: String,
  width: { type: String, default: '30%' },
  height: { type: String, default: '150px' },
  beforeClose: Function,
})

const visible = ref(false)

function handleClose(done: Function) {
  if (props.beforeClose)
    props.beforeClose()
  done()
}

function show(flag = true) {
  visible.value = flag
}
defineExpose({ show })
</script>

<template>
  <div>
    <el-dialog v-model="visible" :title="title" :width="width" :before-close="handleClose">
      <slot />
      <!-- eslint-disable-next-line vue/require-component-is -->
      <component is="style">
        .ep-dialog__header { border-bottom: 1px solid var(--ep-border-color-light); margin-right: 0 }
        .ep-dialog__body { padding-top: 10px !important }
      </component>
    </el-dialog>
  </div>
</template>
