import { ImageResponse } from 'next/og';

export const alt = 'token-diff — Fast, Local Token Measurement & Prompt Diffing';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#09090b',
          color: '#f4f4f5',
          fontFamily: 'monospace, sans-serif',
          padding: '60px 80px',
          backgroundImage:
            'radial-gradient(circle at 50% 10%, rgba(16, 185, 129, 0.15), transparent 70%)',
        }}
      >
        {/* Top Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: '#18181b',
                border: '1px solid #27272a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#34d399',
                fontSize: '22px',
                fontWeight: 'bold',
              }}
            >
              td
            </div>
            <span
              style={{
                fontSize: '28px',
                fontWeight: 'bold',
                letterSpacing: '-0.03em',
                color: '#fafafa',
              }}
            >
              token-diff
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '6px 16px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#34d399',
              fontSize: '15px',
            }}
          >
            v0.1.1 · Pure JavaScript · Zero WASM
          </div>
        </div>

        {/* Center Main Message */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '16px',
            maxWidth: '900px',
          }}
        >
          <h1
            style={{
              fontSize: '56px',
              fontWeight: 900,
              lineHeight: 1.15,
              margin: 0,
              color: '#fafafa',
            }}
          >
            Measure prompt token savings.{' '}
            <span style={{ color: '#34d399' }}>Locally. Instantly.</span>
          </h1>

          <p
            style={{
              fontSize: '20px',
              color: '#a1a1aa',
              margin: 0,
              lineHeight: 1.5,
              maxWidth: '800px',
            }}
          >
            Zero-dependency, offline-first token measurement and context diff
            infrastructure for LLMs, prompt engineering, and autonomous agents.
          </p>

          {/* Terminal Box */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#18181b',
              border: '1px solid #27272a',
              borderRadius: '10px',
              padding: '12px 24px',
              color: '#34d399',
              fontSize: '18px',
              marginTop: '10px',
            }}
          >
            <span style={{ color: '#71717a', marginRight: '10px' }}>$</span>
            <span>npx ai-token-diff diff "Original prompt" "Optimized prompt"</span>
          </div>
        </div>

        {/* Bottom Feature Badges */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '15px',
              color: '#d4d4d8',
              backgroundColor: '#18181b',
              padding: '6px 14px',
              borderRadius: '9999px',
              border: '1px solid #27272a',
            }}
          >
            🔒 100% Local & Offline Privacy
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '15px',
              color: '#d4d4d8',
              backgroundColor: '#18181b',
              padding: '6px 14px',
              borderRadius: '9999px',
              border: '1px solid #27272a',
            }}
          >
            ⚡ Sub-15ms Pure JS BPE
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '15px',
              color: '#d4d4d8',
              backgroundColor: '#18181b',
              padding: '6px 14px',
              borderRadius: '9999px',
              border: '1px solid #27272a',
            }}
          >
            🤖 AI Agent JSON Transport Envelope
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
