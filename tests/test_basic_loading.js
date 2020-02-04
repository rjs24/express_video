'use strict';
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chai_http = require('chai-http');
const route = require('../app.js');

chai.use(chai_http);
let should = chai.should();

// test the apis routes
describe('GET/ ', () => {
    it('it should load homepage', (done) =>{
        chai.request(route)
        .get('/')
        .end((err, result) => {
            result.should.have.status(200);
            result.should.be.html;
        done();
        });
    });
});

describe('GET/  /users', () => {
    it('it should load current users data', (done) =>{
        chai.request(route)
        .get('/users')
        .end((err, result) => {
            result.should.have.status(200);
            result.should.be.string;
        done();
        });
    });
});

describe('GET/ /albums', () => {
    it('it should load albums of photos and videos', (done) =>{
        chai.request(route)
        .get('/albums')
        .end((err, result) => {
            result.should.have.status(200);
            result.should.be.string;
        done();
        });
    });
});

describe('GET/ /admin', () => {
    it('it should load admin page', (done) =>{
        chai.request(route)
        .get('/admin')
        .end((err, result) => {
            result.should.have.status(200);
            result.should.be.string;
        done();
        });
    });
});

describe('GET/ /login', () => {
    it('it should load login page', (done) =>{
        chai.request(route)
        .get('/login')
        .end((err, result) => {
            result.should.have.status(200);
            result.should.be.html;
            done();
        });
    });
});