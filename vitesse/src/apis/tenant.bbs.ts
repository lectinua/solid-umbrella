import type { Pagination } from '~/apis/mock'
import { defaultPage, mockPage, randomYn } from '~/apis/mock'

export interface SearchOptions {
  apvAt: string
  useAt: string
  option: string
  value: string
  svcNm: string
  tntNm: string
}

export interface Mock {
  uid: number
  svcKey: string
  svcNm: string
  tntNm: string
  svcAt: string
  apvAt: string
  useAt: string
  bbs: string
  regId: string
}

function mockCopy(uid: number, key: string, svcNm: string, tntNm: string): Mock {
  return {
    uid: uid,
    svcKey: key,
    svcNm: svcNm,
    tntNm: tntNm,
    svcAt: randomYn(),
    apvAt: randomYn(),
    useAt: randomYn(),
    bbs: '2',
    regId: '홍길동'
  }
}

export default {
  page(options: SearchOptions, page: Pagination = defaultPage) {
    return mockPage(options, i => mockCopy(i, `CETUS${i}`, `서비스${i}`, `테넌트${i}`), page)
  }
}
