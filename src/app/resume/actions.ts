'use server'
import { passcodeMatches } from '@/lib/resumeAccess'
import { BRIEFS, EDUCATION, PERSON, ROLES } from '@/content/site'

export type ResumeData = {
  name: string
  location: string
  email: string
  linkedin: string
  positioning: string[]
  updated: string
  roles: { company: string; location: string; dates: string; title: string; summary: string; highlights: string[] }[]
  education: string[]
}

export type UnlockResult = { ok: true; resume: ResumeData } | { ok: false; error: string }

/** Checks the passcode on the server; only then is the résumé sent to the browser. */
export async function unlockResume(passcode: string): Promise<UnlockResult> {
  if (!passcodeMatches(passcode)) {
    await new Promise(r => setTimeout(r, 900))            // slow down guessing
    return { ok: false, error: 'That passcode isn’t right. Please check it, or request access below.' }
  }
  const highlights = (inst: string) => BRIEFS.filter(b => b.institution === inst).map(b => `${b.title} — ${b.summary}`)
  return {
    ok: true,
    resume: {
      name: PERSON.name,
      location: PERSON.location,
      email: PERSON.email,
      linkedin: PERSON.linkedin,
      positioning: [...PERSON.positioning],
      updated: PERSON.resumeUpdated,
      roles: ROLES.map(r => ({ company: r.company, location: r.location, dates: r.dates, title: r.title, summary: r.summary, highlights: highlights(r.institution) })),
      education: [...EDUCATION],
    },
  }
}
