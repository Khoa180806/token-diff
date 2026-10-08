export type Language = 'en' | 'vi';

export interface ModelOption {
  value: string;
  label: string;
  encoding: string;
  description: {
    en: string;
    vi: string;
  };
}

export const AVAILABLE_MODELS: ModelOption[] = [
  {
    value: 'gpt-4o',
    label: 'gpt-4o',
    encoding: 'o200k_base',
    description: {
      en: 'Omni flagship model (default)',
      vi: 'Mô hình đa phương thức flagship (mặc định)',
    },
  },
  {
    value: 'gpt-4o-mini',
    label: 'gpt-4o-mini',
    encoding: 'o200k_base',
    description: {
      en: 'Fast, cost-efficient omni model',
      vi: 'Mô hình siêu nhẹ, tối ưu chi phí',
    },
  },
  {
    value: 'o1',
    label: 'o1',
    encoding: 'o200k_base',
    description: {
      en: 'Reasoning model for complex math & code',
      vi: 'Mô hình suy luận chuyên sâu mã nguồn & logic',
    },
  },
  {
    value: 'o1-mini',
    label: 'o1-mini',
    encoding: 'o200k_base',
    description: {
      en: 'Fast reasoning model',
      vi: 'Mô hình suy luận tốc độ cao',
    },
  },
  {
    value: 'gpt-4-turbo',
    label: 'gpt-4-turbo',
    encoding: 'cl100k_base',
    description: {
      en: '128k context high-capability model',
      vi: 'Mô hình context 128k hiệu năng cao',
    },
  },
  {
    value: 'gpt-4',
    label: 'gpt-4',
    encoding: 'cl100k_base',
    description: {
      en: 'Standard GPT-4 base model',
      vi: 'Mô hình chuẩn GPT-4 tiền nhiệm',
    },
  },
  {
    value: 'gpt-3.5-turbo',
    label: 'gpt-3.5-turbo',
    encoding: 'cl100k_base',
    description: {
      en: 'Legacy high-throughput model',
      vi: 'Mô hình thế hệ cũ tốc độ cao',
    },
  },
  {
    value: 'text-davinci-003',
    label: 'text-davinci-003',
    encoding: 'p50k_base',
    description: {
      en: 'Legacy Davinci instruct model',
      vi: 'Mô hình chỉ thị Davinci cũ',
    },
  },
  {
    value: 'davinci',
    label: 'davinci',
    encoding: 'r50k_base',
    description: {
      en: 'Original GPT-3 base encoding',
      vi: 'Bộ mã hóa gốc GPT-3 ban đầu',
    },
  },
];

export interface ExamplePromptPair {
  name: {
    en: string;
    vi: string;
  };
  before: string;
  after: string;
}

export const EXAMPLE_PROMPTS: ExamplePromptPair[] = [
  {
    name: {
      en: 'System Prompt Compression',
      vi: 'Nén System Prompt trợ lý code',
    },
    before: `You are an exceptionally skilled, patient, and detail-oriented Senior Software Architect and Lead Developer.
Your objective and responsibility is to assist the user by writing production-ready, clean, maintainable, and fully documented TypeScript code.
Please make sure that every function includes exhaustive JSDoc comments explaining all parameters, return types, and possible thrown exceptions.
Always adhere to SOLID principles and clean code practices. Do not skip any implementation details or use placeholder comments like "// TODO" or "// implement here".
If any requirements appear ambiguous or underspecified, you must proactively ask targeted clarifying questions before writing code.`,
    after: `Senior TypeScript Architect. Write production-ready, type-safe, maintainable code.
Include concise JSDoc for exports. Follow SOLID. No placeholders or stubs.
Clarify ambiguous requirements before implementing.`,
  },
  {
    name: {
      en: 'Docker Tutorial Prompt',
      vi: 'Yêu cầu hướng dẫn Docker',
    },
    before: `Could you please provide a very detailed and comprehensive step-by-step tutorial explaining how to containerize a modern full-stack web application using Docker and Docker Compose?
I would like you to cover multi-stage builds, layer caching optimization, security hardening with non-root users, and healthcheck configurations.`,
    after: `Create a step-by-step full-stack Docker and Docker Compose tutorial covering:
- Multi-stage builds
- Layer cache optimization
- Non-root user security
- Healthcheck configs`,
  },
  {
    name: {
      en: 'Agent Tool Call Context',
      vi: 'Cắt giảm context cho Agent Tool Call',
    },
    before: `{"tool_name":"execute_sql_query","status":"success","timestamp":"2026-10-08T12:00:00Z","metadata":{"environment":"production","region":"us-east-1","latency_ms":142},"data":{"records":[{"id":101,"name":"Alice Smith","email":"alice.smith@corporate-domain.com","role":"admin","active":true,"created_at":"2025-01-15T08:30:00Z","updated_at":"2026-09-20T11:45:00Z"},{"id":102,"name":"Bob Jones","email":"bob.jones@corporate-domain.com","role":"member","active":true,"created_at":"2025-02-10T09:15:00Z","updated_at":"2026-08-11T14:20:00Z"}]}}`,
    after: `[{"id":101,"name":"Alice Smith","role":"admin"},{"id":102,"name":"Bob Jones","role":"member"}]`,
  },
];

