<script setup lang="ts">
import type { MenuTree } from '~/store/menu'

const addDialogVisible = ref(false)
const copyDialogVisible = ref(false)
const menus = ref<Array<MenuTree>>([])

useMenuStore().load(true).then((_menus: Array<MenuTree>) => {
  menus.value = menus.value.concat(_menus)
})

const data = ref({})
function handleClick(value: MenuTree) {
  data.value = value.data
}
</script>

<template>
  <el-row :gutter="10">
    <el-col :span="12">
      <el-card class="box-card">
        <template #header>
          <div flex>
            <span flex-1>메뉴 목록</span>
            <el-select placeholder="권한" />
          </div>
        </template>
        <div class="text item">
          <SimpTree title="메뉴목록" root="메뉴" :data="menus" :on-click="handleClick" />
        </div>

        <div class="lc-right">
          <el-button @click="addDialogVisible = true">추가</el-button>
          <el-button @click="copyDialogVisible = true">복사</el-button>
        </div>

        <!-- 프로그램 검색 dialog -->
          <el-dialog v-model="addDialogVisible"
            title="프로그램 검색"
            width="80%"
            :before-close="handleClose"
          >
            <SimpSearch title="" :data="options" :on-submit="submit">
              <el-descriptions :column="2" border>
                <el-descriptions-item label="검색" label-align="right" align="center">
                  <el-input>
                    <template #prepend>
                      <el-select class="m-2" placeholder="전체">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                      </el-select>
                    </template>
                  </el-input>
                </el-descriptions-item>
                <el-descriptions-item label="사용여부" label-align="right" align="left">
                  <el-radio-group v-model="radio">
                    <el-radio>전체</el-radio>
                    <el-radio>사용</el-radio>
                    <el-radio>미사용</el-radio>
                  </el-radio-group>
                </el-descriptions-item>
              </el-descriptions>
            </SimpSearch>

            <SimpList :list="list"
                :on-select="select" :loading="loading">
              <el-table-column label="선택" align="center" />
              <el-table-column prop="progrm_nm" label="프로그램명" align="center" />
              <el-table-column prop="url" label="프로그램 URL" header-align="center" />
            </SimpList>
            <div class="lc-right">
              <el-button>선택</el-button>
            </div>
            <!-- <el-table :data="child">
              <el-table-column label="복사 대상 권한" />
              <el-table-column label="권한" />
            </el-table> -->
          </el-dialog>
        <!-- //프로그램 검색 dialog -->

        <!-- 메뉴 복사 dialog -->
          <el-dialog v-model="copyDialogVisible"
            title="메뉴복사"
            width="50%"
            :before-close="handleClose"
          >
            <el-table :data="child">
              <el-table-column label="복사 대상 권한" />
              <el-table-column label="권한" />
            </el-table>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="copyDialogVisible = false">메뉴 복사</el-button>
              </span>
            </template>
          </el-dialog>
        <!-- //메뉴 복사 dialog -->
      </el-card>
    </el-col>

    <el-col :span="12">
      <el-card class="margin-top">
      <SimpForm :data="data" :on-save="handleSave" :on-update="handleUpdate" :on-remove="handleRemove">
            <template #default="{ data }">
              <el-descriptions :column="2" border>
                <el-descriptions-item label-align="right">
                  <template #label>
                    <div class="required">
                      메뉴명
                    </div>
                   </template>
                  <el-input v-model="data.menuNm" />
                </el-descriptions-item>
                <el-descriptions-item label="메뉴코드" label-align="right" align="center">
                  <el-input v-model="data.menuNo" />
                </el-descriptions-item>
                <el-descriptions-item label="메뉴경로" label-align="right" align="center">
                  <el-input v-model="data.menuPath" />
                </el-descriptions-item>
                <el-descriptions-item label-align="right" align="center">
                  <template #label>
                    <div class="required">
                      정렬순서
                    </div>
                   </template>
                  <el-input v-model="data.sortNo" />
                </el-descriptions-item>
                <el-descriptions-item label-align="right" align="center" span="2">
                    <template #label>
                      <div class="required">
                        프로그램 정보
                      </div>
                   </template>
                  <el-input v-model="data.programPath">
                    <template #append>
                      <el-button>검색</el-button>
                    </template>
                  </el-input>
                </el-descriptions-item>
                <el-descriptions-item label-align="right">
                  <template #label>
                    <div class="required">
                      사용여부
                    </div>
                  </template>
                  <el-radio-group v-model="radio">
                    <el-radio :label="3">사용</el-radio>
                    <el-radio :label="6">미사용</el-radio>
                  </el-radio-group>
                </el-descriptions-item>
                <el-descriptions-item label-align="right" align="center">
                  <template #label>
                    <div class="required">
                      메뉴 아이콘
                    </div>
                  </template>
                  <el-input v-model="data.menuIcon" />
                </el-descriptions-item>
                <el-descriptions-item label="메뉴설명" label-align="right" align="center" span="2">
                  <el-input v-model="data.menuDc" />
                </el-descriptions-item>
                <el-descriptions-item label="등록자" label-align="right" align="center">
                  {{ data.regUid }}
                </el-descriptions-item>
                <el-descriptions-item label="등록일시" label-align="right" align="center">
                  {{ data.regDt }}
                </el-descriptions-item>
                <el-descriptions-item label="수정자" label-align="right" align="center">
                  {{ data.updtUid }}
                </el-descriptions-item>
                <el-descriptions-item label="최종수정일" label-align="right" align="center">
                  {{ data.updtDt }}
                </el-descriptions-item>
              </el-descriptions>
        </template>
        </SimpForm>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>
.lc-right {
  display: flex;
  justify-content: right;
  margin-top: 10px
}
</style>
