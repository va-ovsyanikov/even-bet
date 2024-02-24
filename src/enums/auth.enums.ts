export enum EApiURL {
  authentication = 'login?clientId=default',
  games = 'casino/games?clientId=default',
  gameId= 'casino/games/$1/session-demo?clientId=default',
  user = 'users/me/balance?clientId=default&auth=$1',
}
export enum EApiMethods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}
export enum ELocalStorages{
  token = 'token',
  refreshToken = 'refresh-token',
  lifeTime =  'life-time'
}