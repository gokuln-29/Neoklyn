import Link from "next/link";
import TerminalCode from "@/components/TerminalCode";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>

        <div className="hero-left">
          <div className="hero-eyebrow">ENGINEERING INTELLIGENT DIGITAL SYSTEMS</div>
          <h1 className="hero-title">
            <span className="line"><span>WE BUILD</span></span>
            <span className="line"><span className="title-outline">DIGITAL</span></span>
            <span className="line"><span className="title-cyan">PRODUCTS</span></span>
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
          <div className="hero-stats">
            <div className="h-stat"><div className="h-stat-n">120+</div><div className="h-stat-l">Projects</div></div>
            <div className="h-stat"><div className="h-stat-n">98%</div><div className="h-stat-l">Satisfaction</div></div>
            <div className="h-stat"><div className="h-stat-n">5yr</div><div className="h-stat-l">Experience</div></div>
            <div className="h-stat"><div className="h-stat-n">3</div><div className="h-stat-l">Markets</div></div>
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
            <div className="service-cards-grid">
              <div className="sc">
                <div className="sc-icon"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg></div>
                <div className="sc-name">Web Development</div>
                <div className="sc-desc">Fast, SEO-optimized sites built on modern stacks. We ensure pixel-perfect fidelity and rapid load times.</div>
                <div className="sc-tags"><span className="sc-tag">React</span><span className="sc-tag">Next.js</span><span className="sc-tag">Webflow</span></div>
              </div>
              <div className="sc">
                <div className="sc-icon"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></svg></div>
                <div className="sc-name">Mobile Apps</div>
                <div className="sc-desc">Cross-platform iOS &amp; Android apps that scale effortlessly. Delivering native-like fluidity and deep system integrations.</div>
                <div className="sc-tags"><span className="sc-tag">Flutter</span><span className="sc-tag">RN</span><span className="sc-tag">Swift</span></div>
              </div>
              <div className="sc">
                <div className="sc-icon"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg></div>
                <div className="sc-name">Ecommerce</div>
                <div className="sc-desc">High-converting stores with seamless checkout experiences. Designed intuitively to maximize cart values and user retention.</div>
                <div className="sc-tags"><span className="sc-tag">Shopify</span><span className="sc-tag">WooCommerce</span></div>
              </div>
              <div className="sc">
                <div className="sc-icon"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg></div>
                <div className="sc-name">3D Websites</div>
                <div className="sc-desc">Immersive WebGL experiences that leave lasting impressions. We leverage hardware acceleration for beautiful in-browser rendering.</div>
                <div className="sc-tags"><span className="sc-tag">Three.js</span><span className="sc-tag">GSAP</span></div>
              </div>
              <div className="sc">
                <div className="sc-icon"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg></div>
                <div className="sc-name">Digital Marketing</div>
                <div className="sc-desc">ROI-focused SEO, PPC, and social campaigns. We align media buying strategies carefully with overarching revenue goals.</div>
                <div className="sc-tags"><span className="sc-tag">Google Ads</span><span className="sc-tag">Meta</span><span className="sc-tag">SEO</span></div>
              </div>
              <div className="sc">
                <div className="sc-icon"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor" /><circle cx="17.5" cy="10.5" r=".5" fill="currentColor" /><circle cx="8.5" cy="7.5" r=".5" fill="currentColor" /><circle cx="6.5" cy="12.5" r=".5" fill="currentColor" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" /></svg></div>
                <div className="sc-name">UI/UX Design</div>
                <div className="sc-desc">Brand systems and interfaces users inherently love. We build deeply considered design patterns based on cognitive workflows.</div>
                <div className="sc-tags"><span className="sc-tag">Figma</span><span className="sc-tag">Branding</span></div>
              </div>
              <div className="sc">
                <div className="sc-icon"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg></div>
                <div className="sc-name">AI Agents</div>
                <div className="sc-desc">Autonomous workflow automation & intelligent ops. Empowering your teams using multi-agentic reasoning frameworks 24/7.</div>
                <div className="sc-tags"><span className="sc-tag">RAG</span><span className="sc-tag">LangChain</span></div>
              </div>
              <div className="sc">
                <div className="sc-icon"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /><circle cx="12" cy="12" r="4" /></svg></div>
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
          <div className="s-label">Global Reach</div>
          <h2 className="s-title">WHERE WE OPERATE</h2>
          <p className="s-sub">Built to serve three of the world&apos;s most dynamic digital markets — fluently.</p>
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
                <ellipse cx="24" cy="24" rx="20" ry="8" stroke="#06B6D4" strokeOpacity="0.5" strokeWidth="1.2" transform="rotate(25 24 24)" />
                <ellipse cx="24" cy="24" rx="8" ry="20" stroke="#06B6D4" strokeOpacity="0.5" strokeWidth="1.2" transform="rotate(25 24 24)" />
                <circle cx="16" cy="18" r="3" fill="#06B6D4" style={{ filter: 'drop-shadow(0 0 6px #06B6D4)' }} />
                <circle cx="20" cy="30" r="1.5" fill="#06B6D4" />
              </svg>
            </div>
            <div className="m-name">Americas</div>
            <p className="m-desc">Serving clients globally with dedicated active hubs in the US. We align seamlessly with Western timelines, compliance standards, and product expectations.</p>
            <span className="m-tag">Active Hubs: New York, LA, Toronto</span>
          </div>
          <div className="market" style={{ '--orb-color': 'rgba(124,58,237,0.15)' } as React.CSSProperties}>
            {/* <div className="m-num">02</div> */}
            <div className="m-icon">
              <svg width="56" height="56" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="20" stroke="#7C3AED" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 3" />
                <ellipse cx="24" cy="24" rx="20" ry="8" stroke="#7C3AED" strokeOpacity="0.5" strokeWidth="1.2" transform="rotate(85 24 24)" />
                <ellipse cx="24" cy="24" rx="8" ry="20" stroke="#7C3AED" strokeOpacity="0.5" strokeWidth="1.2" transform="rotate(85 24 24)" />
                <circle cx="24" cy="16" r="3" fill="#7C3AED" style={{ filter: 'drop-shadow(0 0 6px #7C3AED)' }} />
                <circle cx="28" cy="26" r="2" fill="#7C3AED" />
                <circle cx="18" cy="32" r="1.5" fill="#7C3AED" />
              </svg>
            </div>
            <div className="m-name">EMEA</div>
            <p className="m-desc">Complete worldwide coverage across Europe, Middle East, and Africa. Featuring active hubs with local compliances, RTL language support, and enterprise delivery.</p>
            <span className="m-tag">Active Hubs: Dubai, London, Berlin</span>
          </div>
          <div className="market" style={{ '--orb-color': 'rgba(59,130,246,0.15)' } as React.CSSProperties}>
            {/* <div className="m-num">03</div> */}
            <div className="m-icon">
              <svg width="56" height="56" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="20" stroke="#3B82F6" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 3" />
                <ellipse cx="24" cy="24" rx="20" ry="8" stroke="#3B82F6" strokeOpacity="0.5" strokeWidth="1.2" transform="rotate(145 24 24)" />
                <ellipse cx="24" cy="24" rx="8" ry="20" stroke="#3B82F6" strokeOpacity="0.5" strokeWidth="1.2" transform="rotate(145 24 24)" />
                <circle cx="34" cy="20" r="3" fill="#3B82F6" style={{ filter: 'drop-shadow(0 0 6px #3B82F6)' }} />
                <circle cx="28" cy="32" r="2" fill="#3B82F6" />
                <circle cx="16" cy="24" r="1.5" fill="#3B82F6" />
              </svg>
            </div>
            <div className="m-name">APAC</div>
            <p className="m-desc">Providing premium worldwide execution and elite technical talent from our fast-growing hubs across India, Singapore, and the Asia-Pacific regions.</p>
            <span className="m-tag">Active Hubs: Bangalore, Chennai, Mumbai, Singapore, Tokyo</span>
          </div>
        </div>
      </section>

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
        <div className="reveal">
          <div className="s-label">Client Stories</div>
          <h2 className="s-title">REAL RESULTS</h2>
        </div>
        <div className="test-grid reveal">
          
          <div className="tcard">
            <div className="t-stars"><div className="star"></div><div className="star"></div><div className="star"></div><div className="star"></div><div className="star"></div></div>
            <p className="t-text">&quot;They built a fast, robust corporate site for our trading operations in the UAE. The scalable architecture and sleek design truly elevated our B2B presence.&quot;</p>
            <div className="t-author">
              <div className="t-av">DG</div>
              <div>
                <a href="http://dwarkageneraltrading.ae/" target="_blank" rel="noopener noreferrer" className="t-name" style={{textDecoration: 'none', color: 'inherit'}}>Dwarka Gen. Trading <span style={{fontSize: '0.8em', color: 'var(--cyan)'}}>↗</span></a>
                <div className="t-loc">Corporate Platform · UAE 🇦🇪</div>
              </div>
            </div>
          </div>

          <div className="tcard">
            <div className="t-stars"><div className="star"></div><div className="star"></div><div className="star"></div><div className="star"></div><div className="star"></div></div>
            <p className="t-text">&quot;Our brand portal is now incredibly cohesive. NeoKlyn delivered a pixel-perfect, premium build that loads instantly and positions us flawlessly in our market.&quot;</p>
            <div className="t-author">
              <div className="t-av">AA</div>
              <div>
                <a href="https://aathithyan.com/" target="_blank" rel="noopener noreferrer" className="t-name" style={{textDecoration: 'none', color: 'inherit'}}>Aathithyan <span style={{fontSize: '0.8em', color: 'var(--cyan)'}}>↗</span></a>
                <div className="t-loc">Brand Website · India 🇮🇳</div>
              </div>
            </div>
          </div>

          <div className="tcard">
            <div className="t-stars"><div className="star"></div><div className="star"></div><div className="star"></div><div className="star"></div><div className="star"></div></div>
            <p className="t-text">&quot;For an industrial concrete business, we needed a site showing strength and scale. They delivered a highly professional platform that drives immediate trust.&quot;</p>
            <div className="t-author">
              <div className="t-av">ZC</div>
              <div>
                <a href="https://zinadconcreteworks.com/" target="_blank" rel="noopener noreferrer" className="t-name" style={{textDecoration: 'none', color: 'inherit'}}>Zinad Concrete Works <span style={{fontSize: '0.8em', color: 'var(--cyan)'}}>↗</span></a>
                <div className="t-loc">Industrial Web · UAE 🇦🇪</div>
              </div>
            </div>
          </div>

          <div className="tcard">
            <div className="t-stars"><div className="star"></div><div className="star"></div><div className="star"></div><div className="star"></div><div className="star"></div></div>
            <p className="t-text">&quot;Our travel venture's metrics jumped significantly after our launch. The bespoke UI and striking visual aesthetic they built for us is absolutely world-class.&quot;</p>
            <div className="t-author">
              <div className="t-av">TV</div>
              <div>
                <a href="https://travexventures.com/" target="_blank" rel="noopener noreferrer" className="t-name" style={{textDecoration: 'none', color: 'inherit'}}>Travex Ventures <span style={{fontSize: '0.8em', color: 'var(--cyan)'}}>↗</span></a>
                <div className="t-loc">Travel Agency Site · India 🇮🇳</div>
              </div>
            </div>
          </div>

          <div className="tcard">
            <div className="t-stars"><div className="star"></div><div className="star"></div><div className="star"></div><div className="star"></div><div className="star"></div></div>
            <p className="t-text">&quot;We demanded a total digital transformation. The resulting application is incredibly performant, fully responsive, and positions us as modern industry leaders.&quot;</p>
            <div className="t-author">
              <div className="t-av">LP</div>
              <div>
                <a href="http://lpsmpvtltd.com/" target="_blank" rel="noopener noreferrer" className="t-name" style={{textDecoration: 'none', color: 'inherit'}}>LPSM Pvt. Ltd. <span style={{fontSize: '0.8em', color: 'var(--cyan)'}}>↗</span></a>
                <div className="t-loc">Manufacturing Hub · India 🇮🇳</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FEATURED WORK PREVIEW */}
      <section className="section section-alt">
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

          <a href="https://travexventures.com/" target="_blank" rel="noopener noreferrer" className="tcard reveal" style={{ textDecoration: 'none', color: 'inherit', padding: '0', minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent), url(/assets/work/travex.jpg) center/cover' }}>
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
      </section>

      {/* CTA */}
      <CTASection />
    </main>
  );
}
