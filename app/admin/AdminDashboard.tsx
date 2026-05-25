'use client'
import { useEffect, useState, useCallback } from 'react'
import type { SupabaseClient } from '@supabase/supabase-js'
import { Plus, Pencil, Trash2, LogOut, X, Upload, Package, Search, ExternalLink } from 'lucide-react'
import { CATEGORIES, formatCOP } from '@/lib/data'

type Row = {
  id: string; slug: string; name: string; brand: string; category: string
  price: number; original_price: number | null; description: string | null; full_description: string | null
  badges: string[] | null; badge_color: string | null; rating: number | null; reviews: number | null
  stock: number | null; tags: string[] | null; gradient: string | null; image_url: string | null
  featured: boolean | null; is_new: boolean | null; sort_order: number | null
}

const GRADIENTS = [
  'linear-gradient(135deg, #FFE4F0 0%, #FFCCE4 100%)',
  'linear-gradient(135deg, #F0E4FF 0%, #DEC0FF 100%)',
  'linear-gradient(135deg, #D4F5EE 0%, #A8E6D8 100%)',
  'linear-gradient(135deg, #FFE8CC 0%, #FFD0A0 100%)',
  'linear-gradient(135deg, #E0ECFF 0%, #B4D0FF 100%)',
  'linear-gradient(135deg, #FFF4E0 0%, #FFE5B4 100%)',
]

const BADGE_COLORS = [
  { label: 'Coral', value: '#FF6B9D' }, { label: 'Verde menta', value: '#4ECDC4' },
  { label: 'Naranja', value: '#F39C12' }, { label: 'Morado', value: '#9B59B6' },
  { label: 'Rojo', value: '#E74C3C' }, { label: 'Negro', value: '#1A1A1A' },
]

function slugify(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}
const csvToArr = (s: string) => s.split(',').map(x => x.trim()).filter(Boolean)
const arrToCsv = (a: string[] | null) => (a ?? []).join(', ')

const emptyForm = (): Row & { _badgesCsv: string; _tagsCsv: string } => ({
  id: crypto.randomUUID(), slug: '', name: '', brand: '', category: 'kbeauty',
  price: 0, original_price: null, description: '', full_description: '',
  badges: [], badge_color: '#FF6B9D', rating: 4.8, reviews: 0, stock: 10,
  tags: [], gradient: GRADIENTS[0], image_url: null, featured: false, is_new: true, sort_order: 99,
  _badgesCsv: '', _tagsCsv: '',
})

