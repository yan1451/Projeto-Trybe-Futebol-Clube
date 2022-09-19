import * as sinon from 'sinon';
import * as chai from 'chai';
/* import * as mocha from  'mocha'; */
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Quando há uma requisição POST para /login', () => {
  describe('Quando não é informado email e password', () => {
    let chaiHttpResponse: Response;
    before(async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send({});
    });

    it('Retorna status 400 -  Bad Request', () => {
      expect(chaiHttpResponse).to.have.status(400);
    });

    it('O corpo da resposta é um objeto', () => {
      expect(chaiHttpResponse.body).to.be.an('object');
    });

    it('O corpo da resposta tem a propriedade message', () => {
      expect(chaiHttpResponse.body).to.have.property('message');
    });


    it('A mensagem retornada é "All fields must be filled"', () => {
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    });
  });

  describe('Quando a pessoa usuária não existe ou a senha é inválida', () => {
    let chaiHttpResponse: Response;
    before(async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send({
          email: 'admin.com',
          password: 'admin_secret',
        });
    });
    it('Retorna status 401 -  UNAUTHORIZED', () => {
      expect(chaiHttpResponse).to.have.status(401);
    });

    it('O corpo da resposta é um objeto', () => {
      expect(chaiHttpResponse.body).to.be.an('object');
    });

    it('O corpo da resposta tem a propriedade message', () => {
      expect(chaiHttpResponse.body).to.have.property('message');
    });

    it('A mensagem retornada é "Incorrect email or password"', () => {
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
    });
  });
});


/**
 * Exemplo do uso de stubs com tipos
 */

    // let chaiHttpResponse: Response;

    // before(async () => {
    //   sinon
    //     .stub(Example, "findOne")
    //     .resolves({
    //       ...<Seu mock>
    //     } as Example);
    // });

    // after(()=>{
    //   (Example.findOne as sinon.SinonStub).restore();
    // })

    // it('...', async () => {
    //   chaiHttpResponse = await chai
    //      .request(app)
    //      ...

    //   expect(...)
    // });