import { request } from './api.services'
import type { IAuthParams } from '@/interface/auth.interface'
import { EApiURL, EApiMethods } from '@/enums/enums.api'
import type { IRequest } from '@/interface/common.interface'
import { getDynamicUrl } from '@/utils/functions.utils'

export const gamesFetch = () =>
  request({ url: EApiURL.games, method: EApiMethods.GET } as unknown as IRequest<IAuthParams>)
export const gameIdFetch = (id: string) =>
  request({ url: getDynamicUrl(EApiURL.gameId, [id, '2', '3']), method: EApiMethods.GET } as unknown as IRequest<IAuthParams>)
