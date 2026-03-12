import { Outlet, NavLink } from 'react-router-dom'

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>

        <div className="flex gap-3 mb-6">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isActive ? 'bg-teal-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-teal-400'
              }`
            }
          >
            Users Data
          </NavLink>
          <NavLink
            to="/dashboard/formData"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isActive ? 'bg-teal-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-teal-400'
              }`
            }
          >
            Form Data
          </NavLink>
        </div>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Dashboard