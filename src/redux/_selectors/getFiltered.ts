import { Product } from "../../@types/product"
import { AppState } from "../../shared/store"

export const getFiltered = (data: Product[], searchTerm?: string) => {
  return data.filter(p => p.title.toLowerCase().includes(searchTerm?.toLowerCase() || ''))
}