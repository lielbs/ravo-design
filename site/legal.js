async function retirePreviousSiteWorker() {
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations()
    await Promise.all(registrations.map(registration => registration.unregister()))
  }
  if ('caches' in window) {
    const cacheNames = await caches.keys()
    await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)))
  }
}
void retirePreviousSiteWorker()

/*
 * The public legal pages. Their wording lives in legal/content.json — the same file the app reads —
 * so the site and the app can never say different things (docs/LEGAL_AUDIT_2026-10.md). RAVO is
 * marketed free: there is no subscription or payment page.
 */
const MAIL = '<a href="mailto:support@ravoapp.app">support@ravoapp.app</a>'
const LINKS = { privacy: '../privacy/', terms: '../terms/', support: '../support/', delete: '../support/#delete-account' }
const resolve = html => html
  .replace(/\{\{mail\}\}/g, MAIL)
  .replace(/\{\{(privacy|terms|support|delete)\}\}/g, (_, key) => LINKS[key])

/*
 * Every visible string on these pages is set from here, in both languages: the chrome as well as
 * the body. A legal page that keeps its navigation in English while the policy is in Hebrew is a
 * page that was translated halfway, and half a translation reads as carelessness on exactly the
 * pages where carelessness costs the most.
 */
const CHROME = {
  he: {
    back: 'חזרה לאתר',
    updated: 'עודכן:',
    tagline: 'סדר בבית ובעסק',
    skip: 'דילוג לתוכן',
    switchLabel: 'Switch to English',
    nav: 'מידע משפטי',
    failed: 'לא הצלחנו לטעון את המסמך. רעננו את העמוד, או כתבו אל'
  },
  en: {
    back: 'Back to website',
    updated: 'Updated:',
    tagline: 'Home and Business, in sync',
    skip: 'Skip to content',
    switchLabel: 'החלפה לעברית',
    nav: 'Legal information',
    failed: 'The document could not be loaded. Refresh the page, or email'
  }
}

const ORDER = ['support', 'privacy', 'terms', 'accessibility']
const SHORT = {
  support: { he: 'תמיכה', en: 'Support' },
  privacy: { he: 'פרטיות', en: 'Privacy' },
  terms: { he: 'תנאי שימוש', en: 'Terms' },
  accessibility: { he: 'נגישות', en: 'Accessibility' }
}

const key = document.body.dataset.page
const switcher = document.querySelector('[data-lang-switch]')
let content = null

function render(language) {
  const chrome = CHROME[language]
  const page = content?.pages?.[key]?.[language]
  document.documentElement.lang = language
  document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr'
  if (page) {
    document.title = `${page.title} — RAVO`
    document.querySelector('h1').textContent = page.title
    document.querySelector('.legal-content').innerHTML = resolve(page.html)
    document.querySelector('[data-updated]').textContent = `${chrome.updated} ${content.updated[language]}`
  } else if (content === false) {
    document.querySelector('.legal-content').innerHTML = `<p>${chrome.failed} ${MAIL}.</p>`
  }
  document.querySelector('[data-back]').textContent = chrome.back
  document.querySelector('[data-tagline]').textContent = chrome.tagline
  document.querySelector('[data-skip]').textContent = chrome.skip

  const nav = document.querySelector('[data-legal-nav]')
  nav.setAttribute('aria-label', chrome.nav)
  // The page you are on is not a link to itself.
  nav.innerHTML = ORDER.filter(slug => slug !== key)
    .map(slug => `<a href="../${slug}/">${SHORT[slug][language]}</a>`).join('')

  switcher.textContent = language === 'he' ? 'EN' : 'עברית'
  switcher.setAttribute('aria-label', chrome.switchLabel)
  try { localStorage.setItem('ravo-marketing-language', language) } catch { /* private mode */ }
  /* A link to #delete-account lands on that question once the page has been written. */
  if (page && location.hash) document.querySelector(location.hash)?.scrollIntoView()
}

let saved = 'he'
try { saved = localStorage.getItem('ravo-marketing-language') === 'en' ? 'en' : 'he' } catch { /* private mode */ }
render(saved)
fetch('../legal/content.json', { cache: 'no-cache' })
  .then(response => (response.ok ? response.json() : Promise.reject(new Error(String(response.status)))))
  .then(json => { content = json })
  .catch(() => { content = false })
  .finally(() => render(document.documentElement.lang === 'en' ? 'en' : 'he'))
switcher.addEventListener('click', () => render(document.documentElement.lang === 'he' ? 'en' : 'he'))
