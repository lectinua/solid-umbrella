<template>
  <div>
    <el-row>
      <el-col>
        <el-card>테넌트 사용자 권한</el-card>
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
            <el-descriptions-item
                label="권한"
                label-align="right"
            >
              <el-checkbox></el-checkbox>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "TenantUserAuth",
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