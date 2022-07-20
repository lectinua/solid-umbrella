<script setup lang="ts">
import type { Mock, SearchOptions } from '~/apis/tenant.bbs'
import { defaultPage } from '~/apis/mock'
import type { Pagination } from '~/apis/mock'
import api from '~/apis/tenant.bbs'
import { parse } from '~/apis'

const router = useRouter()

const data = ref<SearchOptions>({
  apvAt: '',
  useAt: '',
  option: '',
  value: '',
  svcNm: '',
  tntNm: '',
})
const list = ref<Array<Mock>>([])
const page = ref<Pagination>(defaultPage)

function handleSubmit(values: SearchOptions, pagination: Pagination) {
  api.page(values, pagination).then((res) => {
    const p = parse(res).data
    list.value = p.list
    page.value = p.page
  })
}
function handleSubmitPage(page: Pagination) {
  handleSubmit(data.value, page)
}
handleSubmit(data.value, defaultPage)
</script>

<template>
  <div>
    <SimpSearch :data="data" :on-submit="handleSubmit">
      <template #default="{ data }">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="승인여부" label-align="right" align="left">
            <el-radio-group v-model="data.apvAt">
              <el-radio label="">전체</el-radio>
              <el-radio label="Y">승인</el-radio>
              <el-radio label="N">미승인</el-radio>
            </el-radio-group>
          </el-descriptions-item>
          <el-descriptions-item label="사용" label-align="right" align="left">
            <el-radio-group v-model="data.useAt">
              <el-radio label="">전체</el-radio>
              <el-radio label="Y">사용</el-radio>
              <el-radio label="N">미사용</el-radio>
            </el-radio-group>
          </el-descriptions-item>
          <el-descriptions-item :span="2" label="검색조건" label-align="right" align="left">
            <el-input v-model="data.value">
              <template #prepend>
                <el-select v-model="data.option">
                  <el-option label="전체" value="" />
                  <el-option label="서비스키" value="svcKey" />
                  <el-option label="서비스명" value="svcNm" />
                  <el-option label="테넌트명" value="tntNm" />
                </el-select>
              </template>
            </el-input>
          </el-descriptions-item>
          <el-descriptions-item :span="2" label="서비스 > 테넌트" label-align="right" align="left">
            <el-select v-model="data.svcNm" mr-1>
              <el-option label="전체" value="" />
            </el-select>
            <el-select v-model="data.tntNm">
              <el-option label="전체" value="" />
            </el-select>
          </el-descriptions-item>
        </el-descriptions>
      </template>
    </SimpSearch>
    <SimpList mt title="목록" :list="list" :is-paging="true" :page="page" :on-submit="handleSubmitPage">
      <template #default>
        <el-table-column type="index" prop="번호" width="50" align="center" />
        <el-table-column prop="svcKey" label="서비스키" width="100" />
        <el-table-column prop="svcNm" label="서비스" align="center" />
        <el-table-column prop="tntNm" label="테넌트명">
          <template #default="scope">
            <router-link underline hover-cursor-pointer :to="`/manage/tenant/bbs/${scope.row.uid}`">
              {{ scope.row.tntNm }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="svcAt" label="서비스 여부" width="100" align="center" />
        <el-table-column prop="apvAt" label="승인여부" width="100" align="center" />
        <el-table-column prop="useAt" label="사용여부" width="100" align="center" />
        <el-table-column prop="bbs" label="게시판" width="100" align="center" />
        <el-table-column prop="regId" label="등록자" width="100" align="center" />
      </template>
    </SimpList>
  </div>
</template>
