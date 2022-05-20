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

//In your components file, add the following code:

import { useRosetty } from 'rosetty-react';

const Home = () => {
  const { t } = useRosetty();
  return <h1>{t('home')}</h1>;
};

module.exports = Home;
