const PLANS = [
  {
    emoji: '🔑',
    name: 'Photo Keychain',
    sub: 'Best affordable gift',
    price: 99,
    orig: 199,
    features: ['Custom photo keychain', 'Hold-to-light reveal', 'Multiple colours & shapes', 'Metal keyring', 'Delivered in 2–4 days'],
    featured: false,
  },
  {
    emoji: '🖼️',
    name: 'Classic Frame',
    sub: 'Most popular choice',
    price: 150,
    orig: 300,
    features: ['Flat lithophane frame', 'Custom photo', '8+ frame colours', 'Multiple shapes', 'Ready to hang or stand'],
    featured: false,
  },
  {
    emoji: '💡',
    name: 'LED Backlit Frame',
    sub: 'Always glowing',
    price: 300,
    orig: 550,
    features: ['Built-in LED backlight', 'Always-on glow', 'USB-C powered', 'Multiple colours & shapes', 'Gift-boxed'],
    featured: true,
  },
  {
    emoji: '🌙',
    name: 'Moon Lamp',
    sub: 'Ultimate showstopper',
    price: 499,
    orig: 850,
    features: ['Photo on moon glow', 'USB-C powered', 'Wooden base included', 'Multi-colour RGB LED', 'Touch colour sensor'],
    featured: false,
  },
  {
    emoji: '🎁',
    name: 'Ultimate Memory Kit',
    sub: 'Best value combo',
    price: 799,
    orig: 1399,
    features: ['1 Cylinder Lamp', '2 Keychains', '1 LED Frame', 'All personalised', 'Complete gift set'],
    featured: false,
  },
]

export default function PricingSection() {
  return (
    <section className="pricing-section" id="pricing" aria-labelledby="pricing-heading">
      <div className="container">
        <div className="sec-header">
          <div className="sec-tag">Transparent Pricing</div>
          <h2 id="pricing-heading" className="sec-title">
            Premium Quality, <span className="gtext">Affordable Prices</span>
          </h2>
          <p className="sec-sub">No hidden costs. What you see is what you pay. Free gift wrapping on every order.</p>
          <div className="sec-divider" />
        </div>
        <div className="pricing-grid">
          {PLANS.map((p, i) => (
            <div key={i} className={`pricing-card${p.featured ? ' featured' : ''}`}>
              <div className="pricing-emoji">{p.emoji}</div>
              <div className="pricing-name">{p.name}</div>
              <div className="pricing-sub">{p.sub}</div>
              <div className="pricing-price"><span>₹</span>{p.price}</div>
              <div className="pricing-orig">MRP ₹{p.orig}</div>
              <ul className="pricing-features">
                {p.features.map((f, j) => <li key={j}>{f}</li>)}
              </ul>
              <a
                href="#products"
                className={p.featured ? 'btn btn-accent' : 'btn btn-primary'}
                style={{ width: '100%', justifyContent: 'center', display: 'flex' }}
                id={`price-cta-${i}`}
              >
                Order Now →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

