import { defineStore } from 'pinia';
import { userFetch } from '@/services';
import { notify } from '@kyvg/vue3-notification';
import type { IStateUser, IMixedObject } from '@/interfaces';

export const useUserStore = defineStore('user', {
  state: (): IStateUser => ({
    user: {} as IMixedObject[],
  }),
  actions: {
    async userDataFetch(): Promise<void> {
      try {
        const response = await userFetch();
        this.user = response.data;
      } catch (errors: any) {
        notify({
          type: 'error',
          title: 'No data available',
        });
      }
    },
  },
});
