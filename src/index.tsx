/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useMemo, useState } from 'react';
import { Language, rosetty, RosettyReturn } from 'rosetty';

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
    [languages]
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
    [actualLang, r]
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

export type Rosetty<T extends AnyObject> = RosettyReturn<T>;
