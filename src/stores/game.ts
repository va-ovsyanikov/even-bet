import { defineStore } from 'pinia'
import { gamesFetch, gameIdFetch } from '@/services'
import { notify } from '@kyvg/vue3-notification'
import type { IGameIdParams } from '@/interfaces'

export const useGameStore = defineStore('game', {
  state: () => ({
    gameList: [],
    gameLink: ''
  }),
  actions: {
    async gamesListFetch() {
      try {
        const response = await gamesFetch()
        this.gameList = response.data
        console.log(response)
      } catch (errors: any) {
        notify({
          type: 'error',
          title: 'No data available'
        })
      }
    },
    async gameOneFetch(params: IGameIdParams) {
      try {
        const response = await gameIdFetch(params)
        this.gameLink = response.data[0].attributes['launch-options']['game-url'] as string
      } catch (errors: any) {
        notify({
          type: 'error',
          title: 'No data available'
        })
      }
    }
  },
  getters: {
    getGameLink: (state) => state.gameLink
  }
})
