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
          }

        },
      },
    },
  },
});

export default theme;
