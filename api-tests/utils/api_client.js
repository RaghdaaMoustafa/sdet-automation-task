const request = require('supertest');

// The mock-user-auth service is running at localhost:3000
const baseUrl = 'http://localhost:3000';  

module.exports = {
    request: () => request(baseUrl),
};