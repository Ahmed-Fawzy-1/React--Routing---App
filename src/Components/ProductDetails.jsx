import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
        const data = await res.json()
        setProduct(data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-400 text-sm">Loading...</p>
    </div>
  )

  if (!product) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-red-400 text-sm">Product not found.</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">

        <button
          onClick={() => navigate(-1)}
          className="text-sm text-teal-600 font-medium hover:underline mb-6 inline-block"
        >
          ← Back
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Image */}
          <div className="h-72 bg-gray-50 flex items-center justify-center overflow-hidden">
            <img
              src={product.images?.[0]}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <h1 className="text-xl font-bold text-gray-800">{product.title}</h1>
              <span className="text-teal-600 font-bold text-lg">${product.price}</span>
            </div>

            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-teal-50 text-teal-600">
              {product.category?.name}
            </span>

            <p className="text-sm text-gray-500 mt-4 leading-relaxed">{product.description}</p>

            <div className="grid grid-cols-2 gap-4 mt-5 text-sm">
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-gray-400 text-xs mb-1">Category</p>
                <p className="font-semibold text-gray-700 capitalize">{product.category?.name}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-gray-400 text-xs mb-1">Rating</p>
                <p className="font-semibold text-gray-700">⭐ {product.rating?.rate} ({product.rating?.count} reviews)</p>
              </div>
            </div>

            <button
              onClick={() => alert(`✅ "${product.title}" added to cart!`)}
              className="mt-6 w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Add to Cart 🛒
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ProductDetails