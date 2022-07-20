import type { FormItemRule } from 'element-plus'
import { isEmpty } from 'lodash-es'
import i18n from '~/modules/i18n'

const { t } = i18n.global

export function createRule(condition: (value: any) => boolean, error_message: string): FormItemRule {
  return {
    validator: (rule: unknown, value: any, callback: Function) => {
      condition(value)
        ? callback(new Error(error_message))
        : callback()
    },
    trigger: 'blur'
  }
}

export function required(error_message = ''): FormItemRule {
  return {
    validator: (rule: unknown, value: any, callback: Function) => {
      isEmpty(value)
        ? callback(new Error(error_message || t('simp.form.required')))
        : callback()
    },
    trigger: 'blur'
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
