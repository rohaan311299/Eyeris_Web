let chai = require("chai");
let chaihttp = require("chai-http");
let index = require("../index.js");

const server = "http://localhost:5000"
//Assertion Style
chai.should();

chai.use(chaihttp);

describe("Users API",() => {
    // create a user
    describe("POST /api/v1/user/login",() => {
        it("Should Login a user",(done) => {
            const details = {
                "email": "bhavyalakhani@gmail.com",
                "password": "bhavya1"
            }

            chai.request(server)
            .post("/api/v1/user/login")
            .send((details))
            .end((err,response) => {
                response.should.have.status(200);
                response.body.should.have.property("token");
                done();
            })
        })
    })
})


