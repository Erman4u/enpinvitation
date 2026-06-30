import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminInvitations() {
  const supabase = await createClient()

  const { data: invitations } = await supabase
    .from('invitations')
    .select(`
      id,
      url_slug,
      status,
      created_at,
      user_id,
      themes (name)
    `)
    .order('created_at', { ascending: false })

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800">All Invitations</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
              <th className="px-6 py-3 font-medium">URL Slug</th>
              <th className="px-6 py-3 font-medium">Theme</th>
              <th className="px-6 py-3 font-medium">User ID</th>
              <th className="px-6 py-3 font-medium">Date Created</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {invitations?.map(inv => (
              <tr key={inv.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  <a href={`/invitation/${inv.url_slug}`} target="_blank" className="text-blue-600 hover:underline">
                    {inv.url_slug}
                  </a>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{inv.themes?.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <span className="truncate block max-w-[120px]" title={inv.user_id}>{inv.user_id}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(inv.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    inv.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {inv.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <button className="text-blue-600 hover:text-blue-800 font-medium">Edit Status</button>
                </td>
              </tr>
            ))}
            
            {!invitations?.length && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  Tidak ada data undangan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
