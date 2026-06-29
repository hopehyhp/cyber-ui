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
  'chevron-down': [
    [
      'path',
      {
        d: 'M6 9l6 6 6-6',
        stroke: 'currentColor',
        'stroke-width': 1.6,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
      },
    ],
  ],
  user: [
    ['circle', { cx: 12, cy: 8, r: 4, stroke: 'currentColor', 'stroke-width': 1.6 }],
    [
      'path',
      {
        d: 'M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7',
        stroke: 'currentColor',
        'stroke-width': 1.6,
        'stroke-linecap': 'round',
      },
    ],
  ],
  lock: [
    [
      'rect',
      {
        x: 6,
        y: 11,
        width: 12,
        height: 9,
        rx: 2,
        stroke: 'currentColor',
        'stroke-width': 1.6,
      },
    ],
    [
      'path',
      {
        d: 'M9 11V8a3 3 0 016 0v3',
        stroke: 'currentColor',
        'stroke-width': 1.6,
        'stroke-linecap': 'round',
      },
    ],
  ],
  eye: [
    [
      'path',
      {
        d: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z',
        stroke: 'currentColor',
        'stroke-width': 1.6,
        'stroke-linejoin': 'round',
      },
    ],
    ['circle', { cx: 12, cy: 12, r: 3, stroke: 'currentColor', 'stroke-width': 1.6 }],
  ],
  'eye-off': [
    [
      'path',
      {
        d: 'M3 3l18 18M10.6 10.6A3 3 0 0012 15a3 3 0 002.4-4.4M9.9 5.1A10.7 10.7 0 0112 5c6.5 0 10 7 10 7a18.4 18.4 0 01-4.1 5.2M6.7 6.7C4.1 8.4 2 12 2 12s3.5 7 10 7c1.2 0 2.3-.2 3.3-.5',
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
