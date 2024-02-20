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

export const getStatusColor = (statusColor: string) => {
  return {
    'GREEN': 'var(--mc-status-green)',
    'YELLOW': 'var(--mc-status-yellow)',
    'ORANGE': 'var(--mc-status-orange)',
    'RED': 'var(--mc-status-red)',
    'PURPLE': 'var(--mc-status-purple)'
  }[statusColor];
};
