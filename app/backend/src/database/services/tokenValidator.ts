import fs = require('fs');
import jwt = require('jsonwebtoken');
import { Message } from '../interfaces/message';

export default class ServiceTokenValidator {
  public static validatorToken = async (token: string): Promise<string | Message> => {
    const SECRET = fs.readFileSync('./jwt.evaluation.key', 'utf8');
    const response = jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        return { message: 'invalid token' };
      } return decoded;
    }) as unknown as jwt.JwtPayload;
    if (response.payload) {
      return response.payload.user.role;
    }
    return { message: 'invalid Token' };
  };
}
