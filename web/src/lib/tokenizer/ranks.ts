import { SupportedEncoding } from 'ai-token-diff';

export type RankModule = {
  default: {
    pat_str: string;
    special_tokens: Record<string, number>;
    bpe_ranks: string;
  };
};

export async function loadRankForEncoding(encoding: SupportedEncoding): Promise<RankModule['default']> {
  switch (encoding) {
    case 'o200k_base': {
      const mod = (await import('js-tiktoken/ranks/o200k_base')) as RankModule;
      return mod.default;
    }
    case 'cl100k_base': {
      const mod = (await import('js-tiktoken/ranks/cl100k_base')) as RankModule;
      return mod.default;
    }
    case 'p50k_base': {
      const mod = (await import('js-tiktoken/ranks/p50k_base')) as RankModule;
      return mod.default;
    }
    case 'r50k_base': {
      const mod = (await import('js-tiktoken/ranks/r50k_base')) as RankModule;
      return mod.default;
    }
    default: {
      const _exhaustiveCheck: never = encoding;
      throw new Error(`Unsupported encoding: ${_exhaustiveCheck}`);
    }
  }
}
