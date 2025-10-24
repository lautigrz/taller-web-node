// types/express.d.ts
import { UserToken } from '../models/UserToken';

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserToken; // o { email: string }
  }
}
