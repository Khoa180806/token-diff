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
11. [Câu hỏi thường gặp (FAQ)](#câu-hỏi-thường-gặp-faq)
12. [Phát triển và đóng góp](#phát-triển-và-đóng-góp)
13. [Giấy phép](#giấy-phép)

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

<p align="center"><img src="assets/architecture.png" alt="Kiến trúc 4 giai đoạn pipeline của token-diff" width="100%" /></p>

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
- **So sánh 2 tệp TypeScript**: `td diff formatter.ts formatter.v2.ts`
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

<p align="center"><img src="assets/demo-diff.png" alt="Kết quả lệnh td diff" width="100%" /></p>

---

### 2. `td count` (hoặc `token-diff count`)

Đếm số lượng token, ký tự và số dòng của một tệp, chuỗi prompt trực tiếp hoặc dữ liệu pipe:

```bash
td count [tùy_chọn] <tệp_hoặc_chuỗi>
```

#### Ví dụ:
```bash
# Đếm token của một tệp markdown
td count README.md --model gpt-4o

# Đếm token trực tiếp cho một câu prompt
td count "Bạn là một kỹ sư phần mềm cao cấp."
```

<p align="center"><img src="assets/demo-count.png" alt="Kết quả lệnh td count" width="100%" /></p>

---

### 3. Hứng dữ liệu từ stdin (pipe)

Bạn có thể truyền kết quả từ các script tạo nội dung, nén dữ liệu hoặc git diff trực tiếp vào `token-diff` thông qua ký hiệu `-`:

```bash
# So sánh tệp gốc với kết quả script vừa tạo ra
cat optimized.txt | td diff original.txt -

# Đếm nhanh số token của git diff commit gần nhất
git diff HEAD~1 | td count -

# Pipe vào jq để scripting tự động hóa
cat prompt.txt | td diff base.txt - --json | jq .data.diff.token_delta
```

<p align="center"><img src="assets/demo-stdin.png" alt="Dùng stdin pipe với token-diff" width="100%" /></p>

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

<p align="center"><img src="assets/json-mode.png" alt="JSON envelope output với syntax highlighting" width="100%" /></p>


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

## Câu hỏi thường gặp (FAQ)

### `token-diff` có yêu cầu API key OpenAI hay kết nối internet không?
**Hoàn toàn không.** `token-diff` chạy 100% offline ngay trên máy tính của bạn thông qua thuật toán Byte Pair Encoding (BPE) của `js-tiktoken`. Công cụ không gửi bất kỳ dữ liệu văn bản hay metadata nào qua mạng, không cần tài khoản, không cần API key và không bao giờ gặp tình trạng giới hạn lượt gọi (rate limit).

### `token-diff` khác gì so với lệnh `diff` hoặc `wc` thông thường?
Các công cụ truyền thống chỉ đếm số dòng (`wc -l`), số ký tự (`wc -c`) hoặc dòng thay đổi (`diff`). Tuy nhiên, các mô hình ngôn ngữ lớn (LLM) tính chi phí và giới hạn ngữ cảnh theo **token BPE (sub-words)**, vốn không tương ứng 1:1 với từ ngữ, ký tự hay dòng. `token-diff` đo lường chính xác lượng token tăng/giảm theo từng bộ từ điển của từng mô hình, giúp bạn kiểm soát ngân sách context một cách tuyệt đối.

### Những mô hình (model) và bộ mã hóa (encoding) nào được hỗ trợ?
`token-diff` hỗ trợ sẵn tất cả các bộ tokenizer thông dụng của OpenAI:
- `o200k_base` (`gpt-4o`, `gpt-4o-mini`, `o1`, `o1-mini`, `o1-preview`)
- `cl100k_base` (`gpt-4`, `gpt-4-turbo`, `gpt-3.5-turbo`, các model embedding)
- `p50k_base` / `r50k_base` (Các model Davinci cũ)

Bạn có thể truyền tên model (ví dụ `--model gpt-4o`) hoặc trực tiếp tên encoding (ví dụ `--model o200k_base`).

### Cơ chế Smart Input fallback hoạt động ra sao?
Khi truyền tham số vào `td diff` hoặc `td count`, công cụ sẽ kiểm tra xem đường dẫn có tồn tại trên ổ cứng hay không. Nếu không tìm thấy tệp, công cụ tự động coi chuỗi đó là nội dung văn bản thô (prompt) và in cảnh báo nhẹ `[WARN]` ra stderr. Điều này giúp bạn so sánh nhanh hai câu prompt trực tiếp trên terminal mà không cần mất công tạo tệp tạm.

### Tôi có thể tích hợp `token-diff` vào luồng CI/CD không?
**Có.** `token-diff` tuân thủ hệ thống exit code chuẩn mực:
- `0`: Thành công
- `1`: Lỗi nội bộ hoặc lỗi đọc luồng pipe
- `2`: Sai tham số dòng lệnh hoặc model không được hỗ trợ
- `3`: Không tìm thấy tệp chỉ định (trong chế độ kiểm tra nghiêm ngặt)
- `4`: Không có quyền đọc tệp (Permission Denied)

Khi kết hợp cùng cờ `--json`, kết quả được xuất dưới dạng JSON envelope chuẩn, dễ dàng parse bằng `jq` hoặc dùng làm assertion gate trong GitHub Actions, GitLab CI.

### Cài đặt `token-diff` có cần cài compiler C++ hay Python không?
**Không.** Khác với gói tiktoken gốc bằng Rust/Python cần trình biên dịch native (node-gyp, Visual C++ Build Tools), `token-diff` là mã nguồn thuần JavaScript 100%. Bạn có thể cài đặt mượt mà qua npm trên mọi hệ điều hành (Windows, macOS, Linux, Alpine Docker).

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
