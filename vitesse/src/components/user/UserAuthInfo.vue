<template>
  <div>
    <SimpList ref="list" title="" :list="list" margin-top :is-paging="true" :on-submit="submit" :on-select-change="handleSelect" align="left">
      <template #default>
        <el-table-column type="selection" prop="uid" />
        <el-table-column prop="" label="메뉴명" width="150" />
        <el-table-column type="selection" prop="c" label="읽기" />
        <el-table-column type="selection" prop="r" label="저장" />
        <el-table-column type="selection" prop="u" label="수정" />
        <el-table-column type="selection" prop="d" label="삭제" />
        <el-table-column prop="" label="메뉴 URL" />
      </template>
    </SimpList>
  </div>
</template>

<script>
import api from '~/apis/user'
import { parse } from '~/apis'
export default {
  name: "UserAuthInfo",
  data() {
    return {
      showDialog: false,
      list: [],
      options: {},
      data: {},
      selections: [],
    }
  },
  mounted() {
    this.submit({})
  },
  methods: {
    handleSelect: function (array) {
      this.selections = array
    },
    submit: function (options) {
      options = Object.assign(options, this.$refs.list.page)
      console.log('submit called', options)
      api.page(options).then(res => {
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
