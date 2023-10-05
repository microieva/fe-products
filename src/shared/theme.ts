import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'aquamarine'
          },
          '&  .MuiInputBase-root.Mui-focused:after': {
            borderBottom: '2px aquamarine solid', 
          }
        }
      },
    },
    MuiDialog: {
      defaultProps: {
        onClick: (e) => e.stopPropagation(),
        BackdropProps: {
          sx: {
            pointerEvents: 'none',
          },
        },
      },
    },
  },
});

