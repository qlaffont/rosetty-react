import React, { createContext, useContext, useMemo, useState } from 'react';
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
  translateFallback,
}: {
  children: React.ReactNode;
  languages: Record<string, Language>;
  defaultLanguage: string;
  translateFallback?: boolean;
}) => {
  const r = useMemo(
    () => rosetty(languages, defaultLanguage, translateFallback),
    []
  );
  const [actualLang, setActualLang] = useState(defaultLanguage);

  const providerReturn = useMemo(
    () => ({
      ...r,
      actualLang,
      changeLang: (lang: string) => {
        r.changeLang(lang);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        setActualLang(r.getCurrentLang()!);
      },
    }),
    [actualLang]
  );

  return (
    <RosettyContext.Provider value={providerReturn}>
      {children}
    </RosettyContext.Provider>
  );
};

type AnyObject = Record<string, any>;

export function useRosetty<T extends AnyObject>(): RosettyReturn<T> & {
  actualLang: string | undefined;
} {
  return useContext(RosettyContext) as RosettyReturn<T> & {
    actualLang: string | undefined;
  };
}

export const locales: Locales = rosettyLocales;
export type Rosetty<T extends AnyObject> = RosettyReturn<T>;
