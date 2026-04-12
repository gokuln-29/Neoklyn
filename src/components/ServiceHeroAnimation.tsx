'use client';

// ─── SHARED STYLES ─────────────────────────────────────────────
const containerStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  maxWidth: '540px',
  aspectRatio: '1',
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
};

const orbStyle = (color: string, size: number, top: string, left: string): React.CSSProperties => ({
  position: 'absolute',
  width: size,
  height: size,
  borderRadius: '50%',
  background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
  filter: 'blur(60px)',
  top,
  left,
  pointerEvents: 'none',
});

// ─── WEB DEVELOPMENT ─────────────────────────────────────────
function WebAnimation() {
  return (
    <div style={containerStyle}>
      <div style={orbStyle('rgba(6,182,212,0.2)', 300, '-10%', '-10%')} />
      <div style={orbStyle('rgba(59,130,246,0.15)', 250, '50%', '50%')} />
      <style>{`
        @keyframes webFloat { 0%,100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-12px) rotate(2deg); } }
        @keyframes webPulse { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
        @keyframes webType { 0% { width: 0; } 50% { width: 100%; } 100% { width: 0; } }
        @keyframes webScanline { 0% { top: 0; } 100% { top: 100%; } }
        .web-browser { animation: webFloat 6s ease-in-out infinite; }
        .web-code-line { animation: webPulse 3s ease-in-out infinite; }
        .web-code-line:nth-child(2) { animation-delay: 0.3s; }
        .web-code-line:nth-child(3) { animation-delay: 0.6s; }
        .web-code-line:nth-child(4) { animation-delay: 0.9s; }
        .web-type-cursor { animation: webPulse 1s linear infinite; }
      `}</style>
      <svg className="web-browser" viewBox="0 0 400 300" fill="none" style={{ width: '85%', zIndex: 1 }}>
        {/* Browser Window */}
        <rect x="20" y="20" width="360" height="260" rx="16" fill="rgba(10,10,15,0.8)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
        {/* Title bar */}
        <rect x="20" y="20" width="360" height="40" rx="16" fill="rgba(255,255,255,0.03)" />
        <rect x="20" y="44" width="360" height="16" fill="rgba(255,255,255,0.03)" />
        <circle cx="44" cy="40" r="5" fill="#ff5f57" />
        <circle cx="62" cy="40" r="5" fill="#ffbd2e" />
        <circle cx="80" cy="40" r="5" fill="#28ca41" />
        {/* URL bar */}
        <rect x="110" y="33" width="200" height="14" rx="4" fill="rgba(255,255,255,0.05)" />
        <text x="130" y="43" fill="rgba(6,182,212,0.6)" fontSize="8" fontFamily="monospace">https://neoklyn.com</text>
        {/* Code lines */}
        <g className="web-code-line">
          <rect x="40" y="80" width="120" height="6" rx="3" fill="rgba(6,182,212,0.3)" />
        </g>
        <g className="web-code-line">
          <rect x="40" y="96" width="200" height="6" rx="3" fill="rgba(59,130,246,0.25)" />
        </g>
        <g className="web-code-line">
          <rect x="40" y="112" width="160" height="6" rx="3" fill="rgba(124,58,237,0.25)" />
        </g>
        <g className="web-code-line">
          <rect x="40" y="128" width="80" height="6" rx="3" fill="rgba(6,182,212,0.2)" />
        </g>
        {/* Layout preview blocks */}
        <rect x="40" y="155" width="140" height="90" rx="8" fill="rgba(6,182,212,0.08)" stroke="rgba(6,182,212,0.2)" strokeWidth="1" />
        <rect x="200" y="155" width="160" height="42" rx="6" fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.2)" strokeWidth="1" />
        <rect x="200" y="205" width="160" height="40" rx="6" fill="rgba(124,58,237,0.08)" stroke="rgba(124,58,237,0.15)" strokeWidth="1" />
        {/* Floating elements */}
        <g opacity="0.6">
          <text x="50" y="195" fill="var(--cyan)" fontSize="36" fontFamily="monospace">&lt;/&gt;</text>
        </g>
        {/* Cursor blink */}
        <rect className="web-type-cursor" x="120" y="80" width="2" height="6" rx="1" fill="var(--cyan)" />
      </svg>
    </div>
  );
}

