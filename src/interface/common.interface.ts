export interface IRequest<T> {
  url: string
  method: string
  body?: T
}