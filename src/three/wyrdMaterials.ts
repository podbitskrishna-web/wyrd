export const WYRD_COLORS = {
  ink: '#11120f',
  charcoal: '#1a1b18',
  paper: '#e9e8e2',
  muted: '#969790',
  acid: '#d8ff36',
  acidSoft: '#a8c728',
  deepAcid: '#5a7015',
  warmLight: '#fff4d6',
  rimLight: '#c9c8c0',
} as const;

export const WYRD_MATERIALS = {
  matte: {
    roughness: 0.85,
    metalness: 0.0,
    color: WYRD_COLORS.charcoal,
  },
  satin: {
    roughness: 0.45,
    metalness: 0.15,
    color: WYRD_COLORS.ink,
  },
  accent: {
    roughness: 0.3,
    metalness: 0.4,
    color: WYRD_COLORS.acid,
    emissive: WYRD_COLORS.deepAcid,
    emissiveIntensity: 0.15,
  },
  polished: {
    roughness: 0.15,
    metalness: 0.7,
    color: WYRD_COLORS.rimLight,
  },
} as const;
