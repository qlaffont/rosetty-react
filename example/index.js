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
