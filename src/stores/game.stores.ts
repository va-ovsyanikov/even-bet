import { defineStore } from 'pinia'
import { gamesFetch, gameIdFetch } from '@/services'
import { notify } from '@kyvg/vue3-notification'
import type { IGameIdParams, IGameState, IMixedObject } from '@/interfaces'

export const useGameStore = defineStore('game', {
  state: (): IGameState => ({
    gameList: [] as IMixedObject[],
    gameLink: ''
  }),
  actions: {
    async gamesListFetch(): Promise<void> {
      try {
        const response = await gamesFetch()
        this.gameList = response.data
      } catch (errors: any) {
        notify({
          type: 'error',
          title: 'No data available'
        })
      }
    },
    async gameOneFetch(params: IGameIdParams): Promise<void> {
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
  }
})
