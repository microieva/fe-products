import { FontStyle } from "@mui/material/styles/createTypography";

export interface Column {
  bold?: FontStyle | undefined
  id: 'title' | 'price' | 'category',
  label: string,
  minWidth?: number,
  align?: 'right',
}
