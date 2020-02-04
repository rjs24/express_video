'use strict';
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chai_http = require('chai-http');
const route = require('../app.js');

chai.use(chai_http);
let should = chai.should();

// users page testing
describe('GET/  /api/users', () => {
    it('it should load users page and data', (done) =>{
        chai.request(route)
        .('/api/users')
        .end((err, result) => {
            result.should.have.status(200);
            result.should.be.string;
        done();
        });
    });
});

// admin page testing


// albums page testing