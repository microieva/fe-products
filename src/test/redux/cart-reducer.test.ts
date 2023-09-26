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
import cart, { initialState, addItem, removeItem } from "../../redux/app-reducers/cart";
import {createStore} from "../../redux/store"
import { ProductsReducerState } from "../../types/ProductsReducerState"
import { productsData } from "../data/productsData"
import Product from "../../types/Product"

let store = createStore()
beforeEach(() => {
    store = createStore()
})

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

    test("Should sort products by price desc", () => {
        const state: ProductsReducerState = {
            products: productsData,
            loading: false,
            error: ""
        }
        const products = productsReducer(state, sortByPrice("desc")).products
        expect(products[0]).toBe(productsData[0])
        expect(products[1]).toBe(productsData[2])
    })

    test("Should return initial state", () => {
        const state = productsReducer(initialState, {
            payload: undefined,
            type: undefined
        })
        expect(state).toMatchObject(initialState)
    })
})

describe("Test async thunk actions in productsReducer", () => {
    /*test("Should fetch all products with pagination", async () => {
        await store.dispatch(fetchAllProductAsync({ limit: 20, offset: 0 }))
        expect(store.getState().productsReducer.products.length).toBe(20)
    })*/
    test("Should fetch all products with pagination - 2nd way", () => { // this is the way for testing fetching with createApi testing state!!! cause we are not testing api calls
        const returnedActionFromFetch: PayloadAction<Product[] | Error> = {
            type: fetchAllProductAsync.fulfilled.type,
            payload: productsData
        }
        const state = productsReducer(initialState, returnedActionFromFetch)
        expect(state.products.length).toBe(3)
    })

    
})




// import cartReducer, { addItem, removeItem } from '../../redux/app-reducers/cart'; // Import the reducer and action creators
// import {CartItem} from '../../@types/cart';

// describe('cart', () => {
//   it('should add an item to the cart', () => {
//     const initialState: CartItem[] = [];
//     const productToAdd = { id: 1, name: 'Product 1' };

//     // Dispatch the addItem action with the initial state
//     const newState = cartReducer(initialState, addItem(productToAdd));

//     // Assert that the item was added to the cart
//     expect(newState).toEqual([{ ...productToAdd, quantity: 1 }]);
//   });

//   it('should increment quantity when adding the same item again', () => {
//     const initialState = [{ id: 1, name: 'Product 1', quantity: 1 }];
//     const productToAdd = { id: 1, name: 'Product 1' };

//     // Dispatch the addItem action with the initial state
//     const newState = cartReducer(initialState, addItem(productToAdd));

//     // Assert that the quantity was incremented
//     expect(newState).toEqual([{ ...productToAdd, quantity: 2 }]);
//   });

//   it('should remove an item from the cart', () => {
//     const initialState = [{ id: 1, name: 'Product 1', quantity: 1 }];

//     // Dispatch the removeItem action with the initial state
//     const newState = cartReducer(initialState, removeItem(1));

//     // Assert that the item was removed from the cart
//     expect(newState).toEqual([]);
//   });

//   it('should decrement quantity when removing an item with quantity > 1', () => {
//     const initialState = [{ id: 1, name: 'Product 1', quantity: 2 }];

//     // Dispatch the removeItem action with the initial state
//     const newState = cartReducer(initialState, removeItem(1));

//     // Assert that the quantity was decremented
//     expect(newState).toEqual([{ id: 1, name: 'Product 1', quantity: 1 }]);
//   });

//   it('should remove an item from the cart when quantity is 1', () => {
//     const initialState = [{ id: 1, name: 'Product 1', quantity: 1 }];

//     // Dispatch the removeItem action with the initial state
//     const newState = cartReducer(initialState, removeItem(1));

//     // Assert that the item was removed from the cart
//     expect(newState).toEqual([]);
//   });
// });
