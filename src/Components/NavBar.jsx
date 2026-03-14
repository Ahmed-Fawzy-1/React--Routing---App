import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

function NavBar() {
  const cartItems = useSelector(state => state.cart.items)
  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-teal-600 tracking-widest uppercase">⊞ PROJ-DASH</span>
      </div>

      <div className="flex items-center gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-sm font-medium transition-colors ${isActive ? 'text-teal-600' : 'text-gray-600 hover:text-teal-600'}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `text-sm font-medium transition-colors ${isActive ? 'text-teal-600' : 'text-gray-600 hover:text-teal-600'}`
          }
        >
          Projects
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `text-sm font-medium transition-colors flex items-center gap-1 ${isActive ? 'text-gray-800 font-bold' : 'text-gray-600 hover:text-teal-600'}`
          }
        >
          Cart 🛒
          {totalQty > 0 && (
            <span className="bg-teal-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalQty}
            </span>
          )}
        </NavLink>
      </div>

      <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-500 transition-colors">
        <span className="text-xl">👤</span> Logout
      </button>
    </nav>
  )
}

export default NavBar