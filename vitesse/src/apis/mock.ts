import { cloneDeep } from 'lodash-es'

export interface Pagination {
  total: number
  nowPage: number
  cntPerPage: number
}

export const randomYn = () => Math.round(Math.random()) === 0 ? 'Y' : 'N'
export const defaultPage = { total: 0, nowPage: 1, cntPerPage: 10 }

export function wrapPromise(data: any): Promise<any> {
  return new Promise((resolve) => resolve({
    data: {
      code: 0,
      message: null,
      data: data
    }
  }))
}

export function join(a: any, b: any) {
  const copy = cloneDeep(a)
  for (const key in copy) {
    if (Object.hasOwn(b, key))
      copy[key] = b[key]
  }
  return copy
}

export function mockPage(options: any, mockObj: (i: number) => any, page: Pagination = defaultPage): Promise<any> {
  const total = 100
  const list: Array<any> = []
  const sub = (page.cntPerPage * (page.nowPage - 1))
  for (let i = 0; i < Math.min(total - sub, page.cntPerPage); i++) {
    list.push(mockObj(page.nowPage * i + 1))
  }

  // options

  return wrapPromise({
    page: {
      ...page,
      total: total
    },
    list: list
  })
}

/** example
 * function mockCopy(uid: number, key: string, svcNm: string, tntNm: string): Mock {
 *   return {
 *     uid: uid,
 *     svcKey: key,
 *     svcNm: svcNm,
 *     tntNm: tntNm,
 *     svcAt: randomYn(),
 *     apvAt: randomYn(),
 *     useAt: randomYn(),
 *     bbs: '2',
 *     regId: '홍길동'
 *   }
 * }
 *
 * export default {
 *   page(options: SearchOption, page: Pagination = defaultPage) {
 *     return mockPage(options, i => mockCopy(i, `CETUS${i}`, `서비스${i}`, `테넌트${i}`), page)
 *   },
 *   detail(uid: string) {
 *     return wrapPromise({
 *       uid: uid,
 *       svcNm: '테스트 서비스',
 *       tntNm: '테스트 테넌트'
 *     })
 *   }
 * }
 */
