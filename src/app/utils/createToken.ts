import jwt from 'jsonwebtoken';

const createToken = (email: string) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN as string,
  });
  return token;
};

export default createToken;
