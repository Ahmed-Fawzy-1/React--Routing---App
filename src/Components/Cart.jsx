import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, increaseQty, decreaseQty } from '../store/cartSlice'

function Cart() {
  const dispatch = useDispatch()
  const items = useSelector(state => state.cart.items)

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = items.length > 0 ? 15 : 0
  const tax = parseFloat((subtotal * 0.07).toFixed(2))
  const total = (subtotal + shipping + tax).toFixed(2)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Shopping Cart</h1>

        <div className="flex gap-6 items-start">

          {/* Cart Items */}
          <div className="flex-1 flex flex-col gap-4">
            {items.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center text-gray-400 text-sm">
                Your cart is empty
              </div>
            ) : (
              items.map(item => (
                <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-5 shadow-sm">
                  {/* Image */}
                  <div className="w-28 h-20 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>

                  {/* Name & Price */}
                  <div className="w-44">
                    <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
                    <p className="text-gray-400 text-xs mt-1">Unit Price: ${item.price}</p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center border border-teal-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => dispatch(decreaseQty(item.id))}
                      className="w-8 h-8 flex items-center justify-center text-teal-600 hover:bg-teal-50 transition-colors text-lg font-bold"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-semibold text-gray-700">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => dispatch(increaseQty(item.id))}
                      className="w-8 h-8 flex items-center justify-center text-teal-600 hover:bg-teal-50 transition-colors text-lg font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* Total */}
                  <div className="flex-1 text-sm text-gray-600 font-medium">
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="p-2 border border-gray-200 rounded-lg hover:border-red-400 hover:text-red-500 text-gray-400 transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Order Summary */}
          <div className="w-64 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex-shrink-0">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>

            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Subtotal ({totalItems} items):</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Shipping:</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <span>Tax:</span>
              <span>${tax}</span>
            </div>

            <div className="border-t border-gray-100 pt-4 flex justify-between items-center mb-5">
              <span className="font-bold text-gray-800 text-base">Total:</span>
              <span className="font-bold text-gray-800 text-xl">${total}</span>
            </div>

            <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-xl transition-colors">
              Checkout
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Cart