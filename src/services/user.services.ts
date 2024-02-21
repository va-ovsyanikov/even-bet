import { request } from './api.services'
import type { IAuthParams } from '@/interface/auth.interface'
import { EApiURL, EApiMethods } from '@/enums/enums.api'
import type { IRequest } from '@/interface/common.interface'

export const userFetch = () =>
  request({ url: EApiURL.games, method: EApiMethods.GET } as unknown as IRequest<IAuthParams>)
