import { defineStore } from 'pinia'
import router from '@/router'
import { authentication, refreshToken } from '@/services'
import { notify } from '@kyvg/vue3-notification'
import { setLocalStorage, getLocalStorage } from '@/utils/functions.utils'
import type { IAuthParams, IJwtToken, IRefreshTokenParams } from '@/interfaces'
import { ELocalStoragesName } from '@/enums'
import { useUserStore } from '@/stores'

export const useAuthStore = defineStore('auth', {
  actions: {
    async logIn(params: IAuthParams) {
      try {
        const response = await authentication(params)
        if (response) {
          setLocalStorage('token', response.data[0].attributes.token as IJwtToken)
          setLocalStorage(
            'refresh-token',
            response.data[0].attributes['refresh-token'] as IJwtToken
          )
          setLocalStorage('life-time', (response.data[0].attributes['life-time'] - 100) as number)
          // axios.defaults.headers.common['Authorization'] = token
          router.push({ name: 'home' })
          notify({
            type: 'success',
            title: 'You have been logged in!'
          })
        }
      } catch (errors: any) {
        notify({
          type: 'error',
          title: 'Access is denied'
        })
      }
    },
    async checkToken() {
      try {
        const refreshToken = getLocalStorage(ELocalStoragesName.refreshToken)
        const params: IRefreshTokenParams = {
          clientId: 'default',
          refreshToken: refreshToken
        }
        const response = await refreshToken(params)
        if (response) {
          setLocalStorage('token', response.data[0].attributes.token as IJwtToken)
          setLocalStorage(
            'refresh-token',
            response.data[0].attributes['refresh-token'] as IJwtToken
          )
          setLocalStorage('life-time', (response.data[0].attributes['life-time'] - 100) as number)
          const store = useUserStore()
          const { userDataFetch } = store
          // await userDataFetch()
        }
      } catch (error) {
        notify({
          type: 'error',
          title: 'Access is denied'
        })
      }

      // }
    }

    // const count = ref(0)
    // const doubleCount = computed(() => count.value * 2)
    // function increment() {
    //   count.value++
    // }
  }
})
