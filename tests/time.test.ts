import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { formatTime, getTimeAgo } from '@/time';

describe('getTimeAgo', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-10T12:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('should return empty string for non-positive timestamp', () => {
    expect(getTimeAgo(0)).toBe('');
    expect(getTimeAgo(-1)).toBe('');
  });

  test('should return empty string for invalid timestamp', () => {
    expect(getTimeAgo('abc')).toBe('');
    expect(getTimeAgo(Number.NaN)).toBe('');
  });

  test('should format seconds only', () => {
    const nowSeconds = Math.floor(Date.now() / 1000);
    expect(getTimeAgo(nowSeconds - 8)).toBe('8秒');
  });

  test('should format minutes and seconds', () => {
    const nowSeconds = Math.floor(Date.now() / 1000);
    expect(getTimeAgo(nowSeconds - 125)).toBe('2分5秒');
  });

  test('should format hours, minutes and seconds', () => {
    const nowSeconds = Math.floor(Date.now() / 1000);
    expect(getTimeAgo(nowSeconds - (3 * 3600 + 4 * 60 + 5))).toBe('3小时 4分5秒');
  });

  test('should treat future timestamp as zero seconds', () => {
    const nowSeconds = Math.floor(Date.now() / 1000);
    expect(getTimeAgo(nowSeconds + 10)).toBe('0秒');
  });

  test('should support numeric string timestamp', () => {
    const nowSeconds = Math.floor(Date.now() / 1000);
    expect(getTimeAgo(String(nowSeconds - 61))).toBe('1分1秒');
  });
});

describe('formatTime', () => {
  test('should format numeric timestamp', () => {
    const date = new Date(2026, 0, 2, 3, 4, 5);
    const timestampInMs = date.getTime();

    expect(formatTime(timestampInMs)).toBe('2026/01/02 03:04:05');
  });

  test('should support numeric string timestamp', () => {
    const date = new Date(2024, 10, 9, 8, 7, 6);
    const timestampInMs = String(date.getTime());

    expect(formatTime(timestampInMs)).toBe('2024/11/09 08:07:06');
  });

  test('should format with custom pattern', () => {
    const date = new Date(2026, 5, 15, 9, 8, 7, 123);
    const timestampInMs = date.getTime();

    expect(formatTime(timestampInMs, 'yyyy-MM-dd HH:mm:ss')).toBe('2026-06-15 09:08:07');
  });

  test('should format with milliseconds', () => {
    const date = new Date(2026, 0, 1, 0, 0, 0, 42);
    const timestampInMs = date.getTime();

    expect(formatTime(timestampInMs, 'yyyy-MM-dd HH:mm:ss.SSS')).toBe('2026-01-01 00:00:00.042');
  });

  test('should format date only', () => {
    const date = new Date(2026, 11, 25);
    const timestampInMs = date.getTime();

    expect(formatTime(timestampInMs, 'yyyy年MM月dd日')).toBe('2026年12月25日');
  });

  test('should format time only', () => {
    const date = new Date(2026, 0, 1, 14, 30, 59);
    const timestampInMs = date.getTime();

    expect(formatTime(timestampInMs, 'HH:mm:ss')).toBe('14:30:59');
  });
});