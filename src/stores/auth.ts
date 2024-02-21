import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'
import { authentication } from '@/services/auth.services'
import type { IAuthParams } from '@/interface/auth.interface'
import { notify } from '@kyvg/vue3-notification'


export const useAuthStore = defineStore('auth', {
  actions: {
    async logIn(params: IAuthParams) {
      try {
        const response = await authentication(params)
        if (response) {
          const token: string = response.data[0].attributes.token
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = token
          router.push({name:'home'})
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
    }

    // const count = ref(0)
    // const doubleCount = computed(() => count.value * 2)
    // function increment() {
    //   count.value++
    // }
  }
})
