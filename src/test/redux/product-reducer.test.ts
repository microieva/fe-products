import productQueries from '../../redux/api-queries/product-queries';
import { store } from '../../shared/store';
import server from '../../shared/server';
import { mockProducts } from './mock-products';
import { Product } from '../../@types/product';

describe('products', () => {

  beforeAll(()=> {
    server.listen()
  })
  afterAll(()=>{
    server.close()
  })
  afterEach(() => server.resetHandlers())

  it('Should get all products', async () => {
    await store.dispatch(productQueries.endpoints.getProducts.initiate(undefined));
    //console.log('test: ', store.getState().productReducer.queries['getProducts(undefined)']?.data);

    expect(store.getState().productReducer.queries['getProducts(undefined)']?.data).toMatchObject(mockProducts);
  });

  it('Should get one product object by id = 8', async () => {
    const id: number = 8;
    await store.dispatch(productQueries.endpoints.getProductById.initiate(id));
    expect(store.getState().productReducer.queries[`getProductById(${id})`]?.data).toMatchObject(mockProducts[0]);
  });

  it('Should get an array with product id = 8 inside, by passed string query = nuevo', async () => {
    const query: string = "nuevo";
    await store.dispatch(productQueries.endpoints.filterProductsByTitle.initiate(query));
    expect(store.getState().productReducer.queries[`filterProductsByTitle("nuevo")`]?.data).toContainEqual(mockProducts[0]);
  });

  it('Should add new product test product', async () => {
    const newProduct: Partial<Product> =  { title: "New Product" };
    await store.dispatch(productQueries.endpoints.addProduct.initiate(newProduct));

    console.log(' - - - - - FROM TEST', store.getState().productReducer.mutations['addProduct(body)']?.data)
    expect(store.getState().productReducer.mutations['addProduct(newProduct)']?.data).toMatchObject(newProduct);
    expect(store.getState().productReducer.mutations['addProduct(newProduct)']?.status).toBe(200);
  });
})