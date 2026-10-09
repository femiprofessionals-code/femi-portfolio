export type Stage = 'morning' | 'golden' | 'night'
export type Mode = Stage | 'auto'

export const STAGES: { id: Stage; label: string; hours: string }[] = [
  { id: 'morning', label: 'Morning', hours: '7am – 3pm' },
  { id: 'golden', label: 'Golden hour', hours: '3pm – 7pm' },
  { id: 'night', label: 'Night', hours: '7pm – 7am' },
]

export const STORAGE_KEY = 'ff-time'
export const THEME_COLOR: Record<Stage, string> = { morning: '#F4F0E9', golden: '#F1E3CC', night: '#14100D' }

export function nyHour(d = new Date()) {
  return Number(new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: 'numeric', hourCycle: 'h23' }).format(d)) % 24
}

export function stageForHour(h: number): Stage {
  if (h >= 7 && h < 15) return 'morning'
  if (h >= 15 && h < 19) return 'golden'
  return 'night'
}

export function nyClock(d = new Date()) {
  return new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: '2-digit' }).format(d)
}

/** Runs in <head> before first paint so the right light is there from the first frame. */
export const TIME_BOOT_SCRIPT = `(function(){var d=document.documentElement;try{var m=localStorage.getItem('${STORAGE_KEY}');var h=Number(new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',hour:'numeric',hourCycle:'h23'}).format(new Date()))%24;var s=h>=7&&h<15?'morning':h>=15&&h<19?'golden':'night';var manual=m==='morning'||m==='golden'||m==='night';d.dataset.time=manual?m:s;d.dataset.timeMode=manual?'manual':'auto';}catch(e){d.dataset.time='morning';d.dataset.timeMode='auto';}d.classList.add('js');})();`
