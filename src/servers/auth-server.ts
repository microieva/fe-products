import {rest} from 'msw';
import {setupServer} from 'msw/node';

import { mockUser, mockToken } from '../shared/mock-auth';

export const handlers = [
  rest.post('https://api.escuelajs.co/api/v1/auth/login', async (req, res, ctx)=>{
    const { email, password } = await req.json();

    if (mockUser.email === email && mockUser.password === password) {
      return res(
        ctx.json({access_token: mockToken.access_token, refresh_token: mockToken.refresh_token})
      )
    } else {
      return res(
        ctx.status(401)
      );
    }
  }),
  rest.get('https://api.escuelajs.co/api/v1/auth/profile', async (req, res, ctx)=>{
    const body = req.params;
    if (body.data === mockToken.access_token) {
      return res(
        ctx.json({email: mockUser.email, password: mockUser.password})
      )
    } else {
      return res(
        ctx.status(401)
      );
    }
  })
];

const server = setupServer(...handlers);
export default server;