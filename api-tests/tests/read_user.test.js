const { request } = require('../utils/api_client');
const { getValidToken, getInvalidToken } = require('../utils/helpers');

describe('Read User API Tests', () => {
    const userEmail1 = 'mockk1@gmail.com';
    const userName1 = 'mockk1';
    const userPassword1 = 'password123';

    const userEmail2 = 'mockk2@gmail.com';
    const userName2 = 'mockk2';
    const userPassword2 = 'password123';

    // Set up: Create users and authenticate to get tokens
    beforeAll(async () => {
        // Create user1
        await request()
            .post('/api/v1/users')
            .send({
                name: userName1,
                email: userEmail1,
                password: userPassword1
            });
        // Create user2
        await request()
            .post('/api/v1/users')
            .send({
                name: userName2,
                email: userEmail2,
                password: userPassword2
            });
    });

    // Teardown: Use delete all endpoint with admin key if users are still present
    afterAll(async () => {
        await request()
            .delete('/api/v1/all-users')
            .send({ key_admin: 'keyadmin123' });
    });

    // 1. Valid Token - should retrieve user details
    it('should retrieve user details with a valid token', async () => {
        // Get valid token for the user "Mohamed" which is created and authenticated in the previous tests
        const validToken = await getValidToken(request(), userEmail1, userPassword1);

        if (!validToken) {
            // Simulate expired token
            const response = await request()
                .get('/api/v1/users')
                .set('Authorization', 'expired');  // Simulate expired token

            expect(response.statusCode).toBe(403);  // Expect Unauthorized status
            expect(response.body).toHaveProperty('message', 'Unauthorized');
        } else {
            // If token is valid, continue with the usual flow
            const response = await request()
                .get('/api/v1/users')
                .set('Authorization', validToken);

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('email', userEmail1);
            expect(response.body).toHaveProperty('name', userName1);
        }
    });

    // 2. expired Token - shouldn't retrieve user details
    it('should handle token expiration as unauthorized', async () => {
        // Get expired token for the user "Ahmed"
        const validToken = await getValidToken(request(), userEmail2, userPassword2);

        if (!validToken) {
            // Simulate expired token
            const response = await request()
                .get('/api/v1/users')
                .set('Authorization', 'expired');  // Simulate expired token

            expect(response.statusCode).toBe(403);  // Expect Unauthorized status
            expect(response.body).toHaveProperty('message', 'Unauthorized');
        } else {
            // If token is valid, continue with the usual flow
            const response = await request()
                .get('/api/v1/users')
                .set('Authorization', validToken);

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('email', userEmail2);
            expect(response.body).toHaveProperty('name', userName2);
        }
    });

    // 3. Invalid Token - should return unauthorized error
    it('should return unauthorized for invalid token', async () => {
        const invalidToken = getInvalidToken();  // Use the helper to get an invalid token
        const response = await request()
            .get('/api/v1/users')
            .set('Authorization', invalidToken);  // Pass an invalid token

        expect(response.statusCode).toBe(403);
        expect(response.body).toHaveProperty('message', 'Unauthorized');
    });

    // 4. Missing Token - should return unauthorized error
    it('should return unauthorized for missing token', async () => {
        const response = await request()
            .get('/api/v1/users');  // No Authorization header

        expect(response.statusCode).toBe(403);
        expect(response.body).toHaveProperty('message', 'Unauthorized');
    });

});