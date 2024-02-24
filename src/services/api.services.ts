import axios from 'axios'
import { useAuthStore } from '@/stores'
import type { IAuthParams, IRequest, IGameIdParams } from '@/interfaces'
import { ELocalStoragesName } from '@/enums'
import { getLocalStorage } from '@/utils/functions.utils'

const baseURL = 'https://poker.evenbetpoker.com/api/web'
axios.defaults.baseURL = baseURL
axios.defaults.withCredentials = false
axios.interceptors.request.use(
  (config: any) => {
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = token
    // }
    return config
  },
  (error) => Promise.reject(error)
)

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const date: number = getLocalStorage(ELocalStoragesName.lifeTime)
    if (date !== 0 && date * 1000 < new Date().getTime() + date * 1000) {
      const store = useAuthStore()
      const { checkToken } = store
      checkToken()
    }
    return Promise.reject(error)
  }
)

export const request = async (data: IRequest<IAuthParams | IGameIdParams>): Promise<any> => {
  const response = await axios({
    method: data.method,
    url: data.url,
    data: data.params
  })
  return response.data
}
