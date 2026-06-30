import { createClient } from '@/lib/supabase/server'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Get total themes
  const { count: themesCount } = await supabase
    .from('themes')
    .select('*', { count: 'exact', head: true })

  // Get total invitations
  const { count: invCount } = await supabase
    .from('invitations')
    .select('*', { count: 'exact', head: true })

  // Get latest invitations
  const { data: latestInvs } = await supabase
    .from('invitations')
    .select('*, themes(name)')
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Themes</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{themesCount || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Invitations</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{invCount || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Active Users</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">N/A</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">Recent Invitations</h3>
        </div>
        <div className="p-6">
          {latestInvs?.length ? (
            <div className="space-y-4">
              {latestInvs.map(inv => (
                <div key={inv.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{inv.url_slug}</p>
                    <p className="text-sm text-gray-500">{inv.themes?.name}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    inv.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {inv.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No invitations yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
