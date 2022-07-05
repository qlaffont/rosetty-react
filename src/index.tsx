import React, { createContext, useContext, useState } from 'react';
import {
  Language,
  Locales,
  locales as rosettyLocales,
  rosetty,
  RosettyReturn,
} from 'rosetty';

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
  const [actualLang, setActualLang] = useState(defaultLanguage);

  return (
    <RosettyContext.Provider
      value={{
        ...r,
        actualLang,
        changeLang: (lang: string) => {
          r.changeLang(lang);
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          setActualLang(r.getCurrentLang()!);
        },
      }}
    >
      {children}
    </RosettyContext.Provider>
  );
};

export function useRosetty<T>(): RosettyReturn<T> & {
  actualLang: string | undefined;
} {
  return useContext(RosettyContext) as RosettyReturn<T> & {
    actualLang: string | undefined;
  };
}

export const locales: Locales = rosettyLocales;
export type Rosetty<T> = RosettyReturn<T>;
