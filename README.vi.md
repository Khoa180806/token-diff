<p align="center">
  <img src="assets/logo.png" alt="token-diff logo" width="128" height="128" />
</p>

<h1 align="center">token-diff</h1>

<p align="center">
  <strong>Hạ tầng Đo lường Tiêu thụ Token & So sánh Ngữ cảnh (Context Diff) Tiền định</strong>
</p>

<p align="center">
  <a href="README.md">English</a> • <a href="README.vi.md">Tiếng Việt</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-0.1.0-blue.svg?style=for-the-badge" alt="Phiên bản 0.1.0" />
  <img src="https://img.shields.io/badge/node-%3E%3D18.0.0-339933.svg?style=for-the-badge&logo=node.js&logoColor=white" alt="Node >= 18.0.0" />
  <img src="https://img.shields.io/badge/typescript-5.6-3178C6.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/pure--js-no--wasm-orange.svg?style=for-the-badge" alt="Pure JS" />
  <img src="https://img.shields.io/badge/tests-20%20passed-brightgreen.svg?style=for-the-badge" alt="Vitest Tests" />
  <img src="https://img.shields.io/badge/license-MIT-purple.svg?style=for-the-badge" alt="Giấy phép MIT" />
</p>

<p align="center">
  <img src="assets/demo.gif" alt="token-diff terminal demo" width="100%" />
</p>

---

