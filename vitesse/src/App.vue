<script setup lang="ts">
const { t } = useI18n()
const router = useRouter()

// user
const userStore = useUserStore()
if (!userStore.isLogin) {
  router.push("/login")
}

function handleLogout() {
  userStore.logout()
  router.push("/login")
}
</script>

<template>
  <el-config-provider namespace="ep">
    <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
      <div min-h-2xl>
        <el-container>
          <el-header v-if="userStore.isLogin" class="lc-p0">
            <el-menu flex items-center class="lc-p" mode="horizontal" :ellipsis="false" :router="false" default-active="0">
              <h2 select-none>{{ t('title') }}</h2>
              <div flex-grow />
              <el-menu-item index="1" @click="handleLogout">{{ t('user.logout') }}</el-menu-item>
            </el-menu>
          </el-header>
          <el-container>
            <el-aside v-if="userStore.isLogin" width="200px">
              <SimpMenu />
            </el-aside>
            <el-main overflow-y-visible>
              <router-view />
            </el-main>
          </el-container>
        </el-container>
      </div>
      <Footer />
      <div class="mt-5 mx-auto text-center opacity-75 dark:opacity-50 text-sm">
        Copyright ⓒ 2022 테스트 Inc. / All Rights Resreved
      </div>
    </main>
  </el-config-provider>
</template>

<style>
.lc-p { padding: var(--ep-header-padding) }
.lc-p0 { padding: 0 !important }
.lc-menu-bg { background-color: var(--ep-color-primary-light-7) }
.lc-menu-active { background-color: var(--ep-color-primary-light-3) }
</style>
