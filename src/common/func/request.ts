import type { UseFetchOptions } from 'nuxt/app';

export const request = <T>(
  path: string,
  opts?: UseFetchOptions<any>
) => {
  const runtimeConfig = useRuntimeConfig();
  const token = useCookie('token', {
    maxAge: 60 * 60 * 24 * 30
  });

  return useFetch<T>(`${runtimeConfig.public.apiUrl}/${path}`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
};