export const I18N_STRINGS = {
  en: {
    playgroundBadge: 'Interactive Web Playground',
    playgroundHeading: 'Compare Prompt Tokens in Real-Time',
    playgroundSubheading: 'Tokenize inputs purely client-side with zero cloud calls, zero latency, and zero data leakage.',
    privacyNotice: 'Runs 100% in your browser — zero prompts are uploaded.',
    beforeTitle: 'Original (Before)',
    afterTitle: 'Optimized (After)',
    beforePlaceholder: 'Enter original prompt, system instruction, or raw text...',
    afterPlaceholder: 'Enter compressed or revised version...',
    modelSelectLabel: 'Select Model / Tokenizer',
    loadExample: 'Load Example',
    swapInputs: 'Swap',
    clearAll: 'Clear',
    tokensCard: 'Tokens Saved',
    reductionCard: 'Token Delta',
    charsCard: 'Characters',
    linesCard: 'Lines',
    statusCalculating: 'Calculating...',
    statusReady: 'Real-time sync',
    tabSummary: 'Visual Summary',
    tabJson: 'JSON Envelope',
    tabCli: 'CLI Command',
    copyJson: 'Copy JSON',
    copiedJson: 'Copied!',
    copyCli: 'Copy CLI',
    copiedCli: 'Copied!',
    tokensSavedWord: 'tokens saved',
    tokensIncreasedWord: 'tokens added',
    noChangeWord: 'No change in token count',
    charactersComparison: 'Characters',
    linesComparison: 'Lines',
    cliHelpNote: 'Run this exact comparison locally on your terminal:',
    emptyPromptNotice: 'Type or paste text above to see live token measurements.',
  },
  vi: {
    playgroundBadge: 'Playground Tương Tác Trực Tiếp',
    playgroundHeading: 'So Sánh Token Thời Gian Thực',
    playgroundSubheading: 'Phân tích và đếm token 100% trên trình duyệt. Không gọi API, không độ trễ mạng, an toàn dữ liệu tuyệt đối.',
    privacyNotice: 'Chạy 100% trong trình duyệt — không gửi bất kỳ nội dung nào lên máy chủ.',
    beforeTitle: 'Bản gốc (Trước khi tối ưu)',
    afterTitle: 'Bản rút gọn (Sau khi tối ưu)',
    beforePlaceholder: 'Dán câu prompt gốc, system instruction hoặc văn bản cần đo...',
    afterPlaceholder: 'Dán câu prompt rút gọn hoặc phiên bản mới...',
    modelSelectLabel: 'Chọn Model / Bộ mã hóa',
    loadExample: 'Dữ liệu mẫu',
    swapInputs: 'Đổi chỗ',
    clearAll: 'Xóa trắng',
    tokensCard: 'Số token tiết kiệm',
    reductionCard: 'Độ lệch token',
    charsCard: 'Số ký tự',
    linesCard: 'Số dòng',
    statusCalculating: 'Đang tính toán...',
    statusReady: 'Đồng bộ tức thì',
    tabSummary: 'Báo cáo trực quan',
    tabJson: 'JSON Envelope',
    tabCli: 'Lệnh Terminal tương ứng',
    copyJson: 'Sao chép JSON',
    copiedJson: 'Đã chép!',
    copyCli: 'Sao chép lệnh CLI',
    copiedCli: 'Đã chép!',
    tokensSavedWord: 'token đã tiết kiệm',
    tokensIncreasedWord: 'token tăng thêm',
    noChangeWord: 'Không đổi số lượng token',
    charactersComparison: 'Ký tự',
    linesComparison: 'Dòng',
    cliHelpNote: 'Chạy câu lệnh tương đương này ngay trên terminal của bạn:',
    emptyPromptNotice: 'Nhập hoặc dán văn bản vào ô phía trên để bắt đầu phân tích token.',
  },
};
