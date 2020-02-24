'use strict';
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chai_http = require('chai-http');
const route = require('../app.js');

chai.use(chai_http);
let should = chai.should();

// users page testing
// POST search for a user
describe('POST/  /api/users/search', () => {
    it('it should load a specified users data', (done) =>{
        chai.request(route)
        .post('/api/users/search')
        .send({"userId": "richy"})
        .end((err, result) => {
            result.should.have.status(200);
            result.should.be.json;
            result.body.should.have.property('success');
            result.body.message[0].should.have.a.property('userid');
            result.body.message[0].should.have.a.property('first_name');
            result.body.message[0].should.have.a.property('second_name');
        done();
        });
    });
});

// POST create a new user
describe('POST/  /api/users/create', () => {
    it('it should create new user and return id', (done) =>{
        chai.request(route)
        .post('/api/users/create')
        .send({"firstName": "joe", "lastName": "bloggs", "email": "joe.bloggs@email.co.uk", "dofb": "2000-02-14" })
        .end((err, result) => {-
            result.should.have.status(200);
            result.should.be.json;
            result.body.should.have.property('success');
            result.body.message.should.have.a.property('userId');
        done();
        });
    });
});
// PUT edit details for existing user
describe('PUT/  /api/users/edit', () => {
    it('it should allow specified user (userId) fields to be edited', (done) =>{
        chai.request(route)
        .put('/api/users/edit')
        .send({"userid": "josey", "first_name": "Joanna" })
        .end((err, result) => {
            result.should.have.status(200);
            result.should.be.json;
            result.body.should.have.property('updated');
            result.body.should.have.property('success');
            result.body.message.should.have.a.property("outcome")
        done();
        });
    });
});

// DELETE an existing user
describe('DELETE/  /api/users/delete', () => {
    it('it should allow specified user (userId) deleted', (done) =>{
        chai.request(route)
        .delete('/api/users/delete'+result.body[0].userId)
        .end((err, result) => {
            result.should.have.status(200);
            result.should.be.json;
            result.body.should.have.property('REMOVED');
        done();
        });
    });
});
// POST album tag an existing user
describe('POST/  /api/users/tag', () => {
    it('it should add an album tag to an existing user', (done) =>{
        chai.request(route)
        .post('/api/users/tag')
        .send({"userId": "user id", "tag": "holiday_2017" })
        .end((err, result) => {
            result.should.have.status(200);
            result.should.be.json;
            result.body.should.have.property('SUCCESS');
        done();
        });
    });
});
// DELETE an album tag for an existing user
describe('DELETE/  /api/users/tag', () => {
    it('it should allow an album tag to be removed from the specified user', (done) =>{
        chai.request(route)
        .delete('/api/users/tag'+result.body[0].userId)
        .end((err, result) => {
            result.should.have.status(200);
            result.should.be.json;
            result.body.should.have.property('REMOVED');
        done();
        });
    });
});
// GET an existing user profile
describe('GET/  /api/users/:userId', () => {
    it('it should load a specified users data', (done) =>{
        chai.request(route)
        .get('/api/users/:userId')
        .end((err, result) => {
            result.should.have.status(200);
            result.should.be.json;
            result.body.should.have.property('SUCCESS');
            result.body.SUCCESS.should.have.a.property('userId');
            result.body.SUCCESS.should.have.a.property('first_name');
            result.body.SUCCESS.should.have.a.property('last_name');
        done();
        });
    });
});

// admin page testing
// PUT new password or my_userId or email
describe('PUT/  /api/admin/edit', () => {
    it('it should allow main user (my_userId) fields to be edited', (done) =>{
        chai.request(route)
        .put('/api/admin/edit'+result.body[0].my_userId)
        .send({"password":"new_password", "my_userId": "new_myuserid", "email": "new email" })
        .end((err, result) => {
            result.should.have.status(200);
            result.should.be.json;
            result.body.should.have.property('UPDATED');
        done();
        });
    });
});

// DELETE account
describe('DELETE/  /api/admin/delete', () => {
    it('it should allow an owning user to delete account', (done) =>{
        chai.request(route)
        .delete('/api/admin/delete'+result.body[0].userId)
        .end((err, result) => {
            result.should.have.status(200);
            result.should.be.json;
            result.body.should.have.property('REMOVED');
        done();
        });
    });
});

// albums page testing
// POST to create new album


// PUT to alter album title
// POST to upload photos or videos to album
// POST to tag album
// PUT to alter album tag
// DELETE to delete album tag
// DELETE to delete videos or photos from album
// POST to tag a photo or video
// DELETE to untag a photo or video
// POST to add a message to photo or video
// DELETE to remove a message from photo or video
// PUT to edit a message for a photo or video
// GET to keyword search all tagged albums
// GET to keyword search all tagged photos/videos