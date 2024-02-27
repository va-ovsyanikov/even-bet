export enum EPageName{
  main = 'main',
  auth = 'auth'
}
export enum EPagePath{
  main = '/',
  auth = '/auth',
  random = '/:pathMatch(.*)*'
}