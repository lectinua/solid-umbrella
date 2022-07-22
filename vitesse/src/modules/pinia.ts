import { createPinia } from 'pinia'
import persistPlugin from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persistPlugin)

export default pinia
