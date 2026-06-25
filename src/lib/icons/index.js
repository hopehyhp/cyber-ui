/** 内置图标注册表，key 即 icon prop 取值 */
export const icons = {
  settings: [
    ['circle', { cx: 12, cy: 12, r: 3, stroke: 'currentColor', 'stroke-width': 1.6 }],
    [
      'path',
      {
        d: 'M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
        stroke: 'currentColor',
        'stroke-width': 1.6,
        'stroke-linecap': 'round',
      },
    ],
  ],
  search: [
    ['circle', { cx: 11, cy: 11, r: 7, stroke: 'currentColor', 'stroke-width': 1.6 }],
    [
      'path',
      { d: 'M20 20l-3-3', stroke: 'currentColor', 'stroke-width': 1.6, 'stroke-linecap': 'round' },
    ],
  ],
  plus: [
    [
      'path',
      {
        d: 'M12 5v14M5 12h14',
        stroke: 'currentColor',
        'stroke-width': 1.6,
        'stroke-linecap': 'round',
      },
    ],
  ],
  close: [
    [
      'path',
      {
        d: 'M6 6l12 12M18 6L6 18',
        stroke: 'currentColor',
        'stroke-width': 1.6,
        'stroke-linecap': 'round',
      },
    ],
  ],
  'chevron-right': [
    [
      'path',
      {
        d: 'M9 6l6 6-6 6',
        stroke: 'currentColor',
        'stroke-width': 1.6,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
      },
    ],
  ],
}

export function getIcon(name) {
  return icons[name] || null
}

export function registerIcon(name, nodes) {
  icons[name] = nodes
}
