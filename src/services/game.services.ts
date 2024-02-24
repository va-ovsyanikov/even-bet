import { request } from './api.services'
import type { IAuthParams, IRequest, IGameIdParams } from '@/interfaces'
import { EApiURL, EApiMethods } from '@/enums'
import { getDynamicUrl } from '@/utils/functions.utils'

export const gamesFetch = () =>
  request({ url: EApiURL.games, method: EApiMethods.GET } as unknown as IRequest<IAuthParams>)
export const gameIdFetch = (params: IGameIdParams) =>
  request({
    url: getDynamicUrl(EApiURL.gameId, [params.gameId]),
    method: EApiMethods.POST,
    params
  } as unknown as IRequest<IGameIdParams>)
