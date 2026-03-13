import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-shell footer">
      <div>
        <p className="footer-title">NURIT</p>
        <p className="footer-copy">
          A clear, welcoming community website built for easy reading and easy
          participation.
        </p>
      </div>

      <div className="footer-links">
        <Link href="/privacy-policy">Privacy Policy</Link>
        <Link href="/register">Register</Link>
        <Link href="/donate">Donate</Link>
      </div>
    </footer>
  );
}
