import { useState, useEffect } from 'react'

const ANNOUNCES = [
  '🚚 Free Delivery on orders above ₹499',
  '🎁 Use code FRESH10 for 10% off your first order',
  '⭐ 5,000+ Happy Customers across India',
  '✦ 3D Printed with Precision — Made in India 🇮🇳',
  '💡 Frames from ₹150 · Lamps from ₹299 · Keychains from ₹99',
  '🚚 Free Delivery on orders above ₹499',
  '🎁 Use code FRESH10 for 10% off your first order',
  '⭐ 5,000+ Happy Customers across India',
  '✦ 3D Printed with Precision — Made in India 🇮🇳',
  '💡 Frames from ₹150 · Lamps from ₹299 · Keychains from ₹99',
]

export default function Navbar({ cartCount, wishCount, onCartOpen }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      {/* Announcement Bar */}
      <div className="announce-bar" aria-label="Promotions">
        <div className="announce-inner" aria-hidden="true">
          {ANNOUNCES.map((item, i) => (
            <span key={i} className="announce-item">
              <span className="announce-dot" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Main Navbar */}
      <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="container">
          <div className="navbar-inner">
            {/* Logo */}
            <a href="/" className="navbar-logo" aria-label="DreamCraft Home">
              <span className="logo-main">DreamCraft</span>
              <span className="logo-sub">Lithophane Gifts</span>
            </a>

            {/* Nav Links */}
            <nav className="navbar-nav" aria-label="Main navigation">
              <a href="#categories" id="nav-frames">Frames</a>
              <a href="#categories" id="nav-lamps">Lamps</a>
              <a href="#categories" id="nav-keychains">Keychains</a>
              <a href="#how" id="nav-how">How It Works</a>
              <a href="#pricing" id="nav-pricing">Pricing</a>
            </nav>

            {/* Search + Actions */}
            <div className="navbar-actions">
              <div className="navbar-search">
                <span className="search-icon" aria-hidden="true">🔍</span>
                <input
                  id="navbar-search"
                  type="search"
                  placeholder="Search gifts…"
                  aria-label="Search products"
                />
              </div>

              <button
                className="navbar-icon-btn"
                id="wishlist-nav-btn"
                title="Wishlist"
                aria-label={`Wishlist: ${wishCount} items`}
              >
                ♡
                {wishCount > 0 && <span className="badge">{wishCount}</span>}
              </button>

              <button
                className="navbar-icon-btn"
                id="cart-nav-btn"
                onClick={onCartOpen}
                title="Cart"
                aria-label={`Cart: ${cartCount} items`}
              >
                🛍
                {cartCount > 0 && <span className="badge">{cartCount}</span>}
              </button>

              <a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                rel="noopener"
                id="order-whatsapp-btn"
                className="btn btn-primary"
                style={{ padding: '.5rem 1rem', fontSize: '.78rem' }}
              >
                Order via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
