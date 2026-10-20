import { createRoot } from 'react-dom/client'
import HouseBuilder from './HouseBuilder'
import '../../src/styles/system/art.css'
import './builder.css'

/* Mounted by the landing page when the section comes into view (website/script.js). */
const mount = document.querySelector<HTMLElement>('[data-house-builder]')
if (mount) {
  mount.dataset.ready = 'true'
  createRoot(mount).render(<HouseBuilder initialLang={document.documentElement.lang === 'en' ? 'en' : 'he'}/>)
}
