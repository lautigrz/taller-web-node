import jwt  from 'jsonwebtoken'

interface UserToken {
  email: string;
}

export const verifyToken = (token: string, type: string): UserToken => {
  try {
    const secret = process.env[type] || "";
    const decoded = jwt.verify(token, secret) as UserToken;

    if (!decoded.email) {
      throw new Error("Token inválido: no tiene email");
    }

    return decoded;
  } catch (error) {
    throw new Error("Token inválido o expirado");
  }
};