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
              <el-input v-model="data.approveAt" readonly/>
            </el-descriptions-item>
            <el-descriptions-item label="서비스여부" label-align="right" align="center">
              <el-input v-model="data.tenantNm" readonly/>
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
        <SimpList title="목록" ref="list" :list="list" :loading="loading" is-paging="true" :on-select="handleSelect"
                  :on-submit="handleSubmit">
          <template #default>
          </template>
        </SimpList>
      </el-col>
      <div mt-3 flex justify-end w1000>
        <el-button @click="dialogVisible = true">추가</el-button>
      </div>
      <el-dialog
          v-model="dialogVisible"
          width="70%"
          :before-close="handleClose"
      >
        <span><TenantFuncAdd /></span>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
import userApi from '~/apis/user'
import {parse} from '~/apis'

export default {
  name: "TenantFuncInfo",
  data() {
    return {
      options: {},
      list: [],
      data: {},
      dialogVisible: false
    }
  },
  props: {
    rowData: {type: Object}
  },
  methods: {
    listPage: function () {
      userApi.page().then(res => this.list = parse(res).data.list)
    },
  },
  mounted() {
    this.listPage()
    this.data = this.rowData
  },
}
</script>

<style scoped>

</style>