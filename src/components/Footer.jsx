export default function Footer() {
  const yr = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <span className="logo-main" style={{ display: 'block', marginBottom: '.15rem', fontSize: '1.5rem' }}>DreamCraft</span>
            <span className="logo-sub" style={{ display: 'block', marginBottom: '.9rem' }}>Lithophane Gifts</span>
            <p>India's most loved personalised lithophane gifting brand. Turning your photos into glowing 3D art — available in 10+ colours for every occasion.</p>
            <div className="footer-socials">
              <a href="#" className="social-btn" aria-label="Instagram">📸</a>
              <a href="#" className="social-btn" aria-label="WhatsApp">💬</a>
              <a href="#" className="social-btn" aria-label="Facebook">📘</a>
              <a href="#" className="social-btn" aria-label="YouTube">▶️</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Products</h4>
            <ul>
              <li><a href="#products">Classic Flat Frames</a></li>
              <li><a href="#products">LED Backlit Frames</a></li>
              <li><a href="#products">Moon Lamps</a></li>
              <li><a href="#products">Cylinder Lamps</a></li>
              <li><a href="#products">Heart Lamps</a></li>
              <li><a href="#products">Photo Keychains</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Help</h4>
            <ul>
              <li><a href="#how">How to Order</a></li>
              <li><a href="#">Track My Order</a></li>
              <li><a href="#">Shipping Policy</a></li>
              <li><a href="#">Returns &amp; Refunds</a></li>
              <li><a href="#">Custom Requests</a></li>
              <li><a href="#">FAQs</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="https://wa.me/91XXXXXXXXXX">📱 WhatsApp Order</a></li>
              <li><a href="mailto:hello@dreamcraft.in">📧 hello@dreamcraft.in</a></li>
              <li><a href="#">📍 Made in India 🇮🇳</a></li>
              <li><a href="#">Hours: 9am – 9pm</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms &amp; Conditions</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {yr} DreamCraft. Made with ❤️ in India.</p>
          <div className="pay-icons">
            <span className="pay-icon">UPI</span>
            <span className="pay-icon">GPay</span>
            <span className="pay-icon">PhonePe</span>
            <span className="pay-icon">COD</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
