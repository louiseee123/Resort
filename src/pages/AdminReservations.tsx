import { useEffect, useMemo, useState } from 'react'

type Reservation = {
  id: string
  roomName: string
  checkIn: string
  checkOut: string
  guests: number
  name: string
  email: string
  phone: string
  requests: string
  createdAt: string
}

type StoredReservation = Omit<Reservation, 'id'> & { id?: string }

const STORAGE_KEY = 'balamban_reservations'
const ADMIN_BYPASS = 'admin'

function readReservations(): Reservation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as StoredReservation[]
    if (!Array.isArray(parsed)) return []
    return parsed
      .map((r, idx) => ({
        id: r.id ?? String(idx + 1),
        roomName: String(r.roomName ?? ''),
        checkIn: String(r.checkIn ?? ''),
        checkOut: String(r.checkOut ?? ''),
        guests: Number(r.guests ?? 0),
        name: String(r.name ?? ''),
        email: String(r.email ?? ''),
        phone: String(r.phone ?? ''),
        requests: String(r.requests ?? ''),
        createdAt: String(r.createdAt ?? new Date().toISOString()),
      }))
      .filter((r) => r.roomName && r.name && r.email)
  } catch {
    return []
  }
}

function formatDate(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString()
}

function formatShortDate(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString()
}

function getAuthGate(): string {
  // Intentionally simple: “secret URL + UI auth” as per user request.
  // Expected URL form: /admin?key=admin123
  const params = new URLSearchParams(window.location.search)
  return params.get('key') ?? ''
}

