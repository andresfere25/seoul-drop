'use client'
import { useState } from 'react'
import { Lock, Mail, LogIn } from 'lucide-react'
import type { SupabaseClient } from '@supabase/supabase-js'

export default function AdminLogin({ supabase }: { supabase: SupabaseClient }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setError('Correo o contraseña incorrectos. Verifica tus datos.')
    }
    // onAuthStateChange en la página padre detecta el login y muestra el panel
  }

  const input: React.CSSProperties = {
    width: '100%', padding: '13px 16px 13px 44px', borderRadius: '12px',
    border: '1.5px solid #E8E4DC', fontSize: '14px', outline: 'none',
    background: '#FAF7F2', color: '#1A1A1A',
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg,#FAF7F2,#F0EBE0)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      <div style={{ background: 'white', borderRadius: '24px', padding: 'clamp(2rem,5vw,2.75rem)', maxWidth: '420px', width: '100%', boxShadow: '0 20px 60px rgba(26,26,26,0.12)' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.75rem' }}>
          <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg,#FF6B9D,#E85A8C)', borderRadius: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '14px', color: 'white' }}>SD</div>
          <div>
            <p style={{ fontWeight: 800, fontSize: '17px', color: '#1A1A1A', lineHeight: 1 }}>Seoul Drop</p>
            <p style={{ fontSize: '12px', color: '#999' }}>Panel de administración</p>
          </div>
        </div>

        <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#1A1A1A', letterSpacing: '-0.5px', marginBottom: '6px' }}>Inicia sesión</h1>
        <p style={{ fontSize: '14px', color: '#888', marginBottom: '1.75rem' }}>Acceso solo para el equipo de Seoul Drop.</p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <Mail size={17} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#AAA' }} />
            <input type="email" required placeholder="tu@correo.com" value={email} onChange={e => setEmail(e.target.value)} style={input} />
          </div>
          <div style={{ position: 'relative' }}>
            <Lock size={17} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#AAA' }} />
            <input type="password" required placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} style={input} />
          </div>

          {error && (
            <p style={{ fontSize: '13px', color: '#E74C3C', background: '#FDEDEC', padding: '10px 14px', borderRadius: '10px' }}>{error}</p>
          )}

          <button type="submit" disabled={loading} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            background: loading ? '#ccc' : 'linear-gradient(135deg,#FF6B9D,#E85A8C)', color: 'white', border: 'none',
            padding: '14px', borderRadius: '12px', fontSize: '15px', fontWeight: 700,
            cursor: loading ? 'default' : 'pointer', boxShadow: '0 4px 16px rgba(255,107,157,0.3)',
          }}>
            <LogIn size={17} strokeWidth={2} />
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>

        <p style={{ fontSize: '12px', color: '#AAA', textAlign: 'center', marginTop: '1.5rem', lineHeight: 1.5 }}>
          ¿No tienes cuenta? Crea un usuario en Supabase → Authentication → Users.
        </p>
      </div>
    </div>
  )
}
