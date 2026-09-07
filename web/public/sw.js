/* Encyclobol — service worker: app shell offline + cache de assets.
   Navegações: rede primeiro, cai pro cache (e pro index) se estiver offline.
   Assets do mesmo domínio: cache primeiro. Nada de terceiros (Supabase, fontes). */
const CACHE = 'encyclobol-v2'

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)
  if (url.origin !== self.location.origin) return

  if (req.mode === 'navigate') {
    // `cache: 'no-cache'` revalida o index no servidor em vez de aceitar a
    // cópia do cache HTTP (o Pages manda max-age=600): sem isso, logo após um
    // deploy o index velho apontava pro bundle velho por até 10 minutos.
    event.respondWith(
      fetch(req.url, { cache: 'no-cache', credentials: 'same-origin' })
        .then((res) => {
          const copy = res.clone()
          caches.open(CACHE).then((c) => c.put(req, copy))
          return res
        })
        .catch(() =>
          caches.match(req).then((hit) => hit || caches.match(new URL(self.registration.scope).pathname)),
        ),
    )
    return
  }

  event.respondWith(
    caches.match(req).then(
      (hit) =>
        hit ||
        fetch(req).then((res) => {
          if (res.ok) {
            const copy = res.clone()
            caches.open(CACHE).then((c) => c.put(req, copy))
          }
          return res
        }),
    ),
  )
})
