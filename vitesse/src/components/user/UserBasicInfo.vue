<template>
  <div>
    <SimpForm :data="values" :on-update="handleUpdate" :rules="rules">
      <template #default="{ data }">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="아이디" label-align="right" align="center" label-class-name="my-label"
            class-name="my-content" width="50px">
            <el-form-item prop="userId">
              <el-input v-model="data.userId" />
            </el-form-item>
          </el-descriptions-item>
          <el-descriptions-item label="성명" label-align="right" align="center" label-class-name="my-label"
            class-name="my-content" width="150px">
            <el-input v-model="data.userNm" />
          </el-descriptions-item>
          <el-descriptions-item label="바말번호" label-align="right" align="center" label-class-name="my-label"
            class-name="my-content" width="150px">
            <el-input v-model="data.password" />
          </el-descriptions-item>
          <el-descriptions-item label="(확인)비밀번호" label-align="right" align="center" label-class-name="my-label"
            class-name="my-content" width="150px">
            <el-input v-model="data.passwordChk" />
          </el-descriptions-item>
          <el-descriptions-item label="연락처" label-align="right" align="center" label-class-name="my-label"
            class-name="my-content" width="150px">
            <el-input v-model="data.userTel" />
          </el-descriptions-item>
          <el-descriptions-item label="email" label-align="right" align="center" label-class-name="my-label"
            class-name="my-content" width="150px">
            <el-input v-model="data.userEmail" />
          </el-descriptions-item>
          <el-descriptions-item label="권한" label-align="right" align="left" label-class-name="my-label"
            class-name="my-content" width="150px">
            <el-select placeholder="선택" style="width: 115px">
                <el-option label="관리자" value="1" />
              </el-select>
          </el-descriptions-item>
          <el-descriptions-item label="사용여부" label-align="right" align="left">
            <el-radio-group v-model="data.useAt">
              <el-radio label="Y">사용 </el-radio>
              <el-radio label="N">미사용 </el-radio>
            </el-radio-group>
          </el-descriptions-item>
          <el-descriptions-item :span="2" label="승인여부" label-align="right" align="left">
            <el-radio-group v-model="data.approveAt">
              <el-radio label="Y">승인 </el-radio>
              <el-radio label="N">미승인 </el-radio>
            </el-radio-group>
          </el-descriptions-item>
          <el-descriptions-item label="최종접속일시"
            label-align="right"
            align="center"
            label-class-name="my-label"
            class-name="my-content"
            width="150px">
              {{ data.lastComnDt }}
          </el-descriptions-item>
          <el-descriptions-item label="둥록일시"
            label-align="right"
            align="left"
            label-class-name="my-label"
            class-name="my-content"
            width="150px">
              {{ data.regDt }}
          </el-descriptions-item>
        </el-descriptions>
      </template>
    </SimpForm>
    <br>
    <el-row>
      <el-col :span="24">
        <div class="grid-content ep-bg-purple-dark" />
      </el-col>
    </el-row>
    <el-card class="box-card" style="margin-top: 15px">
        <template #header>
          <div class="card-header" style="display: flex; justify-content: flex-end;">
            <span style="font-size: 14px; font-weight: bold;">유저 정보</span>
            <el-button style="margin-left: auto;" class="button" text @click="addRow">추가</el-button>
          </div>
        </template>
        <el-row :gutter="20" style="border-bottom: 1px solid #4C4D4F; padding-bottom: 7px;">
          <el-col :span="10" style="text-align: center">Key</el-col>
          <el-col :span="10" style="text-align: center">Value</el-col>
          <el-col :span="4" style="text-align: center">삭제</el-col>
        </el-row>
        <el-row v-for="row in rows" :key="row" :gutter="20" style="margin-top:10px;">
          <el-col :span="10">
            <el-input v-model="row.key" />
          </el-col>
          <el-col :span="10">
            <el-input v-model="row.value" />
          </el-col>
          <el-col :span="4">
            <div style="text-align: center">
              <el-button @click="deleteRow(row)">삭제</el-button>
            </div>
          </el-col>
        </el-row>
      </el-card>
  </div>
</template>

<script>
import { obj2FormData } from '~/apis'
import userApi from '~/apis/user'
export default {
  name: "UserBasicInfo",
  props: {
    data: Object,
    onBack: Function,
    rules: {
      userId: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
      ]
    }
  },
  data() {
    return {
      values: this.data
    }
  },
  methods: {
    list() {
      this.$router.push({
        path: '/manage/user'
      })
    },
    handleUpdate: function (data) {
      console.log('update:', data)
      data.updtUid = 99
      if (data.password !== data.passwordChk) {
        alert("비밀번호가 일치하지 않습니다.")
        return
      }
      userApi.update(obj2FormData(data)).then(res => {
        if (res.status === 200) {
          console.log('data', data)
          alert("수정이 완료되었습니다")
          window.location.href = "/manage/user"
        }
      })
    },
  }

}
</script>
