import { describe, expect, test } from 'vitest';
import { difference, find, findLast, intersection, max, min, union } from '@/array';

describe('find', () => {
  test('should return the first matched element', () => {
    expect(find([1, 2, 3, 4], n => n > 2)).toBe(3);
  });

  test('should return undefined when no element matches', () => {
    expect(find([1, 2, 3], n => n > 10)).toBeUndefined();
  });

  test('should pass value, index and array to predicate', () => {
    const source = [10, 20, 30];
    const calls: Array<[number, number, number[]]> = [];

    const result = find(source, (value, index, array) => {
      calls.push([value, index, array]);
      return index === 1;
    });

    expect(result).toBe(20);
    expect(calls).toEqual([
      [10, 0, source],
      [20, 1, source],
    ]);
  });
});

describe('findLast', () => {
  test('should return the last matched element', () => {
    expect(findLast([1, 2, 3, 4], n => n % 2 === 0)).toBe(4);
  });

  test('should return undefined when no element matches', () => {
    expect(findLast([1, 2, 3], n => n < 0)).toBeUndefined();
  });

  test('should iterate from the end', () => {
    const source = [10, 20, 30];
    const visitedIndexes: number[] = [];

    const result = findLast(source, (_, index) => {
      visitedIndexes.push(index);
      return index === 1;
    });

    expect(result).toBe(20);
    expect(visitedIndexes).toEqual([2, 1]);
  });
});

describe('min', () => {
  test('should return undefined for empty array', () => {
    expect(min([], (a, b) => a - b)).toBeUndefined();
  });

  test('should return minimum number with compare function', () => {
    expect(min([3, 1, 5, 2], (a, b) => a - b)).toBe(1);
  });

  test('should support object arrays with custom comparator', () => {
    const source = [{ score: 10 }, { score: 4 }, { score: 7 }];

    expect(min(source, (a, b) => a.score - b.score)).toEqual({ score: 4 });
  });
});

describe('max', () => {
  test('should return undefined for empty array', () => {
    expect(max([], (a, b) => a - b)).toBeUndefined();
  });

  test('should return maximum number with compare function', () => {
    expect(max([3, 1, 5, 2], (a, b) => a - b)).toBe(5);
  });

  test('should support object arrays with custom comparator', () => {
    const source = [{ score: 10 }, { score: 4 }, { score: 7 }];

    expect(max(source, (a, b) => a.score - b.score)).toEqual({ score: 10 });
  });
});

describe('intersection', () => {
  test('should return intersection with strict equality by default', () => {
    expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
  });

  test('should preserve duplicates from the first array when matched', () => {
    expect(intersection([1, 2, 2, 3], [2, 4])).toEqual([2, 2]);
  });

  test('should use custom comparator for object arrays', () => {
    const a1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const a2 = [{ id: 2 }, { id: 4 }];

    expect(intersection(a1, a2, (a, b) => a.id === b.id)).toEqual([{ id: 2 }]);
  });
});

describe('union', () => {
  test('should return union with strict equality by default', () => {
    expect(union([1, 2, 2], [2, 3, 3])).toEqual([1, 2, 3]);
  });

  test('should keep first array order and append unique items from second array with custom comparator', () => {
    const a1 = [{ id: 1 }, { id: 2 }];
    const a2 = [{ id: 2 }, { id: 3 }, { id: 3 }];

    expect(union(a1, a2, (a, b) => a.id === b.id)).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
  });
});

describe('difference', () => {
  test('should return difference with strict equality by default', () => {
    expect(difference([1, 2, 3, 4], [2, 4, 6])).toEqual([1, 3]);
  });

  test('should preserve duplicates from the first array when not matched', () => {
    expect(difference([1, 1, 2, 3], [2])).toEqual([1, 1, 3]);
  });

  test('should use custom comparator for object arrays', () => {
    const a1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const a2 = [{ id: 2 }, { id: 4 }];

    expect(difference(a1, a2, (a, b) => a.id === b.id)).toEqual([{ id: 1 }, { id: 3 }]);
  });
});
