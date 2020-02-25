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

// POST add a connection for a user
describe('POST/  /api/users/add_connection', () => {
    it('it should allow specified user to add a connection ', (done) =>{
        chai.request(route)
        .put('/api/users/add_connection')
        .send({"userid": "josey", "connection": "richy" })
        .end((err, result) => {
            result.should.have.status(200);
            result.should.be.json;
            result.body.should.have.property('connected');
            result.body.should.have.property('success');
            result.body.message.should.have.a.property("outcome")
        done();
        });
    });
});

// DELETE remove a connection for a user
describe('POST/  /api/users/remove_connection', () => {
    it('it should allow specified user to remove a connection ', (done) =>{
        chai.request(route)
        .put('/api/users/add_connection')
        .send({"userid": "josey", "connection": "richy" })
        .end((err, result) => {
            result.should.have.status(200);
            result.should.be.json;
            result.body.should.have.property('connected');
            result.body.should.have.property('success');
            result.body.message.should.have.a.property("outcome")
        done();
        });
    });
});

// admin functions
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
// POST to breate new album
describe('POST/  /api/albums/create', () => {
    it('it should create new album and return album_id', (done) =>{
        chai.request(route)
        .post('/api/albums/create')
        .send({"album_title": "ibiza holiday", "year": "2002", "album_id": "ibiz02", "location": "./richy/ibiz02/", "access": ["richy"] })
        .end((err, result) => {-
            result.should.have.status(200);
            result.should.be.json;
            result.body.should.have.property('success');
            result.body.message.should.have.a.property('album_id');
        done();
        });
    });
});

// albums page testing
// POST to create new album
describe('POST/  /api/albums/create', () => {
    it('it should create new album and return album_id', (done) =>{
        chai.request(route)
        .post('/api/albums/create')
        .send({"album_title": "ibiza holiday", "year": "2002", "album_id": "ibiz02", "location": "./richy/ibiz02/", "access": ["richy"] })
        .end((err, result) => {-
            result.should.have.status(200);
            result.should.be.json;
            result.body.should.have.property('success');
            result.body.message.should.have.a.property('album_id');
        done();
        });
    });
});

// PUT to alter album title
describe('PUT/  /api/albums/edit', () => {
    it('it should allow an album attribute tobe edited execept unique album_id', (done) =>{
        chai.request(route)
        .put('/api/albums/edit')
        .send({"album_id": "ibiz02", "album_title": "ibiza rocks" })
        .end((err, result) => {
            result.should.have.status(200);
            result.should.be.json;
            result.body.should.have.property('success');
            result.body.message.should.have.a.property("outcome")
        done();
        });
    });
});
// POST to upload photos or videos to album
describe('POST/  /api/albums/upload', () => {
    it('it should upload videos or photos', (done) =>{
        chai.request(route)
        .post('/api/albums/upload')
        .send({"album_id": "ibiz02", "location": "./richy/ibiz02/", "filename": "ibiza_beach.jpg", "target_location": "./richy/ibiz02/" })
        .end((err, result) => {-
            result.should.have.status(200);
            result.should.be.json;
            result.body.should.have.property('success');
            result.body.message.should.have.a.property('outcome');
        done();
        });
    });
});
// POST add username to access list for album
describe('POST/  /api/albums/add_username', () => {
    it('it should add a username to the access array attribute', (done) =>{
        chai.request(route)
        .post('/api/albums/add_username')
        .send({"userid": "richy", "userid_to_add": "josey" })
        .end((err, result) => {-
            result.should.have.status(200);
            result.should.be.json;
            result.body.should.have.property('success');
        done();
        });
    });
});

// DELETE to remove username from access_list for album
describe('DELETE/  /api/albums/remove_username', () => {
    it('it should remove specified user to remove a connection ', (done) =>{
        chai.request(route)
        .put('/api/albums/remove_username')
        .send({"userid": "richy", "userid_to_remove": "josey" })
        .end((err, result) => {
            result.should.have.status(200);
            result.should.be.json;
            result.body.should.have.property('success');
        done();
        });
    });
});

