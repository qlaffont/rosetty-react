//In your app.js file, add the following code:

import { locales as rosettyLocales, RosettyProvider } from 'rosetty-react';

const locales = { fr: { dict: {}, locale: rosettyLocales.fr } };
const defaultLanguage = 'fr';

const App = ({ children }) => (
  <RosettyProvider locales={locales} defaultLanguage={defaultLanguage}>
    {children}
  </RosettyProvider>
);

module.exports = App;

//Create a hook called useI18n
import { useRosetty } from 'rosetty-react';

import frDict from '../i18n/fr';

export const useI18n = () => {
  return useRosetty<typeof frDict>(); //Enable autocompletion base on you translation file
};


//In your components file, add the following code:

import { useI18n } from '../libs/useI18n';

const Home = () => {
  const { t } = useI18n();

  return <h1>{t('home')}</h1>;
};

module.exports = Home;
