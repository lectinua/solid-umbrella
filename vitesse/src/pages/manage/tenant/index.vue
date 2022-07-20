<template>
  <div v-if="selectedItem == null">
    <el-row>
      <el-col :span="24">
        <SimpSearch title="테넌트 목록" :data="options" :on-submit="submit" align="left">
          <template #default="{data}">
            <el-descriptions :column="3" border>
              <el-descriptions-item :span="2" label="사용여부" label-align="right" align="left">
                <el-radio-group v-model="data.useAt">
                  <el-radio label="Y">사용 </el-radio>
                  <el-radio label="N">미사용 </el-radio>
                </el-radio-group>
              </el-descriptions-item>
              <el-descriptions-item label="조회조건" label-align="right" align="left">
                <el-input v-model="data.read" placeholder="Please input" class="input-with-select">
                  <template #prepend>
                    <el-select v-model="data.selected" placeholder="선택" style="width: 115px">
                      <el-option label="전체" value=""></el-option>
                      <el-option label="테넌트" value="tenantNm"/>
                      <el-option label="서비스키" value="clientKey" />
                    </el-select>
                  </template>
                </el-input>
              </el-descriptions-item>
              <el-descriptions-item :span="2" label="승인여부" label-align="right" align="left">
                <el-radio-group v-model="data.approveAt">
                  <el-radio label="Y">승인 </el-radio>
                  <el-radio label="N">미승인 </el-radio>
                </el-radio-group>
              </el-descriptions-item>
              <el-descriptions-item label="등록기간" label-align="right" align="left">
                <el-date-picker value-format="YYYY-MM-DD" v-model="data.startDt" type="date" placeholder="Pick a day" />&nbsp; ~ &nbsp;
                <el-date-picker value-format="YYYY-MM-DD" v-model="data.endDt" type="date" placeholder="Pick a day" />
              </el-descriptions-item>
              <el-descriptions-item :span="3" label="서비스 > 테넌트" label-align="right" align="left" >
                <el-select v-model="data.svcUid" class="m-2" placeholder="전체" @change="tenList(data)">
                  <el-option v-for="service in services" :key="service.uid" :label="service.svcNm" :value="service.uid" />
                </el-select>
                <el-select class="m-2" placeholder="전체"  v-model="data.uid">
                  <el-option value="">전체</el-option>
                  <el-option v-for="tenant in tenants" :key="tenant.uid" :label="tenant.tenantNm" :value="tenant.uid" />
                </el-select>
              </el-descriptions-item>
            </el-descriptions>
          </template>
        </SimpSearch>
      </el-col>
    </el-row>
    <el-row mt-3>
      <el-col :span="24">
        <SimpList title="목록" ref="list" :list="list"  is-paging :on-select="handleSelect"
                  :on-submit="handleSubmit">
          <template #default>
            <el-table-column type="index" label="번호"/>
            <el-table-column prop="clientKey" label="서비스 키">
              <template #default="scope">
                <div class="lc-center">
                  <span style="margin-left: 5px">{{ scope.row.clientKey }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="svcNm" label="서비스"/>
            <el-table-column prop="tenantNm" label="테넌트명"/>
            <el-table-column prop="svcAt" label="서비스여부"/>
            <el-table-column prop="approveAt" label="승인여부"/>
            <el-table-column prop="useAt" label="사용여부"/>
            <el-table-column prop="userCount" label="사용자수"/>
            <el-table-column prop="userNm" label="등록자"/>
          </template>
        </SimpList>
        <div style="margin-top: 10px; text-align: right">
          <router-link to="./tenant/save">
            <el-button>등록</el-button>
          </router-link>
        </div>
      </el-col>
    </el-row>
  </div>
  <div v-if="selectedItem != null">
    <TenantDetail :on-back="onBack" :row-data="selectedItem"/>
  </div>
</template>

<script>
import tenantApi from '~/apis/mng-tenant'
import serviceApi from '~/apis/service'
import {parse} from '~/apis'


export default {
  name: "index",
  setup() {
    const userStore = useUserStore()
    return {
      userStore
    }
  },
  mounted() {
    this.serviceList()
    this.submit({})
  },
  data() {
    return {
      showDialog: false,
      list: [],
      options: {},
      selectedItem: null,
      read: '',
      services: [],
      tenants: [],
      data: {}
    }
  },
  methods: {
    handleUploaded: function (files) {
      console.log('uploaded: ', files)
    },
    addInfo: function (data) {
      if (data.tenantInfo == null) {
        data.tenantInfo = {}
      }
      data.tenantInfo['new'] = ''
    },
    submit: function (options) {
      options = Object.assign(options, this.$refs.list.page)
      if(options.selected === 'tenantNm') {
        options.clientKey = ''
        options.tenantNm = options.read
      } else if(options.selected === 'clientKey') {
        options.tenantNm = ''
        options.clientKey = options.read
      }

      console.log("options", options)
      tenantApi.joinList(options).then(res => {
        const data = parse(res).data
        this.list = data.list
        this.$refs.list.page = {
          total: data.page.total,
          nowPage: data.page.nowPage,
          cntPerPage: data.page.cntPerPage
        }
      })
    },
    serviceList: function () {
      serviceApi.page()
      .then(res => {
        this.services = parse(res).data.list
      })
    },
    tenList: function (data) {
      data.uid = ''
      tenantApi.joinServiceSelectBoxlist({svcUid: data.svcUid})
          .then( res => {
            this.tenants = parse(res).data
          })
    },
    handleSelect: function (data) {
      console.log('selected', data)
      this.selectedItem = data
    },
    handleSubmit: function (data) {
      this.loading = true
      console.log('api request', data)
      this.submit(data)
      this.loading = false
    },
    onBack: function() {
      this.selectedItem = null
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

a {
  text-decoration-line: none;
}
</style>
