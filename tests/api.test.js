const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

// describe("GET /product endpoints", () => {
//     it("should return status 200 Ok", async () => {
//         const res = await api.get('/api/v1/product');
//         expect(res.status).toEqual(200);

//     });

//     it("the property data should be returned in body", async () => {
//         const res = await api.get('/api/v1/product');
//         expect(res.body).toHaveProperty('data');
//     });

//     it("the data returned in body should be json type", async () => {
//         const res = await api.get('/api/v1/product');
//         expect(res.type).toEqual(expect.stringContaining('json'));
//     });

//     it("data returned should have seller address", async () => {
//         const res = await api.get('/api/v1/product');
//         // console.log(res.body)
//         expect(res.body.data.sellerAddress).toBeDefined();
//     });

// });

describe("GET /non-existent router should return a 404", () => {
    it("a call to /non-existent should not return any valid data", async () => {
        const res = await api.get('/api/v1/non-existent');
        expect(res.status).toBe(404);
    });
});