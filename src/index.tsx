import React, { createContext, useContext } from 'react';
import {
  Language,
  locales as rosettyLocales,
  rosetty,
  RosettyReturn,
} from 'rosetty';
import { Locales } from 'rosetty/dist/types';

export const RosettyContext = createContext({});

export const RosettyProvider = ({
  children,
  languages,
  defaultLanguage,
}: {
  children: React.ReactNode;
  languages: Record<string, Language>;
  defaultLanguage: string;
}) => {
  const r = rosetty(languages, defaultLanguage);
  return (
    <RosettyContext.Provider value={r}>{children}</RosettyContext.Provider>
  );
};

export function useRosetty<T>(): RosettyReturn<T> {
  return useContext(RosettyContext) as RosettyReturn<T>;
}

export const locales: Locales = rosettyLocales;
export type Rosetty<T> = RosettyReturn<T>;
