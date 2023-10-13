import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'aquamarine'
          },
          '&  .MuiInputBase-root.Mui-focused:after': {
            borderBottom: '2px aquamarine solid', 
          },
          '& .MuiFormHelperText-root': {
            color: 'orange'
          },
          '& .MuiFormControl-root.MuiTextField-root .MuiInputBase-root.MuiInput-root:before': {
            borderBottom: '1px darkgrey solid'
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

