export interface IRequest<T> {
  url: string
  method: string
  params?: T
}

