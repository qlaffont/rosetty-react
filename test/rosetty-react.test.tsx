/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// Importing the jest testing library
import '@testing-library/jest-dom';

import { cleanup, renderHook } from '@testing-library/react';
//@ts-ignore
import enGB from 'dayjs/locale/en-gb';
//@ts-ignore
import fr from 'dayjs/locale/fr';
import React from 'react';

// MUTE console error
// eslint-disable-next-line @typescript-eslint/no-empty-function
console.error = () => {};

import { RosettyContext, RosettyProvider, useRosetty } from '../src';
//@ts-ignore
const I18NContextProvider = ({ children, languages, defaultLanguage }) => (
  <RosettyProvider languages={languages} defaultLanguage={defaultLanguage}>
    {children}
  </RosettyProvider>
);

afterEach(() => {
  cleanup();
});

describe('rosetty react', () => {
  it('should export useI18n + HOC + context', () => {
    expect(typeof useRosetty).toBe('function');
    expect(typeof RosettyProvider).toBe('function');
    expect(typeof RosettyContext).toBe('object');
  });

  it('should be able to use i18n', () => {
    //@ts-ignore
    const wrapper = ({ children }) => (
      <I18NContextProvider
        languages={{ fr: { dict: {}, locale: fr } }}
        defaultLanguage="fr"
      >
        {children}
      </I18NContextProvider>
    );
    const { result } = renderHook(() => useRosetty(), { wrapper });

    expect(result.current.languages).toStrictEqual(['fr']);
    expect(Object.keys(result.current)).toStrictEqual([
      'changeLang',
      'languages',
      'getCurrentLang',
      't',
      'displayNames',
      'listFormat',
      'numberFormat',
      'pluralRules',
      'format',
      'formatRelative',
      'formatDistance',
      'formatDistanceToNow',
      'formatDuration',
      'actualLang',
    ]);
  });

  it('should be able to return error', () => {
    //@ts-ignore
    const wrongWrapperLanguageNotValid = ({ children }) => (
      <I18NContextProvider
        languages={{ fr: { dict: {}, locale: fr } }}
        defaultLanguage="en"
      >
        {children}
      </I18NContextProvider>
    );

    try {
      renderHook(() => useRosetty(), {
        wrapper: wrongWrapperLanguageNotValid,
      });
    } catch (error) {
      //@ts-ignore
      expect(error.message).toBe('rosetty: language en not found');
    }
  });

  it('should be able to return actualLang', () => {
    //@ts-ignore
    const wrapper = ({ children }) => (
      <I18NContextProvider
        languages={{
          fr: { dict: {}, locale: fr },
          en: { dict: {}, locale: enGB },
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
