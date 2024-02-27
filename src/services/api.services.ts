import axios from 'axios'
import router from '@/router'
import { useAuthStore } from '@/stores'
import type { IAuthParams, IRequest, IGameIdParams } from '@/interfaces'
import { ELocalStoragesName, EPageName } from '@/enums'
import { getLocalStorage, removeLocalStorage } from '@/utils/functions.utils'

const baseURL = 'https://poker.evenbetpoker.com/api/web'
axios.defaults.baseURL = baseURL
axios.defaults.withCredentials = false
axios.interceptors.response.use(undefined, (err) => {
  if (err.response.status === 401) {
    removeLocalStorage('token')
    removeLocalStorage('life-time')
    removeLocalStorage('refresh-token')
    router.push({ name: EPageName.auth })
  }
  return Promise.reject(err)
})

export const request = async (data: IRequest<IAuthParams | IGameIdParams>): Promise<any> => {
  const date: number = getLocalStorage(ELocalStoragesName.lifeTime)
  if (date !== null && date < new Date().getTime()) {
    const store = useAuthStore()
    const { checkToken } = store
    checkToken()
  }
  const response = await axios({
    method: data.method,
    url: data.url,
    data: data.params
  })
  return response.data
}
