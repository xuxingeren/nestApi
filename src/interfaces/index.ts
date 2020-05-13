import { Request } from 'express';
// import { Payload } from '../auth/interfaces/auth.interface';

export interface AddUserRequest extends Request {
  user: {};
}
