import { request } from './api.services'
import type { IAuthParams } from '@/interface/auth.interface'
import { EApiURL, EApiMethods } from '@/enums/enums.api'
import type { IRequest } from '@/interface/common.interface'

export const authentication = (params: IAuthParams) =>
  request({ url: EApiURL.authentication, method: EApiMethods.POST, params } as unknown as IRequest<IAuthParams>)
