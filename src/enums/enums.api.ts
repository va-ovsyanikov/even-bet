export enum EApiURL {
  authentication = 'login?clientId=default',
  games = 'casino/games?clientId=default',
  gameId= 'casino/games/$2/session-demo?clientId=default',
  user = 'users/me/balance?clientId=default',
}
export enum EApiMethods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}