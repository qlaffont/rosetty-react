[![Maintainability](https://api.codeclimate.com/v1/badges/82e2c932c7dde770cdd4/maintainability)](https://codeclimate.com/github/flexper/rosetty-react/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/82e2c932c7dde770cdd4/test_coverage)](https://codeclimate.com/github/flexper/rosetty-react/test_coverage) ![npm](https://img.shields.io/npm/v/rosetty-react) ![npm](https://img.shields.io/npm/dm/rosetty-react) ![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/rosetty-react) ![NPM](https://img.shields.io/npm/l/rosetty-react)

# Rosetty React

Complete Intl/I18n solution for React based on [Rosetty](https://github.com/flexper/rosetty)

## Usage

```js
//In your app.js file, add the following code:

import { RosettyProvider, locales as rosettyLocales } from 'rosetty-react';

const locales = { fr: { dict: {}, locale: rosettyLocales.fr } };
const defaultLanguage = 'fr';

const App = ({ children }) => (
  <RosettyProvider locales={locales} defaultLanguage={defaultLanguage}>
    {children}
  </RosettyProvider>
);

module.exports = App;

//In your components file, add the following code:

import { useRosetty } from 'rosetty-react';

const Home = () => {
  const { t } = useRosetty();
  return <h1>{t('home')}</h1>;
};

module.exports = Home;

```

## API

### RosettyProvider

**Options**

| Field Name      | Type                     | Description                                                    |
| --------------- | ------------------------ | -------------------------------------------------------------- |
| locales         | Record<string, Language> | Specify dictionnary and locale to use for each lang            |
| defaultLanguage | string?                  | Specify default language to use (should be the same as config) |

Return: Rosetty Context HOC + {actualLang: string} who contain your current language

Return a component who instantiate the Rosetty Context.

### locales

Return: Record<string, Locale>

Return I18n locales from rosetty

## Maintain

This package use [TSdx](https://github.com/jaredpalmer/tsdx). Please check documentation to update this package.
