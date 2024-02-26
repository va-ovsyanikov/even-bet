import { type IMixedObject } from '@/interfaces'

export interface IGameState {
  gameList: IMixedObject[]
  gameLink: string
}
export interface IGameIdParams {
  clientId: string
  gameId: string
}
