'use client'

import { useEffect, useState, useRef } from 'react'

export default function EditorPage({ params }: { params: { id: string } }) {
  const [theme, setTheme] = useState<any>(null)
  const [formData, setFormData] = useState({
    groom_name: 'John',
    bride_name: 'Jane',
    event_date: '2026-12-31',
    event_location: 'Jakarta, Indonesia',
  })
  
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    // Di aplikasi nyata, fetch dari API/Supabase berdasarkan params.id
    // Untuk dummy, kita asumsikan template-nya adalah Template 1
    setTheme({
      id: params.id,
      name: `Tema ${params.id}`,
      folder_name: `Template ${params.id}`
    })
  }, [params.id])

  // Kirim data ke Iframe setiap kali formData berubah
  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      // Menggunakan postMessage untuk mengirim data ke HTML statis
      iframeRef.current.contentWindow.postMessage(formData, '*')
    }
  }, [formData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (!theme) return <div className="p-10 text-center">Loading...</div>

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar Editor (Kiri) */}
      <div className="w-96 bg-white border-r shadow-sm overflow-y-auto flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Editor Undangan</h2>
          <p className="text-sm text-gray-500">{theme.name}</p>
        </div>
        
        <div className="p-6 flex-1 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Mempelai Pria</label>
            <input 
              type="text" 
              name="groom_name"
              value={formData.groom_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Mempelai Wanita</label>
            <input 
              type="text" 
              name="bride_name"
              value={formData.bride_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Acara</label>
            <input 
              type="date" 
              name="event_date"
              value={formData.event_date}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
            <input 
              type="text" 
              name="event_location"
              value={formData.event_location}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          
          <div className="pt-4">
            <button className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition">
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>

      {/* Live Preview Iframe (Kanan) */}
      <div className="flex-1 bg-gray-200 flex items-center justify-center p-8">
        <div className="w-full max-w-[414px] h-[896px] bg-white rounded-[3rem] shadow-2xl overflow-hidden border-[14px] border-gray-900 relative">
          {/* Iframe untuk merender HTML statis dari folder public */}
          <iframe 
            ref={iframeRef}
            src={`/templates/${theme.folder_name}/index.html`}
            className="w-full h-full border-0"
            title="Live Preview"
          />
        </div>
      </div>
    </div>
  )
}
