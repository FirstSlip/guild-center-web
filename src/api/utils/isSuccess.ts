import type { SuccessResponse } from '@/ts/request';

export function isSuccess<T>(
  value: unknown
): value is SuccessResponse<T> {
  return (
    value instanceof Object &&
    'success' in value &&
    'data' in value
  );
}
