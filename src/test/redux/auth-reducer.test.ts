import { store } from '../../shared/store';
import server from '../../servers/auth-server';
import authQueries from '../../redux/api-queries/auth-queries';
import { mockUser, mockToken } from '../../shared/mock-auth';
import { LoginResponse, LoginRequest } from '../../@types/auth';

describe('authentification', () => {

  beforeAll(()=> {
    server.listen()
  })
  afterAll(()=>{
    server.close()
  })
  afterEach(() => server.resetHandlers())

  it('Should login the requesting user by recieving object = token', async () => {
    const loginRequest: LoginRequest =  {  
      email: 'ieva@email.com',
      password: 'admin'
    };
    const result: any = await store.dispatch(authQueries.endpoints.login.initiate(loginRequest));
    expect(result.data).toMatchObject(mockToken);
  });

  it('Should get logged in user', async ()=>{
    const access = mockToken.access_token;
    const result: any = await store.dispatch(authQueries.endpoints.getUser.initiate(access));
    expect(result.data).toMatchObject(mockUser);
  })
})