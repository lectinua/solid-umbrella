import { acceptHMRUpdate, defineStore } from 'pinia'
import { isEmpty } from 'lodash-es'
import { parse } from '~/apis'
import apiUser from '~/apis/user'

interface User {
  userUid: number
  userId: string
  authorCd: string
  userNm: string
}
type LoginCallback = (error: boolean) => void

export const useUserStore = defineStore('user',
  () => {
    const user = ref<Partial<User> | null>(null)
    const isLogin = computed(() => !isEmpty(user.value))

    async function login(formData: FormData, callback: LoginCallback) {
      let isSuccess = false
      apiUser.login(formData).then((res) => {
        const data = parse(res)
        if (data.message === 'success') {
          user.value = data.data
          isSuccess = true
        }
      })
        .finally(() => callback(isSuccess))
    }

    async function logout() {
      return new Promise((resolve) => {
        resolve(true)
      }).then(() => user.value = null)
      // apiUser.logout().then(() => {
      //   user.value = null
      // })
    }

    async function updateUser(formData: FormData, callback: Function) {
      return apiUser.update(formData).then((res) => callback(parse(res)))
    }

    function test() {
      return new Promise((resolve) => {
        resolve(true)
      }).then(() =>
        user.value = {
          userId: 'test',
          authorCd: 'SYSTEM',
          userUid: 99,
          userNm: '테스트'
        })
    }

    return {
      user,
      isLogin,
      login,
      logout,
      updateUser,
      test
    }
  },
  {
    persist: true
  })

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
