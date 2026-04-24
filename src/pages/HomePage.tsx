import { useEffect } from 'react';
import { CONFIG } from '../config';

const C = {
  ink: '#2a2119',
  paper: '#f7f1e3',
  paperDeep: '#ede3cb',
  red: '#d64545',
  blue: '#2d5fa8',
  green: '#4a8a3f',
  yellow: '#f2c94c',
  pink: '#e087b5',
} as const;

const ACCENTS = [C.red, C.blue, C.green, C.pink, C.yellow];

type ResourceKey = 'videos' | 'flashcards' | 'infographic' | 'scienceLab' | 'presentation';

interface NbResource {
  key: ResourceKey;
  tag: string;
  title: string;
  description: string;
  buttonText: string;
  url: string;
}

const TAGS: Record<ResourceKey, string> = {
  videos: 'Video Series',
  flashcards: 'Flashcard Deck',
  infographic: 'Visual Guide',
  scienceLab: 'Science Lab',
  presentation: 'Slide Deck',
};

const RESOURCES: NbResource[] = [
  { key: 'videos', tag: TAGS.videos, title: CONFIG.resources.videos.title, description: CONFIG.resources.videos.description, buttonText: CONFIG.resources.videos.buttonText, url: CONFIG.resources.videos.url },
  { key: 'flashcards', tag: TAGS.flashcards, title: CONFIG.resources.flashcards.title, description: CONFIG.resources.flashcards.description, buttonText: CONFIG.resources.flashcards.buttonText, url: CONFIG.resources.flashcards.url },
  { key: 'infographic', tag: TAGS.infographic, title: CONFIG.resources.infographic.title, description: CONFIG.resources.infographic.description, buttonText: CONFIG.resources.infographic.buttonText, url: CONFIG.resources.infographic.url },
  { key: 'scienceLab', tag: TAGS.scienceLab, title: CONFIG.resources.scienceLab.title, description: CONFIG.resources.scienceLab.description, buttonText: CONFIG.resources.scienceLab.buttonText, url: CONFIG.resources.scienceLab.url },
  { key: 'presentation', tag: TAGS.presentation, title: CONFIG.resources.presentation.title, description: CONFIG.resources.presentation.description, buttonText: CONFIG.resources.presentation.buttonText, url: CONFIG.resources.presentation.url },
];

// ── SVG Icons ──────────────────────────────────────────────────────────────
function ResourceIcon({ k, size = 26 }: { k: ResourceKey; size?: number }) {
  const s = { width: size, height: size } as const;
  const p = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (k) {
    case 'videos':
      return <svg {...s} viewBox="0 0 24 24" {...p}><polygon points="5 3 19 12 5 21 5 3" /></svg>;
    case 'flashcards':
      return <svg {...s} viewBox="0 0 24 24" {...p}><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>;
    case 'infographic':
      return <svg {...s} viewBox="0 0 24 24" {...p}><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>;
    case 'scienceLab':
      return <svg {...s} viewBox="0 0 24 24" {...p}><path d="M9 2v7L4 19a2 2 0 0 0 1.8 2.8h12.4A2 2 0 0 0 20 19L15 9V2" /><line x1="9" y1="2" x2="15" y2="2" /></svg>;
    case 'presentation':
      return <svg {...s} viewBox="0 0 24 24" {...p}><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>;
  }
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 5l4 3-4 3" />
    </svg>
  );
}

