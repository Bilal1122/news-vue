import { describe, test, expect } from 'vitest';
import { createUrl, stringToUUID, checkStringLength } from '@/utils/global';

describe('Global Utils', () => {

  describe('createUrl', () => {
    test('success url', () => {
      const url = createUrl('articles');
      expect(url).toBe(`${import.meta.env.VITE_APP_BASE_URL}/articles?country=us&apiKey=${import.meta.env.VITE_APP_API_KEY }`)
    });

    test('fail url', () => {
      const url = createUrl('articles', true);
      expect(url).toBe(`${import.meta.env.VITE_APP_BASE_URL}/articles?country=us&apiKey=`)
    });
  })

  test('stringToUUID', () => {
    const uuid = stringToUUID('example');
    expect(uuid).toBe('feb54431-301b-52bb-a6dd-e1e93e81bb9e')
    expect(typeof uuid).toBe('string');
  });

  test('checkStringLength', () => {
    const isStringLengthValid = checkStringLength('test', 3);
    expect(isStringLengthValid).toBe(true);
  });
});
