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
    // Hero strings
    heroBadge: 'Zero Native Dependencies · 100% Local BPE',
    heroTitlePart1: 'Measure Prompt Token Savings.',
    heroTitlePart2: 'Locally. Instantly.',
    heroSubtitle:
      'Ultra-fast CLI tool & TypeScript library for deterministic token measurement, context diffing, and prompt compression across LLM and agent workflows.',
    heroTryPlayground: 'Try Interactive Playground',
    heroViewOnGitHub: 'Star on GitHub',
    heroDocumentation: 'Documentation',
    heroInstallTabGlobal: 'Global CLI',
    heroInstallTabNpx: 'Run via npx',
    heroInstallTabLocal: 'Local Dev',
    heroCopiedCommand: 'Copied to clipboard!',
    // Features strings
    featuresBadge: 'Architecture & Guarantees',
    featuresHeading: 'Engineered for Deterministic Agent Systems',
    featuresSubheading:
      'Zero bloated dependencies. Strictly local token diffing designed for developer speed, agent pipelines, and automated CI assertions.',
    featurePrivacyTitle: '100% Local & Air-Gapped',
    featurePrivacyDesc:
      'Runs completely on your local CPU or in-browser WASM/JS. Zero external HTTP requests, zero telemetry, and zero prompt leakage.',
    featureAddonTitle: 'Zero Native Addons',
    featureAddonDesc:
      'Powered by js-tiktoken. Runs identically on Linux, macOS, Windows, Docker, and Web Workers without node-gyp or C++ compilation barriers.',
    featureEnvelopeTitle: 'Agent-First JSON Envelope',
    featureEnvelopeDesc:
      'Adheres strictly to RFC 3339, semantic versioning, and standard exit codes (0 for unchanged, 1 for diff found, 2 for syntax/system error).',
    featureSpeedTitle: 'Sub-Millisecond Execution',
    featureSpeedDesc:
      'Lightweight memory footprint and instant BPE parsing. Benchmark baseline frozen with consistent sub-millisecond diff generation.',
    // CLI Demo strings
    cliBadge: 'Terminal Experience',
    cliHeading: 'Live Terminal & Visual Diffing',
    cliSubheading:
      'Clear ANSI color coding and visual token diffs right in your CLI. Inspect additions, removals, and precise byte counts.',
    cliTabCount: 'Count & Inspect',
    cliTabDiff: 'Diffing Contexts',
    cliTabStdin: 'Unix Pipelines',
    cliTabJson: 'JSON Mode',
    // Use Cases strings
    useCasesBadge: 'Production Workflows',
    useCasesHeading: 'Where token-diff Fits in Your Stack',
    useCasesSubheading:
      'From reducing prompt engineering iteration cycles to hard CI token budgeting, token-diff brings precision to LLM operations.',
    useCase1Title: 'System Prompt Optimization',
    useCase1Desc:
      'Rapidly test condensed prompts, measure token reduction delta, and avoid hitting context window boundaries before production deployment.',
    useCase2Title: 'CI/CD Token Budget Gates',
    useCase2Desc:
      'Enforce non-regression token budget rules in GitHub Actions. Halt PRs if prompt changes increase context consumption beyond threshold limits.',
    useCase3Title: 'Autonomous Agent Tool Loops',
    useCase3Desc:
      'Parse JSON envelopes directly inside agent reasoning loops to audit and prune bloated tool call responses before feeding back into LLM memory.',
    // Ecosystem strings
    ecosystemBadge: 'Tools Ecosystem',
    ecosystemHeading: 'Part of the AI Developer Tool Ecosystem',
    ecosystemSubheading:
      'Built according to the rigorous quality, integration, and architecture specifications of the AI Developer Tool Ecosystem standard.',
    ecosystemSpecButton: 'View Specification',
    ecosystemDecisionLog: 'Decision Log (D-001 - D-023)',
    // Footer strings
    footerBuiltBy: 'Built with TypeScript, Tailwind CSS & Next.js.',
    footerLicense: 'Released under the MIT License.',
    footerGithub: 'GitHub Repository',
    footerDocumentation: 'Docs & Guides',
    footerBackToTop: 'Back to top',
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
    // Hero strings
    heroBadge: 'Không Native Dependencies · Thuần BPE Nội Bộ 100%',
    heroTitlePart1: 'Đo Lường Độ Lệch Token Prompt.',
    heroTitlePart2: 'Ngay Tại Máy. Tức Thì.',
    heroSubtitle:
      'Công cụ CLI siêu nhẹ và thư viện TypeScript chuẩn xác chuyên đo lường lượng token tiêu thụ, so sánh độ nén prompt và giám sát context cho các luồng LLM & Agent.',
    heroTryPlayground: 'Trải Nghiệm Playground',
    heroViewOnGitHub: 'Xem Trên GitHub',
    heroDocumentation: 'Xem Tài Liệu',
    heroInstallTabGlobal: 'Cài Đặt Toàn Cục',
    heroInstallTabNpx: 'Chạy Với npx',
    heroInstallTabLocal: 'Gói Dự Án',
    heroCopiedCommand: 'Đã sao chép vào bộ nhớ tạm!',
    // Features strings
    featuresBadge: 'Kiến Trúc & Cam Kết Chất Lượng',
    featuresHeading: 'Được Tối Ưu Cho Hệ Thống Agent Tự Trị',
    featuresSubheading:
      'Loại bỏ thư viện cồng kềnh. Đo lường và so sánh token 100% nội bộ, tối ưu cho tốc độ của lập trình viên và tích hợp CI tự động.',
    featurePrivacyTitle: '100% Cục Bộ & Bảo Mật Tuyệt Đối',
    featurePrivacyDesc:
      'Chạy hoàn toàn trên CPU máy hoặc Web Worker trên trình duyệt. Không gửi request HTTP ra ngoài, không gửi telemetry và không rò rỉ prompt.',
    featureAddonTitle: 'Không Phụ Thuộc Native Addon',
    featureAddonDesc:
      'Dựa trên nền tảng js-tiktoken chuẩn. Hoạt động đồng nhất trên Linux, macOS, Windows, Docker mà không gặp rào cản biên dịch C++ hay node-gyp.',
    featureEnvelopeTitle: 'Chuẩn JSON Envelope Cho Agent',
    featureEnvelopeDesc:
      'Tuân thủ chặt chẽ RFC 3339, Semantic Versioning và mã thoát (exit code 0: không đổi, 1: có độ lệch, 2: lỗi cú pháp/hệ thống).',
    featureSpeedTitle: 'Xử Lý Tốc Độ Dưới Một Mili-giây',
    featureSpeedDesc:
      'Chiếm dụng RAM tối thiểu và phân tích BPE siêu nhanh. Benchmark ổn định, tạo diff nhất quán và cực kỳ nhẹ nhàng.',
    // CLI Demo strings
    cliBadge: 'Trải Nghiệm Terminal',
    cliHeading: 'Giao Diện Dòng Lệnh & Diff Trực Quan',
    cliSubheading:
      'Màu sắc chuẩn ANSI rõ nét và biểu đồ so sánh token ngay trên terminal của bạn. Dễ dàng quan sát phần thêm, bớt và số byte chính xác.',
    cliTabCount: 'Đếm & Kiểm tra',
    cliTabDiff: 'So sánh Context',
    cliTabStdin: 'Đường ống Unix Pip',
    cliTabJson: 'Chế độ JSON',
    // Use Cases strings
    useCasesBadge: 'Ứng Dụng Thực Tế',
    useCasesHeading: 'token-diff Phục Vụ Gì Trong Dự Án Của Bạn?',
    useCasesSubheading:
      'Từ việc rút ngắn chu kỳ tối ưu prompt đến thiết lập rào chắn ngân sách token trên CI, token-diff mang lại sự chuẩn xác tối đa.',
    useCase1Title: 'Tối Ưu Hóa System Prompt',
    useCase1Desc:
      'Thử nghiệm và đo lường tức thì tỷ lệ rút gọn prompt, giúp giảm lượng token tiêu hao mà không vượt quá giới hạn cửa sổ ngữ cảnh (context window).',
    useCase2Title: 'Rào Chắn Ngân Sách Token Trên CI/CD',
    useCase2Desc:
      'Thiết lập kiểm tra tự động trong GitHub Actions. Chặn các Pull Request làm phình to context prompt vượt ngưỡng quy định.',
    useCase3Title: 'Chu Trình Tool Call Của AI Agent',
    useCase3Desc:
      'Phân tích JSON envelope ngay trong vòng lặp agent để cắt giảm dữ liệu thừa từ tool responses trước khi nạp lại vào bộ nhớ LLM.',
    // Ecosystem strings
    ecosystemBadge: 'Hệ Sinh Thái Công Cụ',
    ecosystemHeading: 'Thuộc AI Developer Tool Ecosystem',
    ecosystemSubheading:
      'Được thiết kế và kiểm thử nghiêm ngặt theo tiêu chuẩn kiến trúc, tích hợp và độ tin cậy của bộ quy chuẩn AI Developer Tool Ecosystem.',
    ecosystemSpecButton: 'Xem Bản Đặc Tả Kỹ Thuật',
    ecosystemDecisionLog: 'Nhật Ký Quyết Định (D-001 - D-023)',
    // Footer strings
    footerBuiltBy: 'Xây dựng với TypeScript, Tailwind CSS & Next.js.',
    footerLicense: 'Phát hành theo giấy phép MIT License.',
    footerGithub: 'Mã nguồn GitHub',
    footerDocumentation: 'Tài liệu hướng dẫn',
    footerBackToTop: 'Lên đầu trang',
  },
};
