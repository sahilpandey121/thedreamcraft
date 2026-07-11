import { LITHO_COLOURS } from '../data/products'

export default function ColourShowcase() {
  return (
    <section className="colours-section" aria-labelledby="colours-heading">
      <div className="container">
        <div className="sec-header">
          <div className="sec-tag">Made in Every Shade</div>
          <h2 id="colours-heading" className="sec-title">
            Available in <span className="gtext">10+ Colours</span>
          </h2>
          <p className="sec-sub">
            Every lithophane can be printed in your favourite colour —
            red, blue, yellow, green, pink and more.
          </p>
          <div className="sec-divider" />
        </div>

        <div className="colour-showcase-grid">
          {LITHO_COLOURS.map((c, i) => (
            <div key={i} className="colour-showcase-card">
              <div
                className="colour-swatch-big"
                style={{ background: c.hex }}
                aria-label={c.name}
              />
              <div className="colour-name">{c.name}</div>
            </div>
          ))}
        </div>

        {/* Rainbow spectrum line */}
        <div style={{ marginTop: '2.5rem', borderRadius: '4px', overflow: 'hidden' }}>
          <div className="rainbow-strip" style={{ height: '5px', borderRadius: '3px' }} />
        </div>
        <p style={{ textAlign: 'center', marginTop: '1.1rem', fontSize: '.83rem', color: 'var(--muted)' }}>
          Can't find your colour?{' '}
          <a href="https://wa.me/91XXXXXXXXXX" style={{ color: 'var(--accent)', fontWeight: '500', textDecoration: 'underline' }}>
            WhatsApp us
          </a>{' '}
          for a custom colour request!
        </p>
      </div>
    </section>
  )
}
