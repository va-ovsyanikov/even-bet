import { defineStore } from 'pinia';
import router from '@/router';
import axios from 'axios';
import { authentication } from '@/services';
import { notify } from '@kyvg/vue3-notification';
import { setLocalStorage, getLocalStorage } from '@/utils/functions.utils';
import type { IAuthParams, IJwtToken, IRefreshTokenParams } from '@/interfaces';
import { ELocalStoragesName, EApiMethods, EApiURL, EPageName } from '@/enums';

export const useAuthStore = defineStore('auth', {
  actions: {
    async logIn(params: IAuthParams): Promise<void> {
      try {
        const response = await authentication(params);
        if (response) {
          setLocalStorage('token', response.data[0].attributes.token as IJwtToken);
          setLocalStorage('refresh-token', response.data[0].attributes['refresh-token'] as IJwtToken);
          setLocalStorage(
            'life-time',
            (new Date().getTime() + (response.data[0].attributes['life-time'] - 100) * 1000) as number,
          );
          router.push({ name: EPageName.main });
          notify({
            type: 'success',
            title: 'You have been logged in!',
          });
        }
      } catch (errors: any) {
        notify({
          type: 'error',
          title: 'Access is denied',
        });
      }
    },
    async checkToken(): Promise<void> {
      try {
        const refreshToken = getLocalStorage(ELocalStoragesName.refreshToken);
        if (refreshToken) {
          const params: IRefreshTokenParams = {
            clientId: 'default',
            refreshToken,
          };
          const response = await axios({
            method: EApiMethods.POST,
            url: EApiURL.refreshToken,
            data: params,
          });
          if (response.status) {
            setLocalStorage('token', response.data.token as IJwtToken);
            setLocalStorage('refresh-token', response.data['refresh-token'] as IJwtToken);
            setLocalStorage('life-time', (new Date().getTime() + (response.data['life-time'] - 100) * 1000) as number);
          }
        }
      } catch (error) {
        notify({
          type: 'error',
          title: 'Access is denied',
        });
      }
    },
  },
});
