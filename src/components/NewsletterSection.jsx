import { useState } from 'react'

export default function NewsletterSection() {
  const [phone, setPhone] = useState('')
  const [done, setDone] = useState(false)

  const submit = e => {
    e.preventDefault()
    if (!phone) return
    setDone(true); setPhone('')
  }

  return (
    <section className="nl-section" aria-labelledby="nl-heading">
      <div className="nl-box">
        <div className="sec-tag" style={{ color: 'rgba(255,255,255,.5)', marginBottom: '.75rem', display: 'block' }}>
          Stay Connected
        </div>
        <h2 id="nl-heading" className="nl-title">
          Get <em>10% Off</em> Your First Order
        </h2>
        <p className="nl-sub">
          Drop your WhatsApp number and get exclusive offers, new design alerts, and your first-order discount.
        </p>
        {done ? (
          <div style={{
            background: 'rgba(74,124,89,.2)',
            border: '1px solid rgba(74,124,89,.4)',
            borderRadius: '8px',
            padding: '1rem 2rem',
            color: '#86efac',
            fontWeight: '600',
            display: 'inline-block',
            fontSize: '.88rem',
          }}>
            🎉 Subscribed! Your 10% discount code will arrive via WhatsApp shortly.
          </div>
        ) : (
          <form className="nl-form" onSubmit={submit} aria-label="Subscribe form">
            <input
              type="tel"
              id="nl-phone"
              className="nl-input"
              placeholder="Your WhatsApp number…"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
              aria-label="WhatsApp number"
            />
            <button type="submit" id="nl-submit" className="btn btn-accent">
              Get My Offer →
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
