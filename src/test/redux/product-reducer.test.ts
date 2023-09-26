/* describe("Testing number comparison", () => {
    it("Test if 2 is greater than 0", () => {
        expect(2).toBeGreaterThan(0)
    })

    test("Test if 2 is greater than 5", () => {
        expect(2).toBeGreaterThan(5)
    })
})

describe("Test array comparison", () => {
    const fruits = ['apple', 'mango', 'grape']
    test("compare fruit array", () => {
        expect(['apple']).not.toMatchObject(fruits)
    })
}) */

import { PayloadAction } from "@reduxjs/toolkit";
import productQueries, { deleteProduct, getProducts, initialState } from "../../redux/api-queries/product-queries";
//import { createStore } from "../../redux/store";
import { mockProducts } from "./mock-products";
import {Product} from "../../@types/product";
import server from "../../shared/server";

let store = createStore()

beforeEach(() => {
    store = createStore()
})

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe("Test normal actions in productsReducer", () => {
    /*     test("Should return initial state", () => {
            expect(store.getState().productsReducer.products).toMatchObject([])
        }) */
    /* test("Should sort the products by price asc", () => {
        // 2 ways to disptach an actions
        // 1. get the store and call store.dispatch()
        // 2. get the reducer and call the reducer with state and action
        

        // 1st: get the store and dispatch
        // sortByPrice() -> return { payload: "asc" | "desc"; type: "products/sortByPrice"; }
        store.dispatch(setUpState(productsData))
        store.dispatch(sortByPrice("asc"))
        const products = store.getState().productsReducer.products
        expect(products[0]).toBe(productsData[1])
        expect(products[1]).toBe(productsData[2])
    }) */

    /* test("Should return initial state", () => {
        expect(store.getState().productsReducer.products).toMatchObject([])
    }) */

    /*test("Should sort products by price desc", () => {
        const state: ProductsReducerState = {
            products: mockProducts,
            loading: false,
            error: ""
        }
        const products = productQueries(state, sortByPrice("desc")).products
        expect(products[0]).toBe(productsData[0])
        expect(products[1]).toBe(productsData[2])
    })*/

    test("Should return initial state", () => {
        const state = productQueries(initialState, {
            payload: undefined,
            type: undefined
        })
        expect(state).toMatchObject(initialState)
    })
})

describe("Test async thunk actions in productsReducer", () => {
    test("Should fetch all products with pagination", async () => {
        await store.dispatch(getProducts({ limit: 20, offset: 0 }))
        expect(store.getState().productsReducer.products.length).toBe(20)
    })
    test("Should fetch all products with pagination - 2nd way", () => {
        const returnedActionFromFetch: PayloadAction<Product[] | Error> = {
            type: getProducts.fulfilled.type,
            payload: mockProducts
        }
        const state = productQueries(initialState, returnedActionFromFetch)
        expect(state.products.length).toBe(3)
    })
    test("Should delete an existing product", async () => {
        const resultAction = await store.dispatch(deleteProduct(10))
        expect(resultAction.payload).toBe(10)
    })
    test("Should delete an non-existing product", async () => {
        const resultAction = await store.dispatch(deleteProduct(1))
        expect(resultAction.payload).toBe("Cannot delete")
    })
    test("should create product", () => {
        
    })
})