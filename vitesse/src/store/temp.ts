import { acceptHMRUpdate, defineStore } from 'pinia'

export const useTempStore = defineStore('temp', () => {
  const map = ref<Map<string, any>>(new Map<string, any>())
  const get = (key: string) => map.value.get(key)
  const set = (key: string, value: any) => map.value.set(key, value)
  return { get, set }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMenuStore, import.meta.hot))
