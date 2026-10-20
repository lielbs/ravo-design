import { useEffect, useState } from 'react'
import DaySky from '../../src/components/art/DaySky'
import { houseColors } from '../../src/domain/houseColors'
import { houseLookOf, type HouseLook, type HousePet, type HouseShape, type HouseYard } from '../../src/domain/houseLook'

/*
 * The landing page's "your home" section, made playable: the very picture the app draws over Today,
 * with the same choices a household makes in Settings → My home, plus the hour and the name on the
 * sign. Nothing is saved anywhere; it is a toy that is also the truth about the app.
 */

type Lang = 'he' | 'en'
const copy = {
  he: {
    home: 'בית', business: 'עסק', colour: 'צבע', kind: 'סוג', yard: 'בחצר', pet: 'ליד הדלת', name: 'השם על השלט', time: 'שעה',
    shapes: { house: 'בית', flats: 'בניין', twostorey: 'דו־קומתי' }, yards: { tree: 'עץ', palm: 'דקל', cypress: 'ברוש', flowers: 'פרחים', none: 'בלי' },
    pets: { none: 'בלי', cat: 'חתול', dog: 'כלב' }, hours: [['בוקר', 7.5], ['צהריים', 13], ['ערב', 18.4], ['לילה', 22.5]] as [string, number][],
    homeName: 'משפחת ברק', businessName: 'סטודיו ברק', colours: { olive: 'זית', clay: 'חימר', earth: 'אדמה', forest: 'יער', ocean: 'ים', wine: 'יין', plum: 'שזיף', slate: 'אבן', night: 'לילה' } as Record<string, string>,
    hint: 'נסו — ככה זה נראה באפליקציה',
  },
  en: {
    home: 'Home', business: 'Business', colour: 'Colour', kind: 'Kind', yard: 'Yard', pet: 'By the door', name: 'Name on the sign', time: 'Time',
    shapes: { house: 'House', flats: 'Flats', twostorey: 'Two storeys' }, yards: { tree: 'Tree', palm: 'Palm', cypress: 'Cypress', flowers: 'Flowers', none: 'None' },
    pets: { none: 'None', cat: 'Cat', dog: 'Dog' }, hours: [['Morning', 7.5], ['Midday', 13], ['Evening', 18.4], ['Night', 22.5]] as [string, number][],
    homeName: 'The Barak family', businessName: 'Barak Studio', colours: { olive: 'Olive', clay: 'Clay', earth: 'Earth', forest: 'Forest', ocean: 'Sea', wine: 'Wine', plum: 'Plum', slate: 'Stone', night: 'Night' } as Record<string, string>,
    hint: 'Try it — this is how it looks in the app',
  }
}

function Chips<T extends string>({ options, value, onPick, label }: { options: [T, string][]; value: T; onPick: (v: T) => void; label: string }) {
  return <div className="hb-row" role="radiogroup" aria-label={label}>
    <span className="hb-label">{label}</span>
    <div className="hb-chips">{options.map(([id, text]) =>
      <button key={id} type="button" role="radio" aria-checked={id === value} className={id === value ? 'is-on' : ''} onClick={() => onPick(id)}>{text}</button>)}</div>
  </div>
}

export default function HouseBuilder({ initialLang }: { initialLang: Lang }) {
  const [lang, setLang] = useState<Lang>(initialLang)
  const t = copy[lang]
  const [scene, setScene] = useState<'home' | 'office'>('home')
  const [look, setLook] = useState<HouseLook>({ ...houseLookOf('clay'), chosen: true })
  const [hour, setHour] = useState(13)
  const [name, setName] = useState<string | null>(null)
  /* The site switches language in place; the toy follows the page. */
  useEffect(() => {
    const root = document.documentElement
    const sync = () => setLang(root.lang === 'en' ? 'en' : 'he')
    const watch = new MutationObserver(sync)
    watch.observe(root, { attributes: true, attributeFilter: ['lang'] })
    return () => watch.disconnect()
  }, [])
  const shownName = name ?? (scene === 'office' ? t.businessName : t.homeName)
  const pick = (change: Partial<HouseLook>) => setLook(current => ({ ...current, ...change }))

  return <div className="hb" dir={lang === 'he' ? 'rtl' : 'ltr'}>
    <div className="hb-stage">
      <DaySky key={`${scene}-${look.shape}`} scene={scene} look={look} name={shownName} hour={hour} lit/>
      <span className="hb-hint">{t.hint}</span>
    </div>
    <div className="hb-panel">
      <Chips label="" value={scene} onPick={value => { setScene(value); setName(null) }} options={[['home', t.home], ['office', t.business]]}/>
      <div className="hb-row" role="radiogroup" aria-label={t.colour}>
        <span className="hb-label">{t.colour}</span>
        <div className="hb-swatches">{houseColors.map(colour =>
          <button key={colour.id} type="button" role="radio" aria-checked={look.color.id === colour.id} aria-label={t.colours[colour.id] ?? colour.id}
            className={look.color.id === colour.id ? 'is-on' : ''} style={{ background: `linear-gradient(150deg, ${colour.b}, ${colour.a})` }}
            onClick={() => pick({ color: colour, chosen: true })}/>)}</div>
      </div>
      {scene === 'home' && <>
        <Chips label={t.kind} value={look.shape} onPick={(shape: HouseShape) => pick({ shape })} options={(Object.keys(t.shapes) as HouseShape[]).map(id => [id, t.shapes[id]])}/>
        <Chips label={t.yard} value={look.yard} onPick={(yard: HouseYard) => pick({ yard })} options={(Object.keys(t.yards) as HouseYard[]).map(id => [id, t.yards[id]])}/>
        <Chips label={t.pet} value={look.pet} onPick={(pet: HousePet) => pick({ pet })} options={(Object.keys(t.pets) as HousePet[]).map(id => [id, t.pets[id]])}/>
      </>}
      <Chips label={t.time} value={String(hour)} onPick={value => setHour(Number(value))} options={t.hours.map(([text, h]) => [String(h), text])}/>
      <label className="hb-row hb-name">
        <span className="hb-label">{t.name}</span>
        <input type="text" maxLength={18} value={shownName} dir="auto" onChange={event => setName(event.target.value)}/>
      </label>
    </div>
  </div>
}

