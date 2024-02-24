export interface IRequest<T = any> {
  url: string
  method: string
  params?: T
}

