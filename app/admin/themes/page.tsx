import { createClient } from '@/lib/supabase/server'

export default async function AdminThemes() {
  const supabase = await createClient()

  const { data: themes } = await supabase
    .from('themes')
    .select('*')
    .order('id')

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-semibold text-gray-800">Manage Themes</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
          Add New Theme
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
              <th className="px-6 py-3 font-medium">ID</th>
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Folder</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {themes?.map(theme => (
              <tr key={theme.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{theme.id}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{theme.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{theme.folder_name}</td>
                <td className="px-6 py-4 text-sm">
                  <button className="text-blue-600 hover:text-blue-800 font-medium mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-800 font-medium">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
