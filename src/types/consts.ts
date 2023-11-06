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
