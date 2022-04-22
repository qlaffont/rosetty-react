import React, { createContext, useContext } from 'react';
import { Language, rosetty, RosettyReturn } from 'rosetty';

export const I18nContext = createContext({});

export const I18nHOC = ({
  children,
  languages,
  defaultLanguage,
}: {
  children: React.ReactNode;
  languages: Record<string, Language>;
  defaultLanguage: string;
}) => {
  const r = rosetty(languages, defaultLanguage);
  return <I18nContext.Provider value={r}>{children}</I18nContext.Provider>;
};

export function useI18n<T>(): RosettyReturn<T> {
  return useContext(I18nContext) as RosettyReturn<T>;
}
