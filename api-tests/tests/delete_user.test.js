const { request } = require('../utils/api_client');
const { getValidToken, getInvalidToken } = require('../utils/helpers');

describe('Delete User and Delete All Users API Tests', () => {
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

    // 1. Valid Token - should delete user1 successfully
    it('should delete user1 with a valid token', async () => {
        const validToken = await getValidToken(request(), userEmail1, userPassword1);
        const response = await request()
            .delete('/api/v1/users')
            .set('Authorization', validToken);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'User deleted with success');

    });

    // 2. Invalid Token - should return unauthorized error for user2
    it('should return unauthorized for invalid token when deleting user2', async () => {
        const invalidToken = getInvalidToken();
        const response = await request()
            .delete('/api/v1/users')
            .set('Authorization', invalidToken);

        expect(response.statusCode).toBe(403);
        expect(response.body).toHaveProperty('message', 'Unauthorized to delete');
    });

    // 3. Missing Token - should return unauthorized error for user2
    it('should return unauthorized error when trying to delete user2 without a token', async () => {
        const response = await request()
            .delete('/api/v1/users');

        expect(response.statusCode).toBe(403);
        expect(response.body).toHaveProperty('message', 'Unauthorized to delete');
    });

    // 4. Admin Key - should delete all users successfully
    it('should delete all users with the admin key', async () => {
        const response = await request()
            .delete('/api/v1/all-users')
            .send({ key_admin: 'keyadmin123' });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Users deleted with success');
    });

    // 5. Missing Admin Key - should return unauthorized when trying to delete all without key
    it('should return unauthorized when trying to delete all users without admin key', async () => {
        const response = await request()
            .delete('/api/v1/all-users')
            .send({});

        expect(response.statusCode).toBe(403);
        expect(response.body).toHaveProperty('message', 'Unauthorized access');
    });
});