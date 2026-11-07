# Next.js + MUI + SWR Starter

以 TypeScript 與 Next.js App Router 建立的前端起始專案，包含 MUI/MUI Icons、響應式側邊欄，以及共用 API client。

## 開始使用

```bash
npm install
cp .env.example .env.local
npm run dev
```

開啟 http://localhost:3000。Node.js 請使用 20.9 或更新版本。

## API 設定

在 `.env.local` 設定 `NEXT_PUBLIC_API_BASE_URL`，例如 `https://api.example.com`。留空時會使用相對路徑，適合同源 API。

共用函式位於 `lib/api.ts`：

```ts
import { api } from '@/lib/api';

const records = await api.get<Record[]>('/records');
const created = await api.post<Record, { name: string }>('/records', { name: 'Example' });
const updated = await api.put<Record, { name: string }>('/records/1', { name: 'Updated' });
await api.delete<void>('/records/1');
```

GET 使用 `useSWR`；寫入操作可使用 `useSWRMutation`。`ApiError` 提供 HTTP status 與後端錯誤內容（`details`）。

## 範例端點

`/api-demo` 預期後端提供：

- `GET /api/todos`：回傳陣列
- `POST /api/todos`：接收 `{ "title": "..." }`
- `PUT /api/todos/:id`：更新項目
- `DELETE /api/todos/:id`：刪除項目

這些是示範端點；請依實際 API 路徑、資料結構和錯誤格式調整頁面型別與請求內容。
