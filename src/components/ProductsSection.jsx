import ProductCard from './ProductCard'

export default function ProductsSection({ products, wishlist, onAdd, onWish, onClick }) {
  return (
    <section className="prods-section" id="products" aria-label="Products">
      <div className="container">
        <div className="prods-grid" role="list">
          {products.map(p => (
            <ProductCard
              key={p.id}
              product={p}
              isWishlisted={wishlist.some(w => w.id === p.id)}
              onWish={() => onWish(p)}
              onClick={() => onClick(p)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
