import { defineShortcutsSetup } from '@slidev/types'

const MAIN_END = 11
const ANNEX_START = 12
const ANNEX_END = 12
let returnSlide = 1

function currentSlide() {
  const match = window.location.pathname.match(/\/(?:presenter\/)?(\d+)\/?$/)
  return match ? Number(match[1]) : 1
}

function notesUrl() {
  const base = window.location.pathname.replace(/\/(?:presenter\/)?\d+\/?$/, '')
  return `${window.location.origin}${base}/notes`
}

export default defineShortcutsSetup((nav, base) => {
  const nextNames = new Set(['next_space', 'next_right', 'next_page_key', 'next_down', 'next_shift'])
  const prevNames = new Set(['prev_space', 'prev_left', 'prev_page_key', 'prev_up', 'prev_shift'])

  const guarded = base.map((shortcut) => {
    if (shortcut.name && nextNames.has(shortcut.name)) {
      return {
        ...shortcut,
        fn: () => {
          const slide = currentSlide()
          if (slide !== MAIN_END && slide !== ANNEX_END) nav.next()
        },
      }
    }
    if (shortcut.name && prevNames.has(shortcut.name)) {
      return {
        ...shortcut,
        fn: () => {
          if (currentSlide() !== ANNEX_START) nav.prev()
        },
      }
    }
    return shortcut
  })

  return [
    ...guarded,
    {
      key: 'a',
      name: 'annex_toggle',
      fn: () => {
        const slide = currentSlide()
        if (slide >= ANNEX_START) nav.go(returnSlide)
        else {
          returnSlide = slide
          nav.go(ANNEX_START)
        }
      },
    },
    {
      key: 'm',
      name: 'annex_return',
      fn: () => {
        if (currentSlide() >= ANNEX_START) nav.go(returnSlide)
      },
    },
    {
      key: 'n',
      name: 'notes_window',
      fn: () => window.open(notesUrl(), 'slidev-notes'),
    },
  ]
})
