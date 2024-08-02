import CommentRepository from '../../src/repository/comment-repository';
import Comment from '../../src/models/comment.js';

jest.mock('../../src/models/comment.js');

describe('CommentRepository tests', () => {
    let commentRepository;

    beforeAll(() => {
        commentRepository = new CommentRepository();
    });

    describe('Create comment tests', () => {
        test('should create a new comment and return it', async () => {
            const data = { content: 'Testing comment' };
            const mockComment = { ...data, _id: 'some-id', createdAt: '2024-04-12', updatedAt: '2024-04-12' };
            const spy = jest.spyOn(Comment, 'create').mockImplementation(() => mockComment);

            const comment = await commentRepository.create(data);

            expect(spy).toHaveBeenCalledWith(data);
            expect(comment).toEqual(mockComment);
        });

        test('should not create a comment and throw an exception', async () => {
            const data = { content: 'Testing comment' };
            const errorMessage = 'something went wrong';
            const spy = jest.spyOn(Comment, 'create').mockImplementation(() => {
                throw new Error(errorMessage);
            });

            await commentRepository.create(data).catch(err => {
                expect(spy).toHaveBeenCalledWith(data);
                expect(err).toBeInstanceOf(Error);
                expect(err.message).toBe(errorMessage);
            });
        });
    });

    describe('Destroy comment tests', () => {
        test('should delete a comment and return it', async () => {
            const id = 'some-id';
            const mockComment = { _id: id, content: 'Testing comment' };
            const spy = jest.spyOn(Comment, 'findByIdAndDelete').mockImplementation(() => mockComment);

            const comment = await commentRepository.destroy(id);

            expect(spy).toHaveBeenCalledWith(id);
            expect(comment).toEqual(mockComment);
        });

        test('should not delete a comment and throw an exception', async () => {
            const id = 'some-id';
            const errorMessage = 'something went wrong';
            const spy = jest.spyOn(Comment, 'findByIdAndDelete').mockImplementation(() => {
                throw new Error(errorMessage);
            });

            await commentRepository.destroy(id).catch(err => {
                expect(spy).toHaveBeenCalledWith(id);
                expect(err).toBeInstanceOf(Error);
                expect(err.message).toBe(errorMessage);
            });
        });
    });

    describe('Get comment tests', () => {
        test('should get a comment by id and return it', async () => {
            const id = 'some-id';
            const mockComment = { _id: id, content: 'Testing comment' };
            const spy = jest.spyOn(Comment, 'findById').mockImplementation(() => mockComment);

            const comment = await commentRepository.get(id);

            expect(spy).toHaveBeenCalledWith(id);
            expect(comment).toEqual(mockComment);
        });

        test('should return null if comment not found', async () => {
            const id = 'some-id';
            const spy = jest.spyOn(Comment, 'findById').mockImplementation(() => null);

            const comment = await commentRepository.get(id);

            expect(spy).toHaveBeenCalledWith(id);
            expect(comment).toBeNull();
        });

        test('should throw an error if get operation fails', async () => {
            const id = 'some-id';
            const errorMessage = 'something went wrong';
            const spy = jest.spyOn(Comment, 'findById').mockImplementation(() => {
                throw new Error(errorMessage);
            });

            await commentRepository.get(id).catch(err => {
                expect(spy).toHaveBeenCalledWith(id);
                expect(err).toBeInstanceOf(Error);
                expect(err.message).toBe(errorMessage);
            });
        });
    });

    describe('Get all comments tests', () => {
        test('should get all comments and return them', async () => {
            const mockComments = [{ _id: '1', content: 'Testing comment 1' }, { _id: '2', content: 'Testing comment 2' }];
            const spy = jest.spyOn(Comment, 'find').mockImplementation(() => mockComments);

            const comments = await commentRepository.getAll();

            expect(spy).toHaveBeenCalledWith({});
            expect(comments).toEqual(mockComments);
        });

        test('should throw an error if get all operation fails', async () => {
            const errorMessage = 'something went wrong';
            const spy = jest.spyOn(Comment, 'find').mockImplementation(() => {
                throw new Error(errorMessage);
            });

            await commentRepository.getAll().catch(err => {
                expect(spy).toHaveBeenCalledWith({});
                expect(err).toBeInstanceOf(Error);
                expect(err.message).toBe(errorMessage);
            });
        });
    });

    describe('Update comment tests', () => {
        test('should update a comment and return the updated comment', async () => {
            const id = 'some-id';
            const data = { content: 'Updated comment' };
            const mockComment = { _id: id, ...data, updatedAt: '2024-04-12' };
            const spy = jest.spyOn(Comment, 'findByIdAndUpdate').mockImplementation(() => mockComment);

            const comment = await commentRepository.update(id, data);

            expect(spy).toHaveBeenCalledWith(id, data, { new: true });
            expect(comment).toEqual(mockComment);
        });

        test('should throw an error if update operation fails', async () => {
            const id = 'some-id';
            const data = { content: 'Updated comment' };
            const errorMessage = 'something went wrong';
            const spy = jest.spyOn(Comment, 'findByIdAndUpdate').mockImplementation(() => {
                throw new Error(errorMessage);
            });

            await commentRepository.update(id, data).catch(err => {
                expect(spy).toHaveBeenCalledWith(id, data, { new: true });
                expect(err).toBeInstanceOf(Error);
                expect(err.message).toBe(errorMessage);
            });
        });
    });
});
