const { request } = require('../utils/api_client');
const { getValidToken, getInvalidToken } = require('../utils/helpers');

describe('Update User API Tests', () => {

    let validToken1;
    const userEmail1 = 'mock1@gmail.com';
    const userName1 = 'mock1';
    const userPassword1 = 'password123';

    let validToken2;
    const userEmail2 = 'mock2@gmail.com';
    const userName2 = 'mock2';
    const userPassword2 = 'password123';

    // Set up: Create a user before the tests
    beforeAll(async () => {
        // Create the user1 for tests
        await request()
            .post('/api/v1/users')
            .send({
                name: userName1,
                email: userEmail1,
                password: userPassword1
            });
        // Create the user2 for tests
        await request()
            .post('/api/v1/users')
            .send({
                name: userName2,
                email: userEmail2,
                password: userPassword2
            });
        // Authenticate to get a valid token for user1 and user2
        validToken1 = await getValidToken(request(), userEmail1, userPassword1);
        validToken2 = await getValidToken(request(), userEmail2, userPassword2);
    });

    // Teardown: Delete the user after all tests are completed
    afterAll(async () => {
        await request()
            .delete('/api/v1/all-users')
            .send({ key_admin: 'keyadmin123' });
    });

    // 1. Valid Token - should update user details successfully
    it('should update user details with a valid token', async () => {
        const validToken = await getValidToken(request(), userEmail1, userPassword1);

        const response = await request()
            .patch('/api/v1/users')
            .set('Authorization', validToken)
            .send({
                name: 'mock Updated',
                email: 'mock_updated@gmail.com',
                password: 'newpassword123'
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'User updated with success');
    });

    // 3. Invalid Token - should return unauthorized error
    it('should return unauthorized for an invalid token', async () => {
        const invalidToken = getInvalidToken();
        const response = await request()
            .patch('/api/v1/users')
            .set('Authorization', invalidToken)
            .send({
                name: 'Attempted Update',
                email: 'invalid_update@gmail.com'
            });

        expect(response.statusCode).toBe(403);
        expect(response.body).toHaveProperty('message', 'jwt malformed');
    });

    // 4. Missing Token - should return unauthorized error
    it('should return unauthorized for missing token', async () => {
        const response = await request()
            .patch('/api/v1/users')
            .send({
                name: 'No Auth Update',
                email: 'no_auth_update@gmail.com'
            });

        expect(response.statusCode).toBe(403);
        expect(response.body).toHaveProperty('message', 'jwt must be provided');
    });
});