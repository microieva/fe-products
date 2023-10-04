import { styled } from '@mui/material/styles';
import TableHead from '@mui/material/TableHead';

const CustomTableHead = styled(TableHead)(({ theme }) => ({
  "& th": {
    backgroundColor: 'aquamarine',
    fontSize: "16px",
    borderBottom: "1px solid black",
  },
}));

export default CustomTableHead;
