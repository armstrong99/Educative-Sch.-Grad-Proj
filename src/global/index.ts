export interface IResponse<T> {
  status: boolean;
  data?: T;
  message: string;
  statusCode: number;
}