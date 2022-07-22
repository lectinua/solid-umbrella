import type { FormItemRule } from 'element-plus'
import i18n from '~/modules/i18n'

const { t } = i18n.global

export function createRule(condition: (value: any) => boolean, error_message: string): FormItemRule {
  return {
    validator: (rule: unknown, value: any, callback: Function) => {
      condition(value)
        ? callback(new Error(error_message))
        : callback()
    },
    trigger: ['blur', 'change']
  }
}

export function required(error_message = ''): FormItemRule {
  return {
    required: true,
    message: error_message || t('simp.form.required'),
    trigger: ['blur', 'change']
  }
}

/** example
 * ### template
 * <SimpForm :rules="rules" ...>
 *
 * ### script
 * data() {
 *   return {
 *     rules: {
 *       userId: required(),
 *       userNm: [createRule(value => value === 'test', '존재하는 이름')]
 *     }
 *   }
 * }
 */
