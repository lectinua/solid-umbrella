<template>
  <div>
    <el-row>
      <el-col>
        <el-card>
          <el-descriptions :column="2" border>
            <el-descriptions-item
                label="서비스 > 테넌트"
                label-align="right"
                align="center"
                label-class-name="my-label"
                class-name="my-content">
              <el-input v-model="data.tenantNm" readonly/>
            </el-descriptions-item>
            <el-descriptions-item label="서비스여부" label-align="right" align="center">
              <el-input v-model="data.svcAt" readonly/>
            </el-descriptions-item>
            <el-descriptions-item label="수정자" label-align="right" align="center">
              <el-input v-model="data.updtUid" readonly/>
            </el-descriptions-item>
            <el-descriptions-item label="최종 수정일" label-align="right" align="center">
              <el-input v-model="data.updtDt" readonly/>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>
    <el-row mt-3>
      <el-col>
        <SimpSearch title="테넌트 사용자 목록" :data="options" :on-submit="submit" text-left>
          <el-descriptions :column="2" border>
            <el-descriptions-item
                label="권한"
                label-align="right"
                align="left"
                label-class-name="my-label"
                class-name="my-content"
                width="300px">
              <el-select v-model="options.authorCd" class="m-2" placeholder="전체">
                <el-option
                />
              </el-select>
            </el-descriptions-item>
            <el-descriptions-item label="사용여부" label-align="right" align="left">
              <el-radio-group v-model="options.useAt">
                <el-radio label="Y">사용</el-radio>
                <el-radio label="N">미사용 </el-radio>
              </el-radio-group>
            </el-descriptions-item>
            <el-descriptions-item
                label="검색조건"
                :span="2"
                label-align="right"
                align="center"
                >
              <div style="display: flex">
                <el-select  class="m-2" placeholder="전체">
                  <el-option
                  />
                </el-select>
                <el-input />
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </SimpSearch>
      </el-col>
    </el-row>
    <el-row mt-3>
      <el-col>
        <SimpList title="목록" ref="list" :list="list" :loading="loading" is-paging="true" :on-select="handleSelect"
                  :on-submit="handleSubmit" text-left>
          <template #default>
            <el-table-column type="selection" />
            <el-table-column prop="userId" label="아이디"/>
            <el-table-column prop="userNm" label="성명"/>
            <el-table-column prop="userTel" label="전화번호"/>
            <el-table-column prop="userEmail" label="이메일"/>
            <el-table-column prop="useAt" label="사용여부"/>
            <el-table-column prop="authorNm" label="권한"/>
          </template>
        </SimpList>
      </el-col>
      <div mt-5 flex justify-end w1000>
        <el-button @click="dialogVisible = true">추가</el-button>
      </div>
      <el-dialog
          v-model="dialogVisible"
          width="70%"
          :before-close="handleClose"
      >
        <span><TenantUserAdd /></span>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
import userApi from '~/apis/user'
import tenantUserApi from '~/apis/tenantUser'
import {parse} from '~/apis'

export default {
  name: "TenantUserInfo",
  props: {
    rowData: { type:Object }
  },
  mounted() {
    this.data = this.rowData
    this.submit({}, this.rowData.uid)
  },
  data() {
    return {
      options: {},
      list: [],
      data:{},
      dialogVisible: false,
    }
  },

  methods: {
    submit: function (options, tenantUid) {
      options = Object.assign(options, this.$refs.list.page)
      options.tenantUid = tenantUid
      tenantUserApi.page(options).then(res => {
        const data = parse(res).data
        this.list = data.list
        this.$refs.list.page = {
          total: data.page.total,
          nowPage: data.page.nowPage,
          cntPerPage: data.page.cntPerPage
        }
      })
    },
  },



}
</script>

<style scoped>

</style>