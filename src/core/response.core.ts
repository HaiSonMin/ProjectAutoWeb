import { Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

class ResponseBasic<T> {
  statusCode?: StatusCodes;
  reasonStatusCode?: ReasonPhrases;
  message: string;
  metadata: T;

  constructor({ message, metadata }: { message: string; metadata: T }) {
    this.message = message;
    this.metadata = metadata;
  }

  public send(res: Response) {
    return res.status(this.statusCode).json(this);
  }
}

export class ResponseCreate<T> extends ResponseBasic<T> {
  constructor({ message, metadata }: { message: string; metadata: T }) {
    super({ message, metadata });
    this.statusCode = StatusCodes.CREATED;
    this.reasonStatusCode = ReasonPhrases.CREATED;
  }
}

export class ResponseOk<T> extends ResponseBasic<T> {
  constructor({ message, metadata }: { message: string; metadata: T }) {
    super({ message, metadata });
    this.statusCode = StatusCodes.CREATED;
    this.reasonStatusCode = ReasonPhrases.CREATED;
  }
}
