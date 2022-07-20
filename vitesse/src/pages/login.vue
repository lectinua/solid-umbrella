<script setup lang="ts">
import { useCookies } from '@vueuse/integrations/useCookies'
import { ElMessage } from 'element-plus'
import { obj2FormData } from '~/apis'

defineProps({
  width: {
    Type: [String, null],
    default: '400px'
  }
})

const userStore = useUserStore()
const router = useRouter()
const cookies = useCookies()
const { test } = userStore
const { t } = useI18n()

if (userStore.isLogin) {
  router.push("/")
}

const d = reactive({
  loading: false,
  message: '',
  isKeepId: false,
  form: {
    userId: '',
    password: ''
  }
})

const keepIdKey = 'keepId'

function success() {
  router.push('/')
  ElMessage({
    message: `Hi, ${userStore.user?.userId}`,
    type: 'success',
    showClose: true
  })
}

function submit() {
  d.loading = true
  const formData = obj2FormData(d.form)
  userStore.login(formData,
    isSuccess => {
      d.loading = false
      d.message = isSuccess ? '' : t('user.error')
      if (d.isKeepId) {
        cookies.set(keepIdKey, d.form.userId)
      } else {
        cookies.remove(keepIdKey)
      }
      if (isSuccess)
        success()
    })
}

function testLogin() {
  test().then(() => success())
}

function init() {
  d.form.userId = cookies.get(keepIdKey) || ''
  d.isKeepId = d.form.userId.length > 0
  d.loading = false
}

tryOnMounted(() => init())
</script>

<template>
  <div v-loading="d.loading" mt-20 flex justify-center>
    <el-card center w-lg>
      <span text-size-2xl>로그인</span>
      <el-form label-position="top" :model="d.form" @submit.prevent="submit">
        <el-form-item :label="t('user.id')">
          <el-input v-model="d.form.userId" />
        </el-form-item>
        <el-form-item :label="t('user.pwd')">
          <el-input v-model="d.form.password" type="password" />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="d.isKeepId" flex-1 :label="t('user.keep')" />
          <span color-rose-500 :class="d.loading ? 'op-0' : 'lc-trans-in op-100'">{{ d.message }}</span>
        </el-form-item>
        <el-form-item>
          <el-button flex-1 plain type="info" native-type="submit" size="large">{{ t('user.login') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button flex-1 plain type="info" native-type="button" @click="testLogin">{{ t('user.test') }}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.lc-trans-in {
  transition: opacity 0.5s ease-in-out
}
</style>
