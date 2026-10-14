/*
 * This origin used to host the RAVO PWA. Browsers that visited it can still have the old
 * service worker and its precached application shell, even after the server is replaced with
 * the public marketing site. Keep this network-only worker at the old script URL long enough
 * to take control, delete those caches and move every open tab onto the public site.
 *
 * The marketing page unregisters this worker after it loads. It must never cache responses.
 */
self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const cacheNames = await caches.keys()
    await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)))
    await self.clients.claim()

    const windows = await self.clients.matchAll({ type: 'window', includeUncontrolled: true })
    await Promise.all(windows.map(client => {
      const url = new URL(client.url)
      if (url.origin !== self.location.origin) return undefined
      url.pathname = '/'
      url.search = '?ravo-site=1'
      url.hash = ''
      return client.navigate(url.href)
    }))
  })())
})

self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request))
})
