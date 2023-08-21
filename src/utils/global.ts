import { v5 as uuidv5, NIL } from 'uuid';

const API_KEY = import.meta.env.VITE_APP_API_KEY || "e22d3457538149a5814a0ceaca7a4a86"

export const createUrl = (url: string, failCall?: boolean): string => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL || 'https://newsapi.org/v2';
  return `${BASE_URL}/${url}?country=us&apiKey=${failCall ? '' : API_KEY}`;
};

export const stringToUUID = (val: string): string => {
  console.log('stringToUUID', uuidv5('example', NIL))
  return uuidv5(val, NIL);
};

export const checkStringLength = (str: string, maxLength: number): boolean => {
  return str?.length >= maxLength;
};
