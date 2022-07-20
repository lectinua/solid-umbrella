<template>
  <el-row>
    <el-col :span="24" text-left>
      <el-card>
        테넌트 정보 조회
      </el-card>
    </el-col>
  </el-row>
  <el-card mt-3>
    <el-tabs
        type="card"
        class="demo-tabs"
        v-model="activeName"
        @tab-click="handleClick"
    >
      <el-tab-pane label="기본정보" name="first">
        <TenantBasicInfo :row-data="rowData" :on-back="onBack"/>
      </el-tab-pane>
      <el-tab-pane label="사용자조회" name="second">
        <TenantUserInfo :row-data="rowData"/>
      </el-tab-pane>
      <el-tab-pane label="기능조회" name="third">
        <TenantFuncInfo :row-data="rowData"/>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>

import api from '~/apis/mng-tenant'

export default {
  name: "ManageTenantDetail",
  setup() {
    const userStore = useUserStore()
    return {
      userStore
    }
  },
  props: {
    rowData: {type: Object},
    onBack: {type: Function}
  },
  data() {
    return {
      data: {},
      activeName: 'first',
      rows: [
        {
          key: '',
          value: ''
        }
      ],
      // data: this.$route.params.data
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

    }
  },

}
</script>

<style scoped>
.lc-center {
  display: flex;
  align-items: center;
}

.lc-input-group {
  width: 100%;
  display: flex;
}

.lc-input-group > .el-input {
  flex: 1
}
</style>
