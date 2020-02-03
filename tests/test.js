'use strict';
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chai_http = require('chai-http');
const route = require('../routes/');

chai.use(chai_http);
let should = chai.should();

// test the apis routes
describe('GET/ ', () => {
    it('it should load homepage', (done) =>{
        chai.request(route)
        .get('/')
        .end((err, result) => {
            result.should.have.status(200);
            result.should.be.a('array');
        done();
        });
    });
});

describe('GET/  api/users', () => {
    it('it should load users page and data', (done) =>{
        chai.request(route)
        .get('api/users')
        .end((err, result) => {
            result.should.have.status(200);
            result.should.be.a('array');
        done();
        });
    });
});

describe('GET/ api/albums', () => {
    it('it should load albums of photos and videos', (done) =>{
        chai.request(route)
        .get('api/albums')
        .end((err, result) => {
            result.should.have.status(200);
            result.should.be.a('array');
        done();
        });
    });
});

describe('GET/ api/admin', () => {
    it('it should load admin page', (done) =>{
        chai.request(route)
        .get('api/admin')
        .end((err, result) => {
            result.should.have.status(200);
            result.should.be.a('array');
        done();
        });
    });
});

describe('GET/ login', () => {
    it('it should load login page', (done) =>{
        chai.request(route)
        .get('/login')
        .end((err, result) => {
            result.should.have.status(200);
            result.should.be.a('array');
            done();
        });
    });
});