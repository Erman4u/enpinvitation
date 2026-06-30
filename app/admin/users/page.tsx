export default async function AdminUsers() {
  // Dalam aplikasi nyata, Anda mungkin perlu memanggil API Supabase Auth Admin
  // (mewajibkan Service Role Key) untuk mendapatkan daftar semua user, atau
  // dari tabel public.users jika Anda punya mekanisme sinkronisasi auth.users.
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-8 text-center">
      <h2 className="text-xl font-medium text-gray-800 mb-2">Users Management</h2>
      <p className="text-gray-500">
        Untuk mengelola pengguna secara penuh (termasuk melihat daftar email), 
        sistem ini perlu dihubungkan dengan endpoint Supabase Auth Admin menggunakan Service Role Key.
      </p>
      <div className="mt-6 p-4 bg-yellow-50 text-yellow-800 rounded-lg text-sm max-w-lg mx-auto">
        <strong>Catatan:</strong> Saat ini Supabase client yang berjalan di server (SSR) hanya dapat 
        membaca data tabel biasa, bukan tabel bawaan <code>auth.users</code> kecuali ada izin khusus 
        atau fungsi database khusus.
      </div>
    </div>
  )
}
