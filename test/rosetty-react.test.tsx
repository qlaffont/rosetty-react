/// <reference lib="dom" />

import type { PropsWithChildren } from 'react';
import type { Language } from 'rosetty';
import { cleanup, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'bun:test';
import { RosettyContext, RosettyProvider, useRosetty } from '../src/index';

console.error = () => {};

afterEach(() => {
  cleanup();
});

type Languages = Record<string, Language>;

describe('rosetty react', () => {
  it('should export useRosetty + HOC + context', () => {
    expect(typeof useRosetty).toBe('function');
    expect(typeof RosettyProvider).toBe('function');
    expect(typeof RosettyContext).toBe('object');
  });

  it('should be able to use i18n', () => {
    function I18NContextProvider({
      children,
      languages,
      defaultLanguage,
    }: PropsWithChildren<{
      languages: Languages;
      defaultLanguage: string;
    }>) {
      return (
        <RosettyProvider
          languages={languages}
          defaultLanguage={defaultLanguage}
        >
          {children}
        </RosettyProvider>
      );
    }

    const wrapper = ({ children }: PropsWithChildren) => (
      <I18NContextProvider languages={{ fr: { dict: {}, locale: 'fr' } }} defaultLanguage="fr">
        {children}
      </I18NContextProvider>
    );
    const { result } = renderHook(() => useRosetty(), { wrapper });

    expect(result.current.languages).toStrictEqual(['fr']);
    expect(Object.keys(result.current)).toMatchSnapshot();
  });

  it('should be able to return error', () => {
    function I18NContextProvider({
      children,
      languages,
      defaultLanguage,
    }: PropsWithChildren<{
      languages: Languages;
      defaultLanguage: string;
    }>) {
      return (
        <RosettyProvider
          languages={languages}
          defaultLanguage={defaultLanguage}
        >
          {children}
        </RosettyProvider>
      );
    }

    const wrongWrapperLanguageNotValid = ({ children }: PropsWithChildren) => (
      <I18NContextProvider
        languages={{ fr: { dict: {}, locale: 'fr' } }}
        defaultLanguage="en"
      >
        {children}
      </I18NContextProvider>
    );

    expect(() =>
      renderHook(() => useRosetty(), {
        wrapper: wrongWrapperLanguageNotValid,
      }),
    ).toThrow('rosetty: language en not found');
  });

  it('should be able to return actualLang', () => {
    function I18NContextProvider({
      children,
      languages,
      defaultLanguage,
    }: PropsWithChildren<{
      languages: Languages;
      defaultLanguage: string;
    }>) {
      return (
        <RosettyProvider
          languages={languages}
          defaultLanguage={defaultLanguage}
        >
          {children}
        </RosettyProvider>
      );
    }

    const wrapper = ({ children }: PropsWithChildren) => (
      <I18NContextProvider
        languages={{
          fr: { dict: {}, locale: 'fr' },
          en: { dict: {}, locale: 'en-GB' },
        }}
        defaultLanguage="en"
      >
        {children}
      </I18NContextProvider>
    );

    const { result, rerender } = renderHook(() => useRosetty(), { wrapper });

    expect(result.current.actualLang).toStrictEqual('en');
    result.current.changeLang('fr');
    rerender();
    expect(result.current.actualLang).toStrictEqual('fr');
  });
});
