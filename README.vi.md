<p align="center">
  <img src="assets/logo.png" alt="token-diff logo" width="128" height="128" />
</p>

<h1 align="center">token-diff</h1>

<p align="center">
  <strong>Công cụ đo lường mức tiêu thụ token và so sánh độ lệch context cho các luồng LLM</strong>
</p>

<p align="center">
  <a href="README.md">English</a> • <a href="README.vi.md">Tiếng Việt</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-0.1.1-blue.svg?style=for-the-badge" alt="Phiên bản 0.1.1" />
  <img src="https://img.shields.io/badge/node-%3E%3D18.0.0-339933.svg?style=for-the-badge&logo=node.js&logoColor=white" alt="Node >= 18.0.0" />
  <img src="https://img.shields.io/badge/typescript-5.6-3178C6.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/pure--js-no--wasm-orange.svg?style=for-the-badge" alt="Pure JS" />
  <img src="https://img.shields.io/badge/tests-20%20passed-brightgreen.svg?style=for-the-badge" alt="Vitest Tests" />
  <img src="https://img.shields.io/badge/license-MIT-purple.svg?style=for-the-badge" alt="Giấy phép MIT" />
</p>

<p align="center">
  <img src="assets/demo.gif" alt="token-diff demo dòng lệnh" width="100%" />
</p>

---