// DELETE to delete videos or photos from album
describe('DELETE/  /api/albums/delete', () => {
    it('it should delete videos or photos', (done) =>{
        chai.request(route)
        .post('/api/albums/delete')
        .send({"album_id": "ibiz02", "location": "./richy/ibiz02/", "filename": "ibiza_beach.jpg", "target_location": "./richy/ibiz02/" })
        .end((err, result) => {-
            result.should.have.status(200);
            result.should.be.json;
            result.body.should.have.property('success');
            result.body.message.should.have.a.property('outcome');
        done();
        });
    });
});

// POST to tag a photo or video
describe('POST/  /api/albums/tag', () => {
    it('it should add a tag to a specific photo or video', (done) =>{
        chai.request(route)
        .post('/api/albums/tag')
        .send({"album_id": "ibiz02", "location": "./richy/ibiz02/", "filename": "ibiza_beach.jpg", "target_location": "./richy/ibiz02/", "userid": "richy", "tag": "sunny beach"  })
        .end((err, result) => {-
            result.should.have.status(200);
            result.should.be.json;
            result.body.should.have.property('success');
        done();
        });
    });
});

// DELETE to untag a photo or video
describe('POST/  /api/albums/remove_tag', () => {
    it('it should remove a tag to a specific photo or video', (done) =>{
        chai.request(route)
        .post('/api/albums/remove_tag')
        .send({"album_id": "ibiz02", "location": "./richy/ibiz02/", "filename": "ibiza_beach.jpg", "target_location": "./richy/ibiz02/", "userid": "richy", "tag": "sunny beach"  })
        .end((err, result) => {-
            result.should.have.status(200);
            result.should.be.json;
            result.body.should.have.property('success');
        done();
        });
    });
});

// POST to add a message to photo or video#
describe('POST/  /api/albums/add_mess', () => {
    it('it should add a message to a specific photo or video', (done) =>{
        chai.request(route)
        .post('/api/albums/add_mess')
        .send({"album_id": "ibiz02", "location": "./richy/ibiz02/", "filename": "ibiza_beach.jpg", "target_location": "./richy/ibiz02/", "userid": "richy", "message": ["remember that dog?"]  })
        .end((err, result) => {-
            result.should.have.status(200);
            result.should.be.json;
            result.body.should.have.property('success');
        done();
        });
    });
});
// DELETE to remove a message from photo or video
describe('POST/  /api/albums/remove_message', () => {
    it('it should remove a tag to a specific photo or video', (done) =>{
        chai.request(route)
        .post('/api/albums/remove_message')
        .send({"album_id": "ibiz02", "location": "./richy/ibiz02/", "filename": "ibiza_beach.jpg", "target_location": "./richy/ibiz02/", "userid": "richy", "tag": "sunny beach", "message_to_rm": "dog" })
        .end((err, result) => {-
            result.should.have.status(200);
            result.should.be.json;
            result.body.should.have.property('success');
        done();
        });
    });
});
// PUT to edit a message for a photo or video
describe('POST/  /api/albums/edit_mess', () => {
    it('it should edit a message related to a specific photo or video', (done) =>{
        chai.request(route)
        .post('/api/albums/edit_mess')
        .send({"album_id": "ibiz02", "location": "./richy/ibiz02/", "filename": "ibiza_beach.jpg", "target_location": "./richy/ibiz02/", "userid": "richy", "original_message": "dog", "replacement_mess": "remember cat?"  })
        .end((err, result) => {-
            result.should.have.status(200);
            result.should.be.json;
            result.body.should.have.property('success');
        done();
        });
    });
});
// POST to keyword search all tagged photos/videos
describe('POST/  /api/albums/search_tags', () => {
    it('it should add a message to a specific photo or video', (done) =>{
        chai.request(route)
        .post('/api/albums/search_tags')
        .send({"userid": "richy", "keyword": "sunny"  })
        .end((err, result) => {-
            result.should.have.status(200);
            result.should.be.json;
            result.body.should.have.property('success');
        done();
        });
    });
});