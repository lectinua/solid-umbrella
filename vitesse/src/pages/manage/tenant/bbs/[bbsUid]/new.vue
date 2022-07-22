<script setup lang="ts">
import { templateRef } from '@vueuse/core'
import api from '~/apis/tenant.bbs.tp'
import { parse } from '~/apis'
import type { Mock } from '~/apis/tenant.bbs.tp'
import { required } from '~/utils/validation'
import type { SysCode } from '~/apis/sys.code'
import code from '~/apis/sys.code'
import { Detail, Detail2Text } from '~/utils/simp'

const props = defineProps({
  bbsUid: { type: String, default: '' }
})
const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const mode = ref<Detail>(!route.query.id ? Detail.Save : Detail.Read)
const bbs = ref({})
const bbsTp = ref<Mock>({
  bbsUid: props.bbsUid,
  uid: route.query.id + '',
  bbsTpNm: '',
  bbsTpCd: '',
  bbsNm: '',
  o1: '',
  o2: '',
  o3: '',
  useAt: '',
  regNm: '',
})
const bbsTpCds = ref<Array<SysCode>>([])
const dialog = templateRef<any>('dialog')

const rules = {
  bbsNm: required('게시판명을 입력해주세요.'),
  bbsTpCd: required('게시판유형을 선택해주세요.'),
  o1: required('게시판 분류를 선택해주세요.'),
  o2: required('분류를 지정해주세요.'),
  o3: required('게시판 작성 유형을 선택해주세요.'),
  useAt: required('사용여부를 선택해주세요.')
}

code('BBS_TP_CD').then(list => bbsTpCds.value = list)
api.detail(props.bbsUid).then(res => bbs.value = parse(res).data)
if (mode.value === Detail.Update) {
  api.detailTy(props.bbsUid, bbsTp.value.uid).then(res => bbsTp.value = parse(res).data)
}

const isRead = computed(() => mode.value === Detail.Read)

function showDialog() {
  dialog.value.show()
}
function closeDialog() {
  dialog.value.show(false)
}

const form = templateRef<any>('form')
function validation(callback: () => any) {
  return form.value.validation(callback)
}
function changeMode(d: Detail) {
  mode.value = d
}

function handleSave(data: any) {
  console.log('save', data)
}
function handleUpdate(data: any) {
  console.log('update', data)
}
</script>

