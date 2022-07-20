<script>
// import { obj2FormData } from '~/apis/index'
export default {
  name: "ManageTenant",
  props: {
    rowData: Object,
    onBack: Function
  },
  setup() {
    const userStore = useUserStore()
    return {
      userStore
    }
  },
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    // handleSave: function(data) {
    //     // apiCode.save(obj2FormData(data)).then(res=>{ parse(res)})
    //     console.log('data', data)
    // }
  }
}
</script>

<template>
  <div>
    <el-card align="left">
      사용자 정보 조회
    </el-card>
    <br>
    <el-tabs v-model="activeName" type="card" class="demo-tabs">
      <el-tab-pane label="기본정보" name="first">
        <UserBasicInfo :data="rowData" on-back="onBack" />
      </el-tab-pane>
      <el-tab-pane label="테넌트정보" name="second">
        <UserTenantInfo :data="rowData" />
      </el-tab-pane>
      <el-tab-pane label="권한정보" name="third">
        <UserAuthInfo />
      </el-tab-pane>
    </el-tabs>
    <div flex justify-end mt-5>
     <el-button @click="onBack">목록</el-button>
    </div>
  </div>
</template>
