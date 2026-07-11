const FEATS = [
  { icon: '🖨️', title: '3D Printed Precision', text: 'Every lithophane is 3D printed at ultra-fine resolution for sharp, detailed photo quality.' },
  { icon: '💡', title: 'Magical Glow Effect', text: 'When light passes through, your photo appears as a warm, glowing portrait. Truly magical.' },
  { icon: '🎨', title: '10+ Colours Available', text: 'Red, blue, yellow, green, pink, purple — every product available in 10+ vibrant colours.' },
  { icon: '🎁', title: 'Free Gift Wrapping', text: 'Every order is packed in a premium gift box — ready to gift without any extra charge.' },
  { icon: '🚚', title: 'Pan-India Shipping', text: 'Delivery across India in 3–7 days. Express shipping available at checkout.' },
  { icon: '📱', title: 'Easy WhatsApp Ordering', text: 'Just send your photo on WhatsApp. We handle printing, packing, and delivery.' },
]

export default function FeaturesSection() {
  return (
    <section className="feats-section" aria-labelledby="feats-heading">
      <div className="container">
        <div className="sec-header">
          <div className="sec-tag">Why DreamCraft</div>
          <h2 id="feats-heading" className="sec-title">
            Why We're <span className="gtext">Different</span>
          </h2>
          <p className="sec-sub">Not just a photo frame — a living, glowing memory you'll keep forever.</p>
          <div className="sec-divider" />
        </div>
        <div className="feats-grid">
          {FEATS.map((f, i) => (
            <div key={i} className="feat-card">
              <div className="feat-icon">{f.icon}</div>
              <h3 className="feat-title">{f.title}</h3>
              <p className="feat-text">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
