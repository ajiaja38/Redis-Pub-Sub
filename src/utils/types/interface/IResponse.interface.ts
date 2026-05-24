export interface IResponseMessage {
  code: number
  status: boolean
  message: string
}

export interface IResponse<T> extends IResponseMessage {
  data: T
}
