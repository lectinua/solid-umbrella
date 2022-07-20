<template>
  <div>
    <SimpList ref="list" title="" :list="list" margin-top :is-paging="true" :on-submit="submit" align="left">
      <template #default>
        <el-table-column type="index" prop="uid" />
        <el-table-column prop="" label="서비스" width="150" />
        <el-table-column prop="tenantNm" label="테넌트" width="150" />
        <el-table-column prop="tenantInfo" label="상세정보" />
        <el-table-column prop="useAt" label="사용여부" width="150" />
        <el-table-column prop="regDt" label="등록일시" width="150" />
      </template>
    </SimpList>
  </div>
</template>

<script>
import api from '~/apis/user'
import { parse } from '~/apis'
export default {
  name: "UserTenantInfo",
  data() {
    return {
      showDialog: false,
      list: [],
      options: {},
      data: {}
    }
  },
  mounted() {
    this.submit({})
  },
  methods: {
    submit: function (options) {
      options = Object.assign(options, this.$refs.list.page)
      console.log('submit called', options)
      api.tenantList(options).then(res => {
        const data = parse(res).data
        this.list = this.format(data.list)
        this.$refs.list.page = {
          total: data.page.total,
          nowPage: data.page.nowPage,
          cntPerPage: data.page.cntPerPage
        }
      })
    },
    format: function (list) {
      return list.map(x => {
        x.regDt = x.regDt.split(' ')[0]
        x.updtDt = x.updtDt.split(' ')[0]
        return x
      })
    },
  }
}
</script>
