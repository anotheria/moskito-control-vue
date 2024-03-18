import { ILanguages } from '@/types/interfaces';

export const LANGUAGE: ILanguages = {
  DE: {
    key: 'de',
    label: 'Deutsche',
  },
  EN: {
    key: 'en',
    label: 'English',
  },
  KEY: {
    key: 'key',
    label: 'Key',
  },
};

export const DEFAULT_LANGUAGE = LANGUAGE.EN;

export const KEY_LANGUAGE = LANGUAGE.KEY;

export const PASSWORD_LENGTH = 6;

export const STATUS_CODE_MAP = {
  'GREEN': 0,
  'RED': 1,
};

export const getAverageStatus = (statuses: Array<string>): string => {
  const statusValues = statuses
      .map(status => STATUS_CODE_MAP[status as keyof typeof STATUS_CODE_MAP]) as Array<number>;
  const averageStatus = Object.keys(STATUS_CODE_MAP)
      .find(key => STATUS_CODE_MAP[key as keyof typeof STATUS_CODE_MAP] === Math.max(...statusValues));

  return averageStatus || '';
};

export const getStatusColor = (statusColor: string) => {
  return {
    'GREEN': 'var(--mc-status-green)',
    'YELLOW': 'var(--mc-status-yellow)',
    'ORANGE': 'var(--mc-status-orange)',
    'RED': 'var(--mc-status-red)',
    'PURPLE': 'var(--mc-status-purple)'
  }[statusColor];
};
