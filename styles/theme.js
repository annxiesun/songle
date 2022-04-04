import { createTheme } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#1F1D1D",
      light: "#393636",
    },
    secondary: {
      main: "#209348",
    },
  },
  typography: {
    h1: {
      fontFamily: 'Work Sans',
      color: 'white',
    },
    h2: {
      fontFamily: 'Work Sans',
      color: 'white',
    },
    h3: {
      fontFamily: 'Work Sans',
      fontSize: '24px',
      fontWeight: 600,
      color: 'white',
    },
    body1: {
      fontFamily: 'Work Sans',
      color: 'white',
    },
    body2: {
      fontFamily: 'Work Sans',
      color: 'white',
    }
  }
});

theme = createTheme(theme, {
  components: {
    MuiIconButton: {
      defaultProps: {
        variant: "contained",
        color: "secondary",
      },
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.secondary.main,
          '& svg': {
            fill: 'white',
            height: '52px',
            width: '52px',
          },
          '&:hover': {
            backgroundColor: theme.palette.secondary.main,
          },
          '&.Mui-disabled': {
            backgroundColor: 'grey',
          }
        },
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
      },
      styleOverrides: {
        root: {
          color: 'white',
          transition: '0.5s',
          '&:hover& fieldset': {
            border: `1px ${theme.palette.secondary.main} solid`,
            transition: '0.5s',
          },
          '&.Mui-focused& fieldset': {
            border: `1px ${theme.palette.secondary.main} solid`,
            transition: '0.5s',
          },
          '& fieldset': {
            transition: '0.5s',
            border: `1px grey solid`,
          }

        },
      },
    },
  },
});

export default theme;
