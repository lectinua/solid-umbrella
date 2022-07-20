<script setup lang="ts">
import type { Mock, SearchOptions } from '~/apis/tenant.bbs.tp'
import api from '~/apis/tenant.bbs.tp'
import { parse } from '~/apis'
import type { SysCode } from '~/apis/sys.code'
import code from '~/apis/sys.code'
import type { Pagination } from '~/apis/mock'
import { defaultPage, join } from '~/apis/mock'

const props = defineProps({
  uid: String
})
const options = ref<SearchOptions>({
  apvAt: '',
  bbsTp: '',
  option: '',
  value: '',
  svcNm: '',
  tntNm: '',
  svcAt: '',
})
const list = ref<Array<Mock>>([])
const page = ref<Pagination>(defaultPage)
const bbsTp = ref<Array<SysCode>>([])

const router = useRouter()

code('MENU_TP_CD').then(list => bbsTp.value = list)
api.detail(props.uid + '').then(res => options.value = join(options.value, parse(res).data))

function handleSubmit(values: SearchOptions, pagination: Pagination) {
  api.page(values, pagination).then((res) => {
    const p = parse(res).data
    list.value = p.list
    page.value = p.page
  })
}
function handleSubmitPage(page: Pagination) {
  handleSubmit(options.value, page)
}
handleSubmit(options.value, defaultPage)
</script>

<template>
  <div>
    <SimpSearch :data="options" :on-submit="handleSubmit">
      <template #default="{ data }">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="서비스 > 테넌트" label-align="right" align="left" min-width="150px">
            {{ data.svcNm }} > {{ data.tntNm }}
          </el-descriptions-item>
          <el-descriptions-item label="서비스 여부" label-align="right" align="left" min-width="150px">
            {{ data.svcAt }}
          </el-descriptions-item>
          <el-descriptions-item label="게시판 유형" label-align="right" align="left" min-width="150px">
            <el-select v-model="data.bbsTp">
              <el-option label="전체" value="" />
              <el-option v-for="opt in bbsTp" :key="opt.code" :label="opt.codeNm" :value="opt.code" />
            </el-select>
          </el-descriptions-item>
          <el-descriptions-item label="검색조건" label-align="right" align="left" min-width="150px">
            <el-input v-model="data.value">
              <template #prepend>
                <el-select v-model="data.option">
                  <el-option label="전체" value="" />
                  <el-option label="게시판명" value="1" />
                  <el-option label="등록자" value="2" />
                </el-select>
              </template>
            </el-input>
          </el-descriptions-item>
        </el-descriptions>
      </template>
    </SimpSearch>
    <SimpList mt title="테넌트 게시판 목록" :list="list"
              :is-paging="true" :page="page" :on-submit="handleSubmitPage">
      <template #default>
        <el-table-column type="index" prop="번호" width="50" align="center" />
        <el-table-column prop="bbsTpNm" label="게시판 유형명" width="150" />
        <el-table-column prop="bbsTpCd" label="유형" align="center" />
        <el-table-column prop="bbsNm" label="게시판명">
          <template #default="scope">
            <router-link underline hover-cursor-pointer :to="`/manage/tenant/bbs/${uid}/detail`">
              {{ scope.row.bbsNm }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="o1" label="게시판 분류" width="100" align="center" />
        <el-table-column prop="o2" label="게시글 작성유형" width="150" align="center" />
        <el-table-column prop="o3" label="게시글 공개유형" width="150" align="center" />
        <el-table-column prop="useAt" label="사용여부" width="100" align="center" />
        <el-table-column prop="regNm" label="등록자" width="100" align="center" />
        <el-table-column label="게시글관리" width="100">
          <template #default>
            <el-button style="padding: 0 24px; width: 100%"
                       @click="router.push(`/manage/tenant/bbs/${uid}/articles`)">
              이동
            </el-button>
          </template>
        </el-table-column>
      </template>
      <template #buttons-bottom>
        <el-button @click="router.push(`/manage/tenant/bbs/${uid}/new`)">신규</el-button>
        <el-button @click="router.push(`/manage/tenant/bbs`)">목록</el-button>
      </template>
    </SimpList>
  </div>
</template>

