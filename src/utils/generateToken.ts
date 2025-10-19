
import jwt  from 'jsonwebtoken'
export const generateAccessToken = (email: string) => {
  return jwt.sign({ email }, process.env.TOKEN_SECRET!, { expiresIn: "1m" });
};

export const generateRefreshToken = (email: string) => {
  return jwt.sign({ email }, process.env.REFRESH_SECRET!, { expiresIn: "7d" });
};
