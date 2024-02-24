export enum EApiURL {
  authentication = 'v2/login?clientId=default',
  games = 'v2/casino/games?clientId=default',
  gameId = 'v2/casino/games/$1/session-demo?clientId=default',
  user = 'v2/users/me/balance?clientId=default&auth=$1',
  refreshToken = 'auth/token?clientId=default'
}
export enum EApiMethods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete'
}
