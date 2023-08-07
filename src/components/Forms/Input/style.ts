import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

export const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#1976D2',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#0cc6ff',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#0cc6ff',
    },
    '&:hover fieldset': {
      borderColor: '#00bbff',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#00bbff',
    },
  },
});
