import { defineStore } from 'pinia'
import { gamesFetch, gameIdFetch } from '@/services/game.services'
import { notify } from '@kyvg/vue3-notification'

export const useGameStore = defineStore('game', {
  state: () => ({
    games: [],
    gameId: {}
  }),
  actions: {
    async gamesListFetch() {
      try {
        const response = await gamesFetch()
        this.games = response.data
        console.log(response)
      } catch (errors: any) {
        notify({
          type: 'error',
          title: 'No data available'
        })
      }
    },
    async gameOneFetch() {
      try {
        const response = await gameIdFetch('2')
        console.log(response)
      } catch (errors: any) {
        notify({
          type: 'error',
          title: 'No data available'
        })
      }
    }
  },
  // getters: {
  //   getGames: (state) => state.games
  // }
})
