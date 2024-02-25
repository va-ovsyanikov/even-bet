import { request } from './api.services'
import { EApiURL, EApiMethods } from '@/enums'
import type { IAuthParams, IRequest } from '@/interfaces'

export const authentication = (params: IAuthParams) =>
  request({
    url: EApiURL.authentication,
    method: EApiMethods.POST,
    params
  } as unknown as IRequest<IAuthParams>)