import type { ClassConstructor } from './type';

/**
 * 断言条件为真，否则抛出错误。
 *
 * @param condition 需要判断的条件。如果为 `false`，则抛出异常。
 * @param msg 可选的错误信息或 Error 对象。当条件为 `false` 时用于抛出异常。
 * @throws 当 `condition` 为 `false` 时抛出指定的错误信息或 Error 对象。
 */
export function guard(
  condition: unknown,
  msg?: string | Error
): asserts condition {
  if (condition === false) {
    if (msg instanceof Error) {
      throw msg;
    }
    throw new Error(msg);
  }
}

/**
 * 断言传入的值不是 null 或 undefined。
 *
 * 如果值为 null 或 undefined，则抛出错误。否则，类型系统会将其视为非空类型。
 *
 * @param value 要检查的值
 * @throws {Error} 如果值为 null 或 undefined 时抛出异常
 */
export function guardNotNullish(
  value: unknown
): asserts value is NonNullable<unknown> {
  if (value === null || value === undefined) {
    throw new Error('Value is null or undefined');
  }
}

/**
 * 断言给定的值为 null 或 undefined。
 *
 * 如果值不是 null 或 undefined，则抛出一个错误。
 *
 * @param value 要进行判断的值
 * @throws {Error} 如果 value 不是 null 或 undefined，则抛出错误
 */
export function guardNullish(
  value: unknown
): asserts value is null | undefined {
  if (value !== null && value !== undefined) {
    throw new Error('Value is not null or undefined');
  }
}

/**
 * 判断给定的值是否为指定构造函数的实例，如果不是则抛出异常。
 *
 * @template T 构造函数类型，需继承自 ClassConstructor<any>。
 * @param value 需要判断的值。
 * @param constructor 用于判断的构造函数。
 * @returns 如果 value 是 constructor 的实例，则返回 value。
 * @throws 如果 value 不是 constructor 的实例，则抛出异常，异常信息包含构造函数名称。
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function guardInstanceof<T extends ClassConstructor<any>>(
  value: unknown,
  constructor: T
): InstanceType<T> {
  guard(
    value instanceof constructor,
    'Value is not an instance of ' + constructor.name
  );
  return value;
}
