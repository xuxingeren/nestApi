import { Request } from 'express';

export interface AddUserRequest extends Request {
  user: any;
}
