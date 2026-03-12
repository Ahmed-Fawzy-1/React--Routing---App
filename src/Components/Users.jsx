import { useState, useEffect } from 'react'

const DEPARTMENTS = ['ALL', 'Engineering', 'Design', 'Marketing', 'Sales']

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('ALL')
  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await res.json()
        const departs = ['Engineering', 'Design', 'Marketing', 'Sales']
        setUsers(data.map((u, i) => ({ ...u, department: departs[i % departs.length] })))
      } catch (err) {
        setError('Failed to fetch users')
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const filtered = filter === 'ALL' ? users : users.filter(u => u.department === filter)

  return (
    <div>
      {/* Filter */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-gray-400 mb-2">Filter by Department</p>
        <div className="flex flex-wrap gap-2">
          {DEPARTMENTS.map(dept => (
            <button
              key={dept}
              onClick={() => setFilter(dept)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold border transition-colors ${
                filter === dept
                  ? 'bg-teal-600 text-white border-teal-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-teal-300'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm font-semibold text-gray-500 mb-3">
        Users <span className="text-gray-300">({filtered.length})</span>
      </p>

      {loading && <p className="text-gray-400 text-center py-10">Loading...</p>}
      {error && <p className="text-red-400 text-center py-10">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(user => (
          <div key={user.id} className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow relative">
            <button
              onClick={() => setDeleteId(user.id)}
              className="absolute bottom-3 right-3 px-3 py-1 bg-red-400 hover:bg-red-500 text-white text-xs rounded-lg transition-colors"
            >
              Delete
            </button>
            <p className="font-semibold text-gray-800">{user.name}</p>
            <p className="text-sm text-gray-400">{user.email}</p>
            <span className="mt-2 inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-50 text-teal-600">
              {user.department}
            </span>
          </div>
        ))}
      </div>

      {/* Delete Modal */}
      {deleteId && (
        <div
          onClick={() => setDeleteId(null)}
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-2xl p-6 w-full max-w-xs shadow-xl text-center"
          >
            <p className="text-lg font-bold text-gray-800 mb-2">Delete User?</p>
            <p className="text-sm text-gray-400 mb-5">This action cannot be undone.</p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 border border-gray-200 text-gray-600 text-sm font-semibold py-2 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => { setUsers(prev => prev.filter(u => u.id !== deleteId)); setDeleteId(null) }}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-2 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Users