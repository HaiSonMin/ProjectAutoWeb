export interface ISessionConfirm<T> {
  otp?: string;
  data: T;
  type?: string;
  isConfirm?: boolean;
  duration?: number;
}
