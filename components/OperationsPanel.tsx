'use client'
import { useEffect, useState } from 'react'
import type { SupabaseClient } from '@supabase/supabase-js'
import { Package, Boxes, Tag, ListChecks, History, Plus, Pencil, Check, X, Download, RefreshCw, ArrowLeft } from 'lucide-react'
import { demoOperations, submitDemo, resolveDemo, validateOperation, type OpsKind, type OpsSku, type OpsState } from '@/lib/operations'
import { formatCOP } from '@/lib/data'
import './operations.css'

const tabs = [{ id: 'skus', name: 'Productos y SKUs', Icon: Package }, { id: 'stock', name: 'Inventario', Icon: Boxes }, { id: 'promos', name: 'Promociones', Icon: Tag }, { id: 'requests', name: 'Aprobaciones', Icon: ListChecks }, { id: 'events', name: 'Historial', Icon: History }]
const empty = (): OpsState => ({ skus: [], promotions: [], requests: [], events: [] })
const localTime = (value: unknown) => {
  if (!value) return ''
  const date = new Date(String(value))
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
}
const label = { sku_save: 'Guardar SKU', stock_move: 'Movimiento de inventario', promo_create: 'Crear promocion' }

export default function OperationsPanel({ supabase, email, demo = false }: { supabase?: SupabaseClient; email?: string; demo?: boolean }) {
  const [state, setState] = useState<OpsState>(demo ? demoOperations : empty)
  const [tab, setTab] = useState('skus')
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [busy, setBusy] = useState(false)
  const [form, setForm] = useState<{ kind: OpsKind; payload: Record<string, unknown> } | null>(null)

  async function load() {
    if (!supabase) return
    setBusy(true); setError('')
    const responses = await Promise.all([supabase.from('ops_catalog').select('*').order('sku'), supabase.from('ops_promotions').select('*').order('starts_at'), supabase.from('ops_requests').select('*').order('created_at', { ascending: false }).limit(100), supabase.from('ops_audit').select('*').order('created_at', { ascending: false }).limit(100)])
    const failure = responses.find(r => r.error)
    if (failure?.error) setError(`No se pudo cargar operaciones. Verifica las migraciones 03 y 04 y tus permisos. ${failure.error.message}`)
    else setState({ skus: responses[0].data ?? [], promotions: responses[1].data ?? [], requests: responses[2].data ?? [], events: responses[3].data ?? [] } as OpsState)
    setBusy(false)
  }
  useEffect(() => { if (supabase) void load() }, [supabase]) // eslint-disable-line react-hooks/exhaustive-deps

  function open(kind: OpsKind, sku?: OpsSku) {
    setError(''); setNotice('')
    const payload = kind === 'sku_save' ? sku ? { ...sku } : { id: crypto.randomUUID(), sku: '', name: '', brand: '', category: 'skincare', variant: 'Unidad', cost: 0, price: 0, status: 'draft', version: 0 } : kind === 'stock_move' ? { sku_id: state.skus[0]?.id ?? '', quantity: 1, reason: '', batch_code: '', expires_on: '' } : { sku_id: state.skus[0]?.id ?? '', name: '', percent: 10, starts_at: '', ends_at: '' }
    setForm({ kind, payload })
  }
  async function submit(e: React.FormEvent) {
    e.preventDefault(); if (!form || busy) return
    setError(''); setBusy(true)
    try {
      validateOperation(form.kind, form.payload, state)
      if (demo) setState(submitDemo(state, form.kind, form.payload))
      else { if (!supabase) throw new Error('Sin conexion'); const r = await supabase.rpc('kaya_ops_submit', { p_kind: form.kind, p_payload: form.payload }); if (r.error) throw r.error; await load() }
      setForm(null); setNotice('Solicitud enviada a aprobaciones. No se ha publicado en la tienda.'); setTab('requests')
    } catch (e) { setError(e instanceof Error ? e.message : String((e as { message?: string }).message ?? e)) }
    finally { setBusy(false) }
  }
  async function resolve(id: string, approve: boolean) {
    if (busy || !confirm(approve ? '¿Aprobar y aplicar este cambio en operaciones?' : '¿Rechazar esta solicitud?')) return
    setBusy(true); setError('')
    try {
      if (demo) setState(resolveDemo(state, id, approve))
      else { if (!supabase) throw new Error('Sin conexion'); const r = await supabase.rpc('kaya_ops_resolve', { p_id: id, p_approve: approve }); if (r.error) throw r.error; await load() }
      setNotice(approve ? 'Cambio aplicado en operaciones. Publicacion comercial independiente.' : 'Solicitud rechazada.')
    } catch (e) { setError(e instanceof Error ? e.message : String((e as { message?: string }).message ?? e)) }
    finally { setBusy(false) }
  }
  function download() {
    const escape = (v: unknown) => { let text = String(v ?? ''); if (/^[=+@-]/.test(text)) text = "'" + text; return '"' + text.replaceAll('"', '""') + '"' }
    const cols: (keyof OpsSku)[] = ['sku', 'name', 'brand', 'category', 'variant', 'cost', 'price', 'on_hand', 'status', 'version']
    const text = [cols.join(','), ...state.skus.map(s => cols.map(c => escape(s[c])).join(','))].join('\r\n')
    const url = URL.createObjectURL(new Blob(['\ufeff', text], { type: 'text/csv;charset=utf-8' })); const a = document.createElement('a'); a.href = url; a.download = 'kaya-skus.csv'; a.click(); URL.revokeObjectURL(url)
  }
  const pending = state.requests.filter(r => r.status === 'pending').length
  const filtered = state.skus.filter(s => `${s.sku} ${s.name} ${s.brand}`.toLowerCase().includes(query.toLowerCase()))
  const p = form?.payload ?? {}
  const field = (key: string, value: string) => setForm(f => f ? { ...f, payload: { ...f.payload, [key]: value } } : f)
  return <div className="ops-shell">
    <header className="ops-header"><a href="/" className="ops-brand">Kaya<span> / Operaciones</span></a><span>{demo ? 'DEMOSTRACION · Datos de ejemplo, solo durante esta visita' : email}<button title="Recargar" aria-label="Recargar" onClick={() => demo ? setNotice('Demo en memoria; recargar el navegador restablece los ejemplos.') : void load()}><RefreshCw size={17} /></button></span></header>
    <div className="ops-layout"><aside><p>CATALOGO Y CONTROL</p>{tabs.map(({ id, name, Icon }) => <button key={id} className={tab === id ? 'selected' : ''} onClick={() => { setTab(id); setNotice('') }}><Icon size={17} />{name}{id === 'requests' && pending > 0 && <b>{pending}</b>}</button>)}<a href="/tienda"><ArrowLeft size={15} /> Volver a la tienda</a></aside>
    <main className="ops-main"><div className="ops-title"><div><p>KAYA / CONTROL COMERCIAL</p><h1>{tabs.find(t => t.id === tab)?.name}</h1></div><div className="ops-actions"><button onClick={download} title="Exportar SKUs CSV"><Download size={16} /> Exportar</button>{tab === 'skus' && <button className="primary" onClick={() => open('sku_save')}><Plus size={16} /> Nuevo SKU</button>}{tab === 'stock' && <button className="primary" disabled={!state.skus.length} onClick={() => open('stock_move')}><Plus size={16} /> Movimiento</button>}{tab === 'promos' && <button className="primary" disabled={!state.skus.length} onClick={() => open('promo_create')}><Plus size={16} /> Promocion</button>}</div></div>
      <div className="ops-summary"><span><strong>{state.skus.length}</strong> SKUs</span><span><strong>{state.skus.reduce((n, s) => n + s.on_hand, 0)}</strong> unidades</span><span><strong>{pending}</strong> pendientes</span><span><strong>{state.promotions.length}</strong> promociones registradas</span></div>
      {demo && <p className="ops-note">Entorno aislado de demostracion. Ningun cambio afecta la tienda, Supabase o inventario real.</p>}
      {error && <p role="alert" className="ops-error">{error}</p>}{notice && <p role="status" className="ops-note">{notice}</p>}
      {busy && <p role="status">Procesando...</p>}
      {(tab === 'skus' || tab === 'stock') && <><input className="ops-search" aria-label="Buscar SKU" placeholder="Buscar SKU, producto o marca" value={query} onChange={e => setQuery(e.target.value)} /><div className="ops-table-wrap"><table><thead><tr><th>SKU / Producto</th><th>Variante</th><th>Costo puesto</th><th>Precio COP</th><th>Stock</th><th>Estado</th><th>Accion</th></tr></thead><tbody>{filtered.map(s => <tr key={s.id}><td><strong>{s.sku}</strong><span>{s.name}</span><small>{s.brand}</small></td><td>{s.variant}</td><td>{formatCOP(s.cost)}</td><td>{formatCOP(s.price)}</td><td>{s.on_hand}</td><td><span className="ops-status">{s.status}</span></td><td><button title={`Editar ${s.sku}`} aria-label={`Editar ${s.sku}`} onClick={() => open('sku_save', s)}><Pencil size={16} /></button></td></tr>)}</tbody></table>{!filtered.length && <p className="ops-empty">Sin referencias para mostrar.</p>}</div></>}
      {tab === 'promos' && <><p className="ops-note">Promociones internas; no se aplican todavia al checkout publico. El precio descontado debe superar el costo, antes de comisiones y gastos.</p><div className="ops-table-wrap"><table><thead><tr><th>Promocion</th><th>SKU</th><th>Descuento</th><th>Inicio</th><th>Fin</th></tr></thead><tbody>{state.promotions.map(x => <tr key={x.id}><td>{x.name}</td><td>{state.skus.find(s => s.id === x.sku_id)?.sku}</td><td>{x.percent}%</td><td>{new Date(x.starts_at).toLocaleString('es-CO')}</td><td>{new Date(x.ends_at).toLocaleString('es-CO')}</td></tr>)}</tbody></table>{!state.promotions.length && <p className="ops-empty">No hay promociones registradas.</p>}</div></>}
      {tab === 'requests' && <div className="ops-requests">{state.requests.length ? state.requests.map(r => <article key={r.id}><div><h2>{label[r.kind]}</h2><p>{r.source === 'ai' ? 'Propuesta IA' : 'Registro manual'} · {new Date(r.created_at).toLocaleString('es-CO')} · {r.status}</p><dl>{Object.entries(r.payload).filter(([k]) => !['id', 'product_id'].includes(k)).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{String(v)}</dd></div>)}</dl></div>{r.status === 'pending' && <div className="ops-actions"><button disabled={busy} onClick={() => void resolve(r.id, false)}><X size={16} /> Rechazar</button><button className="primary" disabled={busy} onClick={() => void resolve(r.id, true)}><Check size={16} /> Aprobar</button></div>}</article>) : <p className="ops-empty">No hay solicitudes. Los cambios que registres apareceran aqui antes de aplicarse.</p>}</div>}
      {tab === 'events' && <div className="ops-table-wrap"><table><thead><tr><th>Fecha</th><th>Accion</th><th>Detalle</th></tr></thead><tbody>{state.events.map(x => <tr key={x.id}><td>{new Date(x.created_at).toLocaleString('es-CO')}</td><td>{x.action}</td><td>{x.detail}</td></tr>)}</tbody></table>{!state.events.length && <p className="ops-empty">Sin cambios aplicados.</p>}</div>}
    </main></div>
    {form && <div className="ops-modal-overlay"><section className="ops-modal" role="dialog" aria-modal="true" aria-labelledby="ops-dialog-title"><header><h2 id="ops-dialog-title">{label[form.kind]}</h2><button aria-label="Cerrar formulario" onClick={() => setForm(null)}><X size={20} /></button></header><form onSubmit={submit}>
      {form.kind === 'sku_save' ? <><label>SKU<input required pattern="KAY-[A-Z]{2}-[0-9]{4,8}" value={String(p.sku)} onChange={e => field('sku', e.target.value.toUpperCase())} placeholder="KAY-SK-0001" /></label><label>Producto<input required value={String(p.name)} onChange={e => field('name', e.target.value)} /></label><label>Marca<input required value={String(p.brand)} onChange={e => field('brand', e.target.value)} /></label><label>Categoria<select value={String(p.category)} onChange={e => field('category', e.target.value)}><option value="skincare">Skincare</option><option value="kpop">K-pop</option><option value="kdrama">K-dramas</option></select></label><label>Variante<input required value={String(p.variant)} onChange={e => field('variant', e.target.value)} /></label><div className="ops-form-grid"><label>Costo puesto COP<input required type="number" min="0" step="1" value={Number(p.cost)} onChange={e => field('cost', e.target.value)} /></label><label>Precio COP<input required type="number" min="1" step="1" value={Number(p.price)} onChange={e => field('price', e.target.value)} /></label></div><label>Estado interno<select value={String(p.status)} onChange={e => field('status', e.target.value)}><option value="draft">Borrador</option><option value="active">Aprobado internamente</option><option value="archived">Archivado</option></select></label></> : <><label>SKU<select value={String(p.sku_id)} onChange={e => field('sku_id', e.target.value)}>{state.skus.map(s => <option key={s.id} value={s.id}>{s.sku} / {s.name}</option>)}</select></label>{form.kind === 'stock_move' ? <><label>Cantidad (+ entrada / - salida)<input required type="number" step="1" value={Number(p.quantity)} onChange={e => field('quantity', e.target.value)} /></label><label>Motivo<input required value={String(p.reason)} onChange={e => field('reason', e.target.value)} /></label><label>Lote<input value={String(p.batch_code)} onChange={e => field('batch_code', e.target.value)} /></label><label>Vencimiento<input type="date" value={String(p.expires_on)} onChange={e => field('expires_on', e.target.value)} /></label></> : <><label>Nombre de promocion<input required value={String(p.name)} onChange={e => field('name', e.target.value)} /></label><label>Descuento %<input required type="number" min="1" max="50" step="1" value={Number(p.percent)} onChange={e => field('percent', e.target.value)} /></label><label>Inicio<input required type="datetime-local" value={localTime(p.starts_at)} onChange={e => field('starts_at', e.target.value ? new Date(e.target.value).toISOString() : '')} /></label><label>Fin<input required type="datetime-local" value={localTime(p.ends_at)} onChange={e => field('ends_at', e.target.value ? new Date(e.target.value).toISOString() : '')} /></label></>}</>}
      {error && <p role="alert" className="ops-error">{error}</p>}<footer><button type="button" onClick={() => setForm(null)}>Cancelar</button><button type="submit" className="primary" disabled={busy}>Enviar a aprobacion</button></footer>
    </form></section></div>}
  </div>
}
