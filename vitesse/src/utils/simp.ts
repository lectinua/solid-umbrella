import i18n from '~/modules/i18n'

const { t } = i18n.global

export const Detail = { Read: 'R', Save: 'C', Update: 'U' } as const
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Detail = typeof Detail[keyof typeof Detail]

const DetailTexts = {
  [Detail.Read]: t('simp.detail.read'),
  [Detail.Save]: t('simp.detail.save'),
  [Detail.Update]: t('simp.detail.modify')
}
export const Detail2Text = (value: Detail) => DetailTexts[value]
