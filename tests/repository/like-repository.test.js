import LikeRepository from '../../src/repository/like-repository';
import Like from '../../src/models/like.js';

jest.mock('../../src/models/like.js');

describe('LikeRepository tests', () => {
    let likeRepository;

    beforeAll(() => {
        likeRepository = new LikeRepository();
    });

    describe('Find like by user and likeable tests', () => {
        test('should find a like by user and likeable and return it', async () => {
            const data = { user: 'user-id', likeable: 'likeable-id' };
            const mockLike = { _id: 'some-id', user: 'user-id', likeable: 'likeable-id' };
            const spy = jest.spyOn(Like, 'findOne').mockImplementation(() => mockLike);

            const like = await likeRepository.findByUserAndLikeable(data);

            expect(spy).toHaveBeenCalledWith(data);
            expect(like).toEqual(mockLike);
        });

        test('should return null if like not found', async () => {
            const data = { user: 'nonexistent-user-id', likeable: 'nonexistent-likeable-id' };
            const spy = jest.spyOn(Like, 'findOne').mockImplementation(() => null);

            const like = await likeRepository.findByUserAndLikeable(data);

            expect(spy).toHaveBeenCalledWith(data);
            expect(like).toBeNull();
        });

        test('should throw an error if find operation fails', async () => {
            const data = { user: 'error-user-id', likeable: 'error-likeable-id' };
            const errorMessage = 'something went wrong';
            const spy = jest.spyOn(Like, 'findOne').mockImplementation(() => {
                throw new Error(errorMessage);
            });

            await likeRepository.findByUserAndLikeable(data).catch(err => {
                expect(spy).toHaveBeenCalledWith(data);
                expect(err).toBeInstanceOf(Error);
                expect(err.message).toBe(errorMessage);
            });
        });
    });
});
