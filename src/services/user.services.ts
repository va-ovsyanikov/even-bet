import { request } from '@/services/generic.services';
import { EApiURL, EApiMethods } from '@/enums';
import { getDynamicUrl } from '@/utils/functions.utils';
import { getLocalStorage } from '@/utils/functions.utils';
import type { IRequest } from '@/interfaces';

export const userFetch = () => {
  if (getLocalStorage('token')) {
    return request({
      url: getDynamicUrl(EApiURL.user, [getLocalStorage('token')]),
      method: EApiMethods.GET,
    } as unknown as IRequest);
  }
};
