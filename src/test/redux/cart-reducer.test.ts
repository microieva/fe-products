import cart, { addItem, removeItem } from '../../redux/app-reducers/cart';
import {CartItem} from '../../@types/cart';
import { store } from '../../shared/store';
import { Product } from '../../@types/product';

describe('cart', () => {

    it("Should return initial state", () => {
        expect(store.getState().cart).toMatchObject([]);
    }) 
    it('should add an item to the cart', () => {
        const initialState: CartItem[] = [];
        const itemToAdd: Product = {  
            id: 1,
            title: "XXX New Product",
            price: 10,
            description: "A description",
            categoryId: 1,
            category: {
                id: 1,
                name: 'category name',
                image: ''
            },
            images: ["https://placeimg.com/640/480/any"] 
        };
        const newState = cart(initialState, addItem(itemToAdd));
        expect(newState).toEqual([{ ...itemToAdd, quantity: 1 }]);
    });
    it('should remove an item from the cart', () => {
        const initialState: CartItem[] = [
            { 
                id: 1,
                title: "XXX New Product",
                price: 10,
                description: "A description",
                categoryId: 1,
                category: {
                    id: 1,
                    name: 'category name',
                    image: ''
                },
                images: ["https://placeimg.com/640/480/any"],
                quantity: 1
            }
        ];
        const newState = cart(initialState, removeItem(1));
        expect(newState).toEqual([]);
    });
});
