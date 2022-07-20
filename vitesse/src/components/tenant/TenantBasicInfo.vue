<template>
  <SimpForm :data="data">
    <template #default="{ data }">
      <el-row :gutter="10">
        <el-col :span="24">
          <el-card>
            <el-descriptions :column="2" border mt-3>
              <el-descriptions-item
                  :span="2"
                  label="서비스여부"
                  label-align="right"
                  align="left"
                  label-class-name="my-label"
                  class-name="my-content"
                  width="150px">
                {{data.svcAt}}
              </el-descriptions-item>
              <el-descriptions-item v-if="data.svcAt == 'N'"
                                    :span="2"
                                    label="서비스"
                                    label-align="right"
                                    align="left"
                                    >
                {{data.svcNm}}
              </el-descriptions-item>

              <el-descriptions-item label="서비스키" label-align="right" align="center">
                <div style="display: flex">
                  {{data.clientKey}}
                </div>
              </el-descriptions-item>
              <el-descriptions-item label="테넌트명" label-align="right" align="center">
                  <el-input v-model="data.tenantNm"/>
              </el-descriptions-item>
              <el-descriptions-item label="승인여부" label-align="right" align="left">
                  <el-radio-group v-model="data.approveAt" class="ml-4">
                    <el-radio label="Y">대기</el-radio>
                    <el-radio label="N">승인</el-radio>
                    <el-radio label="F">미승인</el-radio>
                  </el-radio-group>
              </el-descriptions-item>
              <el-descriptions-item label="사용여부" label-align="right" align="left">
                <el-radio-group v-model="data.useAt" class="ml-4">
                  <el-radio label="Y">사용</el-radio>
                  <el-radio label="N">미사용</el-radio>
                </el-radio-group>
              </el-descriptions-item>
              <div>
                <el-descriptions-item label="등록자" label-align="right" align="left">
                  <span>{{data.userNm}}</span>
                </el-descriptions-item>
                <el-descriptions-item label="등록일시" label-align="right" align="left">
                  <span>{{ data?.regDt }}</span>
                </el-descriptions-item>
                <el-descriptions-item label="수정자" label-align="right" align="left">
                  <span>김용석</span>
                </el-descriptions-item>
                <el-descriptions-item label="최종수정일" label-align="right" align="left">
                  <span>{{ data?.updtDt }}</span>
                </el-descriptions-item>
              </div>
            </el-descriptions>
          </el-card>
        </el-col>
      </el-row>
      <el-card class="box-card" mt-3>
        <template #header>
          <div class="card-header" style="display: flex; justify-content: flex-end;">
            <span style="font-size: 14px; font-weight: bold;">테넌트 정보</span>
            <el-button style="margin-left: auto;" class="button" text @click="addRow">추가</el-button>
          </div>
        </template>
        <el-row :gutter="20" style="border-bottom: 1px solid #4C4D4F; padding-bottom: 7px;">
          <el-col :span="10" text-center>Key</el-col>
          <el-col :span="10" text-center>Value</el-col>
          <el-col :span="4" text-center>삭제</el-col>
        </el-row>
        <el-row :gutter="20" mt-3 v-for="row in rows" :key="row">
          <el-col :span="10">
            <el-input v-model="row.key"/>
          </el-col>
          <el-col :span="10">
            <el-input v-model="row.value"/>
          </el-col>
          <el-col :span="4">
            <div text-center>
              <el-button @click="deleteRow(row)">삭제</el-button>
            </div>
          </el-col>
        </el-row>
      </el-card>
      <div mt-3 flex justify-end>
        <el-button>저장</el-button>
        <el-button @click="onBack">목록</el-button>
      </div>
    </template>
  </SimpForm>
</template>

<script>

export default {
  name: "TenantBasicInfo",
  props:{
    rowData: {type: Object},
    onBack: {type: Function}
  },
  data() {
    return {
      rows: [
        {
          key: '',
          value: ''
        }
      ],
      data: {}
    }
  },
  methods: {
    addRow: function () {
      console.log("child: " + this.data)
      this.rows.push({
        key: '',
        value: ''
      })
    },
    deleteRow: function (row) {
      this.rows.splice(row, 1)
    },
    handleClick: function (data, Event) {
      // if(data.props.name === 'second'){
      //   this.$router.push({
      //     name: 'tenant-userInfo',
      //   })
      //     console.log("======second=======")
      // }

      console.log("Event: ", Event)

    },
  },
  mounted() {
    this.data = this.rowData
  }
}
</script>

<style scoped>

</style>