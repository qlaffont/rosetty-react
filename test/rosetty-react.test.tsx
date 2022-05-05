/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// Importing the jest testing library
import '@testing-library/jest-dom';

import { cleanup, renderHook } from '@testing-library/react';
import React from 'react';

// MUTE console error
// eslint-disable-next-line @typescript-eslint/no-empty-function
console.error = () => {};

import { I18nContext, I18nHOC, locales, useI18n } from '../src';
//@ts-ignore
const I18NContextProvider = ({ children, languages, defaultLanguage }) => (
  <I18nHOC languages={languages} defaultLanguage={defaultLanguage}>
    {children}
  </I18nHOC>
);

afterEach(() => {
  cleanup();
});

describe('rosetty react', () => {
  it('should export useI18n + HOC + context', () => {
    expect(typeof useI18n).toBe('function');
    expect(typeof I18nHOC).toBe('function');
    expect(typeof I18nContext).toBe('object');
  });

  it('should be able to use i18n', () => {
    //@ts-ignore
    const wrapper = ({ children }) => (
      <I18NContextProvider
        languages={{ fr: { dict: {}, locale: locales.fr } }}
        defaultLanguage="fr"
      >
        {children}
      </I18NContextProvider>
    );
    const { result } = renderHook(() => useI18n(), { wrapper });

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
    ]);
  });

  it('should be able to return error', () => {
    //@ts-ignore
    const wrongWrapperLanguageNotValid = ({ children }) => (
      <I18NContextProvider
        languages={{ fr: { dict: {}, locale: locales.fr } }}
        defaultLanguage="en"
      >
        {children}
      </I18NContextProvider>
    );

    try {
      renderHook(() => useI18n(), {
        wrapper: wrongWrapperLanguageNotValid,
      });
    } catch (error) {
      //@ts-ignore
      expect(error.message).toBe('rosetty: language en not found');
    }
  });
});
