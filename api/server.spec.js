const request = require("supertest");

const server = require("./server.js");

describe("server.js", () => {
    describe("GET '/'", () => {
        // test response status code
        it("should return 200", async () => {
            const res = await request(server).get("/");

            expect(res.status).toBe(200);
        });
    });
});
