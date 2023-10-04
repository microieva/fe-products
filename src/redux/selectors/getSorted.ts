import { Product } from "../../@types/product";

export const getSorted = (
  data: Product[],
  order: 'asc' | 'desc',
  orderBy: keyof Product
) => {
  // Create a copy of the original array to avoid mutating the original data
  const sortedData = [...data];

  // Sort the data based on the orderBy and order parameters
  sortedData.sort((a, b) => {
    const valueA = a[orderBy];
    const valueB = b[orderBy];
        if (valueA && valueB) {
            if (order === 'asc' ) {
                if (valueA < valueB) {
                  return -1;
                }
                if (valueA > valueB) {
                  return 1;
                }
                return 0;
              } else {
                // When order is 'desc'
                if (valueA > valueB) {
                  return -1;
                }
                if (valueA < valueB) {
                  return 1;
                }
                return 0;
            }
        } else {
            return 0
        }
    });

    return sortedData;
};
