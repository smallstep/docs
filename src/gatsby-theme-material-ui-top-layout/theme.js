import { colors } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#DC4B40',
    },
    secondary: {
      main: '#3F75EF',
    },
    tertiary: {
      main: '#F7C26D',
    },
    white: {
      main: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      secondary: '#EEF6FC',
      cream: '#FDF8EC',
      dark: '#07013C',
    },
    text: {
      primary: 'rgba(7, 1, 60, 1.0)', // #07013C
      secondary: '#3C6589',
      disabled: 'rgba(7, 1, 60, 0.35)',
      hint: 'rgba(7, 1, 60, 0.35)',
      blue: '#3F75EF',
      grey: '#B2C8D5',
      darkGrey: '#7D8C95',
      white: '#FFFFFF',
    },
    accent: {
      yellow: '#FDE9C1',
      grey1: '#90ADBF',
      grey2: '#B2C8D5',
      grey3: '#DDEBF5',
    },
    success: {
      contrastText: '#FFFFFF',
      dark: colors.green[900],
      main: colors.green[600],
      light: colors.green[400],
    },
    info: {
      contrastText: '#FFFFFF',
      dark: colors.blue[900],
      main: colors.blue[600],
      light: colors.blue[400],
    },
    warning: {
      contrastText: '#FFFFFF',
      dark: colors.orange[900],
      main: colors.orange[600],
      light: colors.orange[400],
    },
    error: {
      contrastText: '#FFFFFF',
      dark: colors.red[900],
      main: colors.red[600],
      light: colors.red[400],
    },
    deny: {
      contrastText: '#FFFFFF',
      dark: colors.red[900],
      main: colors.red[600],
      light: colors.red[400],
    },
    inactive: {
      contrastText: '#FFFFFF',
      dark: colors.grey[900],
      main: colors.grey[600],
      light: colors.grey[400],
    },
  },
  typography: {
    fontFamily: '"Open Sans", sans-serif',
    fontWeightMedium: 600,
    fontWeightHeavy: 800,
    h1: {
      fontSize: `${40 / 16}rem`,
      fontWeight: 600,
    },
    h2: {
      fontSize: `${32 / 16}rem`,
      fontWeight: 600,
    },
    h3: {
      fontSize: `${28 / 16}rem`,
      fontWeight: 400,
    },
    h4: {
      fontSize: `${22 / 16}rem`,
      fontWeight: 700,
    },
    h5: {
      fontSize: `${16 / 16}rem`,
      fontWeight: 800,
    },
    h6: {
      fontSize: `${16 / 16}rem`,
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: `${22 / 16}rem`,
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: `${18 / 16}rem`,
      fontWeight: 800,
      textTransform: 'uppercase',
    },
    body1: {
      fontSize: `${16 / 16}rem`,
      lineHeight: 28 / 16,
      fontWeight: 400,
    },
    body2: {
      fontSize: `${14 / 16}rem`,
      fontWeight: 400,
    },
    button: {
      fontSize: `${16 / 16}rem`,
      fontWeight: 800,
    },
  },
  breakpoints: {
    // values copied from bulma framework (used for original marketing site)
    values: {
      xs: 0,
      sm: 768,
      md: 1024,
      lg: 1216,
      xl: 1408,
    },
  },
});

theme.shadows[1] = '0px 2px 11px rgba(34, 47, 113, 0.211532)';

export default theme;