export default function AdminReservations() {
  const initialAuth = useMemo(() => {
    return (
      window.sessionStorage.getItem('admin_reservations_auth') === '1' || getAuthGate() === ADMIN_BYPASS
    )
  }, [])

  const [auth, setAuth] = useState<boolean>(initialAuth)
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    return initialAuth ? readReservations() : []
  })
  const [query, setQuery] = useState('')
  const [roomFilter, setRoomFilter] = useState<string>('')

  useEffect(() => {
    if (!auth) return
    const onStorage = () => {
      // eslint react-hooks/exhaustive-deps doesn't apply here; we only need to refresh
      // when the underlying reservations change.
      setReservations(readReservations())
    }

    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [auth])

  const rooms = useMemo(() => {
    const set = new Set<string>()
    for (const r of reservations) set.add(r.roomName)
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [reservations])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return reservations
      .filter((r) => (roomFilter ? r.roomName === roomFilter : true))
      .filter((r) => {
        if (!q) return true
        const blob = [
          r.roomName,
          r.name,
          r.email,
          r.phone,
          r.checkIn,
          r.checkOut,
          r.requests,
          r.guests,
        ]
          .join(' ')
          .toLowerCase()
        return blob.includes(q)
      })
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  }, [reservations, query, roomFilter])

  const coral = '#FF8360'
  const deepTeal = '#006D77'
  const sand = '#FDFCDC'

  if (!auth) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: sand,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '520px',
            border: `2px solid ${deepTeal}`,
            borderRadius: 20,
            background: '#FFFDF7',
            padding: '2rem',
            boxShadow: '0 18px 60px rgba(0,0,0,0.08)',
          }}
        >
          <h1 style={{ margin: 0, fontSize: '1.6rem', color: deepTeal }}>Admin - Reservations</h1>
          <p style={{ marginTop: '0.75rem', color: '#5E5B52' }}>
            Admin access is restricted. Use the secret URL query key.
          </p>

          <div
            style={{
              marginTop: '1.25rem',
              padding: '1rem 1.1rem',
              borderRadius: 14,
              background: '#FDFCDC',
              border: '1px solid rgba(0,109,119,0.2)',
              color: '#5E5B52',
              lineHeight: 1.6,
              fontSize: '0.95rem',
            }}
          >
            Example: <b>{window.location.origin}{window.location.pathname}?key=admin</b>
          </div>

          <button
            style={{
              marginTop: '1.5rem',
              width: '100%',
              padding: '0.95rem',
              borderRadius: 999,
              background: coral,
              border: 'none',
              color: '#FFFDF7',
              fontWeight: 600,
              cursor: 'pointer',
            }}
            onClick={() => {
              const ok = getAuthGate() === ADMIN_BYPASS
              if (ok) {
                window.sessionStorage.setItem('admin_reservations_auth', '1')
                setAuth(true)
                setReservations(readReservations())
              }
            }}
          >
            Access
          </button>

          <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'rgba(94,91,82,0.9)' }}>
            Notes: this is intentionally “admin-only by secrecy” (not secure authentication).
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: sand }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: 'rgba(253,252,220,0.92)',
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid rgba(0,109,119,0.15)`,
          padding: '1.25rem 1rem',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ margin: 0, color: deepTeal }}>Admin - Reservations</h1>
            <div style={{ marginTop: '0.3rem', fontSize: '0.9rem', color: '#5E5B52' }}>
              {reservations.length} total
            </div>
          </div>
          <button
            style={{
              padding: '0.7rem 1rem',
              borderRadius: 999,
              background: 'transparent',
              border: `2px solid ${coral}`,
              color: coral,
              fontWeight: 700,
              cursor: 'pointer',
            }}
            onClick={() => {
              window.sessionStorage.removeItem('admin_reservations_auth')
              setAuth(false)
            }}
          >
            Logout
          </button>
        </div>

        <div style={{ maxWidth: 1100, margin: '1rem auto 0', display: 'grid', gridTemplateColumns: '1fr 220px', gap: '0.9rem' }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, phone, room, dates, requests..."
            style={{
              width: '100%',
              padding: '0.95rem 1rem',
              borderRadius: 14,
              border: '1px solid rgba(0,109,119,0.25)',
              background: '#FFFDF7',
              outline: 'none',
              color: '#5E5B52',
              fontFamily: 'Inter, sans-serif',
            }}
          />
          <select
            value={roomFilter}
            onChange={(e) => setRoomFilter(e.target.value)}
            style={{
              width: '100%',
              padding: '0.95rem 1rem',
              borderRadius: 14,
              border: '1px solid rgba(0,109,119,0.25)',
              background: '#FFFDF7',
              outline: 'none',
              color: '#5E5B52',
              fontFamily: 'Inter, sans-serif',
              appearance: 'none',
            }}
          >
            <option value="">All rooms</option>
            {rooms.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div style={{ maxWidth: 1100, margin: '0 auto', marginTop: '0.75rem', color: '#5E5B52', fontSize: '0.9rem' }}>
          Showing <b>{filtered.length}</b>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '1.25rem 1rem 3rem' }}>
        {filtered.length === 0 ? (
          <div
            style={{
              border: `2px dashed rgba(0,109,119,0.25)`,
              borderRadius: 18,
              background: '#FFFDF7',
              padding: '2rem',
              color: '#5E5B52',
            }}
          >
            No reservations found.
          </div>
        ) : (
          <div
            style={{
              border: `2px solid rgba(0,109,119,0.2)`,
              borderRadius: 18,
              background: '#FFFDF7',
              overflow: 'hidden',
            }}
          >
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 860 }}>
                <thead>
                  <tr style={{ background: '#006D77', color: '#FFFDF7' }}>
                    {['Created', 'Room', 'Guest', 'Check-in', 'Check-out', 'Guests', 'Contact', 'Requests'].map((h) => (
                      <th
                        key={h}
                        style={{
                          textAlign: 'left',
                          padding: '0.95rem 0.9rem',
                          fontSize: '0.85rem',
                          fontWeight: 800,
                          letterSpacing: '0.02em',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.id} style={{ borderTop: '1px solid rgba(0,109,119,0.12)' }}>
                      <td style={{ padding: '0.85rem 0.9rem', fontSize: '0.9rem', whiteSpace: 'nowrap', color: '#5E5B52' }}>
                        {formatDate(r.createdAt)}
                      </td>
                      <td style={{ padding: '0.85rem 0.9rem', fontWeight: 700, color: deepTeal, whiteSpace: 'nowrap' }}>
                        {r.roomName}
                      </td>
                      <td style={{ padding: '0.85rem 0.9rem' }}>
                        <div style={{ fontWeight: 800, color: '#5E5B52' }}>{r.name}</div>
                      </td>
                      <td style={{ padding: '0.85rem 0.9rem', whiteSpace: 'nowrap' }}>{formatShortDate(r.checkIn)}</td>
                      <td style={{ padding: '0.85rem 0.9rem', whiteSpace: 'nowrap' }}>{formatShortDate(r.checkOut)}</td>
                      <td style={{ padding: '0.85rem 0.9rem', whiteSpace: 'nowrap' }}>{r.guests}</td>
                      <td style={{ padding: '0.85rem 0.9rem' }}>
                        <div style={{ fontSize: '0.9rem', color: '#5E5B52' }}>{r.email}</div>
                        <div style={{ fontSize: '0.85rem', color: 'rgba(94,91,82,0.9)' }}>{r.phone}</div>
                      </td>
                      <td style={{ padding: '0.85rem 0.9rem', maxWidth: 260 }}>
                        <div style={{ fontSize: '0.9rem', color: '#5E5B52', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={r.requests || ''}>
                          {r.requests || '—'}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

