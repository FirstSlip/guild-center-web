import type { ErrorCodes } from '@/ts/error/codes';
import type { MixedResponse } from '@/ts/request';

type FetchOptions = Parameters<typeof $fetch>['1'];

export const request = async <
  T,
  ECodes extends ErrorCodes = ErrorCodes
>(
  path: string,
  opts?: FetchOptions
) => {
  const runtimeConfig = useRuntimeConfig();
  const token = useCookie('token');
  console.log('token1', token.value);

  const options = opts || {};

  options.headers = options.headers || {};
  options.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token.value}`
  };

  return await $fetch<MixedResponse<T, ECodes>>(
    `${runtimeConfig.public.apiUrl}/${path}`,
    options
  );
  /* try {
    return new Promise((res) => {
      $fetch(`${runtimeConfig.public.apiUrl}/${path}`, options)
        .then((data) => res(data as MixedResponse<T, ECodes>))
        .catch(() => res(null));
    });
  } catch (err) {
    return null;
  } */
};
