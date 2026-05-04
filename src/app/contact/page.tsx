'use client';

import { useState, useEffect, useRef } from 'react';
import PageWrapper from "@/components/layout/PageWrapper";
import PageHeader from "@/components/ui/PageHeader";

const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": "https://neoklyn.com/contact#localbusiness",
    name: "NeoKlyn",
    url: "https://neoklyn.com/contact",
    image: "https://neoklyn.com/opengraph-image",
    description: "NeoKlyn is a premium AI and software development agency in Bengaluru, offering web development, mobile apps, ecommerce, AI agents, and digital marketing services to global brands.",
    telephone: "+916380202766",
    email: "hello.neoklyn@gmail.com",
    address: {
        "@type": "PostalAddress",
        streetAddress: "Bengaluru, Karnataka",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        postalCode: "560001",
        addressCountry: "IN"
    },
    geo: {
        "@type": "GeoCoordinates",
        latitude: 12.9716,
        longitude: 77.5946
    },
    openingHoursSpecification: [
        {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00"
        },
        {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Saturday",
            opens: "10:00",
            closes: "14:00"
        }
    ],
    sameAs: [
        "https://github.com/neoklyn",
        "https://www.linkedin.com/company/neoklyn",
        "https://twitter.com/neoklyn",
        "https://dribbble.com/neoklyn"
    ]
};

const SOCIAL_LINKS = [
    {
        label: 'GitHub',
        href: 'https://github.com/neoklyn',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
        ),
        color: '#e6edf3',
    },
    {
        label: 'LinkedIn',
        href: 'https://linkedin.com/company/neoklyn',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
        color: '#0a66c2',
    },
    {
        label: 'Twitter / X',
        href: 'https://twitter.com/neoklyn',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
        color: '#e7e9ea',
    },
    {
        label: 'Dribbble',
        href: 'https://dribbble.com/neoklyn',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" />
            </svg>
        ),
        color: '#ea4c89',
    },
];

const CONTACT_CHANNELS = [
    {
        id: 'whatsapp',
        label: 'WhatsApp',
        value: '+91 6380202766',
        href: 'https://wa.me/916380202766?text=Hi%20Neoklyn%2C%20I%27d%20like%20to%20discuss%20a%20project',
        badge: 'Fastest Response',
        badgeColor: '#22c55e',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
        ),
        color: '#25D366',
        bg: 'rgba(37, 211, 102, 0.06)',
        border: 'rgba(37, 211, 102, 0.2)',
    },
    {
        id: 'call',
        label: 'Direct Call',
        value: '+91 6380202766',
        href: 'tel:+916380202766',
        badge: 'Business Hours',
        badgeColor: '#06b6d4',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 010 .18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" transform="translate(1,1)" />
            </svg>
        ),
        color: '#06b6d4',
        bg: 'rgba(6, 182, 212, 0.06)',
        border: 'rgba(6, 182, 212, 0.2)',
    },
    {
        id: 'email',
        label: 'Email',
        value: 'hello.neoklyn@gmail.com',
        href: 'mailto:hello.neoklyn@gmail.com',
        badge: '< 4 hr Reply',
        badgeColor: '#a78bfa',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
            </svg>
        ),
        color: '#a78bfa',
        bg: 'rgba(167, 139, 250, 0.06)',
        border: 'rgba(167, 139, 250, 0.2)',
    },
];

const OFFICE_LOCATIONS = [
    {
        city: 'Bengaluru',
        label: 'Head Office',
        address: 'Karnataka, India',
        phone: '+91 6380202766',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
            </svg>
        ),
    },
    {
        city: 'Chennai',
        label: 'Branch Office',
        address: 'Tamil Nadu, India',
        phone: '+91 9342382078',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
            </svg>
        ),
    },
];

type CurrencyCode = 'USD' | 'INR' | 'GBP' | 'AED' | 'SGD';

type CurrencyOption = {
    value: string;
    label: string;
};

const SERVICE_OPTIONS = [
    'Web Dev',
    'Mobile App',
    'AI Agents',
    'Gen AI',
    'Ecommerce',
    '3D/WebGL',
    'Digital Marketing',
    'UI/UX Design',
];

const CURRENCY_OPTIONS: Record<CurrencyCode, { label: string; flag: string; ranges: CurrencyOption[] }> = {
    USD: {
        label: 'USD',
        flag: '🇺🇸',
        ranges: [
            { value: 'not-sure', label: "Not sure yet — let's talk" },
            { value: '$5K-$15K', label: '$5K - $15K' },
            { value: '$15K-$30K', label: '$15K - $30K' },
            { value: '$30K-$50K', label: '$30K - $50K' },
            { value: '$50K+', label: '$50K+' },
        ],
    },
    INR: {
        label: 'INR',
        flag: '🇮🇳',
        ranges: [
            { value: 'not-sure', label: "Not sure yet — let's talk" },
            { value: '₹5L-₹15L', label: '₹5L - ₹15L' },
            { value: '₹15L-₹30L', label: '₹15L - ₹30L' },
            { value: '₹30L-₹50L', label: '₹30L - ₹50L' },
            { value: '₹50L+', label: '₹50L+' },
        ],
    },
    GBP: {
        label: 'GBP',
        flag: '🇬🇧',
        ranges: [
            { value: 'not-sure', label: "Not sure yet — let's talk" },
            { value: '£5K-£15K', label: '£5K - £15K' },
            { value: '£15K-£30K', label: '£15K - £30K' },
            { value: '£30K-£50K', label: '£30K - £50K' },
            { value: '£50K+', label: '£50K+' },
        ],
    },
    AED: {
        label: 'AED',
        flag: '🇦🇪',
        ranges: [
            { value: 'not-sure', label: "Not sure yet — let's talk" },
            { value: 'AED 20K-50K', label: 'AED 20K - 50K' },
            { value: 'AED 50K-100K', label: 'AED 50K - 100K' },
            { value: 'AED 100K-200K', label: 'AED 100K - 200K' },
            { value: 'AED 200K+', label: 'AED 200K+' },
        ],
    },
    SGD: {
        label: 'SGD',
        flag: '🇸🇬',
        ranges: [
            { value: 'not-sure', label: "Not sure yet — let's talk" },
            { value: 'S$7K-S$20K', label: 'S$7K - S$20K' },
            { value: 'S$20K-S$40K', label: 'S$20K - S$40K' },
            { value: 'S$40K-S$70K', label: 'S$40K - S$70K' },
            { value: 'S$70K+', label: 'S$70K+' },
        ],
    },
};

