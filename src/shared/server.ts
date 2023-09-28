import {rest} from 'msw';
import {setupServer} from 'msw/node';

import {mockProducts} from '../test/redux/mock-products';
import { Product } from '../@types/product';


export const handlers = [
  /*rest.delete("our api link", async (req, res, ctx)=>{
    const {id} = req.params;
    if(mockProducts.find(p=> p.id === Number(id))) {

      return res(
        ctx.json(true)
      )
    } else {
      return res(
        ctx.json(false)
      )
    }

  }),*/
  /*rest.post('our link', (req, res, ctx) =>{
    const data = req.bodyUsed
    console.log('data from mock server: ', data);
  }),*/
  rest.get('https://api.escuelajs.co/api/v1/products', (req, res, ctx) =>{
    return res(ctx.json(mockProducts))
  }),
  rest.get(`https://api.escuelajs.co/api/v1/products/:id`, (req, res, ctx) =>{
    const {id} = req.params;
    const mockProduct = mockProducts.find(p=> p.id === Number(id))

    if(mockProduct) {
      return res(
        ctx.json(mockProduct)
        )
      } else {
      return res(
        ctx.json("Product Not Found")
        )
      }
    }), 
    rest.get(`https://api.escuelajs.co/api/v1/products/title=:title`, (req, res, ctx) =>{
      const {title} = req.params
      const queryResult = mockProducts.filter(p =>p.title.toLowerCase().includes(title.toString()));
      
      if(title && queryResult.length>0) {
        return res(
          ctx.json(queryResult)
        )
      } else {
        return res(
          ctx.json("Product Not Found")
        )
      }
    }),
    rest.post('https://api.escuelajs.co/api/v1/products/', async (req, res, ctx) => {
      const newProduct = await req.json().then(response => {return response});
      mockProducts.push(newProduct)
      console.log('res: ', res(ctx.json(newProduct) ));

      return res(
        ctx.status(200),
        ctx.json(newProduct) 
      );
    })

]

const server = setupServer(...handlers);
export default server;
