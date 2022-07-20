import type { Pagination } from '~/apis/mock'
import { defaultPage, mockPage, randomYn, wrapPromise } from '~/apis/mock'

export interface SearchOptions {
  apvAt: string
  bbsTp: string
  option: string
  value: string
  svcNm: string
  tntNm: string
  svcAt: string
}

export interface Mock {
  uid: number
  bbsTpNm: string
  bbsTpCd: string
  bbsNm: string
  o1: string
  o2: string
  o3: string
  useAt: string
  regNm: string
}

function mockCopy(uid: number): Mock {
  const temp = `테스트 게시판${uid}`
  return {
    uid: uid,
    bbsTpNm: temp,
    bbsTpCd: temp,
    bbsNm: temp,
    o1: randomYn() === 'Y' ? '사용' : '미사용',
    o2: randomYn() === 'Y' ? '회원전용' : '전체참여',
    o3: randomYn() === 'Y' ? '공개' : '비공개',
    useAt: randomYn() === 'Y' ? '사용' : '미사용',
    regNm: '등록자'
  }
}

export default {
  detail(uid: string) {
    return wrapPromise({
      uid: uid,
      svcNm: '테스트 서비스',
      tntNm: '테스트 테넌트',
      svcAt: 'Y'
    })
  },
  page(options: SearchOptions, page: Pagination = defaultPage) {
    return mockPage(options, i => mockCopy(i), page)
  }
}
