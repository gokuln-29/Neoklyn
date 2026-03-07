import Link from 'next/link';

export default function Footer() {
    return (
        <footer>
            <div className="f-logo">NeoKlyn.com</div>
            <div className="f-links">
                <Link href="/services">Services</Link>
                <Link href="/markets">Markets</Link>
                <Link href="/process">Process</Link>
                <Link href="/work">Work</Link>
                <Link href="/contact">Contact</Link>
            </div>
            <div className="f-copy">© 2026 NeoKlyn.com<br />All rights reserved.</div>
        </footer>
    );
}
