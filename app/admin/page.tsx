'use client'
import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

type State = 'loading' | 'in' | 'out' | 'unconfigured'

export default function AdminPage() {
  const configured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  const supabase = useMemo(() => (configured ? createClient() : null), [configured])
  const [state, setState] = useState<State>(configured ? 'loading' : 'unconfigured')
  const [email, setEmail] = useState<string>('')

  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => {
      setState(data.session ? 'in' : 'out')
      setEmail(data.session?.user.email ?? '')
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setState(session ? 'in' : 'out')
      setEmail(session?.user.email ?? '')
    })
    return () => sub.subscription.unsubscribe()
  }, [supabase])

  const wrap: React.CSSProperties = {
    minHeight: '100vh', background: '#FAF7F2',
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem',
  }

  if (state === 'unconfigured') {
    return (
      <div style={wrap}>
        <div style={{ background: 'white', borderRadius: '20px', padding: '2.5rem', maxWidth: '440px', textAlign: 'center', border: '1.5px solid #F0ECE4' }}>
          <p style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔧</p>
          <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#1A1A1A', marginBottom: '10px' }}>Supabase no configurado</h1>
          <p style={{ fontSize: '14px', color: '#777', lineHeight: 1.6 }}>
            Faltan las variables de entorno. En local revisa <code>.env.local</code>; en producción agrégalas en Vercel → Settings → Environment Variables.
          </p>
        </div>
      </div>
    )
  }

  if (state === 'loading') {
    return <div style={wrap}><p style={{ color: '#888', fontSize: '15px' }}>Cargando panel…</p></div>
  }

  if (state === 'out' || !supabase) {
    return <AdminLogin supabase={supabase!} />
  }

  return <AdminDashboard supabase={supabase} email={email} />
}
