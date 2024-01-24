import { IBaseModel } from '../common';

export abstract class IUser extends IBaseModel {
  user_fullName: string;
  user_phoneNumber: string;
  user_email: string;
  user_password: string;
  user_role: string;
  user_isBlocked: boolean;
  user_clone: any[]; // Ref to clone model
}
