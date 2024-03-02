export interface IRequest<T = any> {
  url: string;
  method: string;
  params?: T;
}
export interface IMixedObject {
  [key: string]: any;
}
export interface IGenericObject<T> {
  [key: string]: T;
}