export default function AdminDashboard({ supabase, email }: { supabase: SupabaseClient; email: string }) {
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState<(Row & { _badgesCsv: string; _tagsCsv: string }) | null>(null)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase.from('catalog_products').select('*').order('sort_order', { ascending: true })
    setRows((data as Row[]) ?? [])
    setLoading(false)
  }, [supabase])

  useEffect(() => { load() }, [load])

  const filtered = rows.filter(r =>
    !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.brand.toLowerCase().includes(search.toLowerCase())
  )

  function openNew() { setEditing(emptyForm()) }
  function openEdit(r: Row) {
    setEditing({ ...r, _badgesCsv: arrToCsv(r.badges), _tagsCsv: arrToCsv(r.tags) })
  }

  async function handleSave() {
    if (!editing) return
    if (!editing.name || !editing.brand || !editing.price) {
      alert('Nombre, marca y precio son obligatorios.')
      return
    }
    setSaving(true)
    const slug = editing.slug || slugify(editing.name)
    const payload = {
      id: editing.id, slug, name: editing.name, brand: editing.brand, category: editing.category,
      price: Number(editing.price), original_price: editing.original_price ? Number(editing.original_price) : null,
      description: editing.description, full_description: editing.full_description,
      badges: csvToArr(editing._badgesCsv), badge_color: editing.badge_color,
      rating: Number(editing.rating), reviews: Number(editing.reviews), stock: Number(editing.stock),
      tags: csvToArr(editing._tagsCsv), gradient: editing.gradient, image_url: editing.image_url,
      featured: editing.featured, is_new: editing.is_new, sort_order: Number(editing.sort_order) || 99,
    }
    const { error } = await supabase.from('catalog_products').upsert(payload)
    setSaving(false)
    if (error) { alert('Error al guardar: ' + error.message); return }
    setEditing(null)
    load()
  }

  async function handleDelete(r: Row) {
    if (!confirm(`¿Eliminar "${r.name}"? Esta acción no se puede deshacer.`)) return
    const { error } = await supabase.from('catalog_products').delete().eq('id', r.id)
    if (error) { alert('Error al eliminar: ' + error.message); return }
    load()
  }

  async function handleUpload(file: File) {
    if (!editing) return
    setUploading(true)
    const ext = file.name.split('.').pop()
    const path = `${editing.id}/${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('product-images').upload(path, file, { upsert: true })
    if (error) { setUploading(false); alert('Error al subir: ' + error.message); return }
    const { data } = supabase.storage.from('product-images').getPublicUrl(path)
    setEditing({ ...editing, image_url: data.publicUrl })
    setUploading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FAF7F2' }}>
      {/* Topbar */}
      <header style={{ background: 'white', borderBottom: '1.5px solid #F0ECE4', padding: '0.9rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: 34, height: 34, background: 'linear-gradient(135deg,#FF6B9D,#E85A8C)', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '12px', color: 'white' }}>SD</div>
          <div>
            <p style={{ fontWeight: 800, fontSize: '15px', color: '#1A1A1A', lineHeight: 1 }}>Panel Seoul Drop</p>
            <p style={{ fontSize: '11px', color: '#999' }}>{email}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <a href="/" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#6B6B6B', textDecoration: 'none', padding: '8px 12px' }}>
            <ExternalLink size={15} /> Ver tienda
          </a>
          <button onClick={() => supabase.auth.signOut()} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#E74C3C', background: '#FDEDEC', border: 'none', borderRadius: '9px', padding: '8px 14px', cursor: 'pointer' }}>
            <LogOut size={15} /> Salir
          </button>
        </div>
      </header>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Header acciones */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#1A1A1A', letterSpacing: '-1px' }}>Productos</h1>
            <p style={{ fontSize: '14px', color: '#888' }}>{rows.length} productos en el catálogo</p>
          </div>
          <button onClick={openNew} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg,#FF6B9D,#E85A8C)', color: 'white', border: 'none', borderRadius: '11px', padding: '12px 20px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 14px rgba(255,107,157,0.3)' }}>
            <Plus size={17} strokeWidth={2.2} /> Nuevo producto
          </button>
        </div>

        {/* Buscador */}
        <div style={{ position: 'relative', marginBottom: '1.5rem', maxWidth: '360px' }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#AAA' }} />
          <input placeholder="Buscar producto o marca..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: '100%', padding: '11px 14px 11px 40px', borderRadius: '11px', border: '1.5px solid #E8E4DC', fontSize: '14px', outline: 'none', background: 'white', color: '#1A1A1A' }} />
        </div>

        {/* Lista */}
        {loading ? (
          <p style={{ color: '#888', padding: '3rem', textAlign: 'center' }}>Cargando productos…</p>
        ) : filtered.length === 0 ? (
          <div style={{ background: 'white', borderRadius: '18px', padding: '3rem', textAlign: 'center', border: '1.5px solid #F0ECE4' }}>
            <Package size={36} color="#CCC" style={{ marginBottom: '1rem' }} />
            <p style={{ fontWeight: 700, color: '#1A1A1A', marginBottom: '4px' }}>Sin productos</p>
            <p style={{ fontSize: '14px', color: '#999' }}>Crea el primero con &ldquo;Nuevo producto&rdquo;.</p>
          </div>
        ) : (
          <div style={{ background: 'white', borderRadius: '18px', border: '1.5px solid #F0ECE4', overflow: 'hidden' }}>
            {filtered.map((r, i) => (
              <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 16px', borderBottom: i < filtered.length - 1 ? '1px solid #F5F2EC' : 'none' }}>
                <div style={{ width: 52, height: 52, borderRadius: '11px', background: r.gradient ?? '#F0ECE4', flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
                  {r.image_url && <img src={r.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '11px', color: '#FF6B9D', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{r.brand}</p>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#1A1A1A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</p>
                  <p style={{ fontSize: '12px', color: '#999' }}>{formatCOP(r.price)} · Stock: {r.stock ?? 0} · {r.category}</p>
                </div>
                <button onClick={() => openEdit(r)} aria-label="Editar" style={iconBtn('#4ECDC4')}><Pencil size={16} /></button>
                <button onClick={() => handleDelete(r)} aria-label="Eliminar" style={iconBtn('#E74C3C')}><Trash2 size={16} /></button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal formulario */}
      {editing && (
        <div onClick={() => !saving && setEditing(null)} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '2rem 1rem', overflowY: 'auto' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: 'white', borderRadius: '22px', maxWidth: '560px', width: '100%', padding: 'clamp(1.5rem,4vw,2rem)', boxShadow: '0 24px 60px rgba(0,0,0,0.25)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '19px', fontWeight: 900, color: '#1A1A1A' }}>{rows.find(r => r.id === editing.id) ? 'Editar producto' : 'Nuevo producto'}</h2>
              <button onClick={() => setEditing(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', display: 'flex' }}><X size={22} /></button>
            </div>

            {/* Imagen */}
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '1.25rem', padding: '1rem', background: '#FAF7F2', borderRadius: '14px' }}>
              <div style={{ width: 72, height: 72, borderRadius: '12px', background: editing.gradient ?? '#eee', overflow: 'hidden', flexShrink: 0 }}>
                {editing.image_url && <img src={editing.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: '#1A1A1A', color: 'white', padding: '9px 14px', borderRadius: '10px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                  <Upload size={14} /> {uploading ? 'Subiendo…' : 'Subir foto'}
                  <input type="file" accept="image/*" hidden onChange={e => e.target.files?.[0] && handleUpload(e.target.files[0])} />
                </label>
                {editing.image_url && (
                  <button onClick={() => setEditing({ ...editing, image_url: null })} style={{ marginLeft: '8px', background: 'none', border: 'none', color: '#E74C3C', fontSize: '12px', cursor: 'pointer', fontWeight: 600 }}>Quitar</button>
                )}
                <p style={{ fontSize: '11px', color: '#999', marginTop: '6px' }}>Si no subes foto, se usa una imagen de estilo de vida.</p>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '0.9rem' }}>
              <Field label="Nombre *"><input style={inp} value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value, slug: editing.slug || slugify(e.target.value) })} /></Field>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }}>
                <Field label="Marca *"><input style={inp} value={editing.brand} onChange={e => setEditing({ ...editing, brand: e.target.value })} /></Field>
                <Field label="Categoría"><select style={inp} value={editing.category} onChange={e => setEditing({ ...editing, category: e.target.value })}>{CATEGORIES.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select></Field>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }}>
                <Field label="Precio (COP) *"><input type="number" style={inp} value={editing.price} onChange={e => setEditing({ ...editing, price: Number(e.target.value) })} /></Field>
                <Field label="Precio tachado (opcional)"><input type="number" style={inp} value={editing.original_price ?? ''} onChange={e => setEditing({ ...editing, original_price: e.target.value ? Number(e.target.value) : null })} /></Field>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.9rem' }}>
                <Field label="Stock"><input type="number" style={inp} value={editing.stock ?? 0} onChange={e => setEditing({ ...editing, stock: Number(e.target.value) })} /></Field>
                <Field label="Rating"><input type="number" step="0.1" style={inp} value={editing.rating ?? 0} onChange={e => setEditing({ ...editing, rating: Number(e.target.value) })} /></Field>
                <Field label="Reseñas"><input type="number" style={inp} value={editing.reviews ?? 0} onChange={e => setEditing({ ...editing, reviews: Number(e.target.value) })} /></Field>
              </div>
              <Field label="Descripción corta"><input style={inp} value={editing.description ?? ''} onChange={e => setEditing({ ...editing, description: e.target.value })} /></Field>
              <Field label="Descripción completa"><textarea style={{ ...inp, minHeight: '80px', resize: 'vertical' }} value={editing.full_description ?? ''} onChange={e => setEditing({ ...editing, full_description: e.target.value })} /></Field>
              <Field label="Etiquetas (separadas por coma)"><input style={inp} value={editing._tagsCsv} onChange={e => setEditing({ ...editing, _tagsCsv: e.target.value })} placeholder="hidratación, viral, anti-edad" /></Field>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }}>
                <Field label="Insignia (ej: Best Seller)"><input style={inp} value={editing._badgesCsv} onChange={e => setEditing({ ...editing, _badgesCsv: e.target.value })} placeholder="Best Seller" /></Field>
                <Field label="Color de insignia"><select style={inp} value={editing.badge_color ?? '#FF6B9D'} onChange={e => setEditing({ ...editing, badge_color: e.target.value })}>{BADGE_COLORS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}</select></Field>
              </div>
              <Field label="Fondo de tarjeta (sin foto)">
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {GRADIENTS.map(g => (
                    <button key={g} onClick={() => setEditing({ ...editing, gradient: g })} style={{ width: 44, height: 32, borderRadius: '8px', background: g, border: editing.gradient === g ? '2.5px solid #1A1A1A' : '1.5px solid #E8E4DC', cursor: 'pointer' }} />
                  ))}
                </div>
              </Field>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <label style={chk}><input type="checkbox" checked={!!editing.featured} onChange={e => setEditing({ ...editing, featured: e.target.checked })} /> Destacado (aparece en inicio)</label>
                <label style={chk}><input type="checkbox" checked={!!editing.is_new} onChange={e => setEditing({ ...editing, is_new: e.target.checked })} /> Nuevo</label>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '1.75rem' }}>
              <button onClick={() => setEditing(null)} style={{ flex: 1, background: '#F5F2EC', color: '#6B6B6B', border: 'none', borderRadius: '12px', padding: '13px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>Cancelar</button>
              <button onClick={handleSave} disabled={saving} style={{ flex: 2, background: saving ? '#ccc' : 'linear-gradient(135deg,#FF6B9D,#E85A8C)', color: 'white', border: 'none', borderRadius: '12px', padding: '13px', fontSize: '14px', fontWeight: 700, cursor: saving ? 'default' : 'pointer' }}>{saving ? 'Guardando…' : 'Guardar producto'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#1A1A1A', marginBottom: '6px' }}>{label}</label>
      {children}
    </div>
  )
}

const inp: React.CSSProperties = {
  width: '100%', padding: '11px 13px', borderRadius: '10px', border: '1.5px solid #E8E4DC',
  fontSize: '14px', outline: 'none', background: 'white', color: '#1A1A1A', fontFamily: 'inherit',
}
const chk: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '7px', fontSize: '13px', color: '#3A3A3A', fontWeight: 500, cursor: 'pointer' }
function iconBtn(color: string): React.CSSProperties {
  return { background: `${color}15`, color, border: 'none', borderRadius: '9px', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }
}