// ─── MOBILE APP ──────────────────────────────────────────────
function MobileAnimation() {
  return (
    <div style={containerStyle}>
      <div style={orbStyle('rgba(59,130,246,0.2)', 280, '10%', '20%')} />
      <div style={orbStyle('rgba(124,58,237,0.15)', 200, '60%', '60%')} />
      <style>{`
        @keyframes mobileFloat { 0%,100%{ transform: translateY(0); } 50%{ transform: translateY(-15px); } }
        @keyframes mobileSwipe { 0% { transform: translateX(-100%); opacity:0; } 20%{ transform:translateX(0); opacity:1; } 80%{ transform:translateX(0); opacity:1; } 100%{ transform:translateX(100%); opacity:0; } }
        @keyframes mobileNotif { 0%,80%,100%{ transform: translateY(-20px); opacity:0; } 10%{ transform:translateY(0); opacity:1; } 70%{ transform:translateY(0); opacity:1; } }
        @keyframes mobilePulseBtn { 0%,100%{ box-shadow: 0 0 0 0 rgba(6,182,212,0.4); } 50%{ box-shadow: 0 0 0 10px rgba(6,182,212,0); } }
        .mobile-phone { animation: mobileFloat 5s ease-in-out infinite; }
        .mobile-screen-card { animation: mobileSwipe 5s ease-in-out infinite; }
        .mobile-screen-card:nth-child(2) { animation-delay: 2.5s; }
        .mobile-notif { animation: mobileNotif 6s ease-in-out infinite; }
        .mobile-notif:nth-child(2) { animation-delay: 2s; }
      `}</style>
      <svg className="mobile-phone" viewBox="0 0 260 480" fill="none" style={{ width: '50%', zIndex: 1 }}>
        {/* Phone frame */}
        <rect x="10" y="10" width="240" height="460" rx="32" fill="rgba(10,10,15,0.9)" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
        {/* Notch */}
        <rect x="80" y="10" width="100" height="28" rx="14" fill="rgba(10,10,15,0.9)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <circle cx="130" cy="24" r="4" fill="rgba(255,255,255,0.1)" />
        {/* Status bar */}
        <text x="30" y="55" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="monospace">9:41</text>
        <g transform="translate(200,47)">
          <rect width="20" height="10" rx="2" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          <rect x="2" y="2" width="12" height="6" rx="1" fill="rgba(40,202,65,0.7)" />
          <rect x="21" y="3" width="2" height="4" rx="1" fill="rgba(255,255,255,0.3)" />
        </g>

        {/* App UI - Header */}
        <rect x="25" y="70" width="210" height="50" rx="12" fill="rgba(6,182,212,0.08)" stroke="rgba(6,182,212,0.2)" strokeWidth="1" />
        <rect x="40" y="82" width="80" height="8" rx="4" fill="rgba(6,182,212,0.4)" />
        <rect x="40" y="96" width="120" height="6" rx="3" fill="rgba(255,255,255,0.1)" />

        {/* Cards */}
        <g className="mobile-screen-card">
          <rect x="25" y="135" width="210" height="100" rx="12" fill="rgba(59,130,246,0.06)" stroke="rgba(59,130,246,0.15)" strokeWidth="1" />
          <rect x="40" y="150" width="60" height="60" rx="8" fill="rgba(59,130,246,0.12)" />
          <rect x="115" y="155" width="100" height="8" rx="4" fill="rgba(255,255,255,0.15)" />
          <rect x="115" y="170" width="70" height="6" rx="3" fill="rgba(255,255,255,0.08)" />
          <rect x="115" y="183" width="90" height="6" rx="3" fill="rgba(255,255,255,0.06)" />
          <rect x="115" y="200" width="55" height="20" rx="6" fill="rgba(6,182,212,0.2)" />
          <text x="125" y="214" fill="rgba(6,182,212,0.8)" fontSize="8" fontFamily="monospace">View →</text>
        </g>

        <g className="mobile-screen-card">
          <rect x="25" y="250" width="210" height="80" rx="12" fill="rgba(124,58,237,0.06)" stroke="rgba(124,58,237,0.15)" strokeWidth="1" />
          <circle cx="60" cy="290" r="20" fill="rgba(124,58,237,0.12)" />
          <rect x="95" y="278" width="100" height="8" rx="4" fill="rgba(255,255,255,0.12)" />
          <rect x="95" y="293" width="80" height="6" rx="3" fill="rgba(255,255,255,0.07)" />
        </g>

        {/* Bottom nav */}
        <rect x="25" y="400" width="210" height="50" rx="12" fill="rgba(255,255,255,0.03)" />
        <circle cx="65" cy="425" r="10" fill="rgba(6,182,212,0.2)" />
        <circle cx="130" cy="425" r="10" fill="rgba(255,255,255,0.05)" />
        <circle cx="195" cy="425" r="10" fill="rgba(255,255,255,0.05)" />
        <circle cx="65" cy="425" r="3" fill="rgba(6,182,212,0.8)" />

        {/* Notifications */}
        <g className="mobile-notif">
          <rect x="140" y="55" width="110" height="35" rx="10" fill="rgba(6,182,212,0.15)" stroke="rgba(6,182,212,0.3)" strokeWidth="1" />
          <circle cx="155" cy="72" r="6" fill="rgba(6,182,212,0.5)" />
          <rect x="166" y="66" width="70" height="5" rx="2" fill="rgba(255,255,255,0.2)" />
          <rect x="166" y="75" width="50" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
        </g>

        {/* Home indicator */}
        <rect x="95" y="455" width="70" height="4" rx="2" fill="rgba(255,255,255,0.15)" />
      </svg>
    </div>
  );
}