function detectCurrencyFromCountry(countryCode: string): CurrencyCode {
    switch (countryCode) {
        case 'IN':
            return 'INR';
        case 'GB':
            return 'GBP';
        case 'AE':
            return 'AED';
        case 'SG':
            return 'SGD';
        default:
            return 'USD';
    }
}

function countryCodeToFlag(code: string) {
    if (!code || code.length !== 2) return '🌍';
    return code
        .toUpperCase()
        .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_FILE_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

function validateName(name: string) {
    if (!name.trim()) return 'Name is required.';
    if (name.trim().length < 2) return 'Name should be at least 2 characters.';
    return '';
}

function validateEmail(email: string) {
    if (!email.trim()) return 'Business email is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return 'Enter a valid email address.';
    return '';
}

function validateDetails(details: string) {
    if (!details.trim()) return 'Project details are required.';
    if (details.trim().length < 20) return 'Please share at least 20 characters about your project.';
    return '';
}

function validateBriefFile(file: File) {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        return 'Only PDF, DOC, or DOCX files are allowed.';
    }
    if (file.size > MAX_FILE_SIZE) {
        return 'File size should be 5MB or less.';
    }
    return '';
}

/* ───────────────────────────────────────────
   Canvas animated background
─────────────────────────────────────────── */
function AnimatedBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let raf: number;
        let w = 0, h = 0;

        const COLORS = ['#06b6d4', '#8b5cf6', '#3b82f6'];

        type Particle = {
            x: number; y: number; vx: number; vy: number;
            r: number; alpha: number; color: string;
        };
        const particles: Particle[] = [];

        function resize() {
            w = canvas!.offsetWidth;
            h = canvas!.offsetHeight;
            canvas!.width = w;
            canvas!.height = h;
        }

        function init() {
            particles.length = 0;
            for (let i = 0; i < 60; i++) {
                particles.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    r: Math.random() * 1.6 + 0.4,
                    alpha: Math.random() * 0.45 + 0.1,
                    color: COLORS[Math.floor(Math.random() * COLORS.length)],
                });
            }
        }

        function hexToRgb(hex: string) {
            return `${parseInt(hex.slice(1, 3), 16)},${parseInt(hex.slice(3, 5), 16)},${parseInt(hex.slice(5, 7), 16)}`;
        }

        let t = 0;

        function draw() {
            ctx!.clearRect(0, 0, w, h);
            t += 0.005;

            /* ── Animated dot grid ── */
            const spacing = 40;
            for (let gx = 0; gx <= w; gx += spacing) {
                for (let gy = 0; gy <= h; gy += spacing) {
                    const dist = Math.hypot(gx - w * 0.5, gy - h * 0.45);
                    const wave = Math.sin(dist * 0.013 - t * 2) * 0.5 + 0.5;
                    ctx!.beginPath();
                    ctx!.arc(gx, gy, 0.85, 0, Math.PI * 2);
                    ctx!.fillStyle = `rgba(6,182,212,${wave * 0.1 + 0.015})`;
                    ctx!.fill();
                }
            }

            /* ── Particle connections ── */
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < 140) {
                        ctx!.beginPath();
                        ctx!.moveTo(particles[i].x, particles[i].y);
                        ctx!.lineTo(particles[j].x, particles[j].y);
                        ctx!.strokeStyle = `rgba(6,182,212,${(1 - d / 140) * 0.1})`;
                        ctx!.lineWidth = 0.5;
                        ctx!.stroke();
                    }
                }
            }

            /* ── Particles ── */
            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
                if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
                ctx!.beginPath();
                ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx!.fillStyle = `rgba(${hexToRgb(p.color)},${p.alpha})`;
                ctx!.fill();
            });

            /* ── Floating rings ── */
            const rings = [
                { cx: w * 0.07, cy: h * 0.18, base: 90, phase: 0, c: '6,182,212' },
                { cx: w * 0.93, cy: h * 0.72, base: 120, phase: 1.8, c: '139,92,246' },
                { cx: w * 0.5, cy: h * 0.88, base: 65, phase: 0.9, c: '59,130,246' },
                { cx: w * 0.15, cy: h * 0.65, base: 50, phase: 2.4, c: '6,182,212' },
                { cx: w * 0.85, cy: h * 0.25, base: 75, phase: 1.2, c: '139,92,246' },
            ];

            rings.forEach(ring => {
                const pulse = Math.sin(t * 1.3 + ring.phase) * 15;
                const r1 = ring.base + pulse;
                const r2 = r1 * 0.55;

                ctx!.beginPath();
                ctx!.arc(ring.cx, ring.cy, r1, 0, Math.PI * 2);
                ctx!.strokeStyle = `rgba(${ring.c},0.045)`;
                ctx!.lineWidth = 1;
                ctx!.stroke();

                ctx!.beginPath();
                ctx!.arc(ring.cx, ring.cy, r2, 0, Math.PI * 2);
                ctx!.strokeStyle = `rgba(${ring.c},0.03)`;
                ctx!.lineWidth = 0.7;
                ctx!.stroke();
            });

            /* ── Scanning horizontal line ── */
            const scanY = ((t * 40) % (h + 60)) - 30;
            const scanGrad = ctx!.createLinearGradient(0, scanY - 1, 0, scanY + 1);
            scanGrad.addColorStop(0, 'rgba(6,182,212,0)');
            scanGrad.addColorStop(0.5, 'rgba(6,182,212,0.06)');
            scanGrad.addColorStop(1, 'rgba(6,182,212,0)');
            ctx!.fillStyle = scanGrad;
            ctx!.fillRect(0, scanY - 1, w, 2);

            raf = requestAnimationFrame(draw);
        }

        resize();
        init();
        draw();

        const ro = new ResizeObserver(() => { resize(); init(); });
        ro.observe(canvas);
        return () => { cancelAnimationFrame(raf); ro.disconnect(); };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    );
}

/* ───────────────────────────────────────────
   Page
─────────────────────────────────────────── */
export default function ContactPage() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '', email: '', company: '', budget: '', services: [] as string[], details: ''
    });
    const [submittedEmail, setSubmittedEmail] = useState('');
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [currency, setCurrency] = useState<CurrencyCode>('USD');
    const [detectedCountry, setDetectedCountry] = useState({ code: 'US', name: 'United States', flag: '🇺🇸' });
    const [isGeoLoading, setIsGeoLoading] = useState(true);
    const [briefFile, setBriefFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);
    const [touched, setTouched] = useState({ name: false, email: false, details: false });
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        let isMounted = true;

        async function detectGeo() {
            try {
                const res = await fetch('https://ipapi.co/json/');
                if (!res.ok) throw new Error('Geo lookup failed');
                const data = await res.json() as { country_code?: string; country_name?: string };
                if (!isMounted) return;
                const countryCode = (data.country_code || 'US').toUpperCase();
                const nextCurrency = detectCurrencyFromCountry(countryCode);
                setCurrency(nextCurrency);
                setDetectedCountry({
                    code: countryCode,
                    name: data.country_name || 'Detected Region',
                    flag: countryCodeToFlag(countryCode),
                });
            } catch {
                if (!isMounted) return;
                setCurrency('USD');
                setDetectedCountry({ code: 'US', name: 'Global', flag: '🌍' });
            } finally {
                if (isMounted) setIsGeoLoading(false);
            }
        }

        detectGeo();
        return () => {
            isMounted = false;
        };
    }, []);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function handleCurrencyChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const nextCurrency = e.target.value as CurrencyCode;
        setCurrency(nextCurrency);
        setFormData(prev => ({ ...prev, budget: '' }));
    }

    function handleServiceToggle(service: string) {
        setFormData(prev => {
            const isSelected = prev.services.includes(service);
            return {
                ...prev,
                services: isSelected
                    ? prev.services.filter((item) => item !== service)
                    : [...prev.services, service],
            };
        });
    }

    function setTouchedField(field: 'name' | 'email' | 'details') {
        setTouched(prev => ({ ...prev, [field]: true }));
    }

    function handleBriefFile(file: File | null) {
        if (!file) {
            setBriefFile(null);
            setFileError('');
            return;
        }

        const validationError = validateBriefFile(file);
        if (validationError) {
            setBriefFile(null);
            setFileError(validationError);
            return;
        }

        setBriefFile(file);
        setFileError('');
    }

    const validationErrors = {
        name: validateName(formData.name),
        email: validateEmail(formData.email),
        details: validateDetails(formData.details),
    };

    const isFormValid = !validationErrors.name && !validationErrors.email && !validationErrors.details;

    function resetInquiryForm() {
        setStatus('idle');
        setFormData({ name: '', email: '', company: '', budget: '', services: [], details: '' });
        setBriefFile(null);
        setFileError('');
        setTouched({ name: false, email: false, details: false });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setTouched({ name: true, email: true, details: true });
        if (!isFormValid || fileError) return;

        setStatus('loading');

        try {
            const selectedBudget = CURRENCY_OPTIONS[currency].ranges.find((range) => range.value === formData.budget)?.label;
            const payload = new FormData();
            payload.append('_subject', `New Enterprise Inquiry from ${formData.name}`);
            payload.append('name', formData.name.trim());
            payload.append('email', formData.email.trim());
            payload.append('company', formData.company.trim() || 'Not specified');
            payload.append('country', `${detectedCountry.flag} ${detectedCountry.name} (${detectedCountry.code})`);
            payload.append('currency', currency);
            payload.append('budget', selectedBudget || 'Not specified');
            payload.append('services', formData.services.length ? formData.services.join(', ') : 'Not specified');
            payload.append('details', formData.details.trim());
            payload.append('_template', 'box');
            payload.append('_captcha', 'false');

            if (briefFile) {
                payload.append('attachment', briefFile);
                payload.append('attachment_note', 'File attached via contact intake form');
            }

            const res = await fetch('https://formsubmit.co/ajax/hello.neoklyn@gmail.com', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: payload,
            });

            if (res.ok) {
                setSubmittedEmail(formData.email.trim());
                setStatus('success');
                setFormData({ name: '', email: '', company: '', budget: '', services: [], details: '' });
                setBriefFile(null);
                setFileError('');
                setTouched({ name: false, email: false, details: false });
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    }

    return (
        <PageWrapper includeCTA={false}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
            <AnimatedBackground />

            {/* Morphing gradient orbs */}
            <div className="bg-orb bg-orb-1" />
            <div className="bg-orb bg-orb-2" />
            <div className="bg-orb bg-orb-3" />

            <section className="section" style={{ flex: 1, position: 'relative', zIndex: 1 }}>
                <PageHeader
                    label="Enterprise Intake"
                    titleOutline="LET'S"
                    titleSolid="BUILD"
                    titleColorClass="title-cyan"
                    description="We partner with ambitious companies to solve complex engineering and design problems. Fill out the intake form and a partner will reach out within 4 hours."
                />

                <div className="reveal contact-root">

                    {/* ── LEFT COLUMN ── */}
                    <div className="contact-left">

                        {/* Quick-connect channels */}
                        <div className="channels-section">
                            <p className="section-eyebrow">{"// reach us directly"}</p>
                            <div className="channels-grid">
                                {CONTACT_CHANNELS.map(ch => (
                                    <a
                                        key={ch.id}
                                        href={ch.href}
                                        target={ch.id === 'whatsapp' ? '_blank' : undefined}
                                        rel="noreferrer"
                                        className="channel-card"
                                        style={{ '--ch-color': ch.color, '--ch-bg': ch.bg, '--ch-border': ch.border } as React.CSSProperties}
                                    >
                                        <div className="channel-icon-wrap">
                                            <span style={{ color: ch.color }}>{ch.icon}</span>
                                        </div>
                                        <div className="channel-info">
                                            <span className="channel-label">{ch.label}</span>
                                            <span className="channel-value">{ch.value}</span>
                                        </div>
                                        <span className="channel-badge" style={{ color: ch.badgeColor, borderColor: ch.badgeColor + '44', background: ch.badgeColor + '11' }}>
                                            {ch.badge}
                                        </span>
                                        <svg className="channel-arrow" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                                        </svg>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Office locations */}
                        <div className="locations-section">
                            <p className="section-eyebrow">{"// our offices"}</p>
                            <div className="locations-grid">
                                {OFFICE_LOCATIONS.map(loc => (
                                    <div key={loc.city} className="location-card">
                                        <div className="location-icon" style={{ color: 'var(--cyan)' }}>
                                            {loc.icon}
                                        </div>
                                        <div className="location-info">
                                            <span className="location-city">{loc.city}</span>
                                            <span className="location-label">{loc.label}</span>
                                            <span className="location-address">{loc.address}</span>
                                            <a href={`tel:${loc.phone.replace(/\s/g, '')}`} className="location-phone">{loc.phone}</a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Social links */}
                        <div className="social-section">
                            <p className="section-eyebrow">{"// follow our work"}</p>
                            <div className="social-grid">
                                {SOCIAL_LINKS.map(s => (
                                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                                        className="social-pill"
                                        style={{ '--s-color': s.color } as React.CSSProperties}>
                                        <span style={{ color: s.color }}>{s.icon}</span>
                                        <span>{s.label}</span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Status blurb */}
                        <div className="status-card">
                            <div className="status-indicator">
                                <span className="status-dot" />
                                <span className="status-text">All systems operational</span>
                            </div>
                            <p className="status-desc">Average response time: <strong style={{ color: 'var(--cyan)' }}>&lt; 4 hours</strong></p>
                        </div>
                    </div>

                    {/* ── RIGHT COLUMN — Form ── */}
                    <div className="contact-form-container">
                        <div className="form-glow form-glow-1" />
                        <div className="form-glow form-glow-2" />

                        <div style={{ position: 'relative', zIndex: 1 }}>
                            {status === 'success' ? (
                                <div className="success-state">
                                    <div className="success-confetti" aria-hidden="true">
                                        {Array.from({ length: 14 }).map((_, i) => (
                                            <span
                                                key={i}
                                                className="confetti-piece"
                                                style={{
                                                    left: `${6 + i * 6.4}%`,
                                                    animationDelay: `${i * 0.09}s`,
                                                    background: i % 3 === 0 ? 'var(--cyan)' : i % 3 === 1 ? '#8b5cf6' : '#3b82f6',
                                                } as React.CSSProperties}
                                            />
                                        ))}
                                    </div>

                                    <div className="success-icon">
                                        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </div>

                                    <h3 className="success-title">Inquiry <span className="title-cyan">Received</span></h3>
                                    <p className="success-body">
                                        Project details logged. A partner will contact{' '}
                                        <strong style={{ color: 'var(--white)' }}>{submittedEmail || 'your email'}</strong>{' '}
                                        within 4 hours.
                                    </p>

                                    <div className="success-actions">
                                        <a
                                            href="https://wa.me/916380202766?text=Hi%20NeoKlyn%2C%20I%20just%20submitted%20the%20inquiry%20form"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="btn-ghost success-wa"
                                        >
                                            Continue on WhatsApp ↗
                                        </a>
                                        <button className="btn-main submit-btn" onClick={resetInquiryForm}>
                                            Start New Inquiry ↗
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="form-header">
                                        <span className="form-tag">{"// intake_form.tsx"}</span>
                                        <h3 className="form-title">Start a Conversation</h3>
                                        <p className="form-subtitle">Discuss your project directly with our technical leadership.</p>
                                    </div>

                                    <form className="premium-form" onSubmit={handleSubmit}>
                                        <div className="form-row">
                                            <div className={`form-group ${focusedField === 'name' ? 'focused' : ''}`}>
                                                <label>Full Name <span className="req">*</span></label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="John Doe"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className={`c-input ${touched.name && validationErrors.name ? 'c-input-invalid' : ''}`}
                                                    required
                                                    disabled={status === 'loading'}
                                                    onFocus={() => setFocusedField('name')}
                                                    onBlur={() => {
                                                        setFocusedField(null);
                                                        setTouchedField('name');
                                                    }}
                                                />
                                                {touched.name && validationErrors.name && <span className="field-error">{validationErrors.name}</span>}
                                            </div>

                                            <div className={`form-group ${focusedField === 'email' ? 'focused' : ''}`}>
                                                <label>Business Email <span className="req">*</span></label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="john@company.com"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className={`c-input ${touched.email && validationErrors.email ? 'c-input-invalid' : ''}`}
                                                    required
                                                    disabled={status === 'loading'}
                                                    onFocus={() => setFocusedField('email')}
                                                    onBlur={() => {
                                                        setFocusedField(null);
                                                        setTouchedField('email');
                                                    }}
                                                />
                                                {touched.email && validationErrors.email && <span className="field-error">{validationErrors.email}</span>}
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className={`form-group ${focusedField === 'company' ? 'focused' : ''}`}>
                                                <label>Company</label>
                                                <input
                                                    type="text"
                                                    name="company"
                                                    placeholder="Acme Corp"
                                                    value={formData.company}
                                                    onChange={handleChange}
                                                    className="c-input"
                                                    disabled={status === 'loading'}
                                                    onFocus={() => setFocusedField('company')}
                                                    onBlur={() => setFocusedField(null)}
                                                />
                                            </div>

                                            <div className={`form-group ${focusedField === 'budget' ? 'focused' : ''}`}>
                                                <label>
                                                    Budget Range
                                                    <span className="geo-badge" title={detectedCountry.name}>
                                                        {isGeoLoading ? 'Detecting region…' : `${detectedCountry.flag} ${detectedCountry.code}`}
                                                    </span>
                                                </label>

                                                <div className="budget-controls">
                                                    <div className="select-wrapper currency-select-wrap">
                                                        <select
                                                            className="c-input c-select currency-select"
                                                            value={currency}
                                                            onChange={handleCurrencyChange}
                                                            disabled={status === 'loading'}
                                                        >
                                                            {(Object.keys(CURRENCY_OPTIONS) as CurrencyCode[]).map((code) => (
                                                                <option key={code} value={code}>
                                                                    {CURRENCY_OPTIONS[code].flag} {CURRENCY_OPTIONS[code].label}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <svg className="select-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                                                    </div>

                                                    <div className="select-wrapper budget-select-wrap">
                                                        <select
                                                            name="budget"
                                                            value={formData.budget}
                                                            onChange={handleChange}
                                                            className="c-input c-select"
                                                            disabled={status === 'loading'}
                                                            onFocus={() => setFocusedField('budget')}
                                                            onBlur={() => setFocusedField(null)}
                                                        >
                                                            <option value="">Select Range</option>
                                                            {CURRENCY_OPTIONS[currency].ranges.map((range) => (
                                                                <option key={range.value} value={range.value}>
                                                                    {range.label}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <svg className="select-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label>Service Type (Multi-select)</label>
                                            <div className="chip-group">
                                                {SERVICE_OPTIONS.map((service) => (
                                                    <button
                                                        key={service}
                                                        type="button"
                                                        className={`chip ${formData.services.includes(service) ? 'chip-active' : ''}`}
                                                        onClick={() => handleServiceToggle(service)}
                                                        disabled={status === 'loading'}
                                                    >
                                                        {service}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label>Attach Brief (PDF/DOC, max 5MB)</label>
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept=".pdf,.doc,.docx"
                                                style={{ display: 'none' }}
                                                onChange={(e) => handleBriefFile(e.target.files?.[0] || null)}
                                                disabled={status === 'loading'}
                                            />

                                            <div
                                                className={`file-dropzone ${isDragOver ? 'drag-over' : ''} ${briefFile ? 'has-file' : ''}`}
                                                onDragOver={(e) => {
                                                    e.preventDefault();
                                                    setIsDragOver(true);
                                                }}
                                                onDragLeave={(e) => {
                                                    e.preventDefault();
                                                    setIsDragOver(false);
                                                }}
                                                onDrop={(e) => {
                                                    e.preventDefault();
                                                    setIsDragOver(false);
                                                    const droppedFile = e.dataTransfer.files?.[0] || null;
                                                    handleBriefFile(droppedFile);
                                                }}
                                                onClick={() => fileInputRef.current?.click()}
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><path d="M12 18v-6" /><path d="M9 15l3-3 3 3" /></svg>
                                                <div>
                                                    <p>{briefFile ? 'Replace your attached file' : 'Drag & drop your brief here, or click to upload'}</p>
                                                    <span>PDF, DOC, DOCX up to 5MB</span>
                                                </div>
                                            </div>

                                            {briefFile && (
                                                <div className="file-chip">
                                                    <span>{briefFile.name}</span>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleBriefFile(null);
                                                            if (fileInputRef.current) fileInputRef.current.value = '';
                                                        }}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            )}
                                            {fileError && <span className="field-error">{fileError}</span>}
                                        </div>

                                        <div className={`form-group ${focusedField === 'details' ? 'focused' : ''}`}>
                                            <label>Project Details <span className="req">*</span></label>
                                            <textarea
                                                name="details"
                                                placeholder="Scope, timeline, core objectives, tech stack preferences..."
                                                value={formData.details}
                                                onChange={handleChange}
                                                className={`c-input ${touched.details && validationErrors.details ? 'c-input-invalid' : ''}`}
                                                style={{ minHeight: '150px', resize: 'vertical' }}
                                                required
                                                disabled={status === 'loading'}
                                                onFocus={() => setFocusedField('details')}
                                                onBlur={() => {
                                                    setFocusedField(null);
                                                    setTouchedField('details');
                                                }}
                                            />
                                            <span className="char-count">{formData.details.length} chars</span>
                                            {touched.details && validationErrors.details && <span className="field-error">{validationErrors.details}</span>}
                                        </div>

                                        {status === 'error' && (
                                            <div className="error-banner">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                                                Something went wrong. Email us at{' '}
                                                <a href="mailto:hello.neoklyn@gmail.com" style={{ color: 'var(--cyan)', textDecoration: 'underline' }}>hello.neoklyn@gmail.com</a>
                                            </div>
                                        )}

                                        <button type="submit" className="btn-main submit-btn" disabled={status === 'loading' || !isFormValid || !!fileError}>
                                            {status === 'loading' ? (
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 0.8s linear infinite' }}>
                                                        <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
                                                    </svg>
                                                    Transmitting…
                                                </span>
                                            ) : (
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
                                                    Submit Request
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                                                </span>
                                            )}
                                        </button>

                                        <p className="form-footer-note">
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                                            Your data is encrypted and never shared with third parties.
                                        </p>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>

                </div>
            </section>

            <style>{`
            /* ── Background orbs ── */
            .bg-orb {
                position: fixed; border-radius: 50%;
                pointer-events: none; z-index: 0;
                filter: blur(110px);
            }
            .bg-orb-1 {
                width: 650px; height: 650px; top: -220px; left: -180px;
                background: radial-gradient(circle, rgba(6,182,212,0.09) 0%, transparent 70%);
                animation: orb1 20s ease-in-out infinite;
            }
            .bg-orb-2 {
                width: 520px; height: 520px; bottom: -160px; right: -120px;
                background: radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%);
                animation: orb2 25s ease-in-out infinite;
            }
            .bg-orb-3 {
                width: 420px; height: 420px; top: 38%; left: 38%;
                background: radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%);
                animation: orb3 30s ease-in-out infinite;
            }
            @keyframes orb1 {
                0%,100% { transform: translate(0,0) scale(1); }
                33%      { transform: translate(90px,70px) scale(1.1); }
                66%      { transform: translate(-50px,110px) scale(0.93); }
            }
            @keyframes orb2 {
                0%,100% { transform: translate(0,0) scale(1); }
                40%      { transform: translate(-100px,-80px) scale(1.12); }
                70%      { transform: translate(60px,-50px) scale(0.91); }
            }
            @keyframes orb3 {
                0%,100% { transform: translate(-50%,-50%) scale(1); opacity: 1; }
                50%      { transform: translate(-50%,-50%) scale(1.35); opacity: 0.55; }
            }

            /* ── Root layout ── */
            .contact-root {
                display: grid;
                grid-template-columns: 400px 1fr;
                gap: 4rem;
                margin-top: 5rem;
                align-items: start;
                position: relative;
                z-index: 1;
            }

            .section-eyebrow {
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.7rem;
                color: var(--muted);
                letter-spacing: 0.1em;
                margin: 0 0 1.1rem;
            }

            /* ── Left column ── */
            .contact-left { display: flex; flex-direction: column; gap: 2.5rem; }

            /* ── Channel cards ── */
            .channels-grid { display: flex; flex-direction: column; gap: 0.65rem; }

            .channel-card {
                display: flex; align-items: center; gap: 1rem;
                padding: 1rem 1.25rem;
                background: var(--ch-bg);
                border: 1px solid var(--ch-border);
                border-radius: 14px;
                text-decoration: none; color: inherit;
                transition: transform 0.2s ease, box-shadow 0.2s ease;
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
            }
            .channel-card:hover {
                transform: translateX(5px);
                box-shadow: -4px 0 18px var(--ch-border);
            }
            .channel-icon-wrap {
                width: 42px; height: 42px;
                background: rgba(255,255,255,0.04);
                border-radius: 10px;
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0;
            }
            .channel-info { flex: 1; display: flex; flex-direction: column; gap: 0.12rem; }
            .channel-label {
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.67rem; color: var(--muted);
                text-transform: uppercase; letter-spacing: 0.08em;
            }
            .channel-value { font-size: 0.88rem; color: var(--white); font-weight: 500; }
            .channel-badge {
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.6rem; padding: 0.2rem 0.5rem;
                border-radius: 20px; border: 1px solid; white-space: nowrap;
            }
            .channel-arrow { color: var(--muted); flex-shrink: 0; transition: transform 0.2s ease; }
            .channel-card:hover .channel-arrow { transform: translateX(3px); }

            /* ── Socials ── */
            .social-grid { display: flex; flex-wrap: wrap; gap: 0.5rem; }
            .social-pill {
                display: inline-flex; align-items: center; gap: 0.45rem;
                padding: 0.48rem 0.95rem;
                border-radius: 30px;
                border: 1px solid rgba(255,255,255,0.08);
                background: rgba(255,255,255,0.02);
                backdrop-filter: blur(6px);
                font-size: 0.82rem; color: var(--dim);
                text-decoration: none;
                transition: all 0.2s ease;
            }
            .social-pill:hover {
                border-color: var(--s-color);
                color: var(--s-color);
                background: color-mix(in srgb, var(--s-color) 8%, transparent);
                transform: translateY(-2px);
            }

            /* ── Locations ── */
            .locations-grid { display: flex; flex-direction: column; gap: 0.75rem; }
            .location-card {
                display: flex; align-items: center; gap: 1rem;
                padding: 1rem 1.25rem;
                background: var(--ink);
                border: 1px solid rgba(255,255,255,0.06);
                border-radius: 14px;
                transition: all 0.2s ease;
            }
            .location-card:hover {
                border-color: rgba(6,182,212,0.25);
                background: rgba(6,182,212,0.03);
            }
            .location-icon {
                width: 40px; height: 40px;
                display: flex; align-items: center; justify-content: center;
                background: rgba(6,182,212,0.08);
                border-radius: 10px;
                flex-shrink: 0;
            }
            .location-info { display: flex; flex-direction: column; gap: 0.15rem; }
            .location-city {
                font-family: var(--font-space-grotesk), sans-serif;
                font-weight: 600; font-size: 0.95rem; color: var(--white);
            }
            .location-label {
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.08em;
                color: var(--cyan);
            }
            .location-address {
                font-size: 0.8rem; color: var(--muted);
            }
            .location-phone {
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.75rem;
                color: var(--cyan);
                text-decoration: none;
                margin-top: 0.15rem;
                display: inline-block;
            }
            .location-phone:hover {
                text-decoration: underline;
            }

            /* ── Status card ── */
            .status-card {
                padding: 1.3rem 1.5rem;
                background: rgba(255,255,255,0.02);
                border: 1px solid rgba(255,255,255,0.06);
                border-radius: 14px;
                backdrop-filter: blur(8px);
            }
            .status-indicator { display: flex; align-items: center; gap: 0.55rem; margin-bottom: 0.45rem; }
            .status-dot {
                width: 8px; height: 8px; border-radius: 50%;
                background: #22c55e; box-shadow: 0 0 8px #22c55e;
                animation: pulse-dot 2.5s ease-in-out infinite;
            }
            @keyframes pulse-dot {
                0%,100% { transform: scale(1); opacity: 1; }
                50%      { transform: scale(1.5); opacity: 0.65; }
            }
            .status-text {
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.73rem; color: #22c55e; letter-spacing: 0.04em;
            }
            .status-desc { margin: 0; font-size: 0.83rem; color: var(--muted); }

            /* ── Form container ── */
            .contact-form-container {
                background: rgba(12,12,18,0.78);
                padding: 3.5rem;
                border-radius: 24px;
                border: 1px solid rgba(255,255,255,0.06);
                position: relative; overflow: hidden;
                backdrop-filter: blur(22px);
                -webkit-backdrop-filter: blur(22px);
            }
            .form-glow {
                position: absolute; border-radius: 50%;
                pointer-events: none; z-index: 0; filter: blur(70px);
            }
            .form-glow-1 {
                width: 300px; height: 300px; top: -90px; right: -70px;
                background: rgba(6,182,212,0.08);
                animation: orb1 16s ease-in-out infinite;
            }
            .form-glow-2 {
                width: 240px; height: 240px; bottom: -70px; left: -55px;
                background: rgba(139,92,246,0.07);
                animation: orb2 20s ease-in-out infinite;
            }

            /* ── Form header ── */
            .form-header { margin-bottom: 2.5rem; }
            .form-tag {
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.7rem; color: var(--cyan);
                letter-spacing: 0.06em; display: block; margin-bottom: 0.9rem;
            }
            .form-title  { font-size: 1.75rem; font-weight: 500; margin: 0 0 0.4rem; }
            .form-subtitle { color: var(--muted); font-size: 0.92rem; margin: 0; line-height: 1.6; }

            /* ── Fields ── */
            .premium-form { display: flex; flex-direction: column; gap: 1.7rem; }
            .form-row { display: flex; gap: 1.4rem; }
            .form-group { flex: 1; display: flex; flex-direction: column; gap: 0.55rem; }
            .form-group label {
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.67rem; color: var(--muted);
                text-transform: uppercase; letter-spacing: 0.07em;
                transition: color 0.2s ease;
                display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;
            }
            .form-group.focused label { color: var(--cyan); }
            .req { color: var(--cyan); }

            .geo-badge {
                font-size: 0.57rem;
                color: var(--cyan);
                border: 1px solid rgba(6,182,212,0.3);
                border-radius: 999px;
                padding: 0.18rem 0.45rem;
                text-transform: none;
                letter-spacing: 0.02em;
                white-space: nowrap;
            }

            .field-error {
                color: #f87171;
                font-size: 0.73rem;
                line-height: 1.45;
            }

            .c-input {
                background: rgba(255,255,255,0.03);
                border: 1px solid rgba(255,255,255,0.07);
                border-radius: 10px; padding: 0.92rem 1.05rem;
                color: var(--white); outline: none;
                font-family: inherit; font-size: 0.9rem;
                transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
                width: 100%; box-sizing: border-box;
            }
            .c-input::placeholder { color: rgba(255,255,255,0.2); }
            .c-input:focus {
                border-color: rgba(6,182,212,0.5);
                background: rgba(6,182,212,0.03);
                box-shadow: 0 0 0 3px rgba(6,182,212,0.07);
            }
            .c-input-invalid {
                border-color: rgba(248,113,113,0.6) !important;
                box-shadow: 0 0 0 3px rgba(248,113,113,0.12) !important;
            }
            .select-wrapper { position: relative; display: flex; align-items: center; }
            .c-select { appearance: none; width: 100%; color: var(--dim); cursor: pointer; }
            .c-select option { background: var(--bg); color: var(--white); }
            .select-icon { position: absolute; right: 1rem; pointer-events: none; color: var(--muted); }

            .budget-controls {
                display: grid;
                grid-template-columns: 150px 1fr;
                gap: 0.65rem;
            }
            .currency-select-wrap .currency-select {
                font-size: 0.8rem;
                padding-right: 2rem;
            }
            .budget-select-wrap .c-select {
                font-size: 0.85rem;
            }

            /* ── Chips ── */
            .chip-group { display: flex; flex-wrap: wrap; gap: 0.45rem; }
            .chip {
                padding: 0.38rem 0.85rem; border-radius: 30px;
                border: 1px solid rgba(255,255,255,0.08);
                background: transparent; color: var(--dim);
                font-size: 0.78rem; font-family: inherit; cursor: pointer;
                transition: all 0.18s ease;
            }
            .chip:hover { border-color: rgba(6,182,212,0.35); color: var(--white); }
            .chip-active {
                border-color: var(--cyan) !important;
                background: rgba(6,182,212,0.1) !important;
                color: var(--cyan) !important;
            }

            .file-dropzone {
                border: 1px dashed rgba(255,255,255,0.2);
                border-radius: 11px;
                padding: 0.95rem 1rem;
                display: flex;
                align-items: center;
                gap: 0.8rem;
                color: var(--muted);
                cursor: pointer;
                background: rgba(255,255,255,0.015);
                transition: all 0.22s ease;
            }
            .file-dropzone p {
                margin: 0;
                color: rgba(255,255,255,0.78);
                font-size: 0.84rem;
            }
            .file-dropzone span {
                font-size: 0.71rem;
                color: var(--dim);
            }
            .file-dropzone:hover,
            .file-dropzone.drag-over {
                border-color: rgba(6,182,212,0.55);
                background: rgba(6,182,212,0.06);
            }
            .file-dropzone.has-file {
                border-style: solid;
                border-color: rgba(6,182,212,0.45);
            }

            .file-chip {
                margin-top: 0.6rem;
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.35rem 0.65rem;
                border-radius: 999px;
                border: 1px solid rgba(6,182,212,0.26);
                background: rgba(6,182,212,0.08);
                font-size: 0.72rem;
                color: var(--white);
                max-width: 100%;
            }
            .file-chip span {
                max-width: 320px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .file-chip button {
                border: none;
                background: transparent;
                color: #fca5a5;
                font-size: 0.7rem;
                cursor: pointer;
                padding: 0;
            }

            .char-count {
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.6rem; color: var(--muted);
                text-align: right; margin-top: 0.12rem;
            }

            .error-banner {
                padding: 0.9rem 1.1rem; border-radius: 10px;
                border: 1px solid rgba(239,68,68,0.25);
                background: rgba(239,68,68,0.05);
                color: #ef4444; font-size: 0.83rem;
                display: flex; align-items: center; gap: 0.65rem;
            }

            .submit-btn {
                border: none; cursor: pointer; padding: 1.1rem; width: 100%;
                justify-content: center; border-radius: 10px; font-size: 0.97rem;
                transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
            }
            .submit-btn:hover:not(:disabled) {
                transform: translateY(-2px);
                box-shadow: 0 14px 30px rgba(6,182,212,0.22);
            }
            .submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }

            .form-footer-note {
                display: flex; align-items: center; gap: 0.48rem;
                font-size: 0.73rem; color: var(--muted); margin: 0; justify-content: center;
            }

            /* ── Success ── */
            .success-state {
                display: flex; flex-direction: column; align-items: center;
                text-align: center; padding: 4rem 1rem; gap: 1.5rem;
                position: relative;
                overflow: hidden;
            }
            .success-confetti {
                position: absolute;
                inset: 0;
                pointer-events: none;
            }
            .confetti-piece {
                position: absolute;
                top: -8px;
                width: 8px;
                height: 16px;
                border-radius: 2px;
                opacity: 0;
                animation: confetti-fall 1.9s ease-in forwards;
            }
            @keyframes confetti-fall {
                0% { transform: translateY(-12px) rotate(0deg); opacity: 0; }
                15% { opacity: 0.95; }
                100% { transform: translateY(220px) rotate(220deg); opacity: 0; }
            }
            .success-icon {
                width: 70px; height: 70px; border-radius: 50%;
                background: rgba(6,182,212,0.08);
                border: 1px solid rgba(6,182,212,0.2);
                display: flex; align-items: center; justify-content: center;
                animation: success-pop 0.4s cubic-bezier(0.175,0.885,0.32,1.275);
            }
            @keyframes success-pop {
                0%   { transform: scale(0.5); opacity: 0; }
                100% { transform: scale(1);   opacity: 1; }
            }
            .success-title { font-size: 2rem; font-weight: 500; margin: 0; }
            .success-body  { color: var(--muted); font-size: 0.92rem; line-height: 1.7; max-width: 350px; margin: 0; }
            .success-actions {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 0.7rem;
            }
            .success-actions .submit-btn {
                width: auto;
                min-width: 210px;
            }
            .success-wa {
                border: 1px solid rgba(6,182,212,0.35);
                background: rgba(6,182,212,0.06);
                color: var(--cyan);
                border-radius: 10px;
                padding: 0.88rem 1.1rem;
                text-decoration: none;
                font-size: 0.84rem;
                display: inline-flex;
                align-items: center;
                justify-content: center;
            }
            .success-wa:hover {
                border-color: rgba(6,182,212,0.7);
                transform: translateY(-1px);
            }

            @keyframes spin { to { transform: rotate(360deg); } }

            /* ── Responsive ── */
            @media(max-width: 1100px) {
                .contact-root { grid-template-columns: 1fr; gap: 3rem; }
                .contact-left { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
                .channels-section { grid-column: 1 / -1; }
            }
            @media(max-width: 768px) {
                .contact-left { grid-template-columns: 1fr; }
                .contact-form-container { padding: 2.5rem 1.5rem; }
                .form-row { flex-direction: column; gap: 1.7rem; }
                .budget-controls { grid-template-columns: 1fr; }
            }
            @media(max-width: 480px) {
                .channel-badge { display: none; }
                .contact-form-container { padding: 2rem 1.1rem; }
            }
            `}</style>
        </PageWrapper>
    );
}