## Mục lục
1. [Giới thiệu](#giới-thiệu)
2. [Điểm mạnh cốt lõi](#điểm-mạnh-cốt-lõi)
3. [Kiến trúc hoạt động](#kiến-trúc-hoạt-động)
4. [Cài đặt](#cài-đặt)
5. [Hướng dẫn sử dụng CLI](#hướng-dẫn-sử-dụng-cli)
   - [token-diff diff](#1-token-diff-diff)
   - [token-diff count](#2-token-diff-count)
   - [Hứng dữ liệu từ stdin (pipe)](#3-hứng-dữ-liệu-từ-stdin-pipe)
6. [Dùng làm thư viện (SDK)](#dùng-làm-thư-viện-sdk)
7. [Cấu trúc JSON Envelope chuẩn](#cấu-trúc-json-envelope-chuẩn)
8. [Mã lỗi và Exit Code](#mã-lỗi-và-exit-code)
9. [Các model và encoding hỗ trợ](#các-model-và-encoding-hỗ-trợ)
10. [Hiệu năng và tài nguyên](#hiệu-năng-và-tài-nguyên)
11. [Phát triển và đóng góp](#phát-triển-và-đóng-góp)
12. [Giấy phép](#giấy-phép)

---

## Giới thiệu

`token-diff` là công cụ dòng lệnh (CLI) và thư viện TypeScript/JavaScript thuần, chuyên dùng để đo lường và so sánh mức chênh lệch token giữa hai văn bản, hai tệp mã nguồn hoặc dữ liệu từ terminal.

Khi tối ưu prompt, nén context cho AI agent, hay muốn đặt chặn trần token (token budget) trong CI/CD pipeline, `token-diff` giúp bạn có ngay số liệu trước/sau rõ ràng, chính xác từng token mà không cần đoán mò.

---

## Điểm mạnh cốt lõi

- **Chạy offline 100% (Không phụ thuộc mạng)**: Mọi thao tác tính toán, tách từ (tokenize) diễn ra ngay trên máy của bạn. Không cần API key, không lo dính rate-limit, và tuyệt đối an toàn với mã nguồn hoặc dữ liệu mật.
- **Thuần JavaScript (Không cần WebAssembly hay build C++)**: Dựa trên `js-tiktoken`, chạy mượt mà ngay lập tức trên Windows, macOS, Linux, môi trường Docker lẫn serverless mà không sợ lỗi thiếu thư viện C++ native.
- **Thiết kế sẵn cho AI Agent**: Hỗ trợ xuất JSON envelope kèm đầy đủ metadata, thời gian chạy (`duration_ms`) và mã lỗi chi tiết để agent hoặc tool khác dễ dàng đọc hiểu.
- **Exit code chuẩn mực, nhất quán**: Phân định rõ ràng giữa lệnh thành công, tệp không tìm thấy, hay sai tham số, giúp việc viết script bash/powershell tự động hóa cực kỳ nhàn.

---

## Kiến trúc hoạt động

```
┌────────────────────────────────────────────────────────┐
│                      token-diff                        │
│                                                        │
│  [File A / Stdin] ──┐                                  │
│                     ├──► [Tokenizer (js-tiktoken)]     │
│  [File B / Stdin] ──┘         │                        │
│                               ▼                        │
│                     [Diff Engine (Delta, %)]           │
│                               │                        │
│                     ┌─────────┴─────────┐              │
│                     ▼                   ▼              │
│             [Human Formatter]   [JSON Envelope]        │
│             (Bảng terminal đẹp)  (Chuẩn máy đọc)       │
└────────────────────────────────────────────────────────┘
```

- **Cache bộ từ điển (In-Memory Encoder Cache)**: Giữ lại instance BPE sau lần khởi tạo đầu tiên, giúp các lượt đếm tiếp theo chỉ mất chưa tới 1 mili-giây.
- **An toàn trước dữ liệu rỗng**: Xử lý mượt mà khi tệp rỗng hoặc 0 token, không bao giờ bị lỗi văng phép chia cho 0 (`NaN` / `Infinity`).
- **Terminal trực quan**: Tự động căn lề thẳng hàng các cột thông tin và hỗ trợ nhận luồng dữ liệu pipe (`-`) chuẩn phong cách Unix.

---

## Cài đặt

### Dùng nhanh qua `npx` (Không cần cài đặt trước):
```bash
# Dùng tên gói đầy đủ trên npm
npx ai-token-diff --help

# Hoặc so sánh nhanh 2 prompt ngay lập tức
npx ai-token-diff diff "Prompt gốc dài dòng" "Prompt ngắn gọn"
```

### Cài đặt toàn cục (Khuyên dùng để tối ưu tốc độ làm việc):
Cài đặt một lần duy nhất để mở khóa lệnh siêu ngắn gọn **`td`** ở mọi terminal:
```bash
npm install -g ai-token-diff

# Giờ bạn có thể gõ lệnh td cực kỳ nhanh!
td --help
```

### Thêm vào dự án Node.js / TypeScript:
```bash
npm install -D ai-token-diff
```

---

## Hướng dẫn sử dụng CLI

Bạn có thể dùng lệnh rút gọn **`td`** hoặc tên đầy đủ **`token-diff`** / **`ai-token-diff`**.

### 1. `td diff` (hoặc `token-diff diff`)

So sánh chính xác mức chênh lệch token, ký tự và số dòng giữa hai đầu vào:

```bash
td diff [tùy_chọn] <before> <after>
```

#### Cơ chế nhận diện đầu vào thông minh (Smart Input)
`token-diff` tự động phân biệt xem tham số `<before>` và `<after>` là đường dẫn tệp hay là chuỗi văn bản (prompt):
- **So sánh 2 tệp**: `td diff prompt_v1.txt prompt_v2.txt`
- **So sánh 2 đoạn prompt trực tiếp**: `td diff "Hãy viết một hàm python tính fibonacci" "Viết python fibonacci"`
- **So sánh giữa tệp và prompt thô**: `td diff base_prompt.txt "Viết ngắn gọn súc tích"`
- **Nhận luồng dữ liệu từ pipe (`-`)**: `cat prompt_moi.txt | td diff prompt_cu.txt -`

> **Lưu ý**: Nếu đường dẫn không tồn tại trên máy, công cụ sẽ tự động coi đó là chuỗi prompt thô và in kèm một cảnh báo nhẹ `[WARN]` ra terminal để bạn không bị nhầm lẫn khi gõ sai tên tệp.

#### Tùy chọn:
| Tùy chọn | Mặc định | Ý nghĩa |
|---|---|---|
| `-m, --model <model>` | `gpt-4o` | Tên model hoặc tên bộ mã hóa (encoding) |
| `--json` | `false` | Xuất kết quả dạng JSON envelope chuẩn |
| `-h, --help` | - | Xem hướng dẫn lệnh |

#### Kết quả hiển thị bảng màu trực quan trên terminal:
```bash
td diff "Hãy giải thích chi tiết thuật toán quicksort bằng TypeScript kèm ví dụ minh họa" "Giải thích quicksort TypeScript ngắn gọn"
```
```text
=== Token Diff Report ===
Model: gpt-4o (o200k_base)

Target         Tokens       Chars        Lines     
---------------------------------------------------
Hãy giải th...           23           82          1
Giải thích ...           11           42          1
---------------------------------------------------
Diff                    -12 (-52.17%) -40 (-48.78%) 0         

Summary: Reduced by 12 tokens (-52.17%) from 23 to 11 (chars: 82 → 42, -48.78%)
```
*(Trên terminal: Số lượng token tiết kiệm được hiển thị màu **xanh lá**, nếu tăng sẽ báo màu **đỏ**, và tiêu đề được in đậm màu **xanh lơ (cyan)**).*

---

### 2. `td count` (hoặc `token-diff count`)

Đếm số lượng token, ký tự và số dòng của một tệp, chuỗi prompt trực tiếp hoặc dữ liệu pipe:

```bash
td count [tùy_chọn] <tệp_hoặc_chuỗi>
```

#### Ví dụ:
```bash
# Đếm token của một tệp
td count context.md --model gpt-4o

# Đếm token trực tiếp cho một câu prompt
td count "Bạn là một kỹ sư phần mềm cao cấp."
```
```text
=== Token Count Report ===
File:  Bạn là một kỹ sư phần mềm cao cấp.
Model: gpt-4o (o200k_base)

Tokens: 11
Chars:  39
Lines:  1
```

---

### 3. Hứng dữ liệu từ stdin (pipe)

Bạn có thể truyền kết quả từ các script tạo nội dung, nén dữ liệu hoặc git diff trực tiếp vào `token-diff` thông qua ký hiệu `-`:

```bash
# So sánh tệp gốc với kết quả script vừa tạo ra
cat compressed_output.json | token-diff diff baseline.json -

# Đếm nhanh số token của git diff commit gần nhất
git diff HEAD~1 | token-diff count -
```

---

## Dùng làm thư viện (SDK)

Gói `token-diff` hỗ trợ đầy đủ type TypeScript:

```typescript
import {
  countTokens,
  computeDiff,
  formatHuman,
  formatJson,
  TokenDiffReport
} from 'token-diff';

// 1. Đếm token từng đoạn văn bản
const original = countTokens('Hãy viết một bài hướng dẫn chi tiết về container Docker.', 'gpt-4o');
const compressed = countTokens('Hướng dẫn về container Docker.', 'gpt-4o');

// 2. Tính toán độ chênh lệch
const diffReport: TokenDiffReport = computeDiff(original, compressed, {
  beforeLabel: 'original',
  afterLabel: 'compressed',
});

console.log(`Tiết kiệm được ${Math.abs(diffReport.diff.token_delta)} tokens!`);
console.log(formatHuman(diffReport));

// 3. Xuất JSON envelope nếu cần
const jsonStr: string = formatJson(diffReport, 12);
```

---

## Cấu trúc JSON Envelope chuẩn

Khi bật cờ `--json`, dữ liệu luôn được bọc trong cấu trúc envelope rõ ràng:

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

## Mã lỗi và Exit Code

Hệ thống mã thoát được định nghĩa rõ ràng, giúp các pipeline CI/CD nhận biết chính xác trạng thái:

| Exit Code | Mã lỗi | Ý nghĩa / Tình huống |
|:---:|---|---|
| `0` | - | Chạy thành công. |
| `1` | `INTERNAL_ERROR` | Lỗi ngoại lệ ngoài ý muốn hoặc lỗi đọc luồng pipe. |
| `2` | `INVALID_INPUT` / `UNSUPPORTED_OPERATION` | Sai cú pháp tham số, cả hai đầu vào đều là `-`, hoặc model không hỗ trợ. |
| `3` | `NOT_FOUND` | Không tìm thấy tệp được chỉ định. |
| `4` | `PERMISSION_DENIED` | Không có quyền đọc tệp. |

#### Khi gặp lỗi với cờ `--json`:
Thông tin lỗi được xuất ra `stdout` dưới dạng JSON có cấu trúc:
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

## Các model và encoding hỗ trợ

Bạn có thể truyền tên model phổ biến hoặc trực tiếp tên bộ mã hóa (encoding):

| Encoding | Các model thông dụng |
|---|---|
| `o200k_base` | `gpt-4o`, `gpt-4o-mini`, `chatgpt-4o-latest`, `o1`, `o1-mini`, `o1-preview` |
| `cl100k_base` | `gpt-4`, `gpt-4-turbo`, `gpt-4-32k`, `gpt-3.5-turbo`, `text-embedding-ada-002`, `text-embedding-3-small`, `text-embedding-3-large` |
| `p50k_base` | `text-davinci-003`, `text-davinci-002` |
| `r50k_base` | `davinci` |

---

## Hiệu năng và tài nguyên

- **Khởi động**: ~80ms (thời gian nạp môi trường Node.js).
- **Tốc độ xử lý**: <15ms cho các tệp tài liệu thông thường (<10.000 tokens).
- **Bộ nhớ tiêu hao**: <40MB RAM.
- **Thuần tính toán trong bộ nhớ**: Tuyệt đối không tạo hay ghi tệp tạm ra ổ cứng.

---

## Phát triển và đóng góp

```bash
# Clone mã nguồn
git clone https://github.com/Khoa180806/token-diff.git
cd token-diff

# Cài đặt dependencies
npm install

# Chạy test suite (20 tests)
npm test

# Build mã production ra dist/
npm run build

# Kiểm tra type TypeScript
npm run lint
```

---

## Giấy phép

Mã nguồn mở phát hành theo giấy phép [MIT License](LICENSE).  
Dự án được duy trì bởi Khoa180806.
