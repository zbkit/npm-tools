
/**
 * 对象深拷贝
 * @template T - 对象的类型
 * @param obj - 需要深拷贝的对象
 * @returns 拷贝后的新对象
 * @description 递归复制对象的所有属性，支持Date和Array类型
 */
export const deepCopy = <T>(obj: T): T => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (obj instanceof Date) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Date(obj.getTime()) as any;
  }

  if (Array.isArray(obj)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return obj.map((item) => deepCopy(item)) as any;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const copy: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      copy[key] = deepCopy((obj as any)[key]);
    }
  }
  return copy;
};

type MergeableObject = Record<PropertyKey, unknown>;

export type DeepMerge<TTarget, TSource> = TTarget extends readonly unknown[]
  ? TSource
  : TSource extends readonly unknown[]
    ? TSource
    : TTarget extends MergeableObject
      ? TSource extends MergeableObject
        ? {
          [K in keyof TTarget | keyof TSource]: K extends keyof TSource
            ? K extends keyof TTarget
              ? DeepMerge<TTarget[K], TSource[K]>
              : TSource[K]
            : K extends keyof TTarget
              ? TTarget[K]
              : never;
        }
        : TSource
      : TSource;

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    !(value instanceof Date)
  );
};

/**
 * 合并对象
 * @template TTarget - 目标对象的类型
 * @template TSource - 源对象的类型
 * @param target - 目标对象
 * @param source - 源对象（可包含新增属性）
 * @returns 合并后的新对象
 * @description 将源对象的属性递归合并到目标对象中，保留目标对象的原有属性
 */
export const mergeObjects = <
  TTarget extends Record<string, unknown>,
  TSource extends Record<string, unknown>,
>(target: TTarget, source: TSource): DeepMerge<TTarget, TSource> => {
  const result: Record<string, unknown> = { ...target };

  for (const key in source) {
    if (!Object.prototype.hasOwnProperty.call(source, key)) {
      continue;
    }

    const sourceValue = source[key];
    const targetValue = result[key];

    if (Array.isArray(sourceValue)) {
      result[key] = sourceValue;
      continue;
    }

    if (isPlainObject(sourceValue) && isPlainObject(targetValue)) {
      result[key] = mergeObjects(targetValue, sourceValue);
      continue;
    }

    if (isPlainObject(sourceValue)) {
      result[key] = mergeObjects({}, sourceValue);
      continue;
    }

    result[key] = sourceValue;
  }

  return result as DeepMerge<TTarget, TSource>;
};
