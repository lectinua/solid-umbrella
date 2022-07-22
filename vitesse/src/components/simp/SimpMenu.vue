<script setup lang="ts">
import { isEmpty } from 'lodash-es'
import { MenuTree } from '~/store/menu'

const props = defineProps({
  height: { type: String, default: '36px' }
})

const router = useRouter()
const { t } = useI18n()

const data = ref<Array<MenuTree>>([
  new MenuTree({ menuNm: t('menu.home'), url: '/' }, 1)
])

useMenuStore().load().then((menus: Array<MenuTree>) => {
  data.value = data.value.concat(menus)
})

function customClass(data: MenuTree) {
  let clas = ''
  if (data.url === '/')
    clas += ' border-b'
  if (data.parent !== 1)
    clas += ' lc-menu-bg'
  if (data.url !== undefined && router.currentRoute.value.path === data.url)
    clas += ' lc-menu-active'
  return clas
}

function handleClick(data: MenuTree) {
  if (data.url !== undefined)
    router.push(data.url)
}
</script>

<template>
  <el-tree class="lc-menu-tree" :data="data" node-key="menu" :props="{ class: customClass }"
           default-expand-all
  >
    <template #default="{ data, node }">
      <span flex items-center flex-1 @click="handleClick(data)">
        <span v-if="data.parent !== 1" mr-3>•</span>
        <span flex-1 text-start>{{ node.label }}</span>
        <div v-if="!isEmpty(data.children)" mr-1 i-carbon:chevron-right :class="node.expanded ? 'lc-rot lc-expanded' : 'lc-rot'" />
      </span>
      <!-- eslint-disable-next-line vue/require-component-is -->
      <component is="style">
        .lc-menu-tree .ep-tree { --ep-tree-node-hover-bg-color: var(--ep-color-primary-light-5) }
        .lc-menu-tree .ep-tree-node__content { height: {{ props.height }} }
        .lc-menu-tree .ep-tree-node__expand-icon { visibility: hidden }
      </component>
    </template>
  </el-tree>
</template>

<style scoped>
.lc-rot { transition: transform 0.3s ease-in-out }
.lc-expanded { transform: rotate(90deg) }
</style>
