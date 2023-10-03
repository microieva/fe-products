import { FontStyle } from "@mui/material/styles/createTypography";
import { Product } from "./product";

export interface Column {
  bold?: FontStyle | undefined
  id: 'title' | 'price' | 'category',
  label: string,
  minWidth?: number,
  align?: 'right',
  render?: (row: Product) => string,
}
