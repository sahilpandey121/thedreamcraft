import { useState, useEffect, useCallback } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MarqueeStrip from './components/MarqueeStrip'
import HowItWorks from './components/HowItWorks'
import ProductsSection from './components/ProductsSection'
import NewsletterSection from './components/NewsletterSection'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import ProductModal from './components/ProductModal'
import CheckoutModal from './components/CheckoutModal'
import Toast from './components/Toast'
import { PRODUCTS } from './data/products'

export default function App() {
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [modalProduct, setModalProduct] = useState(null)
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((icon, title, sub) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, icon, title, sub }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000)
  }, [])

  const addToCart = useCallback((product) => {
    // Unique key: same product with different colour/size = separate cart entries
    const cartKey = `${product.id}__${product.selectedColour || ''}__${product.length || ''}`
    setCart(prev => {
      const ex = prev.find(i => i.cartKey === cartKey)
      if (ex) return prev.map(i => i.cartKey === cartKey ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, cartKey, qty: 1 }]
    })
    showToast('🎁', 'Added to cart!', product.name)
  }, [showToast])

  const toggleWishlist = useCallback((product) => {
    setWishlist(prev => {
      const ex = prev.find(p => p.id === product.id)
      if (ex) { showToast('💔', 'Removed from wishlist', product.name); return prev.filter(p => p.id !== product.id) }
      showToast('❤️', 'Added to wishlist!', product.name)
      return [...prev, product]
    })
  }, [showToast])

  const updateQty = useCallback((cartKey, delta) => {
    setCart(prev => prev.map(i => i.cartKey === cartKey ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0))
  }, [])

  const removeFromCart = useCallback((cartKey) => {
    setCart(prev => prev.filter(i => i.cartKey !== cartKey))
  }, [])

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0)

  const handleCheckoutSuccess = useCallback(() => {
    setCart([])
    setCheckoutOpen(false)
    setCartOpen(false)
    showToast('🎉', 'Order Placed!', 'We will contact you shortly.')
  }, [showToast])

  useEffect(() => {
    const fn = e => {
      if (e.key === 'Escape') { setCartOpen(false); setModalProduct(null); setCheckoutOpen(false); }
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  return (
    <div>
      <Navbar
        cartCount={cartCount}
        wishCount={wishlist.length}
        onCartOpen={() => setCartOpen(true)}
      />

      <main>
        <Hero onShopNow={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })} />
        <MarqueeStrip />
        <HowItWorks />
        <ProductsSection
          products={PRODUCTS.slice(0, 10)}
          wishlist={wishlist}
          onAdd={addToCart}
          onWish={toggleWishlist}
          onClick={setModalProduct}
        />
        <NewsletterSection />
      </main>

      <Footer />

      {cartOpen && (
        <CartDrawer
          cart={cart}
          total={cartTotal}
          onClose={() => setCartOpen(false)}
          onQty={updateQty}
          onRemove={removeFromCart}
          onCheckout={() => setCheckoutOpen(true)}
        />
      )}

      {checkoutOpen && (
        <CheckoutModal 
          cart={cart}
          total={cartTotal}
          onClose={() => setCheckoutOpen(false)}
          onSuccess={handleCheckoutSuccess}
        />
      )}

      {modalProduct && (
        <ProductModal
          product={modalProduct}
          isWishlisted={wishlist.some(p => p.id === modalProduct.id)}
          onClose={() => setModalProduct(null)}
          onAdd={addToCart}
          onWish={toggleWishlist}
        />
      )}

      <Toast toasts={toasts} />
    </div>
  )
}
