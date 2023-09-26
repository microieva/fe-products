import {rest} from 'msw';
import {setupServer} from 'msw/node';

import {mockProducts} from '../test/redux/mock-products';

export const handlers = [
  rest.delete("our api link", async (req, res, ctx)=>{
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

  }),
  rest.post('our link', (req, res, ctx) =>{
    const data = req.bodyUsed
    console.log('data from mock server: ', data);
  })
]

const server = setupServer(...handlers);
export default server;