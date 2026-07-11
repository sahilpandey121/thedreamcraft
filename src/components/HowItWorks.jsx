const STEPS = [
  { icon: '📸', title: 'Send Your Photo', text: 'WhatsApp or upload your favourite photo — solo, couple, family, or friends.' },
  { icon: '🎨', title: 'Pick Your Style', text: 'Choose your colour (red, blue, yellow & more), shape, and product type.' },
  { icon: '🖨️', title: 'We 3D Print It', text: 'Your photo is converted into a lithophane using precision 3D printing technology.' },
  { icon: '💡', title: 'It Glows!', text: 'When light passes through, your photo comes alive as a warm magical portrait.' },
  { icon: '📦', title: 'Delivered to You', text: 'Gift-boxed and shipped pan-India within 3–7 business days.' },
]

export default function HowItWorks() {
  return (
    <section className="how-section" id="how" aria-labelledby="how-heading">
      <div className="container">
        <div className="sec-header">
          <div className="sec-tag">The Process</div>
          <h2 id="how-heading" className="sec-title">
            How <span className="gtext">DreamCraft</span> Works
          </h2>
          <p className="sec-sub">5 simple steps to turn your favourite photo into a glowing piece of art.</p>
          <div className="sec-divider" />
        </div>

        <div className="how-grid">
          {STEPS.map((s, i) => (
            <div key={i} className="how-card">
              <div className="how-num">{i + 1}</div>
              <div className="how-icon">{s.icon}</div>
              <h3 className="how-title">{s.title}</h3>
              <p className="how-text">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
