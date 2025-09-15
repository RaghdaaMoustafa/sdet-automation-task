const { request } = require('../utils/api_client');

describe('User Authentication API Tests', () => {
    const userEmail1 = 'raghad@gmail.com';
    const userName1 = 'raghad';
    const userPassword1 = 'password123';
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

    });

    // Teardown: Delete the user after all tests are completed
    afterAll(async () => {
        await request()
            .delete('/api/v1/all-users')
            .send({ key_admin: 'keyadmin123' });
    });

    // 1. Valid Authentication
    it('should authenticate user and return a token', async () => {
        const response = await request()
            .post('/api/v1/auth')
            .send({
                email: userEmail1,
                password: userPassword1
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');  
    });

    // 2. Invalid Email
    it('should return an error for invalid email', async () => {
        const response = await request()
            .post('/api/v1/auth')
            .send({
                email: 'invalid@gmail.com',
                password: userPassword1
            });

        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty('message', 'Incorrect email or password');
    });

    // 3. Invalid Password
    it('should return an error for invalid password', async () => {
        const response = await request()
            .post('/api/v1/auth')
            .send({
                email: userEmail1,
                password: 'wrongpassword'
            });

        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty('message', 'Incorrect email or password');
    });

    // 6. Extra Fields (should ignore extra fields)
    it('should authenticate user successfully and ignore extra fields', async () => {
        const response = await request()
            .post('/api/v1/auth')
            .send({
                email: userEmail1,
                password: userPassword1,
                age: 30,  
                address: '123 Main St' 
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token'); 
    });
});