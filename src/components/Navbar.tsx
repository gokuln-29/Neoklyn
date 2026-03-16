import Link from 'next/link';
import Logo from '@/components/Logo';

export default function Navbar() {
    return (
        <nav>
            <div className="nav-logo">
                <Link href="/">
                    <Logo scale={0.4} />
                </Link>
            </div>
            <ul className="nav-links">
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/markets">Markets</Link></li>
                <li><Link href="/process">Process</Link></li>
                <li><Link href="/work">Work</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/insights">Insights</Link></li>
            </ul>
            <Link href="/contact" className="nav-cta"><span>↗ Start Project</span></Link>
        </nav>
    );
}
