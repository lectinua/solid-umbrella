import { createI18n } from 'vue-i18n'
import ko from '~/locales/ko.yml'

const i18n = createI18n({
  legacy: false,
  locale: 'ko',
  messages: { ko }
})

export default i18n
