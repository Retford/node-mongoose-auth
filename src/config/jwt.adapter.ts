import jwt, { SignOptions } from 'jsonwebtoken';
import { envs } from './envs';

const JWT_SEED = envs.JWT_SEED;

export class JwtAdapter {
  static generateToken = async (
    payload: any,
    duration: string = '2h'
  ): Promise<string | null> => {
    return new Promise((resolve) => {
      jwt.sign(
        payload,
        JWT_SEED,
        { expiresIn: duration } as SignOptions,
        (err, token) => {
          if (err || !token) {
            return resolve(null);
          }

          resolve(token);
        }
      );
    });
  };

  static validateToken = <T extends object>(
    token: string
  ): Promise<T | null> => {
    return new Promise((resolve) => {
      jwt.verify(token, JWT_SEED, (err, decoded) => {
        if (err) return resolve(null);

        resolve(decoded as T);
      });
    });
  };
}
