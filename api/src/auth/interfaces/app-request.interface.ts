import { Request } from 'express'
import { User } from './user.interface'

export interface AppRequest extends Request {
  user: User
}
