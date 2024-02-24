import { defineStore } from 'pinia'
import router from '@/router'
import { authentication } from '@/services/auth.services'
import { notify } from '@kyvg/vue3-notification'
import { setLocalStorage, getLocalStorage } from '@/utils/functions.utils'
import type { IAuthParams, IJwtToken } from '@/interfaces'
import { ELocalStorages } from '@/enums'

export const useAuthStore = defineStore('auth', {
  actions: {
    async logIn(params: IAuthParams) {
      try {
        const response = await authentication(params)
        if (response) {
          // const token: IJwtToken = response.data[0].attributes.token
          setLocalStorage('token', response.data[0].attributes.token as IJwtToken)
          setLocalStorage(
            'refresh-token',
            response.data[0].attributes['refresh-token'] as IJwtToken
          )
          setLocalStorage('life-time', response.data[0].attributes['life-time'])
          // axios.defaults.headers.common['Authorization'] = token
          router.push({ name: 'home' })
          notify({
            type: 'success',
            title: 'You have been logged in!'
          })
        }
      } catch (errors: any) {
        console.log(errors)
        notify({
          type: 'error',
          title: 'Access is denied'
        })
      }
    },
    async refreshToken(token: IJwtToken) {
      +getLocalStorage(ELocalStorages.lifeTime) !== 0 &&
      +getLocalStorage(ELocalStorages.lifeTime) * 1000 < new Date().getTime() + 3600000

    }

    // const count = ref(0)
    // const doubleCount = computed(() => count.value * 2)
    // function increment() {
    //   count.value++
    // }
  }
})
