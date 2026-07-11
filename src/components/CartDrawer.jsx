const HEX = {
  'White': '#f5f5f5', 'Black': '#2a2a2a', 'Red': '#ef4444',
  'Blue': '#3b82f6', 'Yellow': '#eab308', 'Green': '#22c55e',
  'Pink': '#ec4899', 'Orange': '#f97316', 'Purple': '#a855f7',
  'Cyan': '#06b6d4', 'Rose Gold': '#d4a0a0', 'Gold': '#d4af37',
  'Warm White': '#fef3c7', 'Cool White': '#e0f2fe', 'Warm Amber': '#f59e0b',
  'Cool Blue': '#93c5fd',
}

export default function CartDrawer({ cart, total, onClose, onQty, onRemove, onCheckout }) {
  const shipping = total > 500 ? 0 : 60
  const grand = total + shipping

  return (
    <>
      <div className="cart-overlay" onClick={onClose} aria-hidden="true" />
      <div className="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping cart">
        <div className="cart-hd">
          <h2>Your Cart 🛍️</h2>
          <button id="cart-close-btn" className="cart-cls" onClick={onClose} aria-label="Close cart">✕</button>
        </div>

        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <h3 style={{ fontFamily: 'var(--font-h)' }}>Your cart is empty</h3>
              <p>Add some gifts to get started!</p>
            </div>
          ) : cart.map(item => (
            <div key={item.cartKey} className="citem">
              <img src={item.image} alt={item.name} className="citem-img"
                onError={e => { e.target.style.opacity = '.3' }} />
              <div className="citem-info">
                <div className="citem-name" title={item.name}>{item.name}</div>

                {/* Colour + Size metadata row */}
                <div className="citem-meta">
                  {item.selectedColour && (
                    <span className="citem-colour-tag">
                      <span
                        className="citem-colour-dot"
                        style={{
                          background: HEX[item.selectedColour] || '#888',
                          border: item.selectedColour === 'White' ? '1px solid #ccc' : 'none'
                        }}
                      />
                      {item.selectedColour}
                    </span>
                  )}
                  {item.length && (
                    <span className="citem-size-tag">📐 {item.length} cm</span>
                  )}
                </div>

                <div className="citem-ctrl">
                  <button className="qty-btn" id={`dec-${item.cartKey}`} onClick={() => onQty(item.cartKey, -1)} aria-label="Decrease">−</button>
                  <span className="qty-n">{item.qty}</span>
                  <button className="qty-btn" id={`inc-${item.cartKey}`} onClick={() => onQty(item.cartKey, 1)} aria-label="Increase">+</button>
                  <span className="citem-price">₹{item.price * item.qty}</span>
                </div>
              </div>
              <button className="citem-rm" id={`rm-${item.cartKey}`} onClick={() => onRemove(item.cartKey)} aria-label="Remove">🗑</button>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="cart-ft">
            <div className="cart-totals">
              <div className="ctot-row"><span>Subtotal</span><span>₹{total}</span></div>
              <div className="ctot-row"><span>Shipping</span><span>{shipping === 0 ? '🎉 Free!' : `₹${shipping}`}</span></div>
              {shipping > 0 && (
                <div className="ctot-row" style={{ fontSize: '.72rem', color: 'var(--primary-lt)' }}>
                  <span>Add ₹{500 - total} more for free delivery!</span>
                </div>
              )}
              <div className="ctot-row grand"><span>Grand Total</span><span className="grand-p">₹{grand}</span></div>
            </div>
            <button
              id="checkout-btn"
              className="checkout-btn"
              onClick={() => { onClose(); onCheckout(); }}
            >
              🎁 Pay ₹{grand} — Confirm Order
            </button>
          </div>
        )}
      </div>
    </>
  )
}
