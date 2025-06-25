import { createTheme } from '@mui/material/styles';

export const customTheme = createTheme({
  palette: {
    primary: {
      main: '#ffb545', // Example: Orange primary color
    },
    secondary: {
      main: '#00c46a', // Example: Green secondary color
    },
  },
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: '#ececec',
          '&:hover': {
            backgroundColor: '#42484d', // Hover background color for selected page item
            color: '#fff',
          },
          '&.Mui-selected': {
            backgroundColor: '#ffb545', // Background color for selected page item
            color: '#000', // Text color for selected page item
          },
        },
      },
    },
  },
});
