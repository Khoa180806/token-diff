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

export interface InstallSnippet {
  id: string;
  label: string;
  shortLabel: string;
  command: string;
  description: {
    en: string;
    vi: string;
  };
}

export const INSTALL_SNIPPETS: InstallSnippet[] = [
  {
    id: 'npx',
    label: 'npx (Zero install)',
    shortLabel: 'npx',
    command: 'npx ai-token-diff diff "Original prompt" "Optimized prompt"',
    description: {
      en: 'Run immediately in any terminal without installing',
      vi: 'Chạy tức thì trên mọi terminal mà không cần cài đặt',
    },
  },
  {
    id: 'global',
    label: 'npm global (td alias)',
    shortLabel: 'npm -g',
    command: 'npm install -g ai-token-diff',
    description: {
      en: 'Installs globally to unlock the concise td command',
      vi: 'Cài đặt global để kích hoạt lệnh viết tắt siêu ngắn td',
    },
  },
  {
    id: 'sdk',
    label: 'npm dependency (SDK)',
    shortLabel: 'npm i',
    command: 'npm install ai-token-diff',
    description: {
      en: 'Add to your Node.js or TypeScript project',
      vi: 'Tích hợp vào dự án Node.js hoặc TypeScript',
    },
  },
];

export const PROJECT_LINKS = {
  github: 'https://github.com/Khoa180806/token-diff',
  docs: 'https://github.com/Khoa180806/token-diff/tree/main/docs',
  license: 'https://github.com/Khoa180806/token-diff/blob/main/LICENSE',
};

