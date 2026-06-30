import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function Home() {
  const supabase = await createClient()
  
  // Fetch themes from Supabase
  const { data: themes, error } = await supabase.from('themes').select('*')

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <section className="bg-white border-b py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Buat Undangan Digital Anda Sendiri
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Pilih dari puluhan desain eksklusif, sesuaikan foto dan teks dalam hitungan menit, lalu bagikan momen bahagia Anda ke semua orang.
        </p>
      </section>

      {/* Katalog Tema */}
      <section className="max-w-6xl mx-auto px-4 mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Pilih Tema Kesukaan Anda
        </h2>
        
        {error && (
          <div className="text-red-500 text-center">Gagal memuat tema: {error.message}</div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {themes?.map((theme) => (
            <div key={theme.id} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center text-gray-500">
                {/* Fallback image if thumbnail_url is not set */}
                {theme.thumbnail_url ? (
                  <img src={theme.thumbnail_url} alt={theme.name} className="object-cover w-full h-full" />
                ) : (
                  <span>Preview {theme.name}</span>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-xl mb-2">{theme.name}</h3>
                <div className="flex space-x-3 mt-4">
                  <a 
                    href={`/templates/${theme.folder_name}/index.html`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 py-2 text-center text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    Preview
                  </a>
                  <Link 
                    href={`/editor/${theme.id}`}
                    className="flex-1 py-2 text-center text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Coba Tema
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