// ─── ECOMMERCE ───────────────────────────────────────────────
function EcommerceAnimation() {
  return (
    <div style={containerStyle}>
      <div style={orbStyle('rgba(124,58,237,0.2)', 300, '0%', '10%')} />
      <div style={orbStyle('rgba(6,182,212,0.15)', 200, '50%', '60%')} />
      <style>{`
        @keyframes ecomFloat { 0%,100%{ transform: translateY(0) scale(1); } 50%{ transform: translateY(-10px) scale(1.02); } }
        @keyframes ecomCartBounce { 0%,100%{ transform: scale(1); } 50%{ transform: scale(1.1); } }
        @keyframes ecomSlide { 0%{ transform: translateX(30px); opacity:0; } 20%{ transform:translateX(0); opacity:1; } 100%{ transform:translateX(0); opacity:1; } }
        @keyframes ecomBadgePulse { 0%,100%{ transform: scale(1); } 50%{ transform: scale(1.2); } }
        .ecom-storefront { animation: ecomFloat 6s ease-in-out infinite; }
        .ecom-product:nth-child(1) { animation: ecomSlide 4s ease-in-out infinite; }
        .ecom-product:nth-child(2) { animation: ecomSlide 4s ease-in-out infinite 0.3s; }
        .ecom-product:nth-child(3) { animation: ecomSlide 4s ease-in-out infinite 0.6s; }
        .ecom-cart-badge { animation: ecomBadgePulse 2s ease-in-out infinite; }
      `}</style>
      <svg className="ecom-storefront" viewBox="0 0 400 300" fill="none" style={{ width: '85%', zIndex:1 }}>
        {/* Store window */}
        <rect x="20" y="20" width="360" height="260" rx="16" fill="rgba(10,10,15,0.8)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
        <rect x="20" y="20" width="360" height="45" rx="16" fill="rgba(255,255,255,0.03)" />
        <rect x="20" y="49" width="360" height="16" fill="rgba(255,255,255,0.03)" />
        {/* Nav */}
        <rect x="40" y="33" width="60" height="8" rx="4" fill="rgba(124,58,237,0.5)" />
        <rect x="120" y="33" width="40" height="6" rx="3" fill="rgba(255,255,255,0.1)" />
        <rect x="170" y="33" width="40" height="6" rx="3" fill="rgba(255,255,255,0.1)" />
        <rect x="220" y="33" width="40" height="6" rx="3" fill="rgba(255,255,255,0.1)" />
        {/* Cart icon */}
        <g transform="translate(330,28)">
          <path d="M5 5 L8 5 L11 18 H25 L28 8 H10" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" />
          <circle className="ecom-cart-badge" cx="22" cy="3" r="6" fill="rgba(124,58,237,0.8)" />
          <text x="20" y="6" fill="white" fontSize="7" textAnchor="middle" fontFamily="monospace">3</text>
        </g>
        {/* Product cards */}
        <g className="ecom-product">
          <rect x="40" y="80" width="100" height="130" rx="10" fill="rgba(124,58,237,0.06)" stroke="rgba(124,58,237,0.15)" strokeWidth="1" />
          <rect x="50" y="90" width="80" height="60" rx="6" fill="rgba(124,58,237,0.1)" />
          <rect x="50" y="160" width="60" height="6" rx="3" fill="rgba(255,255,255,0.15)" />
          <rect x="50" y="172" width="40" height="5" rx="2" fill="rgba(255,255,255,0.08)" />
          <text x="50" y="195" fill="rgba(124,58,237,0.8)" fontSize="11" fontFamily="monospace" fontWeight="bold">$49.99</text>
        </g>
        <g className="ecom-product">
          <rect x="150" y="80" width="100" height="130" rx="10" fill="rgba(6,182,212,0.06)" stroke="rgba(6,182,212,0.15)" strokeWidth="1" />
          <rect x="160" y="90" width="80" height="60" rx="6" fill="rgba(6,182,212,0.1)" />
          <rect x="160" y="160" width="60" height="6" rx="3" fill="rgba(255,255,255,0.15)" />
          <rect x="160" y="172" width="50" height="5" rx="2" fill="rgba(255,255,255,0.08)" />
          <text x="160" y="195" fill="rgba(6,182,212,0.8)" fontSize="11" fontFamily="monospace" fontWeight="bold">$79.00</text>
        </g>
        <g className="ecom-product">
          <rect x="260" y="80" width="100" height="130" rx="10" fill="rgba(59,130,246,0.06)" stroke="rgba(59,130,246,0.15)" strokeWidth="1" />
          <rect x="270" y="90" width="80" height="60" rx="6" fill="rgba(59,130,246,0.1)" />
          <rect x="270" y="160" width="70" height="6" rx="3" fill="rgba(255,255,255,0.15)" />
          <rect x="270" y="172" width="45" height="5" rx="2" fill="rgba(255,255,255,0.08)" />
          <text x="270" y="195" fill="rgba(59,130,246,0.8)" fontSize="11" fontFamily="monospace" fontWeight="bold">$129.99</text>
        </g>
        {/* Buy button */}
        <rect x="130" y="230" width="140" height="35" rx="8" fill="rgba(124,58,237,0.2)" stroke="rgba(124,58,237,0.4)" strokeWidth="1" />
        <text x="165" y="252" fill="rgba(124,58,237,0.9)" fontSize="11" fontFamily="monospace" fontWeight="bold">Add to Cart →</text>
      </svg>
    </div>
  );
}