export const I18N_STRINGS = {
  en: {
    navDocs: 'Docs',
    navGitHub: 'GitHub',
    heroBadge: 'v0.1.1 · Pure JavaScript · Zero WASM',
    heroTitlePre: 'Measure prompt token savings.',
    heroTitleHighlight: 'Locally. Instantly.',
    heroSubtitle: 'High-precision BPE token measurement and context diff infrastructure for LLMs, prompt engineering, and autonomous agent control planes. Zero cloud calls, 100% offline privacy.',
    heroCtaPlayground: 'Try Interactive Playground',
    heroCtaGithub: 'Star on GitHub',
    heroCtaDocs: 'Read Docs',
    quickInstallTitle: 'Quick Install & Run',
    pillLocal: '100% Local & Offline',
    pillPureJs: 'Zero Native C++ / No node-gyp',
    pillFast: 'Sub-15ms Execution',
    pillAgent: 'AI Agent Transport Envelope',
    copyCommand: 'Copy command',
    copiedCommand: 'Copied!',
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
    // Features strings
    featuresBadge: 'Architecture & Guarantees',
    featuresHeading: 'Engineered for Autonomous AI Systems',
    featuresSubheading:
      'Zero bloat, deterministic local execution, and developer velocity. Designed to run offline in CLI pipelines, GitHub Actions, and Web Workers.',
    featurePrivacyTitle: '100% Local & Zero Telemetry',
    featurePrivacyDesc:
      'All tokenization and diffing executes locally on your CPU or in-browser Web Worker. Zero HTTP requests, zero telemetry, zero prompt leakage.',
    featureAddonTitle: 'Zero Native Addons (No node-gyp)',
    featureAddonDesc:
      'Powered by pure js-tiktoken. Install effortlessly across Linux, macOS, Windows, Docker, and Web without C++ compilers or python build tools.',
    featureEnvelopeTitle: 'Agent-Ready JSON Envelope',
    featureEnvelopeDesc:
      'Strict schema with ISO timestamps, semver compatibility, and deterministic exit codes (0: clean, 1: diff found, 2: execution/syntax error).',
    featureSpeedTitle: 'Sub-Millisecond Latency',
    featureSpeedDesc:
      'Low memory footprint and cached BPE tokenizer instances ensure rapid benchmarking, instant CI checks, and lightweight CLI execution.',
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
    // Footer strings
    footerBuiltBy: 'Built with TypeScript, Tailwind CSS & Next.js.',
    footerLicense: 'Released under the MIT License.',
    footerGithub: 'GitHub Repository',
    footerDocumentation: 'Docs & Guides',
    footerBackToTop: 'Back to top',
    // Newly added translations
    tableTarget: 'Target',
    tableTokens: 'Tokens',
    tableChars: 'Chars',
    tableLines: 'Lines',
    tableDiff: 'Diff',
    statusIdle: 'idle',
    transportEnvelopeHeader: 'Standard v1.0 AI Agent Transport Envelope:',
    charsSuffix: 'chars',
    linesSuffix: 'lines',
    tokensSuffix: 'tokens',
    copyContent: 'Copy content',
    copiedContent: 'Copied content',
    savedWord: 'saved',
    reductionWord: 'reduction',
    featureTag1: 'Zero Telemetry',
    featureTag2: 'Pure JS BPE',
    featureTag3: 'RFC 3339 · v1.0',
    featureTag4: '< 1ms Latency',
    useCaseTag1: 'Prompt Engineering',
    useCaseTag2: 'CI / GitHub Actions',
    useCaseTag3: 'Autonomous Agents',
    snippetLabel: 'Snippet',
    terminalLabel: 'terminal',
    installMethodsLabel: 'Installation methods',
    beforeLabel: 'Original',
    afterLabel: 'Optimized',
  },
  vi: {
    navDocs: 'Tài liệu',
    navGitHub: 'GitHub',
    heroBadge: 'v0.1.1 · Thuần JavaScript · Không cần WASM',
    heroTitlePre: 'Đo lường mức tiết kiệm token prompt.',
    heroTitleHighlight: 'Cục bộ. Tức thì.',
    heroSubtitle: 'Hạ tầng đo lường context và độ lệch token BPE độ chính xác cao cho các luồng LLM, prompt engineering và AI Agent Control Plane. 100% bảo mật offline, không gọi API qua mạng.',
    heroCtaPlayground: 'Thử nghiệm Playground',
    heroCtaGithub: 'Star trên GitHub',
    heroCtaDocs: 'Xem tài liệu',
    quickInstallTitle: 'Cài đặt & Chạy nhanh',
    pillLocal: '100% Cục bộ & Bảo mật',
    pillPureJs: 'Thuần JS / Không lỗi node-gyp',
    pillFast: 'Độ trễ xử lý < 15ms',
    pillAgent: 'Chuẩn Envelope AI Agent',
    copyCommand: 'Sao chép lệnh',
    copiedCommand: 'Đã chép!',
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
    // Footer strings
    footerBuiltBy: 'Xây dựng với TypeScript, Tailwind CSS & Next.js.',
    footerLicense: 'Phát hành theo giấy phép MIT License.',
    footerGithub: 'Mã nguồn GitHub',
    footerDocumentation: 'Tài liệu hướng dẫn',
    footerBackToTop: 'Lên đầu trang',
    // Newly added translations
    tableTarget: 'Đối tượng',
    tableTokens: 'Token',
    tableChars: 'Ký tự',
    tableLines: 'Dòng',
    tableDiff: 'Độ lệch',
    statusIdle: 'chờ dữ liệu',
    transportEnvelopeHeader: 'Chuẩn Transport Envelope cho AI Agent v1.0:',
    charsSuffix: 'ký tự',
    linesSuffix: 'dòng',
    tokensSuffix: 'token',
    copyContent: 'Sao chép nội dung',
    copiedContent: 'Đã sao chép',
    savedWord: 'tiết kiệm',
    reductionWord: 'giảm',
    featureTag1: 'Không Telemetry',
    featureTag2: 'BPE Thuần JS',
    featureTag3: 'RFC 3339 · v1.0',
    featureTag4: 'Độ trễ < 1ms',
    useCaseTag1: 'Kỹ nghệ Prompt',
    useCaseTag2: 'CI / GitHub Actions',
    useCaseTag3: 'Agent Tự Trị',
    snippetLabel: 'Đoạn mã',
    terminalLabel: 'dòng lệnh',
    installMethodsLabel: 'Phương thức cài đặt',
    beforeLabel: 'Bản gốc',
    afterLabel: 'Sau tối ưu',
  },
};

