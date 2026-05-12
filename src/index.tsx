import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { rosetty, type Language, type RosettyReturn } from 'rosetty';

export const RosettyContext = createContext({});

export const RosettyProvider = ({
  children,
  languages,
  defaultLanguage,
  translateFallback,
}: {
  children: ReactNode;
  languages: Record<string, Language>;
  defaultLanguage: string;
  translateFallback?: boolean;
}) => {
  const r = useMemo(
    () => rosetty(languages, defaultLanguage, translateFallback),
    [languages, defaultLanguage, translateFallback],
  );

  const [actualLang, setActualLang] = useState(defaultLanguage);

  const providerReturn = useMemo(
    () => ({
      ...r,
      actualLang,
      changeLang: (lang: string) => {
        r.changeLang(lang);
        setActualLang(r.getCurrentLang()!);
      },
    }),
    [actualLang, r],
  );

  return (
    <RosettyContext.Provider value={providerReturn}>
      {children}
    </RosettyContext.Provider>
  );
};

type AnyObject = Record<string, unknown>;

export function useRosetty<T extends AnyObject>(): RosettyReturn<T> & {
  actualLang: string | undefined;
} {
  return useContext(RosettyContext) as RosettyReturn<T> & {
    actualLang: string | undefined;
  };
}

export type Rosetty<T extends AnyObject> = RosettyReturn<T>;