// ─── DIGITAL MARKETING ───────────────────────────────────────
function MarketingAnimation() {
  return (
    <div style={containerStyle}>
      <div style={orbStyle('rgba(6,182,212,0.2)', 280, '5%', '5%')} />
      <div style={orbStyle('rgba(59,130,246,0.15)', 220, '55%', '55%')} />
      <style>{`
        @keyframes mktBarGrow { 0% { transform: scaleY(0); } 50% { transform: scaleY(1); } 100% { transform: scaleY(1); } }
        @keyframes mktLineTrace { 0% { stroke-dashoffset: 600; } 100% { stroke-dashoffset: 0; } }
        @keyframes mktPulse { 0%,100% { r: 4; opacity:0.6; } 50% { r: 6; opacity:1; } }
        @keyframes mktCounter { 0%,100%{ opacity: 0.7; } 50%{ opacity: 1; } }
        .mkt-bar { transform-origin: bottom; animation: mktBarGrow 3s ease-out infinite; }
        .mkt-bar:nth-child(2) { animation-delay: 0.2s; }
        .mkt-bar:nth-child(3) { animation-delay: 0.4s; }
        .mkt-bar:nth-child(4) { animation-delay: 0.6s; }
        .mkt-bar:nth-child(5) { animation-delay: 0.8s; }
        .mkt-bar:nth-child(6) { animation-delay: 1s; }
        .mkt-bar:nth-child(7) { animation-delay: 1.2s; }
        .mkt-line { stroke-dasharray: 600; animation: mktLineTrace 4s ease-in-out infinite; }
        .mkt-dot { animation: mktPulse 2s ease-in-out infinite; }
        .mkt-counter { animation: mktCounter 3s ease-in-out infinite; }
      `}</style>
      <svg viewBox="0 0 400 300" fill="none" style={{ width: '85%', zIndex:1 }}>
        {/* Dashboard frame */}
        <rect x="20" y="20" width="360" height="260" rx="16" fill="rgba(10,10,15,0.8)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
        {/* KPI cards */}
        <g className="mkt-counter">
          <rect x="35" y="35" width="100" height="50" rx="8" fill="rgba(6,182,212,0.08)" stroke="rgba(6,182,212,0.2)" strokeWidth="1" />
          <text x="50" y="55" fill="rgba(6,182,212,0.8)" fontSize="14" fontFamily="monospace" fontWeight="bold">12,459</text>
          <text x="50" y="70" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="monospace">VISITORS</text>
        </g>
        <g className="mkt-counter">
          <rect x="145" y="35" width="100" height="50" rx="8" fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.2)" strokeWidth="1" />
          <text x="160" y="55" fill="rgba(59,130,246,0.8)" fontSize="14" fontFamily="monospace" fontWeight="bold">4.8%</text>
          <text x="160" y="70" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="monospace">CONV. RATE</text>
        </g>
        <g className="mkt-counter">
          <rect x="255" y="35" width="110" height="50" rx="8" fill="rgba(124,58,237,0.08)" stroke="rgba(124,58,237,0.2)" strokeWidth="1" />
          <text x="270" y="55" fill="rgba(124,58,237,0.8)" fontSize="14" fontFamily="monospace" fontWeight="bold">$87.2K</text>
          <text x="270" y="70" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="monospace">REVENUE</text>
        </g>

        {/* Chart area */}
        <rect x="35" y="100" width="330" height="160" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        {/* Grid lines */}
        <line x1="35" y1="140" x2="365" y2="140" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        <line x1="35" y1="180" x2="365" y2="180" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        <line x1="35" y1="220" x2="365" y2="220" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        {/* Bar chart */}
        <rect className="mkt-bar" x="60" y="170" width="18" height="70" rx="3" fill="rgba(6,182,212,0.3)" />
        <rect className="mkt-bar" x="100" y="150" width="18" height="90" rx="3" fill="rgba(6,182,212,0.35)" />
        <rect className="mkt-bar" x="140" y="130" width="18" height="110" rx="3" fill="rgba(6,182,212,0.4)" />
        <rect className="mkt-bar" x="180" y="145" width="18" height="95" rx="3" fill="rgba(59,130,246,0.4)" />
        <rect className="mkt-bar" x="220" y="125" width="18" height="115" rx="3" fill="rgba(59,130,246,0.45)" />
        <rect className="mkt-bar" x="260" y="115" width="18" height="125" rx="3" fill="rgba(124,58,237,0.4)" />
        <rect className="mkt-bar" x="300" y="105" width="18" height="135" rx="3" fill="rgba(124,58,237,0.5)" />
        {/* Trend line */}
        <path className="mkt-line" d="M69 165 L109 145 L149 125 L189 138 L229 118 L269 108 L309 100" stroke="rgba(6,182,212,0.7)" strokeWidth="2" fill="none" />
        {/* Data points */}
        <circle className="mkt-dot" cx="69" cy="165" r="4" fill="var(--cyan)" />
        <circle className="mkt-dot" cx="149" cy="125" r="4" fill="var(--cyan)" style={{ animationDelay: '0.3s' }} />
        <circle className="mkt-dot" cx="229" cy="118" r="4" fill="var(--cyan)" style={{ animationDelay: '0.6s' }} />
        <circle className="mkt-dot" cx="309" cy="100" r="4" fill="var(--cyan)" style={{ animationDelay: '0.9s' }} />
        {/* Growth arrow */}
        <text x="320" y="100" fill="rgba(40,202,65,0.8)" fontSize="12" fontFamily="monospace">↑ 32%</text>
      </svg>
    </div>
  );
}