// ── Notebook elements ──────────────────────────────────────────────────────
function NotebookLines() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent 0 31px, rgba(45,95,168,0.08) 31px 32px),
          radial-gradient(ellipse at 30% 0%, rgba(0,0,0,0.025) 0%, transparent 55%)
        `,
      }}
    />
  );
}

function Atom({ size = 60, color = C.ink, style }: { size?: number; color?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ overflow: 'visible', ...style }} className="animate-nb-spin" aria-hidden="true">
      <ellipse cx="50" cy="50" rx="40" ry="16" fill="none" stroke={color} strokeWidth="2" />
      <ellipse cx="50" cy="50" rx="40" ry="16" fill="none" stroke={color} strokeWidth="2" transform="rotate(60 50 50)" />
      <ellipse cx="50" cy="50" rx="40" ry="16" fill="none" stroke={color} strokeWidth="2" transform="rotate(-60 50 50)" />
      <circle cx="50" cy="50" r="5" fill={color} />
    </svg>
  );
}

function Squiggle({ color = C.ink, width = 90 }: { color?: string; width?: number }) {
  return (
    <svg viewBox="0 0 90 10" width={width} height={10} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <path d="M2 5 Q 10 0, 18 5 T 34 5 T 50 5 T 66 5 T 82 5" />
    </svg>
  );
}

function Tape({ color = C.yellow, rot = -3, w = 80, style }: { color?: string; rot?: number; w?: number; style?: React.CSSProperties }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-block', width: w, height: 22,
        background: `${color}d9`,
        transform: `rotate(${rot}deg)`,
        boxShadow: '0 3px 6px rgba(0,0,0,0.07)',
        ...style,
      }}
    />
  );
}

// ── Resource card ──────────────────────────────────────────────────────────
function ResourceCard({ r, index }: { r: NbResource; index: number }) {
  const accent = ACCENTS[index % ACCENTS.length];
  const rot = index % 2 === 0 ? 'rotate(-0.4deg)' : 'rotate(0.5deg)';
  return (
    <a
      href={r.url}
      className="resource-card opacity-0"
      style={{
        position: 'relative',
        background: '#fffdf6',
        border: `1.5px solid ${C.ink}`,
        borderRadius: 10,
        padding: '28px 24px 22px',
        boxShadow: `6px 6px 0 ${C.ink}18`,
        transform: rot,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        minHeight: 200,
        textDecoration: 'none',
        color: C.ink,
        transition: 'filter 0.15s',
      }}
      aria-label={`${r.title}: ${r.description}`}
    >
      <Tape color={accent} rot={index % 2 === 0 ? -8 : 6} w={60}
        style={{ position: 'absolute', top: -12, left: 20 }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        <div style={{
          width: 54, height: 54, flexShrink: 0,
          border: `2px solid ${C.ink}`, borderRadius: 13,
          background: `${accent}22`,
          display: 'grid', placeItems: 'center',
          position: 'relative', color: C.ink,
        }}>
          <ResourceIcon k={r.key} size={24} />
          <span style={{
            position: 'absolute', top: -8, right: -10,
            fontFamily: '"Caveat", cursive', fontSize: 19,
            color: accent, fontWeight: 700,
            transform: 'rotate(6deg)',
          }}>
            #{index + 1}
          </span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: '"Caveat", cursive', fontSize: 14, color: accent, fontWeight: 700, marginBottom: 2 }}>
            {r.tag}
          </div>
          <h3 style={{ fontFamily: '"Fraunces", serif', fontWeight: 600, fontSize: 19, margin: 0, color: C.ink, lineHeight: 1.1 }}>
            {r.title}
          </h3>
        </div>
      </div>

      <p style={{ fontSize: 13.5, lineHeight: 1.55, color: '#4b3f32', margin: '14px 0 0' }}>
        {r.description}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 }}>
        <Squiggle color={`${accent}88`} width={90} />
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '8px 14px',
          background: C.ink, color: C.paper,
          borderRadius: 999, fontWeight: 700, fontSize: 12.5,
          fontFamily: '"Nunito", system-ui',
          whiteSpace: 'nowrap',
        }}>
          {r.buttonText} <ArrowIcon />
        </span>
      </div>
    </a>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function HomePage() {
  useEffect(() => {
    const cards = document.querySelectorAll('.resource-card');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('animate-fade-in-up');
        });
      },
      { threshold: 0.08 }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{
      width: '100%', minHeight: '100vh', position: 'relative',
      background: `radial-gradient(ellipse at 50% 0%, ${C.paper} 0%, ${C.paperDeep} 100%)`,
      color: C.ink, fontFamily: '"Nunito", system-ui, sans-serif',
      overflow: 'hidden',
    }}>
      <NotebookLines />

      {/* Red margin line */}
      <span aria-hidden="true" style={{
        position: 'fixed', top: 0, bottom: 0,
        left: 'clamp(46px, 7.5vw, 80px)', width: 1.5,
        background: `${C.red}55`, pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Hole punches */}
      {[150, 490, 830, 1170].map((y) => (
        <span key={y} aria-hidden="true" style={{
          position: 'absolute', left: 'clamp(14px, 2.2vw, 28px)', top: y,
          width: 20, height: 20, borderRadius: '50%',
          background: '#e5dcc0', boxShadow: 'inset 0 2px 3px rgba(0,0,0,0.15)',
          pointerEvents: 'none', zIndex: 2,
        }} />
      ))}

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header style={{
        position: 'relative', zIndex: 3,
        padding: 'clamp(16px, 3.5vw, 28px) clamp(20px, 5vw, 60px) 12px clamp(56px, 9vw, 120px)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Atom size={34} color={C.ink} />
          <div>
            <div style={{ fontFamily: '"Fraunces", serif', fontWeight: 600, fontSize: 16, letterSpacing: '-0.01em' }}>
              The Hidden World
            </div>
            <div style={{ fontFamily: '"Caveat", cursive', fontSize: 13, color: `${C.ink}88`, marginTop: -2 }}>
              a quantum field journal
            </div>
          </div>
        </div>
        <div style={{
          fontFamily: '"Caveat", cursive', fontSize: 17, color: C.red,
          border: `1.5px dashed ${C.red}`,
          padding: '5px 13px', borderRadius: 8,
          transform: 'rotate(-2deg)', background: `${C.red}0d`,
        }}>
          ★ Reader Bonus Pack ★
        </div>
      </header>

      <main id="main-content" style={{ position: 'relative', zIndex: 3 }}>

        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <section className="grid grid-cols-1 md:grid-cols-2" style={{
          padding: 'clamp(18px, 4vw, 30px) clamp(20px, 5vw, 60px) clamp(28px, 5vw, 50px) clamp(56px, 9vw, 120px)',
          gap: 'clamp(24px, 4vw, 40px)',
          alignItems: 'center',
        }}>
          {/* Left: text */}
          <div>
            <div style={{
              fontFamily: '"Caveat", cursive', fontSize: 'clamp(20px, 2.5vw, 26px)',
              color: C.blue, transform: 'rotate(-2deg)',
              display: 'inline-block', marginBottom: 8,
            }}>
              Hey future scientist —
            </div>
            <h1 style={{
              fontFamily: '"Fraunces", serif', fontWeight: 600,
              fontSize: 'clamp(34px, 5.5vw, 60px)',
              lineHeight: 1.02, letterSpacing: '-0.02em',
              margin: '0 0 18px', color: C.ink,
            }}>
              You finished<br />the book.{' '}
              <span style={{ position: 'relative', display: 'inline-block' }}>
                Now the fun part.
                <svg viewBox="0 0 280 14" preserveAspectRatio="none" style={{ position: 'absolute', left: 0, right: 0, bottom: -4, width: '100%', height: 12 }}>
                  <path d="M2 8 Q 50 2, 100 7 T 200 6 T 278 8" fill="none" stroke={C.yellow} strokeWidth="6" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p style={{ fontSize: 'clamp(13.5px, 1.4vw, 16.5px)', lineHeight: 1.62, color: `${C.ink}cc`, maxWidth: 460, margin: '0 0 24px' }}>
              Thanks for reading <strong>Quantum Physics for Kids: The Hidden World</strong>.
              Below are five bonus resources — videos, experiments, flashcards and more —
              to help your young scientist keep exploring.
            </p>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
              <a href="#resources" style={{
                padding: '12px 20px', borderRadius: 999,
                background: C.ink, color: C.paper,
                fontWeight: 700, textDecoration: 'none', fontSize: 14.5,
                display: 'inline-flex', alignItems: 'center', gap: 8,
                boxShadow: `4px 4px 0 ${C.yellow}`,
              }}>
                Open the bonus pack <ArrowIcon />
              </a>
              <a href="#review" style={{
                fontFamily: '"Caveat", cursive', fontSize: 19, color: C.red,
                textDecoration: 'underline', textDecorationStyle: 'wavy',
                textUnderlineOffset: 6,
              }}>
                or leave a quick review →
              </a>
            </div>
          </div>

          {/* Right: polaroid book cover */}
          <div style={{ position: 'relative', display: 'grid', placeItems: 'center', paddingTop: 20 }}>
            <div style={{
              background: '#fffdf6',
              padding: '14px 14px 48px',
              border: `1.5px solid ${C.ink}22`,
              boxShadow: '0 28px 48px -18px rgba(0,0,0,0.22), 0 6px 16px rgba(0,0,0,0.06)',
              transform: 'rotate(3deg)', position: 'relative',
            }}>
              <Tape color={C.blue} rot={-6} w={90}
                style={{ position: 'absolute', top: -12, left: '50%', marginLeft: -45 }} />
              <img
                src="/book-mockup.jpg"
                alt="Quantum Physics for Kids: The Hidden World by A. L. Umari"
                style={{ width: 'clamp(180px, 20vw, 260px)', height: 'auto', display: 'block', borderRadius: 2 }}
              />
              <div style={{ fontFamily: '"Caveat", cursive', fontSize: 22, color: C.ink, textAlign: 'center', marginTop: 10 }}>
                The Hidden World ✨
              </div>
            </div>
            <Atom size={58} color={C.pink} style={{ position: 'absolute', top: 0, right: 10, opacity: 0.65 }} />
            {/* Dashed arrow doodle */}
            <svg width="70" height="50" viewBox="0 0 70 50" style={{ position: 'absolute', bottom: 0, left: -10 }} aria-hidden="true">
              <path d="M5 40 Q 20 10, 40 25 T 65 15" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeDasharray="5 5" />
              <path d="M62 11 L67 15 L63 19" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </section>

        {/* ── Section divider ────────────────────────────────────────────── */}
        <div id="resources" style={{
          padding: 'clamp(14px, 2.5vw, 20px) clamp(20px, 5vw, 60px) 14px clamp(56px, 9vw, 120px)',
          position: 'relative', zIndex: 2,
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ fontFamily: '"Caveat", cursive', fontSize: 'clamp(20px, 2.2vw, 28px)', color: C.red, transform: 'rotate(-2deg)', display: 'inline-block' }}>
              Chapter 2:
            </div>
            <h2 style={{ fontFamily: '"Fraunces", serif', fontWeight: 600, fontSize: 'clamp(22px, 3vw, 38px)', margin: 0, letterSpacing: '-0.01em' }}>
              Your Bonus Resources
            </h2>
          </div>
          <Squiggle color={C.ink} width={180} />
        </div>

        {/* ── Resource grid ───────────────────────────────────────────────── */}
        <section
          aria-label="Bonus resources"
          style={{ padding: '14px clamp(20px, 5vw, 60px) 20px clamp(56px, 9vw, 120px)', position: 'relative', zIndex: 2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 22, marginBottom: 22 }}>
            {RESOURCES.slice(0, 3).map((r, i) => (
              <ResourceCard key={r.key} r={r} index={i} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 22 }}>
            {RESOURCES.slice(3, 5).map((r, i) => (
              <ResourceCard key={r.key} r={r} index={i + 3} />
            ))}
          </div>
        </section>

        {/* ── Review CTA ─────────────────────────────────────────────────── */}
        <section
          id="review"
          aria-label="Leave a review"
          style={{ padding: 'clamp(14px, 2.5vw, 20px) clamp(20px, 5vw, 60px) clamp(36px, 6vw, 70px) clamp(56px, 9vw, 120px)', position: 'relative', zIndex: 2 }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center" style={{
            background: '#fffdf6',
            border: `1.5px solid ${C.ink}`,
            borderRadius: 14,
            padding: 'clamp(22px, 3.5vw, 38px) clamp(18px, 3.5vw, 44px)',
            boxShadow: `8px 8px 0 ${C.yellow}`,
            position: 'relative', gap: 24,
          }}>
            <Tape color={C.red} rot={-4} w={76}
              style={{ position: 'absolute', top: -12, left: 32 }} />
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ display: 'flex', gap: 4, marginBottom: 10, color: C.yellow }}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <h3 style={{ fontFamily: '"Fraunces", serif', fontWeight: 600, fontSize: 'clamp(18px, 2.2vw, 26px)', margin: '0 0 8px', letterSpacing: '-0.01em' }}>
                Loved the book? Your review means the world!
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: `${C.ink}bb`, margin: 0 }}>
                Honest reviews help other families discover the book. It only takes 30 seconds!
              </p>
            </div>
            <a
              href={CONFIG.amazonReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '13px 20px', borderRadius: 999,
                background: C.red, color: '#fffdf6',
                fontWeight: 700, textDecoration: 'none', fontSize: 14.5,
                display: 'inline-flex', alignItems: 'center', gap: 8,
                whiteSpace: 'nowrap', flexShrink: 0,
                boxShadow: `4px 4px 0 ${C.ink}`,
              }}
            >
              Leave a review on Amazon <ArrowIcon />
            </a>
          </div>
        </section>

        {/* ── Footer ─────────────────────────────────────────────────────── */}
        <footer style={{
          padding: 'clamp(6px, 1.5vw, 10px) clamp(20px, 5vw, 60px) clamp(22px, 4vw, 40px) clamp(56px, 9vw, 120px)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: 13, color: `${C.ink}77`,
          fontFamily: '"Caveat", cursive', flexWrap: 'wrap', gap: 10,
          position: 'relative', zIndex: 2,
          borderTop: `1px solid ${C.ink}14`, marginTop: 8,
        }}>
          <div style={{ fontSize: 17 }}>— A. L. Umari, with love</div>
          <div style={{ fontSize: 15 }}>© 2026 A. L. Umari. All rights reserved.</div>
        </footer>
      </main>
    </div>
  );
}
