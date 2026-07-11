import { CATEGORIES } from '../data/products'

export default function CategoriesSection({ active, onChange }) {
  return (
    <section className="cats-section" id="categories" aria-labelledby="cats-heading">
      <div className="container">
        <div className="cats-grid" role="group" aria-label="Product categories">
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              id={`cat-${c.id.toLowerCase().replace(/\s+/g, '-')}`}
              className={`cat-pill${active === c.id ? ' active' : ''}`}
              onClick={() => onChange(c.id)}
              aria-pressed={active === c.id}
              aria-label={`Filter by ${c.name}`}
            >
              <span className="cat-icon">{c.icon}</span>
              <span className="cat-name">{c.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