// ─── 3D & IMMERSIVE ──────────────────────────────────────────
function ThreeDAnimation() {
  return (
    <div style={containerStyle}>
      <div style={orbStyle('rgba(59,130,246,0.2)', 300, '0%', '20%')} />
      <div style={orbStyle('rgba(124,58,237,0.18)', 250, '50%', '50%')} />
      <style>{`
        @keyframes cubeRotate { 0%{ transform: rotate(0deg); } 100%{ transform: rotate(360deg); } }
        @keyframes cubeFloat { 0%,100%{ transform: translateY(0); } 50%{ transform: translateY(-20px); } }
        @keyframes particleDrift { 0%{ opacity:0; transform: translate(0,0) scale(0); } 50%{ opacity:1; transform: translate(var(--dx), var(--dy)) scale(1); } 100%{ opacity:0; transform: translate(calc(var(--dx)*2), calc(var(--dy)*2)) scale(0); } }
        @keyframes wireframe { 0%,100%{ stroke-dashoffset: 0; } 50%{ stroke-dashoffset: 80; } }
        .three-d-group { animation: cubeFloat 5s ease-in-out infinite; }
        .three-d-ring { animation: cubeRotate 12s linear infinite; transform-origin: center; }
        .three-d-ring-rev { animation: cubeRotate 16s linear infinite reverse; transform-origin: center; }
        .three-d-wire { stroke-dasharray: 40 40; animation: wireframe 6s linear infinite; }
      `}</style>
      <svg viewBox="0 0 400 400" fill="none" style={{ width: '80%', zIndex: 1 }}>
        <g className="three-d-group">
          {/* Outer ring */}
          <g className="three-d-ring">
            <ellipse cx="200" cy="200" rx="150" ry="50" stroke="rgba(59,130,246,0.2)" strokeWidth="1" fill="none" />
          </g>
          <g className="three-d-ring-rev">
            <ellipse cx="200" cy="200" rx="130" ry="80" stroke="rgba(124,58,237,0.2)" strokeWidth="1" fill="none" transform="rotate(60,200,200)" />
          </g>
          <g className="three-d-ring">
            <ellipse cx="200" cy="200" rx="140" ry="65" stroke="rgba(6,182,212,0.15)" strokeWidth="1" fill="none" transform="rotate(-30,200,200)" />
          </g>
          {/* 3D Cube wireframe */}
          <g className="three-d-wire">
            <path d="M170 170 L230 170 L250 150 L190 150 Z" stroke="rgba(59,130,246,0.5)" strokeWidth="1.5" fill="rgba(59,130,246,0.05)" />
            <path d="M170 170 L170 230 L230 230 L230 170" stroke="rgba(59,130,246,0.5)" strokeWidth="1.5" fill="rgba(59,130,246,0.03)" />
            <path d="M230 170 L250 150 L250 210 L230 230" stroke="rgba(124,58,237,0.5)" strokeWidth="1.5" fill="rgba(124,58,237,0.03)" />
            <path d="M170 230 L190 210 L250 210 L230 230" stroke="rgba(6,182,212,0.5)" strokeWidth="1.5" fill="rgba(6,182,212,0.03)" />
            <path d="M170 170 L190 150 M190 150 L190 210 M190 210 L170 230" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          </g>
          {/* Center glow */}
          <circle cx="200" cy="190" r="8" fill="rgba(59,130,246,0.6)" style={{ filter: 'blur(2px)' }} />
          <circle cx="200" cy="190" r="3" fill="rgba(59,130,246,1)" />
          {/* Corner vertices */}
          <circle cx="170" cy="170" r="3" fill="rgba(6,182,212,0.8)" />
          <circle cx="230" cy="170" r="3" fill="rgba(6,182,212,0.8)" />
          <circle cx="250" cy="150" r="3" fill="rgba(124,58,237,0.8)" />
          <circle cx="190" cy="150" r="3" fill="rgba(124,58,237,0.8)" />
          <circle cx="170" cy="230" r="2" fill="rgba(59,130,246,0.6)" />
          <circle cx="230" cy="230" r="2" fill="rgba(59,130,246,0.6)" />
          <circle cx="250" cy="210" r="2" fill="rgba(124,58,237,0.6)" />
        </g>
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const dx = Math.cos(angle) * 40;
          const dy = Math.sin(angle) * 40;
          return (
            <circle
              key={i}
              cx={200 + Math.cos(angle) * 100}
              cy={200 + Math.sin(angle) * 100}
              r="2"
              fill={i % 2 === 0 ? 'rgba(6,182,212,0.6)' : 'rgba(124,58,237,0.6)'}
              style={{
                '--dx': `${dx}px`,
                '--dy': `${dy}px`,
                animation: `particleDrift ${3 + i * 0.5}s ease-in-out infinite ${i * 0.4}s`,
              } as React.CSSProperties}
            />
          );
        })}
      </svg>
    </div>
  );
}

