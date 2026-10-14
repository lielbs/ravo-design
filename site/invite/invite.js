import { invitationTargets } from './links.js'

const copy = {
  he: {eyebrow:'הזמנה פרטית',title:'הזמינו אותך ל־RAVO',lede:'הבית או המשרד המשותף מחכה לך. פותחים את RAVO וממשיכים משם עם אותה הזמנה.',open:'פתיחת RAVO',download:'הורדה מה־App Store',note:'RAVO עדיין לא מותקנת? מורידים אותה, חוזרים לעמוד הזה ולוחצים שוב על פתיחת RAVO. ההזמנה תישאר כאן.',errorTitle:'הקישור הזה לא שלם',errorBody:'בקשו ממי שהזמין אתכם לשלוח הזמנה חדשה.',privacy:'פרטי ההזמנה נפתחים רק בתוך RAVO ואינם נשמרים באתר.',support:'צריכים עזרה?'},
  en: {eyebrow:'Private invitation',title:'You have been invited to RAVO',lede:'Your shared home or office is waiting. Continue in RAVO with this same invitation.',open:'Open RAVO',download:'Download on the App Store',note:'Do not have RAVO yet? Download it, return to this page and open RAVO again. Your invitation will stay here.',errorTitle:'This link is incomplete',errorBody:'Ask the person who invited you to send a new invitation.',privacy:'Invitation details open only inside RAVO and are not stored on this website.',support:'Need help?'}
}
const targets = invitationTargets(location.hash)
const openButton = document.querySelector('[data-open]')
const storeLink = document.querySelector('[data-store]')
const error = document.querySelector('[data-error]')
const languageButton = document.querySelector('[data-language]')
let language = document.documentElement.lang === 'en' ? 'en' : 'he'
const applyLanguage = next => {
  language = next
  document.documentElement.lang = next
  document.documentElement.dir = next === 'he' ? 'rtl' : 'ltr'
  document.querySelectorAll('[data-copy]').forEach(node => {
    const key = node.getAttribute('data-copy')
    if (key && copy[next][key]) node.textContent = copy[next][key]
  })
  languageButton.textContent = next === 'he' ? 'EN' : 'עב'
  languageButton.setAttribute('aria-label', next === 'he' ? 'Switch to English' : 'מעבר לעברית')
}
languageButton.addEventListener('click', () => applyLanguage(language === 'he' ? 'en' : 'he'))
if (targets.valid) {
  openButton.disabled = false
  openButton.addEventListener('click', () => { location.href = targets.appUrl })
} else {
  error.hidden = false
}
if (targets.storeUrl) {
  storeLink.href = targets.storeUrl
  storeLink.hidden = false
}
applyLanguage(language)