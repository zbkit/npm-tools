// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ClassConstructor<T = any> = new (..._args: any[]) => T;

export interface ReadWriteFunction<T> {
  (): T;
  (_: T): void;
}

export type Nullable<T> = T | null | undefined;

/**
 * 判断给定的值是否为 `null` 或 `undefined`。
 *
 * @param value - 需要判断的值。
 * @returns 如果值为 `null` 或 `undefined`，返回 `true`，否则返回 `false`。
 */
export function nullish<T>(
  value: T | null | undefined
): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * 判断给定的值是否不是 null 或 undefined。
 *
 * @param value - 需要判断的值，可以为任意类型，也可以为 null 或 undefined。
 * @returns 如果值不是 null 或 undefined，则返回 true，否则返回 false。
 */
export function notNullish<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}
