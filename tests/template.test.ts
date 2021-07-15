import * as chai from 'chai';
import chaiHttp = require("chai-http")
import * as request from 'supertest';
import * as mongoose from'mongoose';
import {Email, EmailDocument} from '../index'

// let chaiHttp = require('chai-http');
let expect = chai.expect;
let should = chai.should();
chai.use(chaiHttp);


let server = require("../server.js");
let {DB} = require("../database/template_model");


let exampleEmail:Email = {
    email: "example@example.com",
    message: "Lorem ipsum",
    createdDate: new Date(),
}

/**
 * Uses the mongoDB Database. It's seperate from the database used in www.js
 */

describe("Connects to database", function () {
    it("Should connect without error", function () {
      try {
        let mongoDB = 'mongodb://127.0.0.1/email_sender_test';
        mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
        let db = mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
      }
      catch {
        throw new Error('Cannot connect to database');
      }
    });
});

describe("Email", () => {
    // GET email
    beforeEach(function() {  
        DB.remove({})
    })
    describe("/GET Email", () => { 
        let id:string; // Will contain the id for the update route

        // Inserts data to /GET before the testing
        before(function() {  
            let email:EmailDocument = new DB ( 
                {
                    email: exampleEmail.email,
                    message: exampleEmail.message,
                    createdDate: exampleEmail.createdDate
                }
            )
            email.save(function (err) {
                if(err) console.error(err)
            });
            id = email._id;
        })
        // /GET several tickets
        it("it should /GET several and return 200", (done) => {
            chai
            .request(server)
            .get("/api/email/" )
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });

        // /GET one ticket
        it("it should /GET one return 200", (done) => {
            chai
            .request(server)
            .get("/api/email/" + id)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });

    // POST email
    describe("/POST Email", () => {
        it("it should return 201", (done) => {
            chai
            .request(server)
            .post("/api/email/")
            .send(exampleEmail)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
        });
    });

    // PUT email
    describe("/UPDATE Email", () => {
        let id:string; // Will contain the id for the update route

        // Inserts data to /UPDATE before the testing
        before(function() {  
            let email:EmailDocument = new DB ( 
                {
                    email: exampleEmail.email,
                    message: exampleEmail.message,
                    createdDate: exampleEmail.createdDate
                }
            )
            email.save(function (err) {
                if(err) console.error(err)
            });
            id = email._id
        })
        it("it should return 201", (done) => {
            chai
            .request(server)
            .put("/api/email/" + id)
            .send(exampleEmail)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
        });
    });

    // DELETE email
    describe("/DELETE Email", () => {
        let id:string; // Will contain the id for the delete route

        // Inserts data to /DELETE before the testing
        before(function() {  
            let email:EmailDocument = new DB ( 
                {
                    email: exampleEmail.email,
                    message: exampleEmail.message,
                    createdDate: exampleEmail.createdDate
                }
            )
            email.save(function (err) {
                if(err) console.error(err)
            });
            id = email._id
        })

        it("it should return 200", (done) => {
            chai
            .request(server)
            .delete("/api/email/" + id)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });
})
