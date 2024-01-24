export abstract class IToken {
  token_user: string;
  token_privateKey: string;
  token_publicKey: string;
  token_refreshTokenUsing: string;
  token_refreshTokenUsed: string[];
}
