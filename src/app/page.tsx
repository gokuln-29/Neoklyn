import Link from "next/link";
import TerminalCode from "@/components/TerminalCode";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import EngageSection from "@/components/EngageSection";
import type { Metadata } from "next";
import { aggregateRatingSchema } from "@/lib/schema";
import { siteStats } from "@/data/siteStats";

export const metadata: Metadata = {
  title: {
    absolute: "AI Agency & Web Development Studio — NeoKlyn",
  },
  description:
    "Premium AI agents, web apps, mobile & ecommerce from Bengaluru. Trusted by 100+ global brands. Get a free consultation.",
  openGraph: {
    title: "AI Agency & Web Development Studio — NeoKlyn",
    description:
      "Premium AI agents, web apps, mobile & ecommerce from Bengaluru. Trusted by 100+ global brands. Get a free consultation.",
    url: "https://neoklyn.com",
    siteName: "NeoKlyn",
    type: "website",
  },
};

export default function Home() {
  const ratingSchema = aggregateRatingSchema();

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ratingSchema) }}
      />

      {/* HERO */}
      <section className="hero">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>

        <div className="hero-left">
          <div className="hero-eyebrow">ENGINEERING INTELLIGENT DIGITAL SYSTEMS</div>
          <h1 className="hero-title" aria-label="We build digital products">
            <span className="line" aria-hidden="true"><span>WE BUILD</span></span>
            <span className="line" aria-hidden="true"><span className="title-outline">DIGITAL</span></span>
            <span className="line" aria-hidden="true"><span className="title-cyan">PRODUCTS</span></span>
          </h1>
          <p className="hero-desc">Web apps, mobile, ecommerce, AI Agents, Generative AI, 3D experiences &amp; performance marketing — engineered for conversion, designed to impress.</p>
          <div className="hero-btns">
            <Link href="/contact" className="btn-main">Start a Project ↗</Link>
            <Link href="/services" className="btn-ghost">
              Explore Services
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </div>
        </div>
        {/* hero stats */}
        <div className="hero-right">
          <TerminalCode />
          <div className="hero-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', alignContent: 'center' }}>
            {siteStats.map((stat) => (
              <div className="h-stat" key={stat.key}>
                <div className="h-stat-n" style={{ fontFamily: "'JetBrains Mono', monospace", color: stat.homeColor }}>
                  {stat.value}
                  {stat.suffix}
                </div>
                <div className="h-stat-l" style={{ lineHeight: '1.4' }}>
                  {stat.homeLabel}
                  <br />
                  <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{stat.homeSubLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-inner">
          <div className="ticker-item"><span className="t-icon">✦</span> AI Agents</div>
          <div className="ticker-item"><span className="t-icon">✦</span> Generative AI</div>
          <div className="ticker-item"><span className="t-icon">✦</span> Web Development</div>
          <div className="ticker-item"><span className="t-icon">✦</span> Mobile Apps</div>
          <div className="ticker-item"><span className="t-icon">✦</span> Ecommerce</div>
          <div className="ticker-item"><span className="t-icon">✦</span> 3D Websites</div>
          <div className="ticker-item"><span className="t-icon">✦</span> Digital Marketing</div>
          <div className="ticker-item"><span className="t-icon">✦</span> SEO &amp; PPC</div>
          <div className="ticker-item"><span className="t-icon">✦</span> UI/UX Design</div>
          <div className="ticker-item"><span className="t-icon">✦</span> Brand Identity</div>

          <div className="ticker-item"><span className="t-icon">✦</span> AI Agents</div>
          <div className="ticker-item"><span className="t-icon">✦</span> Generative AI</div>
          <div className="ticker-item"><span className="t-icon">✦</span> Web Development</div>
          <div className="ticker-item"><span className="t-icon">✦</span> Mobile Apps</div>
          <div className="ticker-item"><span className="t-icon">✦</span> Ecommerce</div>
          <div className="ticker-item"><span className="t-icon">✦</span> 3D Websites</div>
          <div className="ticker-item"><span className="t-icon">✦</span> Digital Marketing</div>
          <div className="ticker-item"><span className="t-icon">✦</span> SEO &amp; PPC</div>
          <div className="ticker-item"><span className="t-icon">✦</span> UI/UX Design</div>
          <div className="ticker-item"><span className="t-icon">✦</span> Brand Identity</div>
        </div>
      </div>

      {/* SERVICES */}
      <section className="section section-alt" id="services">
        <div className="reveal">
          <div className="s-label">Services</div>
          <h2 className="s-title">WHAT WE BUILD</h2>
          <p className="s-sub">From pixel-perfect interfaces to scalable backends — full-stack digital execution across every channel.</p>
        </div>
        <div className="services-layout">
          <div className="service-list reveal">
            <Link href="/services/web" className="service-item" style={{ textDecoration: 'none', color: 'inherit' }}>
              {/* <span className="si-num">01</span> */}
              <span className="si-name">Web Design &amp; Development</span>
              <span className="si-arrow">→</span>
            </Link>
            <Link href="/services/mobile" className="service-item" style={{ textDecoration: 'none', color: 'inherit' }}>
              {/* <span className="si-num">02</span> */}
              <span className="si-name">Mobile App Development</span>
              <span className="si-arrow">→</span>
            </Link>
            <Link href="/services/ecommerce" className="service-item" style={{ textDecoration: 'none', color: 'inherit' }}>
              {/* <span className="si-num">03</span> */}
              <span className="si-name">Ecommerce Solutions</span>
              <span className="si-arrow">→</span>
            </Link>
            <Link href="/services/marketing" className="service-item" style={{ textDecoration: 'none', color: 'inherit' }}>
              {/* <span className="si-num">04</span> */}
              <span className="si-name">Digital Marketing</span>
              <span className="si-arrow">→</span>
            </Link>
            <Link href="/services/3d" className="service-item" style={{ textDecoration: 'none', color: 'inherit' }}>
              {/* <span className="si-num">05</span> */}
              <span className="si-name">3D &amp; Immersive Web</span>
              <span className="si-arrow">→</span>
            </Link>
            <Link href="/services/branding" className="service-item" style={{ textDecoration: 'none', color: 'inherit' }}>
              {/* <span className="si-num">06</span> */}
              <span className="si-name">UI/UX &amp; Branding</span>
              <span className="si-arrow">→</span>
            </Link>
            <Link href="/services/ai-agents" className="service-item" style={{ textDecoration: 'none', color: 'inherit' }}>
              {/* <span className="si-num">07</span> */}
              <span className="si-name">AI Agents &amp; Automation</span>
              <span className="si-arrow">→</span>
            </Link>
            <Link href="/services/gen-ai" className="service-item" style={{ textDecoration: 'none', color: 'inherit' }}>
              {/* <span className="si-num">08</span> */}
              <span className="si-name">Generative AI Integration</span>
              <span className="si-arrow">→</span>
            </Link>
          </div>
          <div className="service-detail reveal">
            <div className="sd-active-label">All Services</div>
            <style>{`
              @keyframes sc-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
              @keyframes sc-glow { 0%,100% { filter: drop-shadow(0 0 3px var(--sc-c)); opacity:.85; } 50% { filter: drop-shadow(0 0 10px var(--sc-c)); opacity:1; } }
              @keyframes sc-orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
              @keyframes sc-dash { from { stroke-dashoffset: 60; } to { stroke-dashoffset: 0; } }
              @keyframes sc-blink { 0%,100%{opacity:.5} 50%{opacity:1} }
              .sc-icon svg { animation: sc-float 4s ease-in-out infinite; filter: drop-shadow(0 0 6px var(--sc-c, rgba(6,182,212,0.3))); }
              .sc-icon .sc-anim-glow { animation: sc-glow 3s ease-in-out infinite; }
              .sc-icon .sc-anim-orbit { animation: sc-orbit 10s linear infinite; transform-origin: center; }
              .sc-icon .sc-anim-orbit-rev { animation: sc-orbit 14s linear infinite reverse; transform-origin: center; }
              .sc-icon .sc-anim-dash { stroke-dasharray: 30 30; animation: sc-dash 3s linear infinite; }
              .sc-icon .sc-anim-blink { animation: sc-blink 2s ease-in-out infinite; }
            `}</style>
            <div className="service-cards-grid">
              {/* Web Development */}
              <div className="sc">
                <div className="sc-icon" style={{ '--sc-c': 'rgba(6,182,212,0.5)' } as React.CSSProperties}>
                  <svg viewBox="0 0 36 36" fill="none" width="32" height="32">
                    <rect x="3" y="6" width="30" height="24" rx="4" stroke="#06B6D4" strokeWidth="1.4" />
                    <line x1="3" y1="12" x2="33" y2="12" stroke="#06B6D4" strokeWidth="1" opacity="0.4" />
                    <circle cx="7" cy="9" r="1.2" fill="#ff5f57" /><circle cx="11" cy="9" r="1.2" fill="#ffbd2e" /><circle cx="15" cy="9" r="1.2" fill="#28ca41" />
                    <text x="10" y="24" fill="#06B6D4" fontSize="11" fontFamily="monospace" className="sc-anim-glow">{'</ >'}</text>
                  </svg>
                </div>
                <div className="sc-name">Web Development</div>
                <div className="sc-desc">Fast, SEO-optimized sites built on modern stacks. We ensure pixel-perfect fidelity and rapid load times.</div>
                <div className="sc-tags"><span className="sc-tag">React</span><span className="sc-tag">Next.js</span><span className="sc-tag">Webflow</span></div>
              </div>
              {/* Mobile Apps */}
              <div className="sc">
                <div className="sc-icon" style={{ '--sc-c': 'rgba(59,130,246,0.5)' } as React.CSSProperties}>
                  <svg viewBox="0 0 36 36" fill="none" width="32" height="32">
                    <rect x="10" y="3" width="16" height="30" rx="4" stroke="#3B82F6" strokeWidth="1.4" />
                    <line x1="15" y1="6" x2="21" y2="6" stroke="#3B82F6" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
                    <circle cx="18" cy="29" r="1.5" fill="#3B82F6" className="sc-anim-glow" />
                    <rect x="13" y="11" width="10" height="4" rx="1" fill="#3B82F6" opacity="0.15" />
                    <rect x="13" y="17" width="10" height="3" rx="1" fill="#3B82F6" opacity="0.1" />
                    <rect x="13" y="22" width="7" height="3" rx="1" fill="#3B82F6" opacity="0.1" />
                    <path d="M28 8a6 6 0 0 1 0 8" stroke="#3B82F6" strokeWidth="1" strokeLinecap="round" className="sc-anim-blink" opacity="0.5" />
                    <path d="M31 6a10 10 0 0 1 0 12" stroke="#3B82F6" strokeWidth="1" strokeLinecap="round" className="sc-anim-blink" opacity="0.3" />
                  </svg>
                </div>
                <div className="sc-name">Mobile Apps</div>
                <div className="sc-desc">Cross-platform iOS &amp; Android apps that scale effortlessly. Delivering native-like fluidity and deep system integrations.</div>
                <div className="sc-tags"><span className="sc-tag">Flutter</span><span className="sc-tag">RN</span><span className="sc-tag">Swift</span></div>
              </div>
              {/* Ecommerce */}
              <div className="sc">
                <div className="sc-icon" style={{ '--sc-c': 'rgba(124,58,237,0.5)' } as React.CSSProperties}>
                  <svg viewBox="0 0 36 36" fill="none" width="32" height="32">
                    <path d="M7 12h22l-2 18H9L7 12Z" stroke="#7C3AED" strokeWidth="1.4" strokeLinejoin="round" />
                    <path d="M13 12V9a5 5 0 0 1 10 0v3" stroke="#7C3AED" strokeWidth="1.3" />
                    <circle cx="18" cy="22" r="2" fill="#7C3AED" opacity="0.2" />
                    <path d="M18 20v4M16 22h4" stroke="#7C3AED" strokeWidth="1" strokeLinecap="round" className="sc-anim-glow" />
                    <circle cx="28" cy="8" r="1.5" fill="#7C3AED" className="sc-anim-glow" opacity="0.7" />
                    <path d="M28 5v6M25 8h6" stroke="#7C3AED" strokeWidth="0.7" strokeLinecap="round" opacity="0.4" />
                  </svg>
                </div>
                <div className="sc-name">Ecommerce</div>
                <div className="sc-desc">High-converting stores with seamless checkout experiences. Designed intuitively to maximize cart values and user retention.</div>
                <div className="sc-tags"><span className="sc-tag">Shopify</span><span className="sc-tag">WooCommerce</span></div>
              </div>
              {/* 3D Websites */}
              <div className="sc">
                <div className="sc-icon" style={{ '--sc-c': 'rgba(59,130,246,0.5)' } as React.CSSProperties}>
                  <svg viewBox="0 0 36 36" fill="none" width="32" height="32">
                    <g className="sc-anim-orbit" style={{ animationDuration: '18s' }}><ellipse cx="18" cy="18" rx="15" ry="6" stroke="#3B82F6" strokeWidth="0.8" opacity="0.25" /></g>
                    <g className="sc-anim-orbit-rev"><ellipse cx="18" cy="18" rx="14" ry="8" stroke="#7C3AED" strokeWidth="0.8" opacity="0.2" transform="rotate(60 18 18)" /></g>
                    <path d="M13 14l5-4 5 4-5 4z" fill="#3B82F6" opacity="0.1" stroke="#3B82F6" strokeWidth="1" />
                    <path d="M13 14v8l5 4v-8" stroke="#3B82F6" strokeWidth="1" opacity="0.6" />
                    <path d="M23 14v8l-5 4v-8" stroke="#7C3AED" strokeWidth="1" opacity="0.6" />
                    <circle cx="18" cy="16" r="2" fill="#3B82F6" className="sc-anim-glow" opacity="0.8" />
                  </svg>
                </div>
                <div className="sc-name">3D Websites</div>
                <div className="sc-desc">Immersive WebGL experiences that leave lasting impressions. We leverage hardware acceleration for beautiful in-browser rendering.</div>
                <div className="sc-tags"><span className="sc-tag">Three.js</span><span className="sc-tag">GSAP</span></div>
              </div>
              {/* Digital Marketing */}
              <div className="sc">
                <div className="sc-icon" style={{ '--sc-c': 'rgba(6,182,212,0.5)' } as React.CSSProperties}>
                  <svg viewBox="0 0 36 36" fill="none" width="32" height="32">
                    <line x1="5" y1="30" x2="31" y2="30" stroke="#06B6D4" strokeWidth="1" opacity="0.3" />
                    <line x1="5" y1="5" x2="5" y2="30" stroke="#06B6D4" strokeWidth="1" opacity="0.3" />
                    <rect x="8" y="22" width="4" height="8" rx="1" fill="#06B6D4" opacity="0.2" />
                    <rect x="14" y="18" width="4" height="12" rx="1" fill="#06B6D4" opacity="0.3" />
                    <rect x="20" y="14" width="4" height="16" rx="1" fill="#3B82F6" opacity="0.35" />
                    <rect x="26" y="9" width="4" height="21" rx="1" fill="#3B82F6" opacity="0.4" />
                    <path className="sc-anim-dash" d="M8 24 L14 19 L20 15 L28 8" stroke="#06B6D4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="28" cy="8" r="2.5" fill="#06B6D4" className="sc-anim-glow" />
                  </svg>
                </div>
                <div className="sc-name">Digital Marketing</div>
                <div className="sc-desc">ROI-focused SEO, PPC, and social campaigns. We align media buying strategies carefully with overarching revenue goals.</div>
                <div className="sc-tags"><span className="sc-tag">Google Ads</span><span className="sc-tag">Meta</span><span className="sc-tag">SEO</span></div>
              </div>
              {/* UI/UX Design */}
              <div className="sc">
                <div className="sc-icon" style={{ '--sc-c': 'rgba(124,58,237,0.5)' } as React.CSSProperties}>
                  <svg viewBox="0 0 36 36" fill="none" width="32" height="32">
                    <rect x="4" y="4" width="28" height="28" rx="6" stroke="#7C3AED" strokeWidth="1.2" opacity="0.3" />
                    <rect x="6" y="26" width="6" height="6" rx="2" fill="#06B6D4" opacity="0.5" className="sc-anim-blink" />
                    <rect x="14" y="26" width="6" height="6" rx="2" fill="#7C3AED" opacity="0.5" />
                    <rect x="22" y="26" width="6" height="6" rx="2" fill="#3B82F6" opacity="0.5" className="sc-anim-blink" style={{ animationDelay: '1s' }} />
                    <path d="M10 8l13 13-3 3-13-13z" stroke="#7C3AED" strokeWidth="1.3" fill="#7C3AED" opacity="0.15" />
                    <path d="M20 24l3-3" stroke="#7C3AED" strokeWidth="1.3" />
                    <circle cx="24" cy="10" r="3" stroke="#7C3AED" strokeWidth="1" fill="none" className="sc-anim-glow" />
                  </svg>
                </div>
                <div className="sc-name">UI/UX Design</div>
                <div className="sc-desc">Brand systems and interfaces users inherently love. We build deeply considered design patterns based on cognitive workflows.</div>
                <div className="sc-tags"><span className="sc-tag">Figma</span><span className="sc-tag">Branding</span></div>
              </div>
              {/* AI Agents */}
              <div className="sc">
                <div className="sc-icon" style={{ '--sc-c': 'rgba(6,182,212,0.5)' } as React.CSSProperties}>
                  <svg viewBox="0 0 36 36" fill="none" width="32" height="32">
                    <rect x="8" y="12" width="20" height="16" rx="5" stroke="#06B6D4" strokeWidth="1.4" />
                    <line x1="18" y1="6" x2="18" y2="12" stroke="#06B6D4" strokeWidth="1.2" strokeLinecap="round" />
                    <circle cx="18" cy="5" r="2" fill="#06B6D4" className="sc-anim-glow" />
                    <circle cx="14" cy="20" r="2" fill="#06B6D4" opacity="0.7" className="sc-anim-blink" />
                    <circle cx="22" cy="20" r="2" fill="#06B6D4" opacity="0.7" className="sc-anim-blink" style={{ animationDelay: '0.5s' }} />
                    <path d="M14 25h8" stroke="#06B6D4" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
                    <line x1="4" y1="18" x2="8" y2="20" stroke="#06B6D4" strokeWidth="1" strokeLinecap="round" opacity="0.3" className="sc-anim-dash" />
                    <line x1="28" y1="20" x2="32" y2="18" stroke="#06B6D4" strokeWidth="1" strokeLinecap="round" opacity="0.3" className="sc-anim-dash" />
                    <circle cx="3" cy="18" r="1.5" fill="#7C3AED" opacity="0.4" className="sc-anim-blink" />
                    <circle cx="33" cy="18" r="1.5" fill="#7C3AED" opacity="0.4" className="sc-anim-blink" style={{ animationDelay: '1s' }} />
                  </svg>
                </div>
                <div className="sc-name">AI Agents</div>
                <div className="sc-desc">Autonomous workflow automation & intelligent ops. Empowering your teams using multi-agentic reasoning frameworks 24/7.</div>
                <div className="sc-tags"><span className="sc-tag">RAG</span><span className="sc-tag">LangChain</span></div>
              </div>
              {/* Generative AI */}
              <div className="sc">
                <div className="sc-icon" style={{ '--sc-c': 'rgba(59,130,246,0.5)' } as React.CSSProperties}>
                  <svg viewBox="0 0 36 36" fill="none" width="32" height="32">
                    <circle cx="18" cy="18" r="10" stroke="#3B82F6" strokeWidth="1.2" opacity="0.3" />
                    <circle cx="18" cy="18" r="6" stroke="#3B82F6" strokeWidth="1" opacity="0.5" className="sc-anim-glow" />
                    <circle cx="18" cy="18" r="2.5" fill="#3B82F6" opacity="0.8" />
                    <path d="M18 8v4M18 24v4M8 18h4M24 18h4" stroke="#3B82F6" strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />
                    <circle cx="8" cy="10" r="1.5" fill="#7C3AED" className="sc-anim-blink" opacity="0.6" />
                    <circle cx="28" cy="10" r="1.5" fill="#06B6D4" className="sc-anim-blink" opacity="0.6" style={{ animationDelay: '0.7s' }} />
                    <circle cx="28" cy="28" r="1.5" fill="#7C3AED" className="sc-anim-blink" opacity="0.6" style={{ animationDelay: '1.4s' }} />
                    <circle cx="8" cy="28" r="1.5" fill="#06B6D4" className="sc-anim-blink" opacity="0.6" style={{ animationDelay: '2.1s' }} />
                    <path className="sc-anim-dash" d="M10 11l5 5M26 11l-5 5M10 27l5-5M26 27l-5-5" stroke="#3B82F6" strokeWidth="0.7" opacity="0.25" />
                  </svg>
                </div>
                <div className="sc-name">Generative AI</div>
                <div className="sc-desc">Custom LLM integration and dynamic content generation. Turning unstructured enterprise data into immediate predictive assets.</div>
                <div className="sc-tags"><span className="sc-tag">OpenAI</span><span className="sc-tag">Llama</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARKETS */}
      <section className="section" id="markets">
        <div className="reveal">
          <div className="s-label">Global Service</div>
          <h2 className="s-title">WORLDWIDE DELIVERY</h2>
          <p className="s-sub">We provide global digital services, with our head office in Bengaluru, India.</p>
        </div>

        <style>{`
            .m-icon { margin-bottom: 1.5rem; display: inline-flex; align-items: center; justify-content: center; position: relative; }
            .m-icon::after { content: ''; position: absolute; inset: -10px; background: radial-gradient(circle, var(--orb-color, rgba(255,255,255,0.1)), transparent 70%); border-radius: 50%; z-index: 0; pointer-events: none; opacity: 0.5; }
            .m-icon svg { z-index: 1; position: relative; }
        `}</style>

        <div className="markets-layout reveal">
          <div className="market" style={{ '--orb-color': 'rgba(6,182,212,0.15)' } as React.CSSProperties}>
            {/* <div className="m-num">01</div> */}
            <div className="m-icon">
              <svg width="56" height="56" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="20" stroke="#06B6D4" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M8 24H40M24 8V40" stroke="#06B6D4" strokeOpacity="0.55" strokeWidth="1.2" />
                <path d="M12 16C16 20 16 28 12 32M36 16C32 20 32 28 36 32" stroke="#06B6D4" strokeOpacity="0.55" strokeWidth="1.2" />
                <path d="M16 12C20 16 28 16 32 12M16 36C20 32 28 32 32 36" stroke="#06B6D4" strokeOpacity="0.55" strokeWidth="1.2" />
                <circle cx="31" cy="18" r="2" fill="#06B6D4" style={{ filter: 'drop-shadow(0 0 6px #06B6D4)' }} />
              </svg>
            </div>
            <div className="m-name">Global Coverage</div>
            <p className="m-desc">We support businesses worldwide with consistent engineering quality, clear communication, and reliable execution.</p>
            <span className="m-tag">Global Service Across Time Zones</span>
          </div>
          <div className="market" style={{ '--orb-color': 'rgba(124,58,237,0.15)' } as React.CSSProperties}>
            {/* <div className="m-num">02</div> */}
            <div className="m-icon">
              <svg width="56" height="56" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="20" stroke="#7C3AED" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 3" />
                <rect x="10" y="14" width="28" height="20" rx="4" stroke="#7C3AED" strokeOpacity="0.55" strokeWidth="1.2" />
                <path d="M16 24H32" stroke="#7C3AED" strokeOpacity="0.75" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M20 19H28M20 29H28" stroke="#7C3AED" strokeOpacity="0.55" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="34" cy="17" r="2" fill="#7C3AED" style={{ filter: 'drop-shadow(0 0 6px #7C3AED)' }} />
              </svg>
            </div>
            <div className="m-name">Seamless Collaboration</div>
            <p className="m-desc">From discovery to deployment, we collaborate remotely with international teams and adapt to your preferred working hours.</p>
            <span className="m-tag">Flexible Delivery for Global Teams</span>
          </div>
          <div className="market" style={{ '--orb-color': 'rgba(59,130,246,0.15)' } as React.CSSProperties}>
            {/* <div className="m-num">03</div> */}
            <div className="m-icon">
              <svg width="56" height="56" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="20" stroke="#3B82F6" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M24 10L28.5 19H39L30.5 25.5L34 36L24 30L14 36L17.5 25.5L9 19H19.5L24 10Z" stroke="#3B82F6" strokeOpacity="0.6" strokeWidth="1.2" fill="none" />
                <circle cx="24" cy="24" r="3" fill="#3B82F6" style={{ filter: 'drop-shadow(0 0 6px #3B82F6)' }} />
              </svg>
            </div>
            <div className="m-name">Trusted Execution</div>
            <p className="m-desc">Our team delivers secure, scalable products for clients worldwide with a strong process and long-term support.</p>
            <span className="m-tag">Head Office: Bengaluru, India</span>
          </div>
        </div>
      </section>

      {/* ENGAGE */}
      <EngageSection />

      {/* PROCESS */}
      <section className="section section-alt" id="process">
        <div className="reveal">
          <div className="s-label">Process</div>
          <h2 className="s-title">HOW WE WORK</h2>
          <p className="s-sub">Four sharp phases. Zero ambiguity. Delivered on time.</p>
        </div>
        <div className="process-grid reveal">
          <div className="p-step">
            {/* <div className="p-num">01</div> */}
            <div className="p-line"></div>
            <div className="p-title">Discovery</div>
            <p className="p-desc">We audit your goals, audience, and competitive landscape to define a strategy that actually wins. This phase involves deep stakeholder interviews and technical feasibility assessments.</p>
            <div className="p-connector"></div>
          </div>
          <div className="p-step">
            {/* <div className="p-num">02</div> */}
            <div className="p-line"></div>
            <div className="p-title">Design</div>
            <p className="p-desc">Wireframes → prototypes → final UI. Your approval before a single line of production code is written. We establish scalable design systems that capture your premium brand identity.</p>
            <div className="p-connector"></div>
          </div>
          <div className="p-step">
            {/* <div className="p-num">03</div> */}
            <div className="p-line"></div>
            <div className="p-title">Build</div>
            <p className="p-desc">Clean, tested code. Weekly updates, staging previews, and full transparency throughout development. We utilize edge-compute and modern stacks for uncompromising performance.</p>
            <div className="p-connector"></div>
          </div>
          <div className="p-step">
            {/* <div className="p-num">04</div> */}
            <div className="p-line"></div>
            <div className="p-title">Launch &amp; Scale</div>
            <p className="p-desc">Deploy, monitor, iterate. Ongoing marketing and retainer options to keep growing post-launch. We provide relentless post-release support to guarantee SLA uptime.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section" id="testimonials">
        <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem' }}>
          <div>
            <div className="s-label">Client Trust</div>
            <h2 className="s-title" style={{ marginBottom: 0 }}>REAL RESULTS</h2>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {/* Badge Suggestion Placement */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '30px' }}>
              <div style={{ color: '#F87171', fontWeight: 'bold' }}>Clutch</div>
              <div style={{ display: 'flex', color: '#FBBF24', fontSize: '0.8rem' }}>★★★★★</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>4.9/5</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '30px' }}>
              <div style={{ color: '#60A5FA', fontWeight: 'bold' }}>Google</div>
              <div style={{ display: 'flex', color: '#FBBF24', fontSize: '0.8rem' }}>★★★★★</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>5.0/5</div>
            </div>
          </div>
        </div>
        <div className="test-grid reveal" style={{ marginTop: '3rem' }}>

          <div className="tcard" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="t-stars" style={{ display: 'flex', color: '#FBBF24', gap: '2px', marginBottom: '1rem', fontSize: '1.2rem' }}>★★★★★</div>
            <p className="t-text" style={{ flex: 1 }}>&quot;They didn&apos;t just rebuild our website; they re-architected our entire B2B trading platform. Our mobile engagement jumped 45% in the first quarter, and the Next.js headless setup means our content team deploys 5x faster.&quot;</p>
            <div className="t-author" style={{ marginTop: '2rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
              <div className="t-av" style={{ background: 'var(--cyan)', color: '#000' }}>DG</div>
              <div>
                <a href="http://dwarkageneraltrading.ae/" target="_blank" rel="noopener noreferrer" className="t-name" style={{ textDecoration: 'none', color: 'inherit' }}>Dwarka Gen. Trading <span style={{ fontSize: '0.8em', color: 'var(--cyan)' }}>↗</span></a>
                <div className="t-loc">Corporate Platform · Middle East</div>
              </div>
            </div>
          </div>

          <div className="tcard" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="t-stars" style={{ display: 'flex', color: '#FBBF24', gap: '2px', marginBottom: '1rem', fontSize: '1.2rem' }}>★★★★★</div>
            <p className="t-text" style={{ flex: 1 }}>&quot;As a premium brand, we needed a portal that exuded luxury and functioned flawlessly. NeoKlyn delivered a pixel-perfect application that loads instantly and positions us as an undisputed leader in our market sector.&quot;</p>
            <div className="t-author" style={{ marginTop: '2rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
              <div className="t-av" style={{ background: 'var(--violet)', color: '#fff' }}>AA</div>
              <div>
                <a href="https://aathithyan.com/" target="_blank" rel="noopener noreferrer" className="t-name" style={{ textDecoration: 'none', color: 'inherit' }}>Aathithyan <span style={{ fontSize: '0.8em', color: 'var(--violet)' }}>↗</span></a>
                <div className="t-loc">Brand Website · India 🇮🇳</div>
              </div>
            </div>
          </div>

          <div className="tcard" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="t-stars" style={{ display: 'flex', color: '#FBBF24', gap: '2px', marginBottom: '1rem', fontSize: '1.2rem' }}>★★★★★</div>
            <p className="t-text" style={{ flex: 1 }}>&quot;For an industrial supplier, digital trust is everything. NeoKlyn built an enterprise-grade platform that perfectly handles international RFPs and drives high-value B2B contractors straight into our funnel.&quot;</p>
            <div className="t-author" style={{ marginTop: '2rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
              <div className="t-av" style={{ background: 'var(--blue)', color: '#fff' }}>ZC</div>
              <div>
                <a href="https://zinadconcreteworks.com/" target="_blank" rel="noopener noreferrer" className="t-name" style={{ textDecoration: 'none', color: 'inherit' }}>Zinad Concrete Works <span style={{ fontSize: '0.8em', color: 'var(--blue)' }}>↗</span></a>
                <div className="t-loc">Industrial Web · Middle East</div>
              </div>
            </div>
          </div>

          <div className="tcard" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="t-stars" style={{ display: 'flex', color: '#FBBF24', gap: '2px', marginBottom: '1rem', fontSize: '1.2rem' }}>★★★★★</div>
            <p className="t-text" style={{ flex: 1 }}>&quot;The visual aesthetic is absolutely world-class. Taking our venture online with NeoKlyn resulted in an immediate 110% increase in luxury booking inquiries. Their GSAP 3D animations set us apart globally.&quot;</p>
            <div className="t-author" style={{ marginTop: '2rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
              <div className="t-av" style={{ background: 'var(--cyan)', color: '#000' }}>TV</div>
              <div>
                <a href="https://travexventures.com/" target="_blank" rel="noopener noreferrer" className="t-name" style={{ textDecoration: 'none', color: 'inherit' }}>Travex Ventures <span style={{ fontSize: '0.8em', color: 'var(--cyan)' }}>↗</span></a>
                <div className="t-loc">Travel Agency Site · India 🇮🇳</div>
              </div>
            </div>
          </div>

          <div className="tcard" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="t-stars" style={{ display: 'flex', color: '#FBBF24', gap: '2px', marginBottom: '1rem', fontSize: '1.2rem' }}>★★★★★</div>
            <p className="t-text" style={{ flex: 1 }}>&quot;Total digital transformation. We moved from legacy monolithic systems to a highly performant, serverless Next.js edge network. The results? Zero downtime and an incredibly modern operational interface.&quot;</p>
            <div className="t-author" style={{ marginTop: '2rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
              <div className="t-av" style={{ background: 'var(--violet)', color: '#fff' }}>LP</div>
              <div>
                <a href="http://lpsmpvtltd.com/" target="_blank" rel="noopener noreferrer" className="t-name" style={{ textDecoration: 'none', color: 'inherit' }}>LPSM Pvt. Ltd. <span style={{ fontSize: '0.8em', color: 'var(--violet)' }}>↗</span></a>
                <div className="t-loc">Manufacturing Hub · India 🇮🇳</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FEATURED WORK PREVIEW */}
      {/* <section className="section section-alt">
        <div className="reveal">
          <div className="s-label">Portfolio</div>
          <h2 className="s-title">FEATURED WORK</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>

          <a href="http://dwarkageneraltrading.ae/" target="_blank" rel="noopener noreferrer" className="tcard reveal" style={{ textDecoration: 'none', color: 'inherit', padding: '0', minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent), url(/assets/work/dwarka.jpg) center/cover' }}>
            <div style={{ padding: '2rem' }}>
              <div className="m-tag" style={{ border: 'none', background: 'var(--cyan)', color: 'var(--bg)', marginBottom: '1rem', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>B2B Corporate</div>
              <h3 className="p-title" style={{ fontSize: '1.4rem' }}>Dwarka General Trading</h3>
            </div>
          </a>

          <a href="https://travexventures.com/" target="_blank" rel="noopener noreferrer" className="tcard reveal" style={{ textDecoration: 'none', color: 'inherit', padding: '0', minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent), url(/assets/work/travex.png) center/cover' }}>
            <div style={{ padding: '2rem' }}>
              <div className="m-tag" style={{ border: 'none', background: 'var(--violet)', color: '#fff', marginBottom: '1rem', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>Travel Agency</div>
              <h3 className="p-title" style={{ fontSize: '1.4rem' }}>Travex Ventures</h3>
            </div>
          </a>

          <a href="https://zinadconcreteworks.com/" target="_blank" rel="noopener noreferrer" className="tcard reveal" style={{ textDecoration: 'none', color: 'inherit', padding: '0', minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent), url(/assets/work/zinad.jpg) center/cover' }}>
            <div style={{ padding: '2rem' }}>
              <div className="m-tag" style={{ border: 'none', background: 'var(--blue)', color: '#000', marginBottom: '1rem', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>Industrial</div>
              <h3 className="p-title" style={{ fontSize: '1.4rem' }}>Zinad Concrete Works</h3>
            </div>
          </a>

        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/work" className="btn-ghost" style={{ fontSize: '1rem' }}>View All Projects <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></Link>
        </div>
      </section> */}

      {/* FAQ */}
      <FAQSection />

      {/* CTA */}
      <CTASection />
    </main>
  );
}
