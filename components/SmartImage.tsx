'use client'
import { useState } from 'react'

type Props = {
  src: string
  alt: string
  style?: React.CSSProperties
  fill?: boolean
}

/**
 * Imagen con degradación elegante: si la imagen falla en cargar,
 * se oculta y deja ver el gradiente de fondo del contenedor padre.
 * Nunca muestra el ícono de imagen rota.
 */
export default function SmartImage({ src, alt, style, fill = true }: Props) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (failed) return null

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      onLoad={() => setLoaded(true)}
      style={{
        ...(fill
          ? { position: 'absolute', inset: 0, width: '100%', height: '100%' }
          : { width: '100%', height: '100%' }),
        objectFit: 'cover',
        display: 'block',
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.5s ease',
        ...style,
      }}
    />
  )
}
