import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  defaultLocale: 'ja',
  locales: ['en', 'ja'],
  localePrefix: "as-needed"
});
