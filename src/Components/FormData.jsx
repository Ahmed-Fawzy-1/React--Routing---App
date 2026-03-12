import { useState } from 'react'

function FormData() {
  const [form, setForm] = useState({ name: '', email: '', department: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setForm({ name: '', email: '', department: '' })
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 max-w-md">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Add User</h2>

      {submitted && (
        <p className="text-sm text-teal-600 font-medium mb-3">✅ User added successfully!</p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium text-gray-600">Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Ahmed Mohamed"
            required
            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="ahmed@example.com"
            required
            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600">Department</label>
          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            required
            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-400 bg-white"
          >
            <option value="">Select...</option>
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg transition-colors"
        >
          Add User
        </button>
      </form>
    </div>
  )
}

export default FormData