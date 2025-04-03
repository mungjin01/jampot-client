export const SESSION_LABEL_TO_VALUE = {
  보컬: 'Vocal',
  기타: 'Guitar',
  베이스: 'Bass',
  키보드: 'Keyboard',
  드럼: 'Drum',
} as const;

export const SESSION_VALUE_TO_LABEL = Object.fromEntries(
  Object.entries(SESSION_LABEL_TO_VALUE).map(([k, v]) => [v, k])
) as Record<string, string>;

export const SESSION_LABELS = Object.keys(SESSION_LABEL_TO_VALUE);

export const GENRES = ['POP', 'KPOP', 'JPOP', 'ROCK'];

export const PUBLIC_OPTIONS = ['공개', '비공개'];
