import * as chai from 'chai';
import chaiHttp = require("chai-http")
import * as request from 'supertest';
import * as mongoose from'mongoose';
// let chaiHttp = require('chai-http');
let expect = chai.expect;
let should = chai.should();
chai.use(chaiHttp);


let server = require("../server.js");
let DB = require("../database/template_model");

let exampleTemplate = {
    title: "This is a title",
    summary: "This test will be great",
    scheduledDate: "2022-03-29",
    array: ["Default", "values"]
}

/**
 * Uses the mongoDB Database. It's seperate from the database used in www.js
 */

describe("Connects to database", function () {
    it("Should connect without error", function () {
      try {
        var mongoDB = 'mongodb://127.0.0.1/automatic_endpoint_generator_test'; // *Variable
        mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
      }
      catch {
        throw new Error('Cannot connect to database');
      }
    });
});

describe("Promotion", () => {
    // GET template
    beforeEach(function() {  
        DB.remove({})
    })
    describe("/GET promotion", () => { // * Variable (Change the name of each endpoint)
        let id:string; // Will contain the id for the update route

        // Inserts data to /GET before the testing
        before(function() {  
            template = new DB ( // * Variable (change attributes)
                {
                    title: exampleTemplate.title,
                    summary: exampleTemplate.summary,
                    dateOfCreation: Date.now(),
                    array: exampleTemplate.array,
                    scheduledDate: exampleTemplate.scheduledDate
                }
            )
            template.save(function (err) {
                if(err) console.error(err)
            });
            id = template._id;
        })
        // /GET several tickets
        it("it should /GET several and return 200", (done) => {
            chai
            .request(server)
            .get("/api/template/" )
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });

        // /GET one ticket
        it("it should /GET one return 200", (done) => {
            chai
            .request(server)
            .get("/api/template/" + id)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });

    // POST template
    describe("/POST promotion", () => {
        it("it should return 201", (done) => {
            chai
            .request(server)
            .post("/api/template/")
            .send(exampleTemplate)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
        });
    });

    // PUT template
    describe("/UPDATE promotion", () => {
        let id; // Will contain the id for the update route

        // Inserts data to /UPDATE before the testing
        before(function() {  
            template = new DB ( // * Variable
                {
                    title: exampleTemplate.title,
                    summary: exampleTemplate.summary,
                    dateOfCreation: Date.now(),
                    array: exampleTemplate.array,
                    scheduledDate: exampleTemplate.scheduledDate
                }
            )
            template.save(function (err) {
                if(err) console.error(err)
            });
            id = template._id
        })
        it("it should return 201", (done) => {
            chai
            .request(server)
            .put("/api/template/" + id)
            .send(exampleTemplate)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
        });
    });

    // DELETE template
    describe("/DELETE promotion", () => {
        let id; // Will contain the id for the update route

        // Inserts data to /DELETE before the testing
        before(function() {  
            template = new DB ( // * Variable
                {
                    title: exampleTemplate.title,
                    summary: exampleTemplate.summary,
                    dateOfCreation: Date.now(),
                    array: exampleTemplate.array,
                    scheduledDate: exampleTemplate.scheduledDate
                }
            )
            template.save(function (err) {
                if(err) console.error(err)
            });
            id = template._id
        })

        it("it should return 200", (done) => {
            chai
            .request(server)
            .delete("/api/template/" + id)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });
})
