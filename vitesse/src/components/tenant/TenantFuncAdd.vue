<template>
  <div>
    <el-card>
      Function 검색
    </el-card>
    <el-card>
      <el-descriptions :column="2" border>
        <el-descriptions-item
            label="검색"
            label-align="right"
            align="center"
            label-class-name="my-label"
            class-name="my-content">
          <div style="display: flex">
            <el-select>
              <el-option>
              </el-option>
            </el-select>
            <el-input />
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="사용여부" label-align="right" align="center">
          <el-radio-group v-model="options" class="ml-4">
            <el-radio label="Y">전체</el-radio>
            <el-radio label="N">사용</el-radio>
            <el-radio label="F">미사용</el-radio>
          </el-radio-group>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-row mt-3>
      <el-col>
          <SimpList></SimpList>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: "TenantFuncAdd",
  data() {
    return {
      options: {}
    }
  },
}

</script>

<style scoped>

</style>