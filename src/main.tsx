import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.scss'
import Router from './router'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { IntlProvider } from 'react-intl'
import Francais from './lang/fr.json';
import Anglais from './lang/en.json';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const locale = 'fr';
const messages = Francais;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <IntlProvider locale={locale} messages={messages}>
        <CssBaseline />
        <Router />
      </IntlProvider>
    </ThemeProvider>
  </StrictMode>,
)
