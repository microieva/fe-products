import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { waitFor, fetchMock } from '@testing-library/react'; // Import waitFor
import productReducer, {
  useGetProductsQuery
} from '../../redux/api-queries/product-queries'; // Update the import path as needed
import { configureStore } from '@reduxjs/toolkit';
import { WrapperProps, wrapper } from './provider-wrapper';

import { mockProducts } from './mock-products';

// Mock a successful response for the getProducts query
const mockGetProductsResponse = [
  {
    id: 1,
    name: 'Product 1',
    price: 10,
  },
  {
    id: 2,
    name: 'Product 2',
    price: 20,
  },
];

test('should fetch products successfully', async () => {
  // Render the hook
  const { result, waitForNextUpdate } = renderHook(() => useGetProductsQuery());

  // Mock the API response
  fetchMock.mockOnce(JSON.stringify(mockProducts));

  // Wait for the query to resolve
  await waitForNextUpdate();

  // Check if the loading state is false
  expect(result.current.isLoading).toBe(false);

  // Check if the error state is null
  expect(result.current.error).toBe(null);

  // Check if the data matches the mocked response
  expect(result.current.data).toEqual(mockProducts);
});
