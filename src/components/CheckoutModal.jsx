import { useState, useMemo } from 'react'
import { supabase } from '../supabaseClient'
export default function CheckoutModal({ cart, total, onClose, onSuccess }) {
  const shipping = total > 500 ? 0 : 60
  const grand = total + shipping

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    pincode: '',
    utr: ''
  })
  
  // Payment Proof Image
  const [paymentProof, setPaymentProof] = useState(null)

  // Compute required product image uploads based on cart items and quantities
  // E.g., 2 keychains = 2 image slots
  const requiredImages = useMemo(() => {
    let slots = []
    cart.forEach(item => {
      for (let i = 0; i < item.qty; i++) {
        slots.push({
          id: `${item.cartKey}-${i}`,
          label: `${item.name} (${i + 1}/${item.qty})`,
          itemDetails: `${item.selectedColour || ''} ${item.length ? `- ${item.length}cm` : ''}`
        })
      }
    })
    return slots
  }, [cart])

  // State to hold uploaded files for each product
  const [productImages, setProductImages] = useState({})

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleProductImageChange = (slotId, file) => {
    setProductImages(prev => ({ ...prev, [slotId]: file }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')

    // Basic Validation
    if (!formData.name || !formData.mobile || !formData.address || !formData.pincode || !formData.utr) {
      setErrorMsg('Please fill in all required personal & payment details.')
      return
    }

    // Check if all product images are uploaded
    for (let slot of requiredImages) {
      if (!productImages[slot.id]) {
        setErrorMsg(`Please upload a photo for ${slot.label}.`)
        return
      }
    }

    if (!paymentProof) {
      setErrorMsg('Please upload the payment screenshot.')
      return
    }

    setIsSubmitting(true)
    const timestamp = Date.now()
    const folderPath = `order_${timestamp}`

    try {
      // 1. Upload Product Images
      const uploadedProductUrls = {}
      for (let slot of requiredImages) {
        const file = productImages[slot.id]
        const ext = file.name.split('.').pop()
        const fileName = `${folderPath}/${slot.id}.${ext}`
        
        const { error: uploadError } = await supabase.storage
          .from('order_images')
          .upload(fileName, file)

        if (uploadError) throw new Error(`Failed to upload image for ${slot.label}`)

        const { data: { publicUrl } } = supabase.storage
          .from('order_images')
          .getPublicUrl(fileName)

        uploadedProductUrls[slot.id] = publicUrl
      }

      // 2. Upload Payment Proof
      const proofExt = paymentProof.name.split('.').pop()
      const proofFileName = `${folderPath}/payment_proof.${proofExt}`
      
      const { error: proofError } = await supabase.storage
        .from('order_images')
        .upload(proofFileName, paymentProof)

      if (proofError) throw new Error('Failed to upload payment proof')

      const { data: { publicUrl: proofUrl } } = supabase.storage
        .from('order_images')
        .getPublicUrl(proofFileName)

      // 3. Prepare Cart Data with Image URLs
      const cartData = cart.map(item => {
        // Find URLs for this specific item's quantity
        const itemUrls = requiredImages
          .filter(slot => slot.id.startsWith(item.cartKey))
          .map(slot => uploadedProductUrls[slot.id])
          
        return {
          ...item,
          uploaded_images: itemUrls
        }
      })

      // 4. Insert into Database
      const { error: dbError } = await supabase
        .from('orders')
        .insert([{
          name: formData.name,
          mobile: formData.mobile,
          email: formData.email,
          address: formData.address,
          pincode: formData.pincode,
          utr: formData.utr,
          total_amount: grand,
          cart_data: cartData,
          payment_proof_url: proofUrl,
          status: 'Pending'
        }])

      if (dbError) throw new Error('Failed to save order details to database')

      // 5. Success!
      setIsSubmitting(false)
      onSuccess()

    } catch (err) {
      console.error('Checkout error:', err)
      setErrorMsg(err.message || 'An error occurred while submitting your order. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Checkout">
      <div className="checkout-modal">
        <div className="checkout-header">
          <h2>Complete Your Order</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="checkout-body">
          {errorMsg && <div className="checkout-error">{errorMsg}</div>}

          <form onSubmit={handleSubmit} id="checkout-form">
            
            {/* 1. Personal Details */}
            <section className="checkout-section">
              <h3>1. Delivery Details</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="Enter your name" />
                </div>
                <div className="form-group">
                  <label>Mobile Number *</label>
                  <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} required placeholder="10-digit number" />
                </div>
                <div className="form-group full-width">
                  <label>Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="For order updates" />
                </div>
                <div className="form-group full-width">
                  <label>Complete Address *</label>
                  <textarea name="address" value={formData.address} onChange={handleInputChange} required placeholder="House No, Street, City" rows="3" />
                </div>
                <div className="form-group">
                  <label>PIN Code *</label>
                  <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} required placeholder="e.g. 400001" />
                </div>
              </div>
            </section>

            {/* 2. Product Photos */}
            <section className="checkout-section">
              <h3>2. Upload Photos for Products</h3>
              <p className="section-desc">Please upload one photo per item you are ordering.</p>
              
              <div className="image-uploads-list">
                {requiredImages.map(slot => (
                  <div key={slot.id} className="upload-box">
                    <div className="upload-info">
                      <div className="upload-label">{slot.label}</div>
                      {slot.itemDetails && <div className="upload-meta">{slot.itemDetails}</div>}
                    </div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleProductImageChange(slot.id, e.target.files[0])}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* 3. Payment Section */}
            <section className="checkout-section payment-section">
              <h3>3. Payment</h3>
              <div className="payment-amount">
                Total to Pay: <strong>₹{grand}</strong>
              </div>
              
              <div className="qr-container">
                <p>Scan the QR Code to pay via UPI (GPay, PhonePe, Paytm)</p>
                {/* Placeholder for QR Image */}
                <div className="qr-box">
                  <img src="/images/upi_qr.png" alt="Payment QR Code" onError={e => { e.target.src = 'https://via.placeholder.com/200?text=Your+QR+Here'; e.target.style.opacity = 1 }} />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group full-width">
                  <label>UTR / Transaction ID *</label>
                  <input type="text" name="utr" value={formData.utr} onChange={handleInputChange} required placeholder="e.g. 219830492834" />
                </div>
                <div className="form-group full-width">
                  <label>Payment Screenshot (Proof) *</label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => setPaymentProof(e.target.files[0])}
                  />
                </div>
              </div>
            </section>

          </form>
        </div>

        <div className="checkout-footer">
          <button type="button" className="btn-ghost" onClick={onClose}>Cancel</button>
          <button type="submit" form="checkout-form" className="btn-primary checkout-submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting Order...' : `Submit Order (₹${grand})`}
          </button>
        </div>
      </div>
    </div>
  )
}
