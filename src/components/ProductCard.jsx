// Colour name → hex mapping for product swatches
const HEX = {
  'White': '#f5f5f5', 'Black': '#2a2a2a', 'Red': '#ef4444',
  'Blue': '#3b82f6', 'Yellow': '#eab308', 'Green': '#22c55e',
  'Pink': '#ec4899', 'Orange': '#f97316', 'Purple': '#a855f7',
  'Cyan': '#06b6d4', 'Rose Gold': '#d4a0a0', 'Gold': '#d4af37',
  'Warm White': '#fef3c7', 'Cool White': '#e0f2fe', 'Warm Amber': '#f59e0b',
  'Cool Blue': '#93c5fd', 'Mixed Colours': 'conic-gradient(#ef4444,#eab308,#22c55e,#3b82f6,#a855f7,#ec4899,#ef4444)',
  'Mixed': 'conic-gradient(#ef4444,#eab308,#22c55e,#3b82f6,#a855f7,#ef4444)',
  'Multicolour RGB': 'conic-gradient(red,orange,yellow,green,blue,purple,red)',
}

export default function ProductCard({ product, isWishlisted, onWish, onClick }) {
  const disc = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  return (
    <article className="pcard" role="listitem" aria-label={product.name}>
      <div className="pcard-img-wrap" onClick={onClick}>
        <img src={product.image} alt={product.name} loading="lazy"
          onError={e => { e.target.style.opacity = '.2' }} />

        <div className="pcard-badges">
          {product.badge === 'bestseller' && <span className="pbadge bestseller">Bestseller</span>}
          {product.badge === 'new'        && <span className="pbadge new">New</span>}
          {product.badge === 'sale' && disc && <span className="pbadge sale">{disc}% OFF</span>}
        </div>

        <button
          id={`wish-${product.id}`}
          className={`pwish${isWishlisted ? ' active' : ''}`}
          onClick={e => { e.stopPropagation(); onWish() }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={isWishlisted}
        >
          {isWishlisted ? '♥' : '♡'}
        </button>

        {/* Tap to customise hint — replaces the old quick-add button */}
        <div className="pcard-tap-hint">
          <span>Tap to customise &amp; order</span>
        </div>
      </div>

      <div className="pcard-body">
        <div className="pcard-cat">{product.category}</div>
        <h3 className="pcard-name" onClick={onClick}>{product.name}</h3>
        <p className="pcard-desc">{product.description}</p>

        {/* Colour swatches (display only) */}
        {product.colours?.length > 0 && (
          <div className="pcard-colours">
            <span className="col-label">Colors:</span>
            {product.colours.slice(0, 7).map((c, i) => (
              <div key={i} className="col-dot" title={c}
                style={{ background: HEX[c] || '#999' }} />
            ))}
            {product.colours.length > 7 && (
              <span className="col-more">+{product.colours.length - 7}</span>
            )}
          </div>
        )}

        <div className="pcard-footer">
          <div className="price-wrap">
            <span className="price">₹{product.price}</span>
            {product.originalPrice && <span className="price-og">₹{product.originalPrice}</span>}
          </div>
          <span className="pcard-rating">★ {product.rating}</span>
        </div>
      </div>
    </article>
  )
}
