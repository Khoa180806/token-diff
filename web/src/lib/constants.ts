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
      vi: 'Flagship omni model (mặc định)',
    },
  },
  {
    value: 'gpt-4o-mini',
    label: 'gpt-4o-mini',
    encoding: 'o200k_base',
    description: {
      en: 'Fast, cost-efficient omni model',
      vi: 'Model omni nhanh, tối ưu chi phí',
    },
  },
  {
    value: 'o1',
    label: 'o1',
    encoding: 'o200k_base',
    description: {
      en: 'Reasoning model for complex math & code',
      vi: 'Reasoning model cho math & code phức tạp',
    },
  },
  {
    value: 'o1-mini',
    label: 'o1-mini',
    encoding: 'o200k_base',
    description: {
      en: 'Fast reasoning model',
      vi: 'Reasoning model tốc độ cao',
    },
  },
  {
    value: 'gpt-4-turbo',
    label: 'gpt-4-turbo',
    encoding: 'cl100k_base',
    description: {
      en: '128k context high-capability model',
      vi: 'Model 128k context hiệu năng cao',
    },
  },
  {
    value: 'gpt-4',
    label: 'gpt-4',
    encoding: 'cl100k_base',
    description: {
      en: 'Standard GPT-4 base model',
      vi: 'Standard GPT-4 model',
    },
  },
  {
    value: 'gpt-3.5-turbo',
    label: 'gpt-3.5-turbo',
    encoding: 'cl100k_base',
    description: {
      en: 'Legacy high-throughput model',
      vi: 'Legacy model tốc độ cao',
    },
  },
  {
    value: 'text-davinci-003',
    label: 'text-davinci-003',
    encoding: 'p50k_base',
    description: {
      en: 'Legacy Davinci instruct model',
      vi: 'Legacy Davinci instruct model',
    },
  },
  {
    value: 'davinci',
    label: 'davinci',
    encoding: 'r50k_base',
    description: {
      en: 'Original GPT-3 base encoding',
      vi: 'Encoding gốc của GPT-3 (r50k)',
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
      vi: 'Tối ưu System Prompt',
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
      vi: 'Prompt hướng dẫn Docker',
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
      vi: 'Context Agent Tool Call',
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
      vi: 'Chạy tức thì trên mọi terminal, zero install',
    },
  },
  {
    id: 'global',
    label: 'npm global (td alias)',
    shortLabel: 'npm -g',
    command: 'npm install -g ai-token-diff',
    description: {
      en: 'Installs globally to unlock the concise td command',
      vi: 'Cài đặt global để dùng lệnh tắt td siêu gọn',
    },
  },
  {
    id: 'sdk',
    label: 'npm dependency (SDK)',
    shortLabel: 'npm i',
    command: 'npm install ai-token-diff',
    description: {
      en: 'Add to your Node.js or TypeScript project',
      vi: 'Tích hợp vào dự án Node.js / TypeScript dưới dạng SDK',
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
    navDocs: 'Docs',
    navGitHub: 'GitHub',
    heroBadge: 'v0.1.1 · Pure JavaScript · Zero WASM',
    heroTitlePre: 'Đo lường token prompt tiết kiệm.',
    heroTitleHighlight: 'Local. Tức thì.',
    heroSubtitle: 'Hạ tầng đo lường context và token diff BPE độ chính xác cao cho LLM, prompt engineering và AI agent control plane. 100% offline privacy, zero API call.',
    heroCtaPlayground: 'Thử Playground',
    heroCtaGithub: 'Star trên GitHub',
    heroCtaDocs: 'Xem Docs',
    quickInstallTitle: 'Cài đặt & Chạy nhanh',
    pillLocal: '100% Local & Offline',
    pillPureJs: 'Pure JS / Zero node-gyp',
    pillFast: 'Sub-15ms Execution',
    pillAgent: 'AI Agent Transport Envelope',
    copyCommand: 'Copy command',
    copiedCommand: 'Copied!',
    playgroundBadge: 'Interactive Playground',
    playgroundHeading: 'So Sánh Token Thời Gian Thực',
    playgroundSubheading: 'Tokenize và so sánh 100% client-side trong trình duyệt. Zero network call, zero latency, bảo mật dữ liệu tuyệt đối.',
    privacyNotice: 'Chạy 100% trong browser — zero prompt bị upload.',
    beforeTitle: 'Original (Before)',
    afterTitle: 'Optimized (After)',
    beforePlaceholder: 'Dán prompt gốc, system instruction hoặc raw text...',
    afterPlaceholder: 'Dán prompt đã rút gọn hoặc phiên bản mới...',
    modelSelectLabel: 'Chọn Model / Tokenizer',
    loadExample: 'Prompt mẫu',
    swapInputs: 'Swap',
    clearAll: 'Clear',
    tokensCard: 'Tokens Saved',
    reductionCard: 'Token Delta',
    charsCard: 'Characters',
    linesCard: 'Lines',
    statusCalculating: 'Đang tính toán...',
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
    noChangeWord: 'Token count không đổi',
    charactersComparison: 'Characters',
    linesComparison: 'Lines',
    cliHelpNote: 'Chạy lệnh so sánh trực tiếp trên terminal của bạn:',
    emptyPromptNotice: 'Nhập hoặc dán prompt vào ô trên để xem kết quả đo token thời gian thực.',
    // Features strings
    featuresBadge: 'Architecture & Guarantees',
    featuresHeading: 'Thiết Kế Riêng Cho Hệ Thống Autonomous AI',
    featuresSubheading:
      'Zero bloatware, deterministic local execution và tối ưu tốc độ cho developer. Chạy offline mượt mà trong CLI pipeline, GitHub Actions và Web Worker.',
    featurePrivacyTitle: '100% Local & Zero Telemetry',
    featurePrivacyDesc:
      'Toàn bộ quá trình tokenize và diff thực thi trực tiếp trên CPU hoặc Web Worker trong trình duyệt. Không HTTP request, không telemetry, không rò rỉ prompt.',
    featureAddonTitle: 'Zero Native Addons (No node-gyp)',
    featureAddonDesc:
      'Chạy hoàn toàn trên pure js-tiktoken. Cài đặt trơn tru trên Linux, macOS, Windows, Docker mà không cần C++ compiler hay build tool phức tạp.',
    featureEnvelopeTitle: 'Agent-Ready JSON Envelope',
    featureEnvelopeDesc:
      'Tuân thủ schema chuẩn với ISO timestamp, semantic versioning và deterministic exit code (0: clean, 1: diff found, 2: syntax/execution error).',
    featureSpeedTitle: 'Sub-Millisecond Latency',
    featureSpeedDesc:
      'Memory footprint cực thấp cùng BPE tokenizer cache thông minh. Đảm bảo tốc độ benchmark tức thì, pass CI nhanh và CLI cực nhẹ.',
    // CLI Demo strings
    cliBadge: 'Terminal Experience',
    cliHeading: 'Live Terminal & Visual Diffing',
    cliSubheading:
      'Màu sắc chuẩn ANSI rõ nét cùng bảng so sánh trực quan ngay trên terminal. Dễ dàng quan sát phần thêm, bớt và số byte chính xác.',
    cliTabCount: 'Count & Inspect',
    cliTabDiff: 'Diffing Contexts',
    cliTabStdin: 'Unix Pipelines',
    cliTabJson: 'JSON Mode',
    // Use Cases strings
    useCasesBadge: 'Production Workflows',
    useCasesHeading: 'token-diff Trong Stack Kỹ Thuật Của Bạn',
    useCasesSubheading:
      'Từ tối ưu vòng lặp prompt engineering đến thiết lập token budget gate trên CI, token-diff đem lại sự chuẩn xác tuyệt đối cho hệ thống LLM.',
    useCase1Title: 'Tối Ưu Hóa System Prompt',
    useCase1Desc:
      'Kiểm thử nhanh prompt rút gọn, đo lường token delta và tránh vượt quá context window limit trước khi deploy lên production.',
    useCase2Title: 'CI/CD Token Budget Gates',
    useCase2Desc:
      'Thiết lập rule kiểm tra token budget tự động trong GitHub Actions. Chặn PR nếu prompt thay đổi làm phình to context vượt quá ngưỡng cho phép.',
    useCase3Title: 'Autonomous Agent Tool Loops',
    useCase3Desc:
      'Parse JSON envelope trực tiếp trong reasoning loop của agent để audit và cắt tỉa bớt tool call payload cồng kềnh trước khi nạp vào LLM memory.',
    // Footer strings
    footerBuiltBy: 'Xây dựng với TypeScript, Tailwind CSS & Next.js.',
    footerLicense: 'Phát hành theo giấy phép MIT License.',
    footerGithub: 'GitHub Repository',
    footerDocumentation: 'Docs & Guides',
    footerBackToTop: 'Lên đầu trang',
    // Newly added translations
    tableTarget: 'Target',
    tableTokens: 'Tokens',
    tableChars: 'Chars',
    tableLines: 'Lines',
    tableDiff: 'Diff',
    statusIdle: 'Ready',
    transportEnvelopeHeader: 'Chuẩn AI Agent JSON Envelope (v1.0):',
    charsSuffix: 'chars',
    linesSuffix: 'lines',
    tokensSuffix: 'tokens',
    copyContent: 'Copy',
    copiedContent: 'Copied!',
    savedWord: 'saved',
    reductionWord: 'giảm',
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
    beforeLabel: 'Before',
    afterLabel: 'After',
  },
};

