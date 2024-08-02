import UserRepository from '../../src/repository/user-repository';
import User from '../../src/models/user.js';

jest.mock('../../src/models/user.js');

describe('UserRepository tests', () => {
    let userRepository;

    beforeAll(() => {
        userRepository = new UserRepository();
    });

    describe('Find user by data tests', () => {
        test('should find a user by data and return it', async () => {
            const data = { email: 'test@example.com' };
            const mockUser = { _id: 'some-id', email: 'test@example.com', name: 'Test User' };
            const spy = jest.spyOn(User, 'findOne').mockImplementation(() => mockUser);

            const user = await userRepository.findBy(data);

            expect(spy).toHaveBeenCalledWith(data);
            expect(user).toEqual(mockUser);
        });

        test('should return null if user not found', async () => {
            const data = { email: 'nonexistent@example.com' };
            const spy = jest.spyOn(User, 'findOne').mockImplementation(() => null);

            const user = await userRepository.findBy(data);

            expect(spy).toHaveBeenCalledWith(data);
            expect(user).toBeNull();
        });

        test('should throw an error if find operation fails', async () => {
            const data = { email: 'error@example.com' };
            const errorMessage = 'something went wrong';
            const spy = jest.spyOn(User, 'findOne').mockImplementation(() => {
                throw new Error(errorMessage);
            });

            await userRepository.findBy(data).catch(err => {
                expect(spy).toHaveBeenCalledWith(data);
                expect(err).toBeInstanceOf(Error);
                expect(err.message).toBe(errorMessage);
            });
        });
    });
});
