# Rosetty React

Complete Intl/I18n solution for React

## Usage

```js
//In your app.js file, add the following code:

import { I18nHOC, locales as rosettyLocales } from 'rosetty-react';

const locales = { fr: { dict: {}, locale: rosettyLocales.fr } };
const defaultLanguage = 'fr';

const App = ({ children }) => (
  <I18nHOC locales={locales} defaultLanguage={defaultLanguage}>
    {children}
  </I18nHOC>
);

module.exports = App;

//In your components file, add the following code:

import { useI18n } from 'rosetty-react';

const Home = () => {
  const { t } = useI18n();
  return <h1>{t('home')}</h1>;
};

module.exports = Home;

```

## API

### I18nHOC

**Options**

| Field Name      | Type                     | Description                                                    |
| --------------- | ------------------------ | -------------------------------------------------------------- |
| locales         | Record<string, Language> | Specify dictionnary and locale to use for each lang            |
| defaultLanguage | string?                  | Specify default language to use (should be the same as config) |

Return: Rosetty Context HOC

Return a component who instantiate the Rosetty Context.

### locales

Return: Record<string, Locale>

Return I18n locales from rosetty

## Maintain

This package use [TSdx](https://github.com/jaredpalmer/tsdx). Please check documentation to update this package.
