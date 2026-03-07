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
          <div className="hero-eyebrow">AVAILABLE FOR NEW PROJECTS · US · UAE · IN</div>
          <h1 className="hero-title">
            <span className="line"><span>WE BUILD</span></span>
            <span className="line"><span className="title-outline">DIGITAL</span></span>
            <span className="line"><span className="title-cyan">PRODUCTS</span></span>
          </h1>
          <p className="hero-desc">Web apps, mobile, ecommerce, 3D experiences &amp; performance marketing — engineered for conversion, designed to impress.</p>
          <div className="hero-btns">
            <Link href="/contact" className="btn-main">Start a Project ↗</Link>
            <Link href="/services" className="btn-ghost">
              Explore Services
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </div>
        </div>

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
          <div className="ticker-item"><span className="t-icon">✦</span> Web Development</div>
          <div className="ticker-item"><span className="t-icon">✦</span> Mobile Apps</div>
          <div className="ticker-item"><span className="t-icon">✦</span> Ecommerce</div>
          <div className="ticker-item"><span className="t-icon">✦</span> 3D Websites</div>
          <div className="ticker-item"><span className="t-icon">✦</span> Digital Marketing</div>
          <div className="ticker-item"><span className="t-icon">✦</span> SEO &amp; PPC</div>
          <div className="ticker-item"><span className="t-icon">✦</span> UI/UX Design</div>
          <div className="ticker-item"><span className="t-icon">✦</span> Brand Identity</div>
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
            <Link href="/services#web" className="service-item" style={{ textDecoration: 'none', color: 'inherit' }}>
              <span className="si-num">01</span>
              <span className="si-name">Web Design &amp; Development</span>
              <span className="si-arrow">→</span>
            </Link>
            <Link href="/services#mobile" className="service-item" style={{ textDecoration: 'none', color: 'inherit' }}>
              <span className="si-num">02</span>
              <span className="si-name">Mobile App Development</span>
              <span className="si-arrow">→</span>
            </Link>
            <Link href="/services#ecommerce" className="service-item" style={{ textDecoration: 'none', color: 'inherit' }}>
              <span className="si-num">03</span>
              <span className="si-name">Ecommerce Solutions</span>
              <span className="si-arrow">→</span>
            </Link>
            <Link href="/services#marketing" className="service-item" style={{ textDecoration: 'none', color: 'inherit' }}>
              <span className="si-num">04</span>
              <span className="si-name">Digital Marketing</span>
              <span className="si-arrow">→</span>
            </Link>
            <Link href="/services#3d" className="service-item" style={{ textDecoration: 'none', color: 'inherit' }}>
              <span className="si-num">05</span>
              <span className="si-name">3D &amp; Immersive Web</span>
              <span className="si-arrow">→</span>
            </Link>
            <Link href="/services#branding" className="service-item" style={{ textDecoration: 'none', color: 'inherit' }}>
              <span className="si-num">06</span>
              <span className="si-name">UI/UX &amp; Branding</span>
              <span className="si-arrow">→</span>
            </Link>
          </div>
          <div className="service-detail reveal">
            <div className="sd-active-label">All Services</div>
            <div className="service-cards-grid">
              <div className="sc">
                <div className="sc-icon">🌐</div>
                <div className="sc-name">Web Development</div>
                <div className="sc-desc">Fast, SEO-optimized sites built on modern stacks.</div>
                <div className="sc-tags"><span className="sc-tag">React</span><span className="sc-tag">Next.js</span><span className="sc-tag">Webflow</span></div>
              </div>
              <div className="sc">
                <div className="sc-icon">📱</div>
                <div className="sc-name">Mobile Apps</div>
                <div className="sc-desc">Cross-platform iOS &amp; Android apps that scale.</div>
                <div className="sc-tags"><span className="sc-tag">Flutter</span><span className="sc-tag">RN</span><span className="sc-tag">Swift</span></div>
              </div>
              <div className="sc">
                <div className="sc-icon">🛒</div>
                <div className="sc-name">Ecommerce</div>
                <div className="sc-desc">High-converting stores with seamless checkout.</div>
                <div className="sc-tags"><span className="sc-tag">Shopify</span><span className="sc-tag">WooCommerce</span></div>
              </div>
              <div className="sc">
                <div className="sc-icon">🎮</div>
                <div className="sc-name">3D Websites</div>
                <div className="sc-desc">Immersive WebGL experiences that leave impressions.</div>
                <div className="sc-tags"><span className="sc-tag">Three.js</span><span className="sc-tag">GSAP</span></div>
              </div>
              <div className="sc">
                <div className="sc-icon">📈</div>
                <div className="sc-name">Digital Marketing</div>
                <div className="sc-desc">ROI-focused SEO, PPC, and social campaigns.</div>
                <div className="sc-tags"><span className="sc-tag">Google Ads</span><span className="sc-tag">Meta</span><span className="sc-tag">SEO</span></div>
              </div>
              <div className="sc">
                <div className="sc-icon">🎨</div>
                <div className="sc-name">UI/UX Design</div>
                <div className="sc-desc">Brand systems and interfaces users love.</div>
                <div className="sc-tags"><span className="sc-tag">Figma</span><span className="sc-tag">Branding</span></div>
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
        <div className="markets-layout reveal">
          <div className="market">
            <div className="m-num">01</div>
            <div className="m-flag">🇺🇸</div>
            <div className="m-name">United States</div>
            <p className="m-desc">Serving US startups and enterprises — we align with American timelines, standards, and expectations for world-class digital products.</p>
            <span className="m-tag">EST · PST Timezones</span>
          </div>
          <div className="market">
            <div className="m-num">02</div>
            <div className="m-flag">🇦🇪</div>
            <div className="m-name">UAE &amp; Middle East</div>
            <p className="m-desc">Deep expertise in Dubai &amp; Abu Dhabi market — Arabic RTL support, regional compliance, and luxury brand sensibility built in.</p>
            <span className="m-tag">GST Timezone</span>
          </div>
          <div className="market">
            <div className="m-num">03</div>
            <div className="m-flag">🇮🇳</div>
            <div className="m-name">India</div>
            <p className="m-desc">Home base — premium execution at competitive rates for India&apos;s fast-growing startups, SMEs, and enterprises.</p>
            <span className="m-tag">IST Timezone</span>
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
            <div className="p-num">01</div>
            <div className="p-line"></div>
            <div className="p-title">Discovery</div>
            <p className="p-desc">We audit your goals, audience, and competitive landscape to define a strategy that actually wins.</p>
            <div className="p-connector"></div>
          </div>
          <div className="p-step">
            <div className="p-num">02</div>
            <div className="p-line"></div>
            <div className="p-title">Design</div>
            <p className="p-desc">Wireframes → prototypes → final UI. Your approval before a single line of production code is written.</p>
            <div className="p-connector"></div>
          </div>
          <div className="p-step">
            <div className="p-num">03</div>
            <div className="p-line"></div>
            <div className="p-title">Build</div>
            <p className="p-desc">Clean, tested code. Weekly updates, staging previews, and full transparency throughout development.</p>
            <div className="p-connector"></div>
          </div>
          <div className="p-step">
            <div className="p-num">04</div>
            <div className="p-line"></div>
            <div className="p-title">Launch &amp; Scale</div>
            <p className="p-desc">Deploy, monitor, iterate. Ongoing marketing and retainer options to keep growing post-launch.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section" id="testimonials">
        <div className="reveal">
          <div className="s-label">Client Stories</div>
          <h2 className="s-title">WHAT THEY SAY</h2>
        </div>
        <div className="test-grid reveal">
          <div className="tcard">
            <div className="t-stars"><div className="star"></div><div className="star"></div><div className="star"></div><div className="star"></div><div className="star"></div></div>
            <p className="t-text">&quot;They rebuilt our Shopify store and conversion rate jumped 40% in 60 days. The 3D product viewer they built is absolutely world class.&quot;</p>
            <div className="t-author">
              <div className="t-av">JM</div>
              <div>
                <div className="t-name">James Mitchell</div>
                <div className="t-loc">Ecommerce Founder · New York 🇺🇸</div>
              </div>
            </div>
          </div>
          <div className="tcard">
            <div className="t-stars"><div className="star"></div><div className="star"></div><div className="star"></div><div className="star"></div><div className="star"></div></div>
            <p className="t-text">&quot;Our luxury real estate 3D website in Dubai gets compliments from every client. NeoKlyn understood the brand vision from day one.&quot;</p>
            <div className="t-author">
              <div className="t-av">FA</div>
              <div>
                <div className="t-name">Fatima Al-Rashid</div>
                <div className="t-loc">Real Estate CEO · Dubai 🇦🇪</div>
              </div>
            </div>
          </div>
          <div className="tcard">
            <div className="t-stars"><div className="star"></div><div className="star"></div><div className="star"></div><div className="star"></div><div className="star"></div></div>
            <p className="t-text">&quot;On-time, on-budget, and the app UX is exceptional. Our 4.8★ App Store rating speaks for itself. Would work with them again in a heartbeat.&quot;</p>
            <div className="t-author">
              <div className="t-av">RK</div>
              <div>
                <div className="t-name">Rahul Kapoor</div>
                <div className="t-loc">Tech Startup CEO · Bangalore 🇮🇳</div>
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
          <Link href="/work" className="tcard reveal" style={{ textDecoration: 'none', color: 'inherit', padding: '0', minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent), url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80) center/cover' }}>
            <div style={{ padding: '2rem' }}>
              <div className="m-tag" style={{ border: 'none', background: 'var(--cyan)', color: 'var(--bg)', marginBottom: '1rem', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>Real Estate</div>
              <h3 className="p-title" style={{ fontSize: '1.4rem' }}>Luxury Dubai Villas 3D</h3>
            </div>
          </Link>
          <Link href="/work" className="tcard reveal" style={{ textDecoration: 'none', color: 'inherit', padding: '0', minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent), url(https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80) center/cover' }}>
            <div style={{ padding: '2rem' }}>
              <div className="m-tag" style={{ border: 'none', background: 'var(--pink)', color: '#fff', marginBottom: '1rem', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>Ecommerce</div>
              <h3 className="p-title" style={{ fontSize: '1.4rem' }}>Next-Gen Storefront</h3>
            </div>
          </Link>
          <Link href="/work" className="tcard reveal" style={{ textDecoration: 'none', color: 'inherit', padding: '0', minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent), url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80) center/cover' }}>
            <div style={{ padding: '2rem' }}>
              <div className="m-tag" style={{ border: 'none', background: 'var(--amber)', color: '#000', marginBottom: '1rem', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>SaaS App</div>
              <h3 className="p-title" style={{ fontSize: '1.4rem' }}>FinTech Analytics Dash</h3>
            </div>
          </Link>
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