// ─── UI/UX & BRANDING ────────────────────────────────────────
function BrandingAnimation() {
  return (
    <div style={containerStyle}>
      <div style={orbStyle('rgba(124,58,237,0.2)', 300, '0%', '10%')} />
      <div style={orbStyle('rgba(6,182,212,0.15)', 200, '60%', '55%')} />
      <style>{`
        @keyframes brandFloat { 0%,100%{ transform: translateY(0) rotate(-2deg); } 50%{ transform: translateY(-12px) rotate(2deg); } }
        @keyframes brandColorShift { 0%{ fill: rgba(6,182,212,0.3); } 33%{ fill: rgba(124,58,237,0.3); } 66%{ fill: rgba(59,130,246,0.3); } 100%{ fill: rgba(6,182,212,0.3); } }
        @keyframes brandPencil { 0%,100%{ transform: translate(0,0) rotate(0deg); } 25%{ transform: translate(15px, -5px) rotate(5deg); } 50%{ transform: translate(30px, 0px) rotate(0deg); } 75%{ transform: translate(15px, 5px) rotate(-5deg); } }
        @keyframes brandGrid { 0%,100% { opacity: 0.3; } 50% { opacity: 0.6; } }
        .brand-canvas { animation: brandFloat 7s ease-in-out infinite; }
        .brand-swatch { animation: brandColorShift 6s linear infinite; }
        .brand-swatch:nth-child(2) { animation-delay: 2s; }
        .brand-swatch:nth-child(3) { animation-delay: 4s; }
        .brand-guide { animation: brandGrid 4s ease-in-out infinite; }
      `}</style>
      <svg className="brand-canvas" viewBox="0 0 400 350" fill="none" style={{ width: '85%', zIndex:1 }}>
        {/* Artboard */}
        <rect x="30" y="30" width="340" height="290" rx="16" fill="rgba(10,10,15,0.8)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
        {/* Grid */}
        <g className="brand-guide">
          {[...Array(6)].map((_, i) => (
            <line key={`h${i}`} x1="30" y1={80 + i * 45} x2="370" y2={80 + i * 45} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
          ))}
          {[...Array(8)].map((_, i) => (
            <line key={`v${i}`} x1={70 + i * 42} y1="30" x2={70 + i * 42} y2="320" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
          ))}
        </g>

        {/* Color palette */}
        <rect className="brand-swatch" x="50" y="50" width="40" height="40" rx="8" fill="rgba(6,182,212,0.3)" />
        <rect className="brand-swatch" x="100" y="50" width="40" height="40" rx="8" fill="rgba(124,58,237,0.3)" />
        <rect className="brand-swatch" x="150" y="50" width="40" height="40" rx="8" fill="rgba(59,130,246,0.3)" />
        <rect x="200" y="50" width="40" height="40" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <rect x="250" y="50" width="40" height="40" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

        {/* Typography sample */}
        <text x="50" y="130" fill="rgba(255,255,255,0.7)" fontSize="24" fontWeight="bold" fontFamily="var(--font-space-grotesk)">Aa</text>
        <rect x="90" y="115" width="80" height="6" rx="3" fill="rgba(255,255,255,0.1)" />
        <rect x="90" y="127" width="60" height="5" rx="2" fill="rgba(255,255,255,0.06)" />
        <text x="200" y="123" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="monospace">Cabinet Grotesk</text>
        <text x="200" y="134" fill="rgba(255,255,255,0.2)" fontSize="8" fontFamily="monospace">JetBrains Mono</text>

        {/* Logo placeholder */}
        <rect x="50" y="155" width="140" height="100" rx="12" fill="rgba(124,58,237,0.05)" stroke="rgba(124,58,237,0.15)" strokeWidth="1" strokeDasharray="5 5" />
        <text x="85" y="210" fill="rgba(124,58,237,0.4)" fontSize="14" fontFamily="monospace">LOGO</text>

        {/* Component preview */}
        <rect x="210" y="155" width="140" height="45" rx="8" fill="rgba(6,182,212,0.06)" stroke="rgba(6,182,212,0.15)" strokeWidth="1" />
        <rect x="225" y="168" width="50" height="6" rx="3" fill="rgba(255,255,255,0.12)" />
        <rect x="225" y="180" width="80" height="5" rx="2" fill="rgba(255,255,255,0.06)" />

        <rect x="210" y="208" width="140" height="47" rx="8" fill="rgba(59,130,246,0.06)" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
        <circle cx="230" cy="232" r="10" fill="rgba(59,130,246,0.15)" />
        <rect x="248" y="225" width="80" height="5" rx="2" fill="rgba(255,255,255,0.1)" />
        <rect x="248" y="235" width="60" height="4" rx="2" fill="rgba(255,255,255,0.06)" />

        {/* Spacing guides */}
        <line x1="50" y1="275" x2="100" y2="275" stroke="rgba(6,182,212,0.3)" strokeWidth="1" />
        <line x1="50" y1="271" x2="50" y2="279" stroke="rgba(6,182,212,0.3)" strokeWidth="1" />
        <line x1="100" y1="271" x2="100" y2="279" stroke="rgba(6,182,212,0.3)" strokeWidth="1" />
        <text x="60" y="290" fill="rgba(6,182,212,0.4)" fontSize="7" fontFamily="monospace">48px</text>

        <line x1="120" y1="275" x2="200" y2="275" stroke="rgba(124,58,237,0.3)" strokeWidth="1" />
        <line x1="120" y1="271" x2="120" y2="279" stroke="rgba(124,58,237,0.3)" strokeWidth="1" />
        <line x1="200" y1="271" x2="200" y2="279" stroke="rgba(124,58,237,0.3)" strokeWidth="1" />
        <text x="145" y="290" fill="rgba(124,58,237,0.4)" fontSize="7" fontFamily="monospace">80px</text>
      </svg>
    </div>
  );
}

// ─── AI AGENTS ───────────────────────────────────────────────
function AIAgentsAnimation() {
  return (
    <div style={containerStyle}>
      <div style={orbStyle('rgba(6,182,212,0.2)', 300, '5%', '5%')} />
      <div style={orbStyle('rgba(124,58,237,0.15)', 250, '50%', '50%')} />
      <style>{`
        @keyframes aiPulseNode { 0%,100%{ r:6; opacity:0.7; } 50%{ r:8; opacity:1; } }
        @keyframes aiDataFlow { 0%{ stroke-dashoffset: 40; } 100%{ stroke-dashoffset: 0; } }
        @keyframes aiBrainPulse { 0%,100%{ opacity: 0.4; transform: scale(1); } 50%{ opacity: 0.8; transform: scale(1.05); } }
        @keyframes aiSpark { 0%,100%{ opacity:0; } 50%{ opacity:1; } }
        .ai-node { animation: aiPulseNode 3s ease-in-out infinite; }
        .ai-node:nth-child(2) { animation-delay: 0.5s; }
        .ai-node:nth-child(3) { animation-delay: 1s; }
        .ai-node:nth-child(4) { animation-delay: 1.5s; }
        .ai-link { stroke-dasharray: 8 8; animation: aiDataFlow 2s linear infinite; }
        .ai-brain { animation: aiBrainPulse 4s ease-in-out infinite; transform-origin: center; }
        .ai-spark { animation: aiSpark 2.5s ease-in-out infinite; }
      `}</style>
      <svg viewBox="0 0 400 400" fill="none" style={{ width: '80%', zIndex:1 }}>
        {/* Central brain/processor */}
        <g className="ai-brain">
          <circle cx="200" cy="200" r="50" fill="rgba(6,182,212,0.05)" stroke="rgba(6,182,212,0.3)" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="35" fill="rgba(6,182,212,0.08)" stroke="rgba(6,182,212,0.2)" strokeWidth="1" />
          {/* CPU grid */}
          <rect x="183" y="183" width="34" height="34" rx="4" fill="rgba(6,182,212,0.1)" stroke="rgba(6,182,212,0.4)" strokeWidth="1" />
          <rect x="190" y="190" width="8" height="8" rx="1" fill="rgba(6,182,212,0.5)" />
          <rect x="202" y="190" width="8" height="8" rx="1" fill="rgba(6,182,212,0.4)" />
          <rect x="190" y="202" width="8" height="8" rx="1" fill="rgba(6,182,212,0.4)" />
          <rect x="202" y="202" width="8" height="8" rx="1" fill="rgba(6,182,212,0.3)" />
          {/* Pins */}
          <line x1="200" y1="150" x2="200" y2="170" stroke="rgba(6,182,212,0.3)" strokeWidth="1" />
          <line x1="200" y1="230" x2="200" y2="250" stroke="rgba(6,182,212,0.3)" strokeWidth="1" />
          <line x1="150" y1="200" x2="170" y2="200" stroke="rgba(6,182,212,0.3)" strokeWidth="1" />
          <line x1="230" y1="200" x2="250" y2="200" stroke="rgba(6,182,212,0.3)" strokeWidth="1" />
        </g>

        {/* Agent nodes */}
        <g>
          {/* Node 1 - top */}
          <line className="ai-link" x1="200" y1="150" x2="200" y2="80" stroke="rgba(6,182,212,0.4)" strokeWidth="1.5" />
          <circle className="ai-node" cx="200" cy="70" r="6" fill="rgba(6,182,212,0.7)" />
          <text x="175" y="55" fill="rgba(6,182,212,0.6)" fontSize="8" fontFamily="monospace">Agent-01</text>

          {/* Node 2 - right */}
          <line className="ai-link" x1="250" y1="200" x2="320" y2="200" stroke="rgba(124,58,237,0.4)" strokeWidth="1.5" />
          <circle className="ai-node" cx="330" cy="200" r="6" fill="rgba(124,58,237,0.7)" />
          <text x="310" y="185" fill="rgba(124,58,237,0.6)" fontSize="8" fontFamily="monospace">Agent-02</text>

          {/* Node 3 - bottom */}
          <line className="ai-link" x1="200" y1="250" x2="200" y2="320" stroke="rgba(59,130,246,0.4)" strokeWidth="1.5" />
          <circle className="ai-node" cx="200" cy="330" r="6" fill="rgba(59,130,246,0.7)" />
          <text x="175" y="350" fill="rgba(59,130,246,0.6)" fontSize="8" fontFamily="monospace">Agent-03</text>

          {/* Node 4 - left */}
          <line className="ai-link" x1="150" y1="200" x2="80" y2="200" stroke="rgba(6,182,212,0.4)" strokeWidth="1.5" />
          <circle className="ai-node" cx="70" cy="200" r="6" fill="rgba(6,182,212,0.7)" />
          <text x="45" y="185" fill="rgba(6,182,212,0.6)" fontSize="8" fontFamily="monospace">Agent-04</text>

          {/* Diagonal nodes */}
          <line className="ai-link" x1="165" y1="165" x2="110" y2="110" stroke="rgba(124,58,237,0.3)" strokeWidth="1" />
          <circle className="ai-node" cx="100" cy="100" r="5" fill="rgba(124,58,237,0.5)" />

          <line className="ai-link" x1="235" y1="165" x2="290" y2="110" stroke="rgba(59,130,246,0.3)" strokeWidth="1" />
          <circle className="ai-node" cx="300" cy="100" r="5" fill="rgba(59,130,246,0.5)" />

          <line className="ai-link" x1="235" y1="235" x2="290" y2="290" stroke="rgba(6,182,212,0.3)" strokeWidth="1" />
          <circle className="ai-node" cx="300" cy="300" r="5" fill="rgba(6,182,212,0.5)" />

          <line className="ai-link" x1="165" y1="235" x2="110" y2="290" stroke="rgba(124,58,237,0.3)" strokeWidth="1" />
          <circle className="ai-node" cx="100" cy="300" r="5" fill="rgba(124,58,237,0.5)" />
        </g>

        {/* Sparks */}
        <circle className="ai-spark" cx="155" cy="155" r="2" fill="rgba(255,255,255,0.6)" />
        <circle className="ai-spark" cx="245" cy="155" r="2" fill="rgba(255,255,255,0.6)" style={{ animationDelay: '0.8s' }} />
        <circle className="ai-spark" cx="245" cy="245" r="2" fill="rgba(255,255,255,0.6)" style={{ animationDelay: '1.6s' }} />
        <circle className="ai-spark" cx="155" cy="245" r="2" fill="rgba(255,255,255,0.6)" style={{ animationDelay: '2.4s' }} />
      </svg>
    </div>
  );
}

