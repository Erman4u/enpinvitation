'use client'

import { useEffect, useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function EditorPage({ params }: { params: { id: string } }) {
  const [theme, setTheme] = useState<any>(null)
  const [config, setConfig] = useState<any>(null)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    async function loadData() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/login')
          return
        }

        // Fetch theme
        const { data: themeData } = await supabase
          .from('themes')
          .select('*')
          .eq('id', params.id)
          .single()
          
        if (!themeData) {
          alert('Tema tidak ditemukan')
          return
        }
        setTheme(themeData)

        // Load config from public folder
        const res = await fetch(`/templates/${themeData.folder_name}/config.json`)
        let cfg = null
        if (res.ok) {
          cfg = await res.json()
          setConfig(cfg)
        }

        const initialData: Record<string, any> = {}
        if (cfg) {
          cfg.fields.forEach((f: any) => {
            initialData[f.key] = f.default || ''
          })
        }

        // Try to fetch existing content from DB
        const { data: inv } = await supabase
          .from('invitations')
          .select('id')
          .eq('user_id', user.id)
          .eq('theme_id', params.id)
          .single()

        if (inv) {
          const { data: content } = await supabase
            .from('invitation_contents')
            .select('*')
            .eq('invitation_id', inv.id)
            .single()
            
          if (content) {
            if (content.groom_name) initialData.groom_name = content.groom_name
            if (content.bride_name) initialData.bride_name = content.bride_name
            if (content.event_date) initialData.event_date = content.event_date
            if (content.event_location) initialData.event_location = content.event_location
            if (content.main_photo_url) initialData.hero_photo = content.main_photo_url
            
            if (content.custom_data) {
              Object.keys(content.custom_data).forEach(k => {
                initialData[k] = content.custom_data[k]
              })
            }
          }
        }
        
        setFormData(initialData)
      } catch (err) {
        console.error('Failed to load data', err)
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [params.id, router, supabase])

  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow && config) {
      const updates = config.fields.map((f: any) => ({
        selector: f.selector,
        type: f.type,
        value: formData[f.key]
      }))
      
      iframeRef.current.contentWindow.postMessage({ type: 'update', updates }, '*')
    }
  }, [formData, config])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    if (!e.target.files || e.target.files.length === 0) return
    const file = e.target.files[0]
    
    const body = new FormData()
    body.append('file', file)
    
    setSaving(true)
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body
      })
      const data = await res.json()
      if (res.ok) {
        setFormData(prev => ({ ...prev, [key]: data.url }))
      } else {
        alert('Upload failed: ' + data.error)
      }
    } catch (err) {
      console.error(err)
      alert('Upload failed')
    } finally {
      setSaving(false)
    }
  }

  const saveToDb = async () => {
    setSaving(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Unauthenticated')
      
      // Upsert invitation
      let invId = null;
      const { data: existingInv } = await supabase
        .from('invitations')
        .select('id')
        .eq('user_id', user.id)
        .eq('theme_id', params.id)
        .single()
        
      if (existingInv) {
        invId = existingInv.id
      } else {
        const url_slug = `inv-${user.id.substring(0,6)}-${params.id}`
        const { data: newInv, error: invError } = await supabase
          .from('invitations')
          .insert({ user_id: user.id, theme_id: params.id, url_slug })
          .select()
          .single()
          
        if (invError) throw invError
        invId = newInv.id
      }

      // Map to DB columns
      const customData: Record<string, any> = {}
      const standardKeys = ['groom_name', 'bride_name', 'event_date', 'event_location', 'hero_photo']
      
      Object.keys(formData).forEach(k => {
        if (!standardKeys.includes(k)) {
          customData[k] = formData[k]
        }
      })

      const contentPayload = {
        invitation_id: invId,
        groom_name: formData.groom_name,
        bride_name: formData.bride_name,
        event_date: formData.event_date ? new Date(formData.event_date).toISOString() : null,
        event_location: formData.event_location,
        main_photo_url: formData.hero_photo,
        custom_data: customData,
        updated_at: new Date().toISOString()
      }

      const { error: contentError } = await supabase
        .from('invitation_contents')
        .upsert(contentPayload, { onConflict: 'invitation_id' })
        
      if (contentError) throw contentError
      
      alert('Berhasil disimpan!')
    } catch (err: any) {
      console.error(err)
      alert('Gagal menyimpan: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-10 text-center">Loading...</div>

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar Editor (Kiri) */}
      <div className="w-96 bg-white border-r shadow-sm overflow-y-auto flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Editor Undangan</h2>
          <p className="text-sm text-gray-500">{theme?.name}</p>
        </div>
        
        <div className="p-6 flex-1 space-y-6">
          {config?.fields.map((f: any) => (
            <div key={f.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
              {f.type === 'text' && (
                <input 
                  type="text" 
                  name={f.key}
                  value={formData[f.key] || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              )}
              {f.type === 'image' && (
                <div>
                  {formData[f.key] && (
                    <img src={formData[f.key]} alt={f.label} className="w-full h-40 object-cover rounded-lg mb-2" />
                  )}
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, f.key)}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              )}
            </div>
          ))}
          
          <div className="pt-4">
            <button 
              onClick={saveToDb}
              disabled={saving}
              className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50">
              {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </div>
      </div>

      {/* Live Preview Iframe (Kanan) */}
      <div className="flex-1 bg-gray-200 flex items-center justify-center p-8">
        <div className="w-full max-w-[414px] h-[896px] bg-white rounded-[3rem] shadow-2xl overflow-hidden border-[14px] border-gray-900 relative">
          <iframe 
            ref={iframeRef}
            src={`/templates/${theme?.folder_name}/index.html`}
            className="w-full h-full border-0"
            title="Live Preview"
          />
        </div>
      </div>
    </div>
  )
}
