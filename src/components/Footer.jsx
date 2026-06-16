import { Link } from 'react-router-dom'
import './Footer.css'

const footerLinks = {
  Platform: [
    { label: 'Browse Listings', to: '/listings' },
    { label: 'Become a Host', to: '/dashboard' },
    { label: 'About Us', to: '/about' },
    { label: 'How It Works', to: '/about' },
  ],
  Support: [
    { label: 'Help Centre', to: '/' },
    { label: 'Cancellation Policy', to: '/' },
    { label: 'Safety Guide', to: '/' },
    { label: 'Contact Us', to: '/' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '/' },
    { label: 'Terms of Service', to: '/' },
    { label: 'Cookie Policy', to: '/' },
    { label: 'Sitemap', to: '/' },
  ],
}

const socialLinks = [
  { icon: '𝕏', label: 'Twitter / X', href: 'https://twitter.com' },
  { icon: 'in', label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: '▶', label: 'YouTube', href: 'https://youtube.com' },
  { icon: '📸', label: 'Instagram', href: 'https://instagram.com' },
]

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container footer__top-inner">
          {/* Brand Column */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <span>🌿</span>
              <span>Stay<strong>Ease</strong></span>
            </Link>
            <p className="footer__tagline">
              Connecting travellers with eco-friendly homestays that support local communities and sustainable tourism across India.
            </p>

            {/* Newsletter */}
            <div className="footer__newsletter">
              <p className="footer__newsletter-label">✉️ Stay updated with new listings</p>
              <div className="footer__newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="footer__newsletter-input"
                  aria-label="Newsletter email"
                  id="footer-newsletter-email"
                />
                <button className="btn btn-primary footer__newsletter-btn" aria-label="Subscribe">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group} className="footer__col">
              <h4 className="footer__col-title">{group}</h4>
              <ul className="footer__links">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to} className="footer__link">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copy">
            © 2026 <strong>StayEase</strong>. All Rights Reserved. Made with 💚 for sustainable travel.
          </p>

          <div className="footer__socials">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                className="footer__social"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
