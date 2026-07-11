import { useState } from 'react'

const HEX = {
  'White': '#f5f5f5', 'Black': '#2a2a2a', 'Red': '#ef4444',
  'Blue': '#3b82f6', 'Yellow': '#eab308', 'Green': '#22c55e',
  'Pink': '#ec4899', 'Orange': '#f97316', 'Purple': '#a855f7',
  'Cyan': '#06b6d4', 'Rose Gold': '#d4a0a0', 'Gold': '#d4af37',
  'Warm White': '#fef3c7', 'Cool White': '#e0f2fe', 'Warm Amber': '#f59e0b',
  'Cool Blue': '#93c5fd', 'Mixed Colours': '#888', 'Mixed': '#888',
  'Multicolour RGB': '#888',
}

// Colours the customer can actually select
const AVAILABLE_COLOURS = ['Red', 'Blue', 'Green', 'White', 'Yellow']

export default function ProductModal({ product, isWishlisted, onClose, onAdd, onWish }) {
  const disc = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  // Default to first matching available colour, or first product colour
  const defaultColour =
    AVAILABLE_COLOURS.find(c => product.colours?.includes(c)) ||
    (product.colours?.[0] ?? 'White')

  const [selectedColour, setSelectedColour] = useState(defaultColour)
  const [length, setLength] = useState('')
  const [lengthError, setLengthError] = useState('')

  // Only show colours that this product supports AND are in AVAILABLE_COLOURS
  const selectableColours = product.colours
    ? product.colours.filter(c => AVAILABLE_COLOURS.includes(c))
    : []

  const handleAddToCart = () => {
    if (!length || isNaN(length) || Number(length) <= 0) {
      setLengthError('Please enter a valid length (cm)')
      return
    }
    setLengthError('')
    onAdd({ ...product, selectedColour, length: Number(length) })
    onClose()
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={product.name}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-grid">
          <img src={product.image} alt={product.name} className="modal-img"
            onError={e => { e.target.style.opacity = '.3' }} />

          <div className="modal-body">
            <button className="modal-close" id="modal-close-btn" onClick={onClose} aria-label="Close">✕</button>

            <div className="modal-cat">{product.category}</div>
            <h2 className="modal-name">{product.name}</h2>

            <div className="modal-rating">
              <span className="stars">{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}</span>
              <span>{product.rating} ({product.reviews.toLocaleString()} reviews)</span>
            </div>

            <p className="modal-desc">{product.description}</p>

            {product.features && (
              <ul className="modal-features" aria-label="Product features">
                {product.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            )}

            <div className="modal-vars">
              {/* ── COLOUR SELECTOR ── */}
              {selectableColours.length > 0 && (
                <div>
                  <div className="modal-var-label">
                    Choose Colour — <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{selectedColour}</span>
                  </div>
                  <div className="colour-picker-row">
                    {selectableColours.map((c) => (
                      <button
                        key={c}
                        title={c}
                        aria-label={`Select colour ${c}`}
                        aria-pressed={selectedColour === c}
                        className={`colour-swatch-btn${selectedColour === c ? ' selected' : ''}`}
                        style={{ '--swatch-col': HEX[c] || '#999' }}
                        onClick={() => setSelectedColour(c)}
                      >
                        <span className="swatch-inner" />
                        {selectedColour === c && <span className="swatch-tick">✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ── SIZE / LENGTH INPUT ── */}
              <div className="size-input-wrap">
                <label className="modal-var-label" htmlFor={`length-${product.id}`}>
                  Enter Length (cm) — size is based on your uploaded photo
                </label>
                <div className="size-input-row">
                  <input
                    id={`length-${product.id}`}
                    type="number"
                    min="1"
                    step="0.5"
                    placeholder="e.g. 15"
                    className={`size-input${lengthError ? ' error' : ''}`}
                    value={length}
                    onChange={e => { setLength(e.target.value); setLengthError('') }}
                    aria-describedby={lengthError ? `length-err-${product.id}` : undefined}
                  />
                  <span className="size-unit">cm</span>
                </div>
                {lengthError && (
                  <p id={`length-err-${product.id}`} className="size-error" role="alert">{lengthError}</p>
                )}
                <p className="size-hint">
                  📐 Width & height are auto-calculated from your photo's aspect ratio
                </p>
              </div>

              {/* Available shapes (info only) */}
              {product.shapes?.length > 0 && (
                <div>
                  <div className="modal-var-label">Available Shapes</div>
                  <div className="modal-var-chips">
                    {product.shapes.map((s, i) => <span key={i} className="var-chip">{s}</span>)}
                  </div>
                </div>
              )}
            </div>

            <div className="modal-price-row">
              <span className="modal-price">₹{product.price}</span>
              {product.originalPrice && <span className="modal-price-og">₹{product.originalPrice}</span>}
              {disc && <span className="modal-discount">Save {disc}%</span>}
            </div>

            <p className="modal-delivery">🚚 Delivery in <strong>{product.deliveryDays}</strong></p>

            <div className="modal-actions">
              <button
                id={`modal-add-${product.id}`}
                className="modal-add-btn"
                onClick={handleAddToCart}
              >
                🛍️ Add to Cart
              </button>
              <button
                id={`modal-wish-${product.id}`}
                className={`modal-wish-btn${isWishlisted ? ' active' : ''}`}
                onClick={() => onWish(product)}
                aria-pressed={isWishlisted}
              >
                {isWishlisted ? '♥' : '♡'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
