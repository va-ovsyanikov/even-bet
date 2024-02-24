//     if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
//       console.log('Unauthorized')
//       localStorage.removeItem('token')
//       router.push({name: 'register'})
//     } else {
//       console.log('Authorized')
//     }
//   });
// });

import axios from 'axios'
import type { IAuthParams, IRequest, IGameIdParams } from '@/interfaces'


// import { notify } from '@kyvg/vue3-notification'
// const baseURL = "https://dev.rxongo.com/api/"
// axios.defaults.baseURL = baseURL;
// axios.defaults.withCredentials = false;

// axios.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token')
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );
const baseURL = 'https://poker.evenbetpoker.com/api/web/v2'
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

// axios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response.status === 401) {
//       const newToken = await refreshToken();
//       localStorage.setItem('authToken', newToken);
//       Retry the original request
//       return axios(error.config)
//     }
//     return Promise.reject(error)
//   }
// )

export const request = async (data: IRequest<IAuthParams | IGameIdParams>): Promise<any> => {
  const response = await axios({
    method: data.method,
    url: data.url,
    data: data.params
  })
  return response.data
}