<template>
  <div>
    <SimpDialog ref="dialog" title="게시판 분류 지정" width="400px">
      <el-table :empty-text="t('simp.list.empty')">
        <el-table-column>
          <template #header>
            <div flex items-center>
              <span flex-1 text-center>게시판 분류 지정</span>
              <el-button size="small">추가</el-button>
            </div>
          </template>
          <el-table-column header-align="center" prop="test" label="코드" width="75px" />
          <el-table-column header-align="center" prop="test" label="분류명" />
          <el-table-column header-align="center" prop="test" label="정렬순서" width="100px" />
          <el-table-column header-align="center" prop="test" label="사용여부" width="100px" />
        </el-table-column>
      </el-table>
      <el-card header="상세정보" mt-3>
        <el-descriptions border :column="2" size="small">
          <el-descriptions-item label="분류명" label-align="right" align="left"
                                label-class-name="lc-required" min-width="70px" :span="2">
            <el-input />
          </el-descriptions-item>
          <el-descriptions-item label="정렬순서" label-align="right" align="left"
                                label-class-name="lc-required">
            <el-input />
          </el-descriptions-item>
          <el-descriptions-item label="사용여부" label-align="right" align="left"
                                label-class-name="lc-required">
            <el-radio-group size="small">
              <el-radio label="Y">사용</el-radio>
              <el-radio label="N">미사용</el-radio>
            </el-radio-group>
          </el-descriptions-item>
        </el-descriptions>
        <div text-right mt-3>
          <el-button size="small">저장</el-button>
          <el-button size="small" @click="closeDialog">취소</el-button>
        </div>
      </el-card>
    </SimpDialog>
    <el-card>
      <template #header>
        <div flex>
          <span flex-1 text-left>테넌트 게시판 유형 {{ Detail2Text(mode) }}</span>
        </div>
      </template>
      <template #default>
        <SimpForm ref="form" :data="bbsTp" :rules="rules" :use-reset="false">
          <template #default="{ data }">
            <el-descriptions :column="2" border>
              <el-descriptions-item label="서비스 > 테넌트" label-align="right" align="left" min-width="150px">
                {{ bbs.svcNm }} > {{ bbs.tntNm }}
              </el-descriptions-item>
              <el-descriptions-item label="서비스 여부" label-align="right" align="left" min-width="150px">
                {{ bbs.svcAt }}
              </el-descriptions-item>
              <el-descriptions-item :span="2" label="게시판명" label-align="right"
                                    align="left" label-class-name="lc-required">
                <el-form-item prop="bbsNm">
                  <span v-if="isRead">{{ data.bbsNm }}</span>
                  <el-input v-if="!isRead" v-model="data.bbsNm" />
                </el-form-item>
              </el-descriptions-item>
              <el-descriptions-item :span="2" label="게시판유형" label-align="right"
                                    align="left" label-class-name="lc-required">
                <el-form-item prop="bbsTpCd">
                  <span v-if="isRead">{{ data.bbsTpNm }}</span>
                  <el-select v-if="!isRead" v-model="data.bbsTpCd" placeholder="선택">
                    <el-option v-for="opt in bbsTpCds" :key="opt.code" :label="opt.codeNm" :value="opt.code" />
                  </el-select>
                </el-form-item>
              </el-descriptions-item>
              <el-descriptions-item label="게시판 분류" label-align="right"
                                    align="left" label-class-name="lc-required">
                <el-form-item prop="o1">
                  <span v-if="isRead">{{ data.o1 }}</span>
                  <el-radio-group v-if="!isRead" v-model="data.o1">
                    <el-radio label="Y">사용</el-radio>
                    <el-radio label="N">미사용</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-descriptions-item>
              <el-descriptions-item label="분류설정" label-align="right"
                                    align="left" label-class-name="lc-required">
                <el-form-item prop="o2">
                  <span v-if="isRead">{{ data.o2 }}</span>
                  <el-input v-if="!isRead" v-model="data.o2" readonly>
                    <template #append>
                      <div hover-cursor-pointer select-none @click="showDialog">
                        분류지정
                      </div>
                    </template>
                  </el-input>
                </el-form-item>
              </el-descriptions-item>
              <el-descriptions-item label="게시글 작성유형" label-align="right"
                                    align="left" label-class-name="lc-required">
                <el-form-item prop="o3">
                  <span v-if="isRead">{{ data.o3 }}</span>
                  <el-select v-if="!isRead" v-model="data.o3" placeholder="선택">
                    <el-option label="회원전용" value="1" />
                    <el-option label="전체참여" value="2" />
                  </el-select>
                </el-form-item>
              </el-descriptions-item>
              <el-descriptions-item label="사용여부" label-align="right"
                                    align="left" label-class-name="lc-required">
                <el-form-item prop="useAt">
                  <span v-if="isRead">{{ data.useAt }}</span>
                  <el-radio-group v-if="!isRead" v-model="data.useAt">
                    <el-radio label="Y">사용</el-radio>
                    <el-radio label="N">미사용</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-descriptions-item>
            </el-descriptions>
          </template>
          <template #buttons="{ data }">
            <el-popconfirm v-if="mode === Detail.Save" :title="t('simp.form.save_msg')" @confirm="validation(() => handleSave(data))">
              <template #reference>
                <el-button>{{ t('simp.form.save') }}</el-button>
              </template>
            </el-popconfirm>
            <el-popconfirm v-if="mode === Detail.Update" :title="t('simp.form.save_msg')" @confirm="validation(() => handleUpdate(data))">
              <template #reference>
                <el-button>{{ t('simp.form.update') }}</el-button>
              </template>
            </el-popconfirm>
            <el-button v-if="mode === Detail.Read" @click="changeMode(Detail.Update)">{{ t('simp.form.update') }}</el-button>
            <el-button v-if="mode === Detail.Update" @click="changeMode(Detail.Read)">{{ t('simp.detail.cancel') }}</el-button>
            <el-button v-if="mode !== Detail.Update" @click="router.push(`/manage/tenant/bbs/${bbsUid}`)">{{ t('simp.detail.cancel') }}</el-button>
          </template>
        </SimpForm>
      </template>
    </el-card>
  </div>
</template>

