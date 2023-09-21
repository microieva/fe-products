import { AppState } from "../../shared/store"

export const getFiltered = (state: AppState, searchTerm?: string) => {
  return state.products.products.filter(p => p.title.toLowerCase().includes(searchTerm?.toLowerCase() || ''))
}