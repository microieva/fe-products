import server from "../servers/category-server";
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
  it('Should get one category object with id = 1', async () => {
    const id: number = 1;
    await store.dispatch(categoryQueries.endpoints.getCategoryById.initiate(id));
    expect(store.getState().categoryReducer.queries[`getCategoryById(${id})`]?.data).toMatchObject(mockCategories[0]);
  }),
  it('Should get all products from the same category', async () => {
    const categoryId: number = 1;
    const result = await store.dispatch(categoryQueries.endpoints.getProductsByCategory.initiate(categoryId));
    expect(result.data?.every((product: Product) => product.category.id === 1)).toBe(true);
  })
})