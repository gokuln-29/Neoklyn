import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import PageWrapper from "@/components/layout/PageWrapper";
import PageHeader from "@/components/ui/PageHeader";
import AboutStats from "@/components/about/AboutStats";

export const metadata: Metadata = {
  title: {
    absolute: "About NeoKlyn — AI, Web & Product Engineering Team",
  },
  description:
    "Meet NeoKlyn's Bengaluru-based team building AI agents, web platforms, mobile apps, and growth systems for ambitious global brands.",
  openGraph: {
    title: "About NeoKlyn — AI, Web & Product Engineering Team",
    description:
      "Meet NeoKlyn's Bengaluru-based team building AI agents, web platforms, mobile apps, and growth systems for ambitious global brands.",
    url: "https://neoklyn.com/about",
    siteName: "NeoKlyn",
    type: "website",
  },
};

const values = [
  {
    title: "Engineering Excellence",
    description:
      "We do not ship MVPs for the sake of launch. We ship production-grade systems engineered for long-term scale.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="8 4 2 12 8 20" />
        <polyline points="16 4 22 12 16 20" />
        <line x1="10" y1="22" x2="14" y2="2" />
      </svg>
    ),
  },
  {
    title: "Design Obsession",
    description:
      "Every pixel matters. We craft interfaces that feel alive, premium, and unmistakably intentional across every screen.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 113 3L7 19l-4 1 1-4 12.5-12.5z" />
      </svg>
    ),
  },
  {
    title: "Radical Transparency",
    description:
      "No black boxes. Clients see every sprint, commit, and decision with complete clarity from discovery to deployment.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Client-First Thinking",
    description:
      "Your success is our KPI. We work as long-term partners focused on outcomes, not task completion.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M8 12l3 3 5-5" />
        <path d="M3 10l4-4 4 4" />
        <path d="M17 14l4 4-4 4" />
      </svg>
    ),
  },
];

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  photo?: string | null;
  linkedin?: string | null;
  x?: string | null;
};

const teamMembers: TeamMember[] = [
  {
    name: "Monisha",
    role: "Founder & CEO",
    bio: "Strategic visionary and product specialist with a background in engineering and design. Monisha leads NeoKlyn with a focus on building high-conversion digital ecosystems for global brands. She is dedicated to bridging the gap between technical complexity and intuitive user experiences.",
    photo: "/assets/monisha.webp",
    linkedin: "#",
    x: "#",
  },
  {
    name: "Gokulnath",
    role: "Senior Developer",
    bio: "Full-stack architect specializing in Next.js and high-performance backend systems. With a deep passion for clean code and AI integration, Gokulnath ensures that every NeoKlyn project is built for speed, security, and enterprise-grade reliability.",
    photo: "/assets/gokulnath.webp",
    linkedin: "#",
    x: "#",
  },
];


const globalPresence = [
  { city: "Bengaluru", flag: "🇮🇳", label: "Headquarters" },
  { city: "World Wide", flag: "🌎", label: "Global Operations" },
  { city: "Anywhere", flag: "✨", label: "Perfect Execution" },
];

export default function AboutPage() {
  return (
    <PageWrapper>
      <section className="section">
        <PageHeader
          label="About NeoKlyn"
          titleOutline="THE TEAM"
          titleSolid="BEHIND IT ALL"
          titleColorClass="title-cyan"
          description="We are a multidisciplinary team of engineers, designers, and strategists building high-performance digital systems for modern brands."
        />

        <div className="about-story reveal">
          <h3>Founding Story</h3>
          <p>
            NeoKlyn was founded with a clear vision — to bridge the gap between design, technology, and business performance.
          </p>
          <p style={{ marginTop: "1rem" }}>
            What started as a small initiative focused on building modern websites quickly evolved into a full-service digital studio. Early projects revealed a common problem: most businesses had either good design or good development, but rarely both working together effectively.
          </p>
          <p style={{ marginTop: "1rem" }}>
            NeoKlyn was built to solve that. By combining user experience, scalable engineering, and performance-driven marketing, NeoKlyn helps brands create digital products that are not just visually impressive, but also engineered for growth.
          </p>
          <p style={{ marginTop: "1rem" }}>
            Today, NeoKlyn works across global markets including the United States, UAE, and India, delivering high-quality digital solutions for startups, SMEs, and enterprise clients.
          </p>
        </div>

        <AboutStats />
      </section>

      <section className="section section-alt">
        <div className="reveal">
          <div className="s-label">Core Principles</div>
          <h2 className="s-title">HOW WE OPERATE</h2>
          <p className="s-sub">Four principles that define every decision across product, engineering, and delivery.</p>
        </div>

        <div className="about-values-grid reveal">
          {values.map((value) => (
            <div key={value.title} className="about-value-card">
              <div className="about-value-icon">{value.icon}</div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="team">
        <div className="reveal">
          <div className="s-label">People</div>
          <h2 className="s-title">TEAM NEOKLYN</h2>
          <p className="s-sub">The founders and builders behind NeoKlyn&apos;s engineering and business vision.</p>
        </div>

        <div className="about-team-grid reveal">
          {teamMembers.map((member) => (
            <article key={member.name} className="about-team-card">
              <div className="about-avatar">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={`NeoKlyn Team — ${member.name}, ${member.role}`}
                    width={400}
                    height={500}
                    quality={90}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                  />
                ) : (
                  <span style={{ opacity: 0.3 }}>{member.name.charAt(0)}</span>
                )}
              </div>
              <div className="about-member-info">
                <h3>{member.name}</h3>
                <p className="about-role">{member.role}</p>
                <p className="about-bio">{member.bio}</p>
                <div className="about-socials">
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noreferrer" className="about-social-link" aria-label={`${member.name} LinkedIn`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452H16.89v-5.569c0-1.328-.028-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.348V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.369-1.85 3.602 0 4.268 2.37 4.268 5.455v6.286zM5.337 7.433a2.063 2.063 0 11.001-4.126 2.063 2.063 0 010 4.126zM7.119 20.452H3.555V9h3.564v11.452z" />
                      </svg>
                    </a>
                  )}
                  {member.x && (
                    <a href={member.x} target="_blank" rel="noreferrer" className="about-social-link" aria-label={`${member.name} X`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
          <article className="about-team-card about-hiring-card">
            <div className="about-avatar about-hiring-avatar">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
              </svg>
            </div>
            <h3>We're Hiring</h3>
            <p className="about-role">JOIN OUR TEAM</p>
            <p className="about-bio">We're always looking for talented designers, developers, and strategists who care about craft and results.</p>
            <Link href="/contact" className="about-hiring-btn">
              Get in Touch →
            </Link>
          </article>
        </div>
      </section>

      <section className="section section-alt">
        <div className="reveal">
          <div className="s-label">Global Presence</div>
          <h2 className="s-title">WHERE WE OPERATE</h2>
          <p className="s-sub">Distributed execution across key regions with unified delivery standards.</p>
        </div>

        <div className="about-presence-wrap reveal">
          <div className="about-presence-line" />
          <div className="about-presence-grid">
            {globalPresence.map((item) => (
              <article key={item.city} className="about-presence-card">
                <h3>
                  {item.city} <span>{item.flag}</span>
                </h3>
                <p>{item.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="section">
        <div className="about-work-cta reveal">
          <h3>Want to build with NeoKlyn?</h3>
          <Link href="/contact" className="btn-main">
            Work With Us →
          </Link>
        </div>
      </section> */}

      <style>{`
        .about-story {
          margin-top: 3.5rem;
          border: 1px solid rgba(255,255,255,0.08);
          border-left: 4px solid var(--cyan);
          border-radius: 14px;
          background: rgba(255,255,255,0.02);
          padding: 1.45rem 1.4rem;
        }

        .about-story h3 {
          margin: 0 0 0.7rem;
          font-size: 1.35rem;
          color: var(--white);
          text-transform: none;
        }

        .about-story p {
          margin: 0;
          color: rgba(255,255,255,0.73);
          line-height: 1.75;
        }

        .about-values-grid {
          margin-top: 2.8rem;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 0.9rem;
        }

        .about-value-card {
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          background: rgba(255,255,255,0.02);
          padding: 1rem;
        }

        .about-value-icon {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--cyan);
          border: 1px solid rgba(6,182,212,0.35);
          background: rgba(6,182,212,0.08);
          margin-bottom: 0.7rem;
        }

        .about-value-card h3 {
          margin: 0 0 0.45rem;
          text-transform: none;
          font-size: 1rem;
          color: var(--white);
        }

        .about-value-card p {
          margin: 0;
          color: rgba(255,255,255,0.7);
          line-height: 1.65;
          font-size: 0.86rem;
        }

        .about-team-grid {
          margin-top: 2.8rem;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.9rem;
        }

        .about-team-card {
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          background: rgba(20, 25, 40, 0.6);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          padding: 2.2rem;
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }

        .about-team-card:hover {
          transform: translateY(-4px);
          border-color: rgba(6,182,212,0.35);
          box-shadow: 0 14px 24px rgba(0,0,0,0.25);
          background: rgba(20, 25, 40, 0.75);
        }

        .about-avatar {
          width: 100%;
          aspect-ratio: 4/5;
          height: auto;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.03);
          color: var(--white);
          font-family: 'JetBrains Mono', monospace;
          font-size: 2rem;
          margin-bottom: 1.5rem;
          overflow: hidden;
          padding: 0;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }

        .about-member-info {
          padding: 0 0.2rem;
        }


        .about-team-card h3 {
          margin: 0;
          font-size: 1rem;
          color: var(--white);
          text-transform: none;
        }

        .about-role {
          margin: 0.3rem 0 0.55rem;
          color: var(--cyan);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .about-bio {
          margin: 0;
          color: rgba(255,255,255,0.65);
          line-height: 1.6;
          font-size: 0.88rem;
        }

        .about-socials {
          margin-top: 0.7rem;
          display: flex;
          gap: 0.5rem;
        }

        .about-social-link {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.13);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--muted);
          text-decoration: none;
          transition: all 0.18s;
        }

        .about-social-link:hover {
          border-color: rgba(6,182,212,0.42);
          color: var(--cyan);
        }

        .about-hiring-card {
          background: linear-gradient(135deg, rgba(6,182,212,0.06), rgba(139,92,246,0.06));
        }

        .about-hiring-avatar {
          background: linear-gradient(140deg, rgba(6,182,212,0.15), rgba(139,92,246,0.15));
          height: 200px;
        }

        .about-hiring-btn {
          margin-top: 0.8rem;
          display: inline-flex;
          align-items: center;
          padding: 0.6rem 1rem;
          border-radius: 8px;
          background: var(--cyan);
          color: var(--black);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 600;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          transition: all 0.2s;
        }

        .about-hiring-btn:hover {
          background: var(--white);
          transform: translateY(-2px);
        }

        @media (max-width: 640px) {
          .about-team-grid {
            grid-template-columns: 1fr;
          }
        }

        .about-presence-wrap {
          margin-top: 2.8rem;
          position: relative;
        }

        .about-presence-line {
          position: absolute;
          top: 44px;
          left: 11%;
          right: 11%;
          border-top: 2px dotted rgba(6,182,212,0.3);
          pointer-events: none;
        }

        .about-presence-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.9rem;
          position: relative;
        }

        .about-presence-card {
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          background: rgba(255,255,255,0.02);
          padding: 1.2rem 1rem;
          text-align: center;
        }

        .about-presence-card h3 {
          margin: 0;
          font-size: 1.15rem;
          color: var(--white);
          text-transform: none;
        }

        .about-presence-card h3 span {
          font-size: 1.1rem;
          margin-left: 0.25rem;
        }

        .about-presence-card p {
          margin: 0.45rem 0 0;
          color: var(--cyan);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .about-work-cta {
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 2.2rem;
          text-align: center;
        }

        .about-work-cta h3 {
          margin: 0 0 1rem;
          font-size: clamp(1.4rem, 3vw, 2rem);
          text-transform: none;
        }

        @media (max-width: 980px) {
          .about-values-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 680px) {
          .about-values-grid,
          .about-team-grid,
          .about-presence-grid {
            grid-template-columns: 1fr;
          }

          .about-presence-line {
            display: none;
          }
        }
      `}</style>
    </PageWrapper>
  );
}
