/*
 * RAVO — public website.
 *
 * No framework and no network calls. The Quick Add box runs the app's own reader in the browser
 * and nothing typed into it leaves the device. Motion is driven by class changes so the CSS owns
 * the timing; the only per-frame work is the hero's parallax, which runs while the hero is on
 * screen and never under prefers-reduced-motion.
 */

const root = document.documentElement
root.classList.add('js')
const COPY = window.RAVO_COPY ?? { en: {}, scenes: {} }
const SCENES = COPY.scenes ?? {}
const reduced = matchMedia('(prefers-reduced-motion: reduce)')
const still = () => reduced.matches
const $ = (selector, scope = document) => scope.querySelector(selector)
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)]
const el = (tag, className, text) => {
  const node = document.createElement(tag)
  if (className) node.className = className
  if (text !== undefined) node.textContent = text
  return node
}

/* ── retire the former app deployment ──────────────────────────────────────────────────────────
   ravoapp.app once served the installable pilot PWA. A visitor who installed it still has that
   service worker and its caches, which would otherwise keep serving the old application shell over
   this page for ever. Unregister on first paint. */
async function retirePreviousSiteWorker() {
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations()
    await Promise.all(registrations
      .filter(registration => new URL(registration.scope).origin === location.origin)
      .map(registration => registration.unregister()))
  }
  if ('caches' in window) {
    const cacheNames = await caches.keys()
    await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)))
  }
  const url = new URL(location.href)
  if (url.searchParams.delete('ravo-site')) history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`)
}
void retirePreviousSiteWorker().catch(() => {})

/* ── language ──────────────────────────────────────────────────────────────────────────────── */

const LANGUAGE_KEY = 'ravo-marketing-language'
let language = (() => { try { return localStorage.getItem(LANGUAGE_KEY) === 'en' ? 'en' : 'he' } catch { return 'he' } })()
const hebrew = {}, hebrewAria = {}, hebrewAlt = {}
for (const node of $$('[data-i18n]')) hebrew[node.dataset.i18n] = node.innerHTML
for (const node of $$('[data-i18n-aria]')) hebrewAria[node.dataset.i18nAria] = node.getAttribute('aria-label')
for (const node of $$('[data-i18n-alt]')) hebrewAlt[node.dataset.i18nAlt] = node.getAttribute('alt')
const pick = value => value?.[language] ?? value?.he ?? ''
const painters = []

/* A screenshot is a <picture>: the dark capture for a dark page, the light one otherwise, and both
   in the reader's language — an English sentence beside a Hebrew screen promises something the
   picture does not show. */
function paintShot(picture, shot = picture.dataset.shot) {
  picture.dataset.shot = shot
  const source = $('source', picture), image = $('img', picture)
  if (source) source.srcset = `assets/screens/${language}/${shot}.webp`
  if (image) image.src = `assets/screens/${language}/light/${shot}.webp`
}

function applyLanguage(next) {
  language = next
  const english = next === 'en'
  root.lang = english ? 'en' : 'he'
  root.dir = english ? 'ltr' : 'rtl'
  for (const node of $$('[data-i18n]')) {
    const value = english ? COPY.en?.[node.dataset.i18n] : hebrew[node.dataset.i18n]
    if (value !== undefined) node.innerHTML = value
  }
  for (const node of $$('[data-i18n-aria]')) {
    const value = english ? COPY.en?.[node.dataset.i18nAria] : hebrewAria[node.dataset.i18nAria]
    if (value) node.setAttribute('aria-label', value)
  }
  for (const node of $$('[data-i18n-alt]')) {
    const value = english ? COPY.en?.[node.dataset.i18nAlt] : hebrewAlt[node.dataset.i18nAlt]
    if (value) node.setAttribute('alt', value)
  }
  for (const picture of $$('picture[data-shot]')) paintShot(picture)
  const toggle = $('[data-lang-switch]')
  toggle.textContent = english ? 'עברית' : 'EN'
  toggle.setAttribute('aria-label', english ? 'החלפה לעברית' : 'Switch to English')
  $('[data-menu-toggle]').setAttribute('aria-label', english ? 'Menu' : 'תפריט')
  for (const paint of painters) paint()
  try { localStorage.setItem(LANGUAGE_KEY, next) } catch { /* private mode: the choice lasts this visit */ }
}
$('[data-lang-switch]').addEventListener('click', () => applyLanguage(language === 'he' ? 'en' : 'he'))

/* ── chrome: menu, reveal, download bar ────────────────────────────────────────────────────── */

const menuToggle = $('[data-menu-toggle]')
const nav = $('#site-nav')
const setMenu = open => { nav.classList.toggle('open', open); menuToggle.setAttribute('aria-expanded', String(open)) }
menuToggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')))
nav.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false) })
document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false) })
document.addEventListener('click', event => { if (nav.classList.contains('open') && !event.target.closest('.site-header')) setMenu(false) })

const revealWatch = new IntersectionObserver(entries => {
  for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('visible'); revealWatch.unobserve(entry.target) }
}, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
$$('.reveal').forEach(node => revealWatch.observe(node))

const sticky = $('[data-sticky-cta]')
let heroGone = false, finaleHere = false
const paintSticky = () => sticky.classList.toggle('show', heroGone && !finaleHere)
new IntersectionObserver(([entry]) => { heroGone = !entry.isIntersecting; paintSticky() }).observe($('.hero .cta-row'))
new IntersectionObserver(([entry]) => { finaleHere = entry.isIntersecting; paintSticky() }).observe($('.finale'))

$('[data-year]').textContent = String(new Date().getFullYear())

/* ── the hero: the sky at the visitor's own hour ───────────────────────────────────────────── */

/* The app's own dayparts (src/components/art/DaySky.tsx), so the site and Today agree on what
   time of day it is. */
const daypartOf = hour => hour >= 5 && hour < 10 ? 'dawn' : hour >= 10 && hour < 17 ? 'day' : hour >= 17 && hour < 20 ? 'dusk' : 'night'
const arcOf = (date, part) => {
  const h = date.getHours() + date.getMinutes() / 60
  const span = { dawn: [5, 10], day: [10, 17], dusk: [17, 20], night: [20, 29] }[part]
  const at = part === 'night' && h < 5 ? h + 24 : h
  return Math.min(1, Math.max(0, (at - span[0]) / (span[1] - span[0])))
}
const hero = $('[data-hero]')
const sceneSvg = $('[data-scene-svg]')
const body = $('[data-body]')
const narrow = matchMedia('(max-width: 860px)')
const forcedPart = new URLSearchParams(location.search).get('sky')
function paintSky() {
  const now = new Date()
  const part = ['dawn', 'day', 'dusk', 'night'].includes(forcedPart) ? forcedPart : daypartOf(now.getHours())
  hero.dataset.part = part
  /* The sun or moon crosses the open sky beside the words, rising and setting with the hour. */
  const arc = arcOf(now, part)
  let x = 380 + arc * 520, y = 250 - Math.sin(arc * Math.PI) * 110
  if (root.dir === 'ltr') x = 1440 - x
  /* On a phone the picture is cropped (the viewBox below) and the sun sits low beside the phone,
     clear of the headline and the buttons. */
  if (narrow.matches) { x = 440; y = 560 - Math.sin(arc * Math.PI) * 50 }
  body.setAttribute('transform', `translate(${x.toFixed(0)} ${y.toFixed(0)})`)
  sceneSvg.setAttribute('viewBox', narrow.matches ? '370 -300 494 1100' : '0 0 1440 800')
}
paintSky()
painters.push(paintSky)
narrow.addEventListener('change', paintSky)
setInterval(paintSky, 10 * 60 * 1000)
requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('is-in')))

/* Depth: the layers of the scene move at different speeds as the page scrolls past the hero. */
const layers = $$('.parallax', hero)
let heroOn = true, ticking = false
new IntersectionObserver(([entry]) => { heroOn = entry.isIntersecting }).observe(hero)
function parallax() {
  ticking = false
  if (!heroOn || still()) return
  const y = scrollY
  for (const layer of layers) layer.style.transform = `translate3d(0, ${(y * Number(layer.dataset.depth)).toFixed(1)}px, 0)`
}
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(parallax) } }, { passive: true })

/* The phone turns a little towards the pointer — on a mouse only, and never under reduced motion. */
const tilt = $('[data-tilt]')
if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
  hero.addEventListener('pointermove', event => {
    if (still()) return
    const box = hero.getBoundingClientRect()
    const dx = (event.clientX - box.left) / box.width - .5, dy = (event.clientY - box.top) / box.height - .5
    tilt.style.transform = `perspective(1400px) rotateY(${(dx * 8).toFixed(2)}deg) rotateX(${(-dy * 6).toFixed(2)}deg)`
  })
  hero.addEventListener('pointerleave', () => { tilt.style.transform = '' })
}

/* ── the story: one phone, four chapters ───────────────────────────────────────────────────── */

const story = $('[data-story]')
const stage = $('.story__stage', story)
const chapters = $$('.chapter', story)
const setChapter = chapter => {
  const id = chapter.dataset.chapter
  for (const picture of $$('.phone--story picture', story)) picture.classList.toggle('is-on', picture.dataset.for === id)
  stage.style.setProperty('--stage-tone', getComputedStyle(chapter).getPropertyValue('--tone'))
}
/* The chapter crossing the middle of the screen is the one the phone shows. */
const current = new IntersectionObserver(entries => {
  for (const entry of entries) if (entry.isIntersecting) setChapter(entry.target)
}, { rootMargin: '-45% 0px -45% 0px' })
/* Each chapter's small demonstration plays once, when the chapter is properly in view. */
const arrive = new IntersectionObserver(entries => {
  for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('is-in'); arrive.unobserve(entry.target) }
}, { threshold: 0.3 })
for (const chapter of chapters) { current.observe(chapter); arrive.observe(chapter) }

/* ── Quick Add: the app's own reader, in the browser ───────────────────────────────────────── */

const tryBox = $('[data-try]')
const tryInput = $('[data-try-input]')
const tryResult = $('[data-try-result]')
const tryExamples = $('[data-try-examples]')
const trySeg = $('.seg', tryBox)
let trySpace = 'home'
let reader = null
const labels = () => SCENES.labels ?? {}
const formatDay = iso => new Intl.DateTimeFormat(language === 'en' ? 'en-GB' : 'he-IL', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date(`${iso}T12:00:00`))
function renderReading() {
  const text = tryInput.value.trim()
  tryResult.replaceChildren()
  for (const button of $$('button', tryExamples)) button.setAttribute('aria-pressed', String(button.textContent === tryInput.value))
  if (!text) { tryResult.append(el('p', 'try-empty', pick(labels().empty))); return }
  if (!reader) return
  const reading = reader.parseCapture(text, trySpace)
  const kinds = SCENES.kinds ?? {}
  const L = labels()
  const sure = reading.kind !== 'unknown' && reading.confidence >= (reader.CONFIRM_THRESHOLD ?? 0.7)
  const card = el('div', 'try-card')
  const head = el('div', 'try-card__head')
  if (sure) { const kind = el('span', 'try-kind', pick(kinds[reading.kind])); kind.dataset.kind = reading.kind; head.append(kind) }
  head.append(el('span', '', pick(L.read)))
  card.append(head, el('h3', '', reading.fields.title || text))
  const facts = el('ul', 'try-chips')
  const add = (label, value) => {
    const item = el('li'); item.style.setProperty('--i', facts.children.length)
    item.append(el('b', '', label), document.createTextNode(value)); facts.append(item)
  }
  const f = reading.fields
  if (f.date) add(pick(L.when), formatDay(f.date))
  if (f.time) add(pick(L.time), f.endTime ? `${f.time}–${f.endTime}` : f.time)
  if (f.amount) add(pick(L.amount), `₪${f.amount.toLocaleString(language === 'en' ? 'en-GB' : 'he-IL')}`)
  if (f.items?.length > 1) add(pick(L.items), f.items.join(' · '))
  if (f.quantity) add(pick(L.qty), String(f.quantity))
  if (f.assigneeText) add(pick(L.owner), f.assigneeText)
  if (f.recurrence && L.repeat?.[f.recurrence]) add(pick(L.repeats), pick(L.repeat[f.recurrence]))
  if (f.urgent) add('!', pick(L.urgent))
  if (facts.children.length) card.append(facts)
  if (sure) card.append(el('p', 'try-confirm', pick(L.confirm)))
  else {
    card.append(el('p', 'try-confirm', pick(L.unsure)))
    const options = el('ul', 'try-options')
    const choices = [...new Set([reading.kind, ...reading.alternatives].filter(kind => kind && kind !== 'unknown'))]
    const fallback = trySpace === 'office' ? ['task', 'procurement', 'maintenance'] : ['task', 'shopping', 'calendar_event']
    for (const kind of choices.length ? choices : fallback) options.append(el('li', '', pick(kinds[kind])))
    card.append(options)
  }
  tryResult.append(card)
}
function paintExamples() {
  tryExamples.replaceChildren()
  for (const example of SCENES.examples?.[trySpace] ?? []) {
    const button = el('button', '', example)
    button.type = 'button'
    button.addEventListener('click', () => { tryInput.value = example; renderReading() })
    tryExamples.append(button)
  }
}
function setTrySpace(space) {
  trySpace = space
  trySeg.dataset.at = space === 'office' ? '1' : '0'
  for (const button of $$('[data-space]', tryBox)) button.setAttribute('aria-checked', String(button.dataset.space === space))
  tryInput.value = SCENES.examples?.[space]?.[0] ?? ''
  paintExamples()
  renderReading()
}
for (const button of $$('[data-space]', tryBox)) button.addEventListener('click', () => setTrySpace(button.dataset.space))
tryInput.addEventListener('input', renderReading)
painters.push(() => { paintExamples(); renderReading() })
setTrySpace('home')
import('./assets/capture.js').then(module => { reader = module; renderReading() }).catch(() => {})

/* ── roles: Home or Business ───────────────────────────────────────────────────────────────── */

const roles = $('[data-roles]')
const rolesSeg = $('.seg', roles)
const rolesShot = $('[data-roles-shot]', roles)
let rolesTab = 'home'
function fillRoles() {
  const data = SCENES.roles?.[rolesTab]
  if (!data) return
  $('[data-roles-title]', roles).textContent = pick(data.title)
  $('[data-roles-lede]', roles).textContent = pick(data.lede)
  const list = $('[data-roles-list]', roles)
  list.replaceChildren()
  for (const role of data.roles) {
    const item = el('li')
    const icon = el('i', '', role.icon); icon.style.setProperty('--c', role.colour); icon.setAttribute('aria-hidden', 'true')
    item.append(icon, el('b', '', pick(role.name)), el('span', '', pick(role.can)))
    list.append(item)
  }
  paintShot(rolesShot, data.screen)
  $('img', rolesShot).alt = pick(data.alt)
}
function setRolesTab(tab, animate = true) {
  rolesTab = tab
  rolesSeg.dataset.at = tab === 'biz' ? '1' : '0'
  for (const button of $$('[data-tab]', roles)) button.setAttribute('aria-selected', String(button.dataset.tab === tab))
  if (!animate || still()) { fillRoles(); return }
  roles.classList.add('is-swapping')
  setTimeout(() => { fillRoles(); requestAnimationFrame(() => roles.classList.remove('is-swapping')) }, 260)
}
for (const button of $$('[data-tab]', roles)) button.addEventListener('click', () => setRolesTab(button.dataset.tab))
painters.push(() => setRolesTab(rolesTab, false))

/* ── start ─────────────────────────────────────────────────────────────────────────────────── */

if (language === 'en') applyLanguage('en')
else for (const paint of painters) paint()
