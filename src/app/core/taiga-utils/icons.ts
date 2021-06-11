import { Provider } from '@angular/core'
import { TUI_ICONS_PATH } from '@taiga-ui/core'

const tuiIconMap: Map<string, string> = new Map([
  ['badmintonIcon', 'badminton'],
  ['tableTennisIcon', 'table_tennis'],
])

const tuiIconsPath = (name: string): string => {
  const isCustomIcon = tuiIconMap.has(name)
  if (isCustomIcon) return `assets/icons/${tuiIconMap.get(name)}.svg#${tuiIconMap.get(name)}`

  return `assets/taiga-ui/icons/${name}.svg#${name}`
}

export const CUSTOM_TUI_ICONS_PROVIDER: Provider = { provide: TUI_ICONS_PATH, useValue: tuiIconsPath }
