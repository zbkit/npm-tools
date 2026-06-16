# Time 时间

时间格式化工具函数。

## 引入

```ts
import { getTimeAgo, formatTime } from '@zbkit/tools'
```

## getTimeAgo

将秒级 Unix 时间戳转换为相对时间文本。

```ts
function getTimeAgo(pastTime: number | string): string
```

### 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `pastTime` | `number \| string` | 是 | 秒级 Unix 时间戳（如 `1700000000`） |

### 返回值

| 类型 | 说明 |
|------|------|
| `string` | 相对时间文本，如 `"1小时 5分3秒"`、`"3分20秒"`、`"45秒"`。输入不合法时返回空字符串 |

### 格式说明

- 超过 1 小时：`"X小时 Y分Z秒"`
- 不足 1 小时但超过 1 分钟：`"X分Y秒"`
- 不足 1 分钟：`"X秒"`

### 示例

```ts
// 假设现在是 2024-01-01 12:00:00
const oneHourAgo = Math.floor(Date.now() / 1000) - 3600
getTimeAgo(oneHourAgo) // => "1小时 0分0秒"

const fiveMinAgo = Math.floor(Date.now() / 1000) - 300
getTimeAgo(fiveMinAgo) // => "5分0秒"

getTimeAgo(0)    // => ""（不合法输入）
getTimeAgo(-1)   // => ""
getTimeAgo('abc') // => ""
```

## formatTime

将毫秒时间戳格式化为指定格式的字符串，默认格式为 `"YYYY/MM/DD HH:mm:ss"`。

```ts
function formatTime(timestamp: number | string, pattern?: string): string

type DatePattern = 'yyyy' | 'MM' | 'dd' | 'HH' | 'mm' | 'ss' | 'SSS'
```

### 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `timestamp` | `number \| string` | 是 | 毫秒时间戳（如 `1700000000000`） |
| `pattern` | `string` | 否 | 格式化模板，默认 `'yyyy/MM/dd HH:mm:ss'` |

### 模板占位符

| 占位符 | 说明 | 示例 |
|--------|------|------|
| `yyyy` | 四位年份 | `2026` |
| `MM` | 两位月份 | `01`–`12` |
| `dd` | 两位日期 | `01`–`31` |
| `HH` | 两位小时（24h） | `00`–`23` |
| `mm` | 两位分钟 | `00`–`59` |
| `ss` | 两位秒数 | `00`–`59` |
| `SSS` | 三位毫秒 | `000`–`999` |

### 返回值

| 类型 | 说明 |
|------|------|
| `string` | 格式化后的时间字符串 |

### 示例

```ts
// 默认格式（兼容旧代码）
formatTime(1700000000000) // => "2023/11/14 22:13:20"（取决于时区）
formatTime(Date.now())    // => "2024/01/01 12:00:00"
formatTime('1700000000000') // => "2023/11/14 22:13:20"

// 自定义格式
formatTime(1700000000000, 'yyyy-MM-dd HH:mm:ss') // => "2023-11-14 22:13:20"

// 带毫秒
formatTime(1700000000000, 'yyyy-MM-dd HH:mm:ss.SSS') // => "2023-11-14 22:13:20.000"

// 中文日期
formatTime(1700000000000, 'yyyy年MM月dd日') // => "2023年11月14日"

// 仅时间
formatTime(1700000000000, 'HH:mm:ss') // => "22:13:20"
```
