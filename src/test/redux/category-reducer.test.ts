import server from "../../servers/category-server";
import { mockCategories } from "../../shared/mock-categories";
import { store } from "../../shared/store";
import categoryQueries from "../../redux/api-queries/category-queries";
import { Product } from "../../@types/product";

describe('categories', () => {

  beforeAll(()=> {
    server.listen()
  })
  afterAll(()=>{
    server.close()
  })
  afterEach(() => server.resetHandlers())

  it('Should get all categories', async () => {
    await store.dispatch(categoryQueries.endpoints.getCategories.initiate(undefined));
    expect(store.getState().categoryReducer.queries['getCategories(undefined)']?.data).toMatchObject(mockCategories);
  }),
  it('Should get all products from the same category', async () => {
    const categoryId = "1";
    const result = await store.dispatch(categoryQueries.endpoints.getProductsByCategory.initiate(categoryId));
    expect(result.data?.every((product: Product) => product.category.id === 1)).toBe(true);
  })
})