export interface BaseResponseUser<T> {
  msg?: string,
  user?: T,
  status?: string,
  errors?: any,
}
