<template>
  <div>
    <el-row>
      <el-col>
        <SimpSearch title="테넌트 사용자 등록" :data="options" :on-submit="submit">
          <el-descriptions :column="2" border>
            <el-descriptions-item
                label="검색"
                label-align="right"
                align="center"
                label-class-name="my-label"
                class-name="my-content"
               >
              <div flex>
                <el-select v-model="options" class="m-2" placeholder="전체">
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  />
                </el-select>
                <el-input/>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="사용여부" label-align="right" align="left">
              <el-radio v-model="options.useAt">사용</el-radio>
              <el-radio v-model="options.useAt">미사용</el-radio>
            </el-descriptions-item>
          </el-descriptions>
        </SimpSearch>
      </el-col>
    </el-row>
    <el-row mt-3>
      <el-col>
        <SimpList is-paging>
        </SimpList>
      </el-col>
    </el-row>

  </div>
</template>

<script>


export default {
  name: "TenantUserAdd",
  data() {
    return {
      options: {}
    }
  }
}
</script>

<style scoped>

</style>