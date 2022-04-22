// Importing the jest testing library
import '@testing-library/jest-dom';

import { cleanup } from '@testing-library/react';

import { I18nContext, I18nHOC, useI18n } from '../src';

// afterEach function runs after each test suite is executed
afterEach(() => {
  cleanup(); // Resets the DOM after each test suite
});

describe('rosetty react', () => {
  it('should export useI18n + HOC + context', () => {
    expect(typeof useI18n).toBe('function');
    expect(typeof I18nHOC).toBe('function');
    expect(typeof I18nContext).toBe('object');
  });
});
