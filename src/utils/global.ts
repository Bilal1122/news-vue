import { v5 as uuidv5, NIL } from 'uuid';

const API_KEY = 'e22d3457538149a5814a0ceaca7a4a86';

export const createUrl = (url: string, failCall?: boolean) => {
  const BASE_URL = 'https://newsapi.org/v2';
  return `${BASE_URL}/${url}?country=us&apiKey=${failCall ? '' : API_KEY}`;
};

export const stringToUUID = (val: string) => {
  return uuidv5(val, NIL);
};

export const checkStringLength = (str: string, maxLength: number) => {
  return str?.length >= maxLength;
};
