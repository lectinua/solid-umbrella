<template>
  <div>
    <el-row>
      <el-col>
        <el-card>테넌트 사용자 정보</el-card>
        <el-card>
          <el-descriptions :column="2" border>
            <el-descriptions-item
                label="서비스"
                label-align="right"
                align="center"
                label-class-name="my-label"
                class-name="my-content"
                width="150px">
              <el-input/>
            </el-descriptions-item>
            <el-descriptions-item label="테넌트" label-align="right" align="left">
              <el-input/>
            </el-descriptions-item>
            <el-descriptions-item
                label="성명"
                label-align="right"
                align="center"
            >
              <el-input/>
            </el-descriptions-item>
            <el-descriptions-item
                label="아이디"
                label-align="right"
                align="center"
            >
              <el-input/>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>
    <el-card class="box-card" style="margin-top: 15px">
      <template #header>
        <div class="card-header" flex justify-end>
          <span style="font-size: 14px; font-weight: bold;">테넌트 정보</span>
          <el-button style="margin-left: auto;" class="button" text @click="addRow">추가</el-button>
        </div>
      </template>
      <el-row :gutter="20" style="border-bottom: 1px solid #4C4D4F; padding-bottom: 7px;">
        <el-col :span="10" style="text-align: center">Key</el-col>
        <el-col :span="10" style="text-align: center">Value</el-col>
        <el-col :span="4" style="text-align: center">삭제</el-col>
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
  </div>
</template>

<script>
export default {
  name: "TenantUserInfoPop",
  data() {
    return {
      rows: [
          {
          key: '',
          value: ''
        }
      ]
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
  }
}
</script>

<style scoped>

</style>