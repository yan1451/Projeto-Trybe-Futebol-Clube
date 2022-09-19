import * as sinon from 'sinon';
import * as chai from 'chai';
/* import * as mocha from  'mocha'; */
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Quando há uma requisição GET para /matches/:id/finish', () => {
  describe('Quando a resquisição está correta!', () => {
    let chaiHttpResponse: Response;
    before(async () => {
      chaiHttpResponse = await chai.request(app)
        .get('/matches');
    });

    it('Retorna status 200 - OK', () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('O corpo da resposta é um Array', () => {
      expect(chaiHttpResponse.body).to.be.an('array');
    });
  });

  describe('Quando Inprogress é TRUE', () => {
    let chaiHttpResponse: Response;
    before(async () => {
      chaiHttpResponse = await chai.request(app)
        .patch('/matches/1/finish');
    });
    it('Retorna status 400 - OK', () => {
      expect(chaiHttpResponse).to.have.status(400);
    });

    it('O corpo da resposta é um objeto', () => {
      expect(chaiHttpResponse.body).to.be.an('object');
    });

    it('O corpo da resposta tem a propriedade message', () => {
      expect(chaiHttpResponse.body).to.have.property('message');
    });

    it('A mensagem retornada é "Esta partida ja foi finalizada"', () => {
      expect(chaiHttpResponse.body.message).to.be.equal('Esta partida ja foi finalizada');
    });
  });

  describe('Quando Inprogress é FALSE', () => {
    let chaiHttpResponse: Response;
    before(async () => {
      chaiHttpResponse = await chai.request(app)
        .patch('/matches/42/finish');
    });
    it('Retorna status 200 - OK', () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('O corpo da resposta é um objeto', () => {
      expect(chaiHttpResponse.body).to.be.an('object');
    });

    it('O corpo da resposta tem a propriedade message', () => {
      expect(chaiHttpResponse.body).to.have.property('message');
    });

    it('A mensagem retornada é "Jogo finalizado com sucesso!"', () => {
      expect(chaiHttpResponse.body.message).to.be.equal('Jogo finalizado com sucesso!');
    });
  });  
});