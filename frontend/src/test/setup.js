import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key, options) => {
      if (key === 'common') {
        return {
          appName: 'Open Notebook',
          confirm: 'Confirm',
          cancel: 'Cancel',
          create: 'Create'
        };
      }
      if (key === 'navigation') {
        return {
          collect: 'Collect',
          process: 'Process',
          create: 'Create',
          manage: 'Manage',
          sources: 'Sources',
          notebooks: 'Notebooks',
          askAndSearch: 'Ask & Search',
          podcasts: 'Podcasts',
          models: 'Models',
          transformations: 'Transformations',
          settings: 'Settings',
          advanced: 'Advanced'
        };
      }
      if (key === 'common.appName') return 'Open Notebook';
      if (key === 'common.confirm') return 'Confirm';
      if (key === 'common.cancel') return 'Cancel';
      if (key === 'common.create') return 'Create';
      if (key === 'navigation.sources') return 'Sources';
      if (key === 'navigation.notebooks') return 'Notebooks';
      if (options?.returnObjects) return key;
      return key;
    },
    i18n: {
      language: 'en-US',
      changeLanguage: vi.fn(),
    },
  }),
}));

if (process?.env) {
  delete process.env.LOCALSTORAGE_FILE;
  delete process.env.LOCALSTORAGE_DIR;
}
