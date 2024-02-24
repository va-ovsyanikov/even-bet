import { defineStore } from 'pinia'
import { userFetch } from '@/services'
import { notify } from '@kyvg/vue3-notification'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {}
  }),
  actions: {
    async userDataFetch() {
      try {
        const response = await userFetch()
        this.user = response.data
      } catch (errors: any) {
        notify({
          type: 'error',
          title: 'No data available'
        })
      }
    }
  }
  // getters: {
  //   getGames: (state) => state.games
  // }
})
