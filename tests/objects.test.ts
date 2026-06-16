import { expect, test, describe } from 'vitest';
import { deepCopy, mergeObjects } from '@/objects';

describe('deepCopy', () => {
  test('should copy primitive types', () => {
    expect(deepCopy(null)).toBe(null);
    expect(deepCopy(undefined)).toBe(undefined);
    expect(deepCopy(42)).toBe(42);
    expect(deepCopy('hello')).toBe('hello');
    expect(deepCopy(true)).toBe(true);
  });

  test('should copy Date objects', () => {
    const originalDate = new Date('2024-01-15');
    const copiedDate = deepCopy(originalDate);
    
    expect(copiedDate).toEqual(originalDate);
    expect(copiedDate).not.toBe(originalDate);
    expect(copiedDate.getTime()).toBe(originalDate.getTime());
  });

  test('should copy arrays', () => {
    const originalArray = [1, 2, 3, 'four', true];
    const copiedArray = deepCopy(originalArray);
    
    expect(copiedArray).toEqual(originalArray);
    expect(copiedArray).not.toBe(originalArray);
    
    copiedArray[0] = 999;
    expect(originalArray[0]).toBe(1);
  });

  test('should deep copy nested arrays', () => {
    const originalArray = [[1, 2], [3, 4], [5, 6]];
    const copiedArray = deepCopy(originalArray);
    
    expect(copiedArray).toEqual(originalArray);
    expect(copiedArray).not.toBe(originalArray);
    expect(copiedArray[0]).not.toBe(originalArray[0]);
    
    copiedArray[0][0] = 999;
    expect(originalArray[0][0]).toBe(1);
  });

  test('should copy simple objects', () => {
    const originalObj = { a: 1, b: 'hello', c: true };
    const copiedObj = deepCopy(originalObj);
    
    expect(copiedObj).toEqual(originalObj);
    expect(copiedObj).not.toBe(originalObj);
    
    copiedObj.a = 999;
    expect(originalObj.a).toBe(1);
  });

  test('should deep copy nested objects', () => {
    const originalObj = {
      user: {
        name: 'John',
        address: {
          city: 'New York',
          zip: '10001'
        }
      },
      age: 30
    };
    const copiedObj = deepCopy(originalObj);
    
    expect(copiedObj).toEqual(originalObj);
    expect(copiedObj).not.toBe(originalObj);
    expect(copiedObj.user).not.toBe(originalObj.user);
    expect(copiedObj.user.address).not.toBe(originalObj.user.address);
    
    copiedObj.user.address.city = 'Los Angeles';
    expect(originalObj.user.address.city).toBe('New York');
  });

  test('should copy arrays with mixed types including objects and dates', () => {
    const date = new Date('2024-01-15');
    const originalArray: [
      number,
      { name: string; value: number },
      number[],
      Date,
      string
    ] = [
      1,
      { name: 'test', value: 100 },
      [1, 2, 3],
      date,
      'string'
    ];
    const copiedArray = deepCopy(originalArray);
    
    expect(copiedArray).toEqual(originalArray);
    expect(copiedArray[1]).not.toBe(originalArray[1]);
    expect(copiedArray[2]).not.toBe(originalArray[2]);
    expect(copiedArray[3]).not.toBe(originalArray[3]);
    
    copiedArray[1].name = 'modified';
    expect(originalArray[1].name).toBe('test');
  });

  test('should copy objects with array and Date properties', () => {
    const date = new Date('2024-01-15');
    const originalObj = {
      id: 1,
      dates: [date, new Date('2024-01-16')],
      metadata: { type: 'user', active: true }
    };
    const copiedObj = deepCopy(originalObj);
    
    expect(copiedObj).toEqual(originalObj);
    expect(copiedObj.dates).not.toBe(originalObj.dates);
    expect(copiedObj.dates[0]).not.toBe(originalObj.dates[0]);
    expect(copiedObj.metadata).not.toBe(originalObj.metadata);
  });
});

describe('mergeObjects', () => {
  test('should merge simple properties', () => {
    const target = { a: 1, b: 2, c: 3 };
    const source = { b: 20, d: 4 };
    const result = mergeObjects(target, source);
    
    expect(result).toEqual({ a: 1, b: 20, c: 3, d: 4 });
    expect(result).not.toBe(target);
  });

  test('should not modify original target object', () => {
    const target = { a: 1, b: 2 };
    const source = { b: 20 };
    const result = mergeObjects(target, source);
    
    expect(target).toEqual({ a: 1, b: 2 });
    expect(result).toEqual({ a: 1, b: 20 });
  });

  test('should merge nested objects', () => {
    const target = {
      user: { name: 'John', age: 30, role: 'admin' },
      active: true
    };
    const source = {
      user: { age: 31, email: 'john@example.com' }
    };
    const result = mergeObjects(target, source);
    
    expect(result.user.name).toBe('John');
    expect(result.user.age).toBe(31);
    expect(result.user.role).toBe('admin');
    expect(result.user.email).toBe('john@example.com');
    expect(result.active).toBe(true);
  });

  test('should merge deeply nested objects', () => {
    const target = {
      config: {
        database: {
          host: 'localhost',
          port: 3306,
          credentials: { user: 'admin' }
        },
        timeout: 5000
      }
    };
    const source = {
      config: {
        database: {
          port: 5432,
          credentials: { password: 'secret' }
        }
      }
    };
    const result = mergeObjects(target, source);
    
    expect(result.config.database.host).toBe('localhost');
    expect(result.config.database.port).toBe(5432);
    expect(result.config.timeout).toBe(5000);
    expect(result.config.database.credentials.user).toBe('admin');
    expect(result.config.database.credentials.password).toBe('secret');
  });

  test('should handle empty source object', () => {
    const target = { a: 1, b: 2 };
    const source = {};
    const result = mergeObjects(target, source);
    
    expect(result).toEqual(target);
    expect(result).not.toBe(target);
  });

  test('should handle partial updates', () => {
    const target = { a: 1, b: 2, c: 3, d: 4 };
    const source = { b: 20 };
    const result = mergeObjects(target, source);
    
    expect(result).toEqual({ a: 1, b: 20, c: 3, d: 4 });
  });

  test('should overwrite primitive values with null or undefined', () => {
    const target = { a: 1, b: 2 };
    const source = { a: null };
    const result = mergeObjects(target, source);
    
    expect(result.a).toBeNull();
    expect(result.b).toBe(2);
  });

  test('should preserve properties not in source', () => {
    const target = {
      id: 1,
      name: 'John',
      email: 'john@example.com',
      phone: '123-456-7890'
    };
    const source = { name: 'Jane', email: 'jane@example.com' };
    const result = mergeObjects(target, source);
    
    expect(result).toEqual({
      id: 1,
      name: 'Jane',
      email: 'jane@example.com',
      phone: '123-456-7890'
    });
  });

  test('should merge objects with array properties', () => {
    const target = {
      tags: ['a', 'b'],
      metadata: { count: 1 }
    };
    const source = {
      tags: ['c', 'd']
    };
    const result = mergeObjects(target, source);
    
    expect(result.tags).toEqual(['c', 'd']);
    expect(result.metadata).toEqual({ count: 1 });
  });
});
