<script setup lang="ts">
import type { PropType } from 'vue'
import { watch } from 'vue'
import type { MenuTree } from '~/store/menu'

const props = defineProps({
  root: String,
  // eslint-disable-next-line vue/require-valid-default-prop
  data: { type: Array as PropType<Array<Tree>>, default: [] },
  onClick: Function as PropType<(data: Object | undefined) => void>
})
const customClass = `lc-tree-${props.root}`

/**
 * disable 일 때 회색 처리
 * data 가 존재할 때만 클릭 이벤트 발생
 */
interface Tree {
  label: string
  children?: Array<Tree>
  data?: Object
  //
  level: number
  isChild: boolean
  disable: boolean
}

const menus = ref<Array<Tree>>([])
setMenus(props.data)
watch(() => props.data,
  curr => {
    setMenus(curr)
    setChildsLevel(menus.value[0])
  }
)

function setMenus(data: Array<Tree>) {
  menus.value = [{
    label: props.root || '',
    children: data,
    level: 0,
    isChild: false,
    disable: true
  }]
}

function setChildsLevel(parent: Tree) {
  parent.children?.forEach(c => {
    c.level = parent.level + 1
    c.isChild = true
    setChildsLevel(c)
  })
}

function range(length: number) {
  return new Array(Math.max(length - 1, 0))
}

function handleClick(tree: Tree) {
  if (props.onClick !== undefined)
    props.onClick(tree)
}
</script>

<template>
  <el-tree :class="root !== undefined ? `lc-tree-${root}` : ''"
           :data="menus" :node-key="root" default-expand-all
           :expand-on-click-node="false">
    <template #default="{ node, data }">
      <span v-for="i in range(data.level)" :key="i">┃</span>
      <span v-if="data.isChild" mr-2>├</span>
      <span flex items-center flex-1 @click="handleClick(data)">
        <span flex-1 text-start select-none :class="data.disable ? 'lc-disable' : ''">{{ node.label }}</span>
      </span>
      <div v-if="data.children.length > 0" i-carbon:menu
           :class="node.expanded ? 'lc-rot lc-expanded' : 'lc-rot'"
           @click="node.expanded = !node.expanded" />
      <!-- eslint-disable-next-line vue/require-component-is -->
      <component is="style">
        .{{ customClass }} .ep-tree-node__expand-icon { display: none }
        .{{ customClass }} .ep-tree-node__content { padding-left: 0 !important }
      </component>
    </template>
  </el-tree>
</template>

<style scoped>
.lc-rot { transition: transform 0.3s ease-in-out }
.lc-expanded { transform: rotate(90deg) }
.lc-disable { color: var(--ep-text-color-disabled) !important }
</style>
