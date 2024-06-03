import { ErrorCodes } from '@/ts/error/codes';

export type ErrorResponse<
  ErrorCodes extends
    import('@/ts/error/codes').ErrorCodes = import('@/ts/error/codes').ErrorCodes
> = {
  error: boolean;
  message: string;
  errorCode: ErrorCodes;
};

export type SuccessResponse<T = null> = {
  success: boolean;
  data: T;
};

export type MixedResponse<
  SuccessState = null,
  ECodes extends ErrorCodes = ErrorCodes
> = SuccessResponse<SuccessState> | ErrorResponse<ECodes>;
