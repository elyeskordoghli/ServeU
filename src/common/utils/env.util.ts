import { Env } from '../constants/env.enum';

export const isNotProduction = (): boolean => {
  return process.env.NODE_ENV !== Env.PRODUCTION;
};

export const isDev = (): boolean => {
  return isDevLocal() || process.env.NODE_ENV === Env.DEVELOPMENT;
};

export const isDevLocal = (): boolean => {
  return process.env.NODE_ENV === Env.LOCAL;
};
