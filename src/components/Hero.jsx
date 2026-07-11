export default function Hero({ onShopNow }) {
  return (
    <section className="hero" aria-label="DreamCraft hero">
      {/* Left — editorial content */}
      <div className="hero-left">
        <div className="container" style={{ width: '100%' }}>
          <div className="hero-content">
            <div className="hero-chip">
              <span className="hero-chip-dot" aria-hidden="true" />
              New Collection — 2026
            </div>

            <h1>
              Your Story,<br />
              <em>Glowing</em><br />
              in Light.
            </h1>

            <p className="hero-sub">
              DreamCraft transforms your favourite photos into beautiful
              glowing lithophane art — frames, moon lamps, heart lamps &amp; keychains,
              all fully personalised in 10+ colours.
            </p>

            <div className="hero-actions">
              <button id="hero-shop-btn" className="btn btn-primary" onClick={onShopNow}>
                Shop the Collection →
              </button>
              <a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                rel="noopener"
                id="hero-wa-btn"
                className="btn btn-outline"
              >
                📱 WhatsApp Order
              </a>
            </div>

            <p className="hero-price-note">
              Frames from <strong>₹150</strong>&nbsp;·&nbsp;
              Moon Lamps from <strong>₹499</strong>&nbsp;·&nbsp;
              Keychains from <strong>₹99</strong>&nbsp;·&nbsp;
              <strong>Free Gift Wrapping</strong>
            </p>


          </div>
        </div>
      </div>

      {/* Right — hero image */}
      <div className="hero-right" aria-hidden="true">
        <img
          src="/images/litho_hero.png"
          alt="Lithophane moon lamp glowing with a portrait"
          className="hero-right-img"
        />
        <div className="hero-right-overlay" />

        {/* Floating info badges */}
        <div className="hero-float">
          <div className="fbadge">
            <span className="fb-icon">💡</span>
            <div>
              <div className="fb-strong">Glows in the Dark</div>
              <div className="fb-sub">Photo reveals on light</div>
            </div>
          </div>
          <div className="fbadge">
            <span className="fb-icon">🎨</span>
            <div>
              <div className="fb-strong">10+ Colours</div>
              <div className="fb-sub">Red, Blue, Yellow &amp; more</div>
            </div>
          </div>
          <div className="fbadge">
            <span className="fb-icon">🚚</span>
            <div>
              <div className="fb-strong">Pan India Delivery</div>
              <div className="fb-sub">3–7 days to your door</div>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-ind" aria-label="Scroll down">Scroll</div>
    </section>
  )
}
