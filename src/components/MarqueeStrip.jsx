const ITEMS = [
  'Frames from ₹150', 'LED Lamps from ₹300', 'Moon Lamps from ₹499',
  'Keychains from ₹99', 'Free Gift Wrapping', 'Pan India Delivery',
  '10+ Colours Available', '3D Printed Precision', 'Made in India 🇮🇳',
  'Frames from ₹150', 'LED Lamps from ₹300', 'Moon Lamps from ₹499',
  'Keychains from ₹99', 'Free Gift Wrapping', 'Pan India Delivery',
  '10+ Colours Available', '3D Printed Precision', 'Made in India 🇮🇳',
]

export default function MarqueeStrip() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-inner">
        {ITEMS.map((item, i) => (
          <span key={i} className="marquee-item">
            <span>✦</span> {item}
          </span>
        ))}
      </div>
    </div>
  )
}
