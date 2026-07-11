const TESTIS = [
  { stars: '★★★★★', text: '"Ordered the moon lamp for my best friend\'s birthday — she literally cried happy tears! The photo is so clearly visible through the glow. DreamCraft is simply the best!"', name: 'Priya S.', loc: 'Mumbai', avatar: '👩' },
  { stars: '★★★★★', text: '"Got the cylinder lamp + keychain combo for my girlfriend\'s anniversary. The quality was stunning and she carries the keychain literally everywhere. 10/10!"', name: 'Rahul V.', loc: 'Delhi', avatar: '💑' },
  { stars: '★★★★★', text: '"Ordered 6 keychains for my entire friend group at just ₹99 each. Everyone was so happy! Super affordable but feels really premium. Loved the packaging too."', name: 'Meera J.', loc: 'Pune', avatar: '🌸' },
  { stars: '★★★★★', text: '"Heart LED frame for my parents\' anniversary — the best gift I ever gave them. When the light came on and their photo glowed, they were speechless. Thank you DreamCraft!"', name: 'Arjun K.', loc: 'Bangalore', avatar: '👨' },
  { stars: '★★★★☆', text: '"Ordered 3 moon lamps for siblings across India. All delivered perfectly in gift boxes. Photos are crystal clear in the glow. Highly recommend!"', name: 'Neha R.', loc: 'Hyderabad', avatar: '✨' },
  { stars: '★★★★★', text: '"The flat frame for my dorm room at ₹150 — unbelievable value! Every time my desk lamp is near it, my photo glows. All my friends want one now!"', name: 'Kavita M.', loc: 'Bhopal', avatar: '🎓' },
]

export default function TestimonialsSection() {
  return (
    <section className="testis-section" aria-labelledby="testis-heading">
      <div className="container">
        <div className="sec-header">
          <div className="sec-tag">Customer Reviews</div>
          <h2 id="testis-heading" className="sec-title">
            Loved by <span className="gtext">5,000+</span> Customers
          </h2>
          <p className="sec-sub">Real orders, real happiness. Here's what our customers say.</p>
          <div className="sec-divider" />
        </div>
        <div className="testis-grid">
          {TESTIS.map((t, i) => (
            <div key={i} className="testi-card">
              <div className="testi-stars">{t.stars}</div>
              <p className="testi-text">{t.text}</p>
              <div className="testi-author">
                <div className="testi-avatar">{t.avatar}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-loc">📍 {t.loc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