// ─── GENERATIVE AI ───────────────────────────────────────────
function GenAIAnimation() {
  return (
    <div style={containerStyle}>
      <div style={orbStyle('rgba(59,130,246,0.2)', 300, '5%', '15%')} />
      <div style={orbStyle('rgba(124,58,237,0.18)', 220, '55%', '55%')} />
      <style>{`
        @keyframes genWave { 0%{ d: path('M40 200 Q120 160 200 200 Q280 240 360 200'); } 50%{ d: path('M40 200 Q120 240 200 200 Q280 160 360 200'); } 100%{ d: path('M40 200 Q120 160 200 200 Q280 240 360 200'); } }
        @keyframes genTyping { 0%{ width: 0; } 60%{ width: 120px; } 100%{ width: 120px; } }
        @keyframes genFade { 0%{ opacity: 0; transform: translateY(8px); } 30%{ opacity: 1; transform: translateY(0); } 100%{ opacity: 1; transform: translateY(0); } }
        @keyframes genGlow { 0%,100%{ filter: drop-shadow(0 0 4px rgba(59,130,246,0.3)); } 50%{ filter: drop-shadow(0 0 12px rgba(59,130,246,0.6)); } }
        @keyframes genStream { 0%{ transform: translateY(0); opacity:1; } 100%{ transform: translateY(-100px); opacity:0; } }
        .gen-nucleus { animation: genGlow 3s ease-in-out infinite; }
        .gen-response-line { animation: genFade 3s ease-out infinite; }
        .gen-response-line:nth-child(2) { animation-delay: 0.4s; }
        .gen-response-line:nth-child(3) { animation-delay: 0.8s; }
        .gen-response-line:nth-child(4) { animation-delay: 1.2s; }
        .gen-token { animation: genStream 3s linear infinite; }
      `}</style>
      <svg viewBox="0 0 400 400" fill="none" style={{ width: '80%', zIndex: 1 }}>
        {/* Central nucleus */}
        <g className="gen-nucleus">
          <circle cx="200" cy="130" r="45" fill="rgba(59,130,246,0.06)" stroke="rgba(59,130,246,0.25)" strokeWidth="1.5" />
          <circle cx="200" cy="130" r="28" fill="rgba(59,130,246,0.1)" stroke="rgba(59,130,246,0.3)" strokeWidth="1" />
          <circle cx="200" cy="130" r="12" fill="rgba(59,130,246,0.4)" />
          <circle cx="200" cy="130" r="5" fill="rgba(59,130,246,0.8)" />
          {/* Neural paths emanating */}
          <path d="M200 175 L200 220" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M155 145 L100 180" stroke="rgba(124,58,237,0.25)" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M245 145 L300 180" stroke="rgba(6,182,212,0.25)" strokeWidth="1" strokeDasharray="3 3" />
        </g>

        {/* Token stream */}
        {['LLM', 'GPT', 'RAG', 'NLP', 'ML'].map((token, i) => (
          <text
            key={i}
            className="gen-token"
            x={120 + i * 40}
            y={185}
            fill={`rgba(${i % 2 === 0 ? '59,130,246' : '124,58,237'},0.25)`}
            fontSize="8"
            fontFamily="monospace"
            style={{ animationDelay: `${i * 0.6}s` }}
          >
            {token}
          </text>
        ))}

        {/* Chat/prompt interface */}
        <rect x="60" y="220" width="280" height="150" rx="14" fill="rgba(10,10,15,0.85)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />

        {/* Prompt */}
        <rect x="75" y="235" width="250" height="32" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <text x="85" y="255" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="monospace">&gt; Generate a marketing strategy...</text>

        {/* AI response lines */}
        <g className="gen-response-line">
          <rect x="75" y="280" width="220" height="6" rx="3" fill="rgba(59,130,246,0.25)" />
        </g>
        <g className="gen-response-line">
          <rect x="75" y="295" width="180" height="6" rx="3" fill="rgba(59,130,246,0.2)" />
        </g>
        <g className="gen-response-line">
          <rect x="75" y="310" width="240" height="6" rx="3" fill="rgba(124,58,237,0.2)" />
        </g>
        <g className="gen-response-line">
          <rect x="75" y="325" width="160" height="6" rx="3" fill="rgba(124,58,237,0.15)" />
        </g>

        {/* AI label */}
        <rect x="75" y="345" width="28" height="14" rx="4" fill="rgba(59,130,246,0.15)" />
        <text x="81" y="355" fill="rgba(59,130,246,0.7)" fontSize="7" fontFamily="monospace">AI</text>
        <rect x="110" y="349" width="2" height="8" rx="1" fill="rgba(59,130,246,0.5)" style={{ animation: 'genGlow 1s linear infinite' }} />

        {/* Floating data points */}
        <circle cx="80" cy="170" r="3" fill="rgba(124,58,237,0.4)" />
        <circle cx="320" cy="175" r="3" fill="rgba(6,182,212,0.4)" />
        <circle cx="100" cy="200" r="2" fill="rgba(59,130,246,0.3)" />
        <circle cx="300" cy="200" r="2" fill="rgba(124,58,237,0.3)" />
      </svg>
    </div>
  );
}

// ─── ANIMATION MAP ───────────────────────────────────────────
const animationMap: Record<string, () => React.JSX.Element> = {
  web: WebAnimation,
  mobile: MobileAnimation,
  ecommerce: EcommerceAnimation,
  marketing: MarketingAnimation,
  '3d': ThreeDAnimation,
  branding: BrandingAnimation,
  'ai-agents': AIAgentsAnimation,
  'gen-ai': GenAIAnimation,
};

interface ServiceHeroAnimationProps {
  slug: string;
}

export default function ServiceHeroAnimation({ slug }: ServiceHeroAnimationProps) {
  const AnimComponent = animationMap[slug];
  if (!AnimComponent) return null;
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      marginTop: '2rem',
      marginBottom: '2rem',
    }}>
      <AnimComponent />
    </div>
  );
}
