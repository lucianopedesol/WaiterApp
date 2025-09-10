import { Request } from 'express';

export interface User {
  id: number;
  email: string;
}

// Estendendo o tipo Request do Express para incluir o campo 'user'
export interface AuthRequest extends Request {
  user?: User;
}
