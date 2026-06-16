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
});