'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export type Faq = { q: string; a: string }

export default function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={i} style={{ background: 'white', border: '1.5px solid #F0ECE4', borderRadius: '14px', overflow: 'hidden' }}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: '12px', padding: '1.1rem 1.25rem', background: 'none', border: 'none',
                cursor: 'pointer', textAlign: 'left',
              }}
            >
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#1A1A1A' }}>{item.q}</span>
              <ChevronDown size={18} color="#FF6B9D" style={{ flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.25s' }} />
            </button>
            <div style={{ maxHeight: isOpen ? '320px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
              <p style={{ padding: '0 1.25rem 1.25rem', fontSize: '14px', color: '#666', lineHeight: 1.65 }}>
                {item.a}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
