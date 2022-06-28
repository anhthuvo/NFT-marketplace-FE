import { ThemeProvider } from 'styled-components';
import { theme as themeTailwind } from 'tailwind.config';

const theme = themeTailwind.extend;

export default ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;
