# Kế hoạch triển khai Landing Page `token-diff` (thư mục `web/`)

> Trạng thái: **Bản nháp chờ duyệt** — chưa có dòng code nào được viết.
> Stack: Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui · Deploy: Vercel (Root Directory = `web/`).

---

## 1. Mục tiêu & Tiêu chí thành công

| # | Mục tiêu | Tiêu chí đo được |
|---|---|---|
| G1 | Người dùng thử `token-diff` mà không cần cài đặt | Playground đếm & diff token **100% client-side**, kết quả khớp CLI cho cùng input/model |
| G2 | Bảo mật dữ liệu | **0 network request** chứa nội dung prompt (kiểm bằng DevTools Network) |
| G3 | Nhanh | Lighthouse Performance ≥ 90 (mobile), LCP < 2.5s, JS ban đầu < 150KB gzip (chưa tính rank file) |
| G4 | Chuyển đổi | CTA rõ ràng: copy lệnh cài đặt, Star GitHub, link Docs & [Ecosystem Docs](https://github.com/Khoa180806/AI_Developer_Tool_Ecosystem/tree/master/docs) |
| G5 | Không ảnh hưởng gói npm | `npm test`, `npm run build`, `npm pack` ở root không đổi; `web/` không nằm trong `files` |

**Ngoài phạm vi (v1):** đăng nhập, backend/API route, lưu lịch sử, analytics có cookie, i18n đầy đủ (chỉ EN; VI để v2), model ngoài OpenAI.

---

## 2. Phát hiện kỹ thuật quan trọng (phải xử lý trước khi code)

### 2.1 Bundle size của tokenizer — rủi ro lớn nhất
`src/tokenizer.ts` dùng `getEncoding` từ `js-tiktoken` (bản full) → **đóng gói cả 4 rank file (~vài MB)** vào bundle trình duyệt.

**Giải pháp:** Web **không** import `countTokens` từ core. Thay vào đó:
- Dùng `js-tiktoken/lite` (`Tiktoken` class) + **dynamic import** đúng rank file theo encoding được chọn (`js-tiktoken/ranks/o200k_base`, …).
- Chạy tokenize trong **Web Worker** để không block UI khi dán văn bản lớn.
- Cache encoder theo encoding trong worker (giống `encoderCache` ở core).

### 2.2 Tái sử dụng logic core (single source of truth)
Các hàm **thuần, không phụ thuộc Node** sẽ được import trực tiếp từ `../src`:
- `resolveEncodingForModel` (`src/tokenizer.ts`) — ⚠️ file này import `js-tiktoken` full ở top-level → **cần tách** bảng mapping model→encoding ra file riêng `src/models.ts` (refactor nhỏ, không đổi public API, có test bảo vệ).
- `computeDiff` (`src/diff.ts`), types (`src/types.ts`), `formatJson` (`src/formatter.ts` — kiểm tra `picocolors` an toàn trên browser; nếu không, chỉ import phần JSON).
- **Tuyệt đối không** import `src/cli.ts` (dùng `fs`, `process`).

Cấu hình: alias `@core/*` → `../src/*` trong `web/tsconfig.json` + `next.config` bật `experimental.externalDir: true`. Lý do không dùng package npm: gói chưa publish (đang chờ mở khóa tài khoản npm) và alias giữ web luôn đồng bộ với source.

### 2.3 Đảm bảo kết quả khớp CLI
Viết test so sánh (`web/` dùng Vitest): cùng fixture → tokenizer lite (web) và `countTokens` (core) phải cho **cùng token count** trên cả 4 encoding.

---

## 3. Cấu trúc thư mục đề xuất

```
web/
├── PLAN.md
├── package.json              # tách biệt khỏi package root
├── next.config.ts
├── tsconfig.json             # alias @core/* -> ../src/*
├── tailwind / postcss config
├── public/                   # og-image, favicon, demo.gif (copy từ ../assets)
├── src/
│   ├── app/
│   │   ├── layout.tsx        # metadata, font, theme
│   │   ├── page.tsx          # ghép các section
│   │   └── opengraph-image.tsx (tùy chọn)
│   ├── components/
│   │   ├── sections/         # Hero, Playground, Features, CliDemo, Ecosystem, Footer
│   │   ├── playground/       # InputPane, ModelSelect, StatsCards, ResultTabs, JsonView
│   │   └── ui/               # shadcn components
│   ├── lib/
│   │   ├── tokenizer/
│   │   │   ├── worker.ts     # Web Worker: lite + dynamic ranks + cache
│   │   │   ├── client.ts     # API Promise-based gọi worker
│   │   │   └── ranks.ts      # map encoding -> dynamic import
│   │   ├── diff.ts           # wrapper gọi @core/diff
│   │   └── constants.ts      # links, install commands, model list
│   └── hooks/
│       └── useTokenDiff.ts   # debounce input -> worker -> report
└── test/
    ├── parity.test.ts        # web tokenizer == core tokenizer
    └── diff.test.ts
```

---

## 4. Nội dung các section

1. **Hero** — Headline: *"Measure prompt token savings. Locally. Instantly."*; sub: zero native deps, 100% offline; khối copy lệnh (`npx ai-token-diff`, `npm i -g ai-token-diff`); CTA "Try the Playground" + "Star on GitHub".
2. **Playground** (trọng tâm)
   - 2 textarea Before / After (có nút "Load example", "Swap", "Clear").
   - Select model (danh sách lấy từ `src/models.ts`).
   - Thẻ thống kê: Tokens before/after, **Token delta + %** (xanh = giảm, đỏ = tăng), Chars, Lines.
   - Tabs: **Summary** · **JSON Envelope** (đúng schema `formatJson`) · **CLI equivalent** (sinh lệnh `td diff ... --model ...` để copy).
   - Debounce 250ms; trạng thái "Loading encoder…" lần đầu.
   - Badge "🔒 Runs in your browser — nothing is uploaded".
3. **Features** — 4 card: Local & Private · Pure JS (no node-gyp) · Agent-ready JSON envelope · Deterministic exit codes.
4. **CLI Demo** — `demo.gif` / ảnh terminal từ `assets/`.
5. **Use cases** — prompt compression, CI token budget gate, agent loop monitoring (snippet `jq`).
6. **Ecosystem & Docs** — link `docs/*.md` trên GitHub + Ecosystem Docs.
7. **Footer** — MIT, GitHub, npm (ẩn/“coming soon” cho tới khi publish).

---

## 5. Lộ trình theo lát cắt (mỗi lát = ≥1 commit nguyên tử)

### Giai đoạn 0 — Chuẩn bị core (ở root)
- [x] **T0.1** Tách `MODEL_TO_ENCODING`, `VALID_ENCODINGS`, `resolveEncodingForModel` sang `src/models.ts`; `tokenizer.ts` re-export → không đổi API. *(test: 20 test cũ vẫn pass)* — `refactor(core): extract model mapping into models.ts`
- [x] **T0.2** Kiểm tra `diff.ts` / `formatter.ts` không phụ thuộc Node API (chỉ dùng thuần JS và `picocolors` isomorphic, 100% an toàn cho browser). — `docs(web): audit core modules for browser compatibility`

### Giai đoạn 1 — Scaffold
- [x] **T1.1** `create-next-app` trong `web/` (TS, Tailwind, App Router, src dir, ESLint). — `chore(web): scaffold Next.js app`
- [x] **T1.2** Cấu hình alias `@core/*`, `externalDir` / local package binding `ai-token-diff`, import thử `computeDiff` build thành công. — `chore(web): wire core source alias`
- [x] **T1.3** Cài shadcn/ui + theme dark mặc định. — `chore(web): add shadcn/ui`
- [x] **T1.4** Cập nhật `.gitignore` root (`web/node_modules`, `web/.next`, `web/.vercel`). — `chore: update root gitignore for web artifacts`

**✅ Checkpoint 1 (Hoàn thành):** `cd web && npm run build` pass; root `npm test` vẫn 20/20.

### Giai đoạn 2 — Tokenizer trình duyệt (TDD)
- [x] **T2.1** Viết `parity.test.ts` (fail trước - Red state). — `test(web): add tokenizer parity tests`
- [x] **T2.2** `ranks.ts` + `worker.ts` + `client.ts` dùng `js-tiktoken/lite`. — `feat(web): browser tokenizer worker with lazy ranks`
- [x] **T2.3** Hook `useTokenDiff` (debounce, loading, error). — `feat(web): useTokenDiff hook`

**✅ Checkpoint 2 (Hoàn thành):** parity test pass 4 encoding; hook tests pass; Next build sạch sẽ.

### Giai đoạn 3 — UI
- [x] **T3.1** Playground (InputPane, ModelSelect, StatsCards, ResultTabs). — `feat(web): interactive playground`
- [ ] **T3.2** Hero + copy-to-clipboard. — `feat(web): hero section`
- [ ] **T3.3** Features, CLI Demo, Use cases, Ecosystem, Footer. — từng section 1 commit
- [ ] **T3.4** Responsive (360px → 1440px), a11y (label, focus ring, contrast AA, keyboard). — `fix(web): a11y & responsive`

**✅ Checkpoint 3:** Review UI bằng trình duyệt thật; người dùng duyệt giao diện.

### Giai đoạn 4 — SEO & hiệu năng
- [ ] **T4.1** Metadata, OG image, `robots.txt`, `sitemap.xml`, favicon từ `logo.png`.
- [ ] **T4.2** Lighthouse ≥ 90 mọi hạng mục; tối ưu ảnh (`next/image`, chuyển gif → mp4/webm nếu nặng).

### Giai đoạn 5 — CI & Deploy
- [ ] **T5.1** Thêm job `web` vào `.github/workflows/ci.yml` (install, lint, test, build trong `web/`).
- [ ] **T5.2** Vercel: import repo → Root Directory `web`, Framework Next.js, bật "Include files outside root directory" (cần cho alias `../src`), Production Branch `main`.
- [ ] **T5.3** Cập nhật `homepage` trong `package.json`, thêm link website vào `README.md`, `README.vi.md`, GitHub About.

**✅ Checkpoint 5 (DoD):** URL production hoạt động; G1–G5 đạt; push nhánh `main` duy nhất.

---

## 6. Rủi ro & phương án

| Rủi ro | Mức | Giảm thiểu |
|---|---|---|
| Rank file lớn (o200k ~ vài MB) làm chậm lần đầu | Cao | Lazy load theo encoding, Web Worker, hiển thị loading; cache HTTP dài hạn của Vercel |
| Vercel không thấy `../src` khi Root Directory = `web` | Trung bình | Bật "Include source files outside of the Root Directory"; fallback: script `prebuild` copy `src` vào `web/src/core` |
| Lệch kết quả web vs CLI | Trung bình | Parity test trong CI |
| npm chưa publish → link npm/`npx` hỏng | Trung bình | Hiển thị "coming soon" / ưu tiên hướng dẫn clone; bật lại khi publish |

---

## 7. Câu hỏi cần bạn xác nhận

1. **Domain**: dùng `*.vercel.app` mặc định hay có domain riêng?
2. **Ngôn ngữ trang**: chỉ tiếng Anh cho v1 (khuyến nghị) hay song ngữ ngay?
3. **Phong cách**: dark, terminal/dev-tool (giống ảnh trong `assets/`) — đồng ý?
4. **Analytics**: bật Vercel Web Analytics (không cookie) hay không dùng?