## Mục lục
1. [Tóm tắt Dự án](#tóm-tắt-dự-án)
2. [Tại sao cần token-diff?](#tại-sao-cần-token-diff)
3. [Kiến trúc & Năng lực Cốt lõi](#kiến-trúc--năng-lực-cốt-lõi)
4. [Cài đặt & Thiết lập](#cài-đặt--thiết-lập)
5. [Hướng dẫn Sử dụng CLI](#hướng-dẫn-sử-dụng-cli)
   - [token-diff diff](#1-token-diff-diff)
   - [token-diff count](#2-token-diff-count)
   - [Nhận luồng dữ liệu chuẩn (stdin pipelining)](#3-nhận-luồng-dữ-liệu-chuẩn-stdin-pipelining)
6. [Tích hợp Thư viện / SDK](#tích-hợp-thư-viện--sdk)
7. [Cấu trúc Chuẩn hóa API Transport Envelope](#cấu-trúc-chuẩn-hóa-api-transport-envelope)
8. [Mô hình Lỗi Tiền định & Mã thoát (Exit Codes)](#mô-hình-lỗi-tiền-định--mã-thoát-exit-codes)
9. [Danh mục Mô hình & Bảng ánh xạ Encoding](#danh-mục-mô-hình--bảng-ánh-xạ-encoding)
10. [Hiệu năng & Mức tiêu thụ Bộ nhớ](#hiệu-năng--mức-tiêu-thụ-bộ-nhớ)
11. [Phát triển & Kiểm thử Dự án](#phát-triển--kiểm-thử-dự-án)
12. [Giấy phép](#giấy-phép)

---

## Tóm tắt Dự án

`token-diff` là công cụ dòng lệnh (CLI) và bộ công cụ lập trình (TypeScript SDK) siêu tốc, không phụ thuộc vào native binary, được thiết kế chuyên biệt để phân tích sự chênh lệch (delta) về số lượng token và dung lượng ngữ cảnh context trong các luồng làm việc với LLM, hệ thống agent tự hành và các pipeline tối ưu prompt.

Dù bạn đang kiểm thử thuật toán nén prompt, giám sát kết quả phản hồi của agent tool-calling, hay thiết lập ngưỡng token ngân sách nghiêm ngặt trong CI/CD, `token-diff` cung cấp kết quả tính toán chính xác, ổn định và có thể tái lập tuyệt đối.

---

## Tại sao cần token-diff?

- **Xử lý Cục bộ 100% (Zero Cloud Overhead)**: Đo lường và mã hóa hoàn toàn trên máy cục bộ. Không cần API keys, không lo nghẽn mạng rate-limit, và triệt tiêu nguy cơ rò rỉ mã nguồn dự án nhạy cảm.
- **Thuần JavaScript (Pure JS Tokenization)**: Xây dựng trên nền tảng `js-tiktoken`, không cần compiled WebAssembly (WASM) hay Rust native binary, đảm bảo chạy ổn định trên Windows, macOS, Linux, container Docker và môi trường serverless.
- **Chuẩn hóa cho AI Agent**: Hỗ trợ xuất định dạng JSON envelope chuyên nghiệp có kèm metadata thời gian thực thi, cờ phân trang và thông điệp lỗi có cấu trúc.
- **Mã thoát Tiền định (Deterministic Exit Codes)**: Phân tách rõ ràng giữa thành công, lỗi tham số và lỗi vận hành, giúp việc tích hợp vào shell script và CI kiểm thử hoàn toàn tự động.

---

## Kiến trúc & Năng lực Cốt lõi

```
┌────────────────────────────────────────────────────────┐
│                      token-diff                        │
│                                                        │
│  [Tệp A / Stdin] ──┐                                   │
│                    ├──► [Tokenizer (js-tiktoken)]      │
│  [Tệp B / Stdin] ──┘         │                         │
│                              ▼                         │
│                    [Diff Engine (Delta, %)]            │
│                              │                         │
│                    ┌─────────┴─────────┐               │
│                    ▼                   ▼               │
│            [Human Formatter]   [JSON Envelope]         │
│            (Bảng CLI trực quan) (Chuẩn hóa máy đọc)     │
└────────────────────────────────────────────────────────┘
```

- **Bộ nhớ đệm Encoder (In-Memory Cache)**: Lưu lại các instance từ điển BPE sau lần khởi tạo đầu tiên, giảm độ trễ đếm token xuống dưới 1 mili-giây cho các prompt thông dụng.
- **An toàn Tuyệt đối trước Phép chia cho 0**: Xử lý an toàn các trường hợp prompt rỗng hoặc trạng thái 0 token.
- **Trải nghiệm Dòng lệnh Tiện dụng**: Tự động căn lề bảng hiển thị gọn gàng trên terminal và hỗ trợ pipe trực tiếp từ stdin qua ký hiệu `-`.

---

## Cài đặt & Thiết lập

### Chạy trực tiếp qua `npx` (Không cần cài đặt trước):
```bash
npx token-diff --help
```

### Cài đặt toàn cục (Global):
```bash
npm install -g token-diff
```

### Thêm vào dự án Node.js / TypeScript:
```bash
npm install token-diff
```

---

## Hướng dẫn Sử dụng CLI

### 1. `token-diff diff`

So sánh độ chênh lệch token và ký tự giữa hai văn bản:

```bash
token-diff diff [tùy_chọn] <before> <after>
```

#### Tham số dòng lệnh:
- `<before>`: Đường dẫn tệp gốc/chưa nén (hoặc `-` nếu đọc từ stdin).
- `<after>`: Đường dẫn tệp sau tối ưu/đã nén (hoặc `-` nếu đọc từ stdin).

#### Các tùy chọn:
| Tùy chọn | Mặc định | Ý nghĩa |
|---|---|---|
| `-m, --model <model>` | `gpt-4o` | Tên mô hình mục tiêu hoặc encoding cụ thể |
| `--json` | `false` | Xuất kết quả dạng JSON envelope ra stdout |
| `-h, --help` | - | Hiển thị hướng dẫn lệnh |

#### Ví dụ hiển thị dạng bảng:
```bash
token-diff diff raw_prompt.txt compressed_prompt.txt
```
```text
=== Token Diff Report ===
Model: gpt-4o (encoding: o200k_base)

Target                Tokens       Chars        Lines     
----------------------------------------------------------
raw_prompt.txt         1,240       4,820          115
compressed_prompt.txt    892       3,410           82
----------------------------------------------------------
Diff                    -348 (-28.06%) -1410 (-29.25%) -33        

Summary: Reduced by 348 tokens (-28.06%) from 1240 to 892 (chars: 4820 → 3410, -29.25%)
```

---

### 2. `token-diff count`

Đếm số lượng token, ký tự và số dòng của một tệp duy nhất hoặc luồng stdin:

```bash
token-diff count [tùy_chọn] <file>
```

#### Ví dụ:
```bash
token-diff count context.md --model gpt-4
```
```text
=== Token Count Report ===
File: context.md
Model: gpt-4 (encoding: cl100k_base)

Tokens: 642
Chars:  2,710
Lines:  84
```

---

### 3. Nhận luồng dữ liệu chuẩn (stdin pipelining)

Truyền kết quả từ các script tạo nội dung, nén dữ liệu hoặc git diff trực tiếp vào `token-diff` thông qua ký hiệu `-`:

```bash
# So sánh tệp chuẩn với kết quả nén được truyền qua pipe
cat compressed_output.json | token-diff diff baseline.json -

# Đếm token trực tiếp từ git diff
git diff HEAD~1 | token-diff count -
```

---

## Tích hợp Thư viện / SDK

Gói `token-diff` cung cấp đầy đủ khai báo kiểu TypeScript:

```typescript
import {
  countTokens,
  computeDiff,
  formatHuman,
  formatJson,
  TokenDiffReport
} from 'token-diff';

// 1. Phân tích token cho từng văn bản
const banDau = countTokens('Hãy viết một bài hướng dẫn chi tiết về container Docker.', 'gpt-4o');
const rutGon = countTokens('Hướng dẫn về container Docker.', 'gpt-4o');

// 2. Tính toán diff
const diffReport: TokenDiffReport = computeDiff(banDau, rutGon, {
  beforeLabel: 'ban_dau',
  afterLabel: 'rut_gon',
});

console.log(`Tiết kiệm được ${Math.abs(diffReport.diff.token_delta)} tokens!`);
console.log(formatHuman(diffReport));

// 3. Xuất JSON envelope chuẩn
const jsonStr: string = formatJson(diffReport, 12);
```

---

## Cấu trúc Chuẩn hóa API Transport Envelope

Khi bật tùy chọn `--json`, `token-diff` đảm bảo đầu ra khớp với chuẩn envelope của hệ sinh thái:

```json
{
  "data": {
    "schema_version": "1.0",
    "model": "gpt-4o",
    "encoding": "o200k_base",
    "before": {
      "label": "raw_prompt.txt",
      "token_count": 1240,
      "char_count": 4820,
      "line_count": 115
    },
    "after": {
      "label": "compressed_prompt.txt",
      "token_count": 892,
      "char_count": 3410,
      "line_count": 82
    },
    "diff": {
      "token_delta": -348,
      "token_delta_pct": -28.06,
      "char_delta": -1410,
      "char_delta_pct": -29.25
    },
    "summary": "Reduced by 348 tokens (-28.06%) from 1240 to 892 (chars: 4820 → 3410, -29.25%)"
  },
  "metadata": {
    "schema_version": "1.0",
    "source": "token-diff",
    "duration_ms": 14,
    "truncated": false,
    "next_cursor": null
  }
}
```

---

## Mô hình Lỗi Tiền định & Mã thoát (Exit Codes)

| Mã thoát | Mã lỗi | Tình huống phát sinh |
|:---:|---|---|
| `0` | - | Thực thi thành công không có lỗi. |
| `1` | `INTERNAL_ERROR` | Lỗi ngoại lệ runtime không mong muốn hoặc đọc luồng pipe thất bại. |
| `2` | `INVALID_INPUT` / `UNSUPPORTED_OPERATION` | Sai tham số CLI, truyền cả hai đầu vào là `-`, hoặc tên mô hình không hỗ trợ. |
| `3` | `NOT_FOUND` | Tệp chỉ định không tồn tại trên hệ thống tệp. |
| `4` | `PERMISSION_DENIED` | Không có quyền truy cập đọc tệp được chỉ định. |

#### Envelope JSON khi có lỗi:
Nếu sử dụng cờ `--json` và phát sinh lỗi, chi tiết lỗi được chuẩn hóa ra `stdout`:
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "File not found: missing_file.txt",
    "details": {
      "path": "missing_file.txt"
    }
  },
  "metadata": {
    "schema_version": "1.0",
    "source": "token-diff"
  }
}
```

---

## Danh mục Mô hình & Bảng ánh xạ Encoding

| Encoding | Các mô hình phổ biến tương ứng |
|---|---|
| `o200k_base` | `gpt-4o`, `gpt-4o-mini`, `chatgpt-4o-latest`, `o1`, `o1-mini`, `o1-preview` |
| `cl100k_base` | `gpt-4`, `gpt-4-turbo`, `gpt-4-32k`, `gpt-3.5-turbo`, `text-embedding-ada-002`, `text-embedding-3-small`, `text-embedding-3-large` |
| `p50k_base` | `text-davinci-003`, `text-davinci-002` |
| `r50k_base` | `davinci` |

*Có thể truyền trực tiếp tên encoding vào cờ model (ví dụ: `--model o200k_base`).*

---

## Hiệu năng & Mức tiêu thụ Bộ nhớ

- **Thời gian khởi động lạnh (Cold Start)**: ~80ms (thời gian khởi tạo Node.js runtime).
- **Độ trễ xử lý (Execution Latency)**: <15ms đối với văn bản thông thường (<50 KLOC / <10,000 tokens).
- **Mức tiêu hao RAM**: <40MB RSS trong suốt phiên phân tích token.
- **Xử lý hoàn toàn trong RAM**: Tuyệt đối không tạo file tạm rác ra ổ cứng.

---

## Phát triển & Kiểm thử Dự án

```bash
# Clone mã nguồn
git clone https://github.com/Khoa180806/token-diff.git
cd token-diff

# Cài đặt thư viện phụ thuộc
npm install

# Chạy toàn bộ 20 unit & integration tests
npm test

# Build mã chạy production vào dist/
npm run build

# Kiểm tra cú pháp và kiểu dữ liệu
npm run lint
```

---

## Giấy phép

Dự án được phân phối theo giấy phép mã nguồn mở [MIT License](LICENSE).  
Phát triển và duy trì bởi Khoa180806.
