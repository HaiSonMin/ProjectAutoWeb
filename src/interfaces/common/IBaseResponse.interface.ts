import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export interface IBaseResponse<T> {
  statusCode?: StatusCodes;
  reasonStatusCode?: ReasonPhrases;
  message: string;
  metadata: T;
}
