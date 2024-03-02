export interface IAuthParams {
  clientId: string;
  login: string;
  password: string;
}
export interface IJwtToken {
  token: string;
}
export interface IRefreshTokenParams {
  clientId: string;
  refreshToken: string;
}
