export type OpsKind = 'sku_save' | 'stock_move' | 'promo_create'
export type OpsSku = { id: string; product_id: string; sku: string; name: string; brand: string; category: string; variant: string; price: number; cost: number; on_hand: number; status: 'draft' | 'active' | 'archived'; version: number }
export type OpsPromotion = { id: string; sku_id: string; name: string; percent: number; starts_at: string; ends_at: string }
export type OpsRequest = { id: string; kind: OpsKind; payload: Record<string, unknown>; status: 'pending' | 'approved' | 'rejected'; created_at: string; source: 'manual' | 'ai' }
export type OpsEvent = { id: string; action: string; created_at: string; detail: string }
export type OpsState = { skus: OpsSku[]; promotions: OpsPromotion[]; requests: OpsRequest[]; events: OpsEvent[] }

export function demoOperations(): OpsState {
  return { skus: [
    { id: 'demo-1', product_id: 'product-1', sku: 'KAY-SK-0001', name: 'Mascarilla hidratante', brand: 'Marca por confirmar', category: 'skincare', variant: 'Unidad', price: 8000, cost: 3500, on_hand: 0, status: 'draft', version: 1 },
    { id: 'demo-2', product_id: 'product-2', sku: 'KAY-KP-0001', name: 'Album oficial', brand: 'Artista por confirmar', category: 'kpop', variant: 'Version estandar', price: 125000, cost: 85000, on_hand: 0, status: 'draft', version: 1 },
  ], promotions: [], requests: [], events: [] }
}

function integer(value: unknown, label: string, minimum = 0): number {
  const n = Number(value)
  if (!Number.isSafeInteger(n) || n < minimum) throw new Error(`${label}: ingresa un entero valido, minimo ${minimum}.`)
  return n
}

export function validateOperation(kind: OpsKind, p: Record<string, unknown>, state: OpsState, now = Date.now()) {
  if (kind === 'sku_save') {
    if (!/^KAY-[A-Z]{2}-[0-9]{4,8}$/.test(String(p.sku))) throw new Error('Formato SKU: KAY-SK-0001, KAY-KP-0001 o equivalente.')
    if (!String(p.name ?? '').trim() || !String(p.brand ?? '').trim() || !String(p.variant ?? '').trim()) throw new Error('Nombre, marca y variante son obligatorios.')
    if (!['skincare', 'kpop', 'kdrama'].includes(String(p.category))) throw new Error('Categoria no valida.')
    integer(p.price, 'Precio', 1); integer(p.cost, 'Costo')
    if (!['draft', 'active', 'archived'].includes(String(p.status))) throw new Error('Estado no valido.')
    const existing = state.skus.find(s => s.id === p.id)
    if (existing && existing.version !== Number(p.version)) throw new Error('El SKU cambio. Recarga antes de guardar.')
    if (state.skus.some(s => s.sku === p.sku && s.id !== p.id)) throw new Error('El SKU ya existe.')
    if (existing && state.promotions.some(x => x.sku_id === existing.id && Date.parse(x.ends_at) > now && Number(p.price) * (1 - x.percent / 100) <= Number(p.cost))) throw new Error('El cambio invalidaria una promocion registrada.')
  } else {
    const sku = state.skus.find(s => s.id === p.sku_id)
    if (!sku) throw new Error('Selecciona un SKU existente.')
    if (kind === 'stock_move') {
      const qty = Number(p.quantity)
      if (!Number.isSafeInteger(qty) || qty === 0) throw new Error('Cantidad: entero distinto de cero; negativo para salida.')
      if (sku.on_hand + qty < 0) throw new Error('La salida supera el inventario disponible.')
      if (!String(p.reason ?? '').trim()) throw new Error('Indica el motivo del movimiento.')
      if (sku.category === 'skincare' && qty > 0 && (!String(p.batch_code ?? '').trim() || !/^\d{4}-\d{2}-\d{2}$/.test(String(p.expires_on ?? '')) || Date.parse(String(p.expires_on) + 'T23:59:59Z') < now)) throw new Error('La entrada de skincare requiere lote y vencimiento futuro.')
    } else if (kind === 'promo_create') {
      const percent = integer(p.percent, 'Descuento', 1)
      if (percent > 50) throw new Error('El limite de descuento del piloto es 50%.')
      if (!String(p.name ?? '').trim()) throw new Error('La promocion requiere nombre.')
      const start = Date.parse(String(p.starts_at)), end = Date.parse(String(p.ends_at))
      if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start || end <= now) throw new Error('Revisa las fechas de la promocion.')
      if (sku.price * (1 - percent / 100) <= sku.cost) throw new Error('El precio descontado debe superar el costo registrado. Aun faltan comisiones y gastos.')
      if (state.promotions.some(x => x.sku_id === sku.id && start < Date.parse(x.ends_at) && end > Date.parse(x.starts_at))) throw new Error('Existe una promocion que se cruza para este SKU.')
    } else throw new Error('Operacion no permitida.')
  }
}

export function submitDemo(state: OpsState, kind: OpsKind, payload: Record<string, unknown>): OpsState {
  validateOperation(kind, payload, state)
  const req: OpsRequest = { id: crypto.randomUUID(), kind, payload: { ...payload }, status: 'pending', created_at: new Date().toISOString(), source: 'manual' }
  return { ...state, requests: [req, ...state.requests] }
}

export function resolveDemo(state: OpsState, id: string, approve: boolean): OpsState {
  const request = state.requests.find(r => r.id === id)
  if (!request || request.status !== 'pending') throw new Error('Solicitud ya resuelta o inexistente.')
  const next: OpsState = { skus: [...state.skus], promotions: [...state.promotions], requests: state.requests.map(r => r.id === id ? { ...r, status: approve ? 'approved' : 'rejected' } : r), events: [...state.events] }
  if (approve) {
    validateOperation(request.kind, request.payload, state)
    const p = request.payload
    if (request.kind === 'sku_save') {
      const old = state.skus.find(s => s.id === p.id)
      const item: OpsSku = { id: String(p.id), product_id: old?.product_id ?? crypto.randomUUID(), sku: String(p.sku), name: String(p.name), brand: String(p.brand), category: String(p.category), variant: String(p.variant), price: Number(p.price), cost: Number(p.cost), on_hand: old?.on_hand ?? 0, version: (old?.version ?? 0) + 1, status: p.status as OpsSku['status'] }
      next.skus = old ? next.skus.map(s => s.id === item.id ? item : s) : [...next.skus, item]
    } else if (request.kind === 'stock_move') {
      next.skus = next.skus.map(s => s.id === p.sku_id ? { ...s, on_hand: s.on_hand + Number(p.quantity), version: s.version + 1 } : s)
    } else {
      next.promotions.push({ id: crypto.randomUUID(), sku_id: String(p.sku_id), name: String(p.name), percent: Number(p.percent), starts_at: String(p.starts_at), ends_at: String(p.ends_at) })
    }
  }
  next.events.unshift({ id: crypto.randomUUID(), action: approve ? 'approved' : 'rejected', created_at: new Date().toISOString(), detail: `${request.kind}: ${String(request.payload.sku ?? request.payload.name ?? request.payload.sku_id)}` })
  return next
}
