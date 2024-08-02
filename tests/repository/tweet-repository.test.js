// import TweetRepository from '../../src/repository/tweet-repository';
// import Tweet from '../../src/models/tweet.js';

// jest.mock('../../src/models/tweet.js');


// describe('Create tweet tests', () => {
//     test('should create a new tweet and return it', async () => {
//         const data = {
//             content: 'Testing tweet'
//         }
//         const spy = jest.spyOn(Tweet, 'create').mockImplementation(() => {
//             return {...data, createdAt: '2024-04-12', updatedAt: '2024-04-12'}
//         });
//         const tweetRepository = new TweetRepository();
//         const tweet = await tweetRepository.create(data);
    
//         expect(spy).toHaveBeenCalled();
//         expect(tweet.content).toBe(data.content);
//         expect(tweet.createdAt).toBeDefined();
//     });
    
//     test('should not create a tweet and throw exception', async () => {
//         const data = {
//             content: 'Testing tweet'
//         }
//         const spy = jest.spyOn(Tweet, 'create').mockImplementation(() => {
//             throw new Error('something went wrong');
//         });
//         const tweetRepository = new TweetRepository();
//         const tweet = await tweetRepository.create(data).catch(err => {
//             expect(err).toBeInstanceOf(Error);
//             expect(err.message).toBe('something went wrong');
//         });  
//     });
    
    
// });


// describe('Get all tweet tests', () => {
//     test('testing limit for get all',async () => {
//         const data = {
//             content: 'Testing tweet'
//         }
//         const tweetsArray =  [{...data, createdAt: '2022-02-12', updatedAt: '2022-02-12'}, {...data, createdAt: '2022-02-12', updatedAt: '2022-02-12'}, {...data, createdAt: '2022-02-12', updatedAt: '2022-02-12'}];
//         const findResponse = {tweetsArray};
//         findResponse.skip = jest.fn((offset) => findResponse);
//         findResponse.limit = jest.fn((limit) => findResponse.tweetsArray.slice(0, limit));
//         const spy = jest.spyOn(Tweet, 'find').mockImplementation(() => {
//             return findResponse;
//         });
//         const tweetRepository = new TweetRepository();
//         const tweets = await tweetRepository.getAll(0, 2);
//         expect(spy).toHaveBeenCalled();
//         expect(tweets).toHaveLength(2);
//     })
// })

// // test('actually calling model', async () => {
// //     const data = {
// //         content: 'bigggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg'
// //     };
// //     const tweet = await Tweet.create(data);
// //     expect(tweet).toBeUndefined();
// // });



import TweetRepository from '../../src/repository/tweet-repository';
import Tweet from '../../src/models/tweet.js';

jest.mock('../../src/models/tweet.js');

describe('TweetRepository tests', () => {
    let tweetRepository;

    beforeAll(() => {
        tweetRepository = new TweetRepository();
    });

    describe('Create tweet tests', () => {
        test('should create a new tweet and return it', async () => {
            const data = { content: 'Testing tweet' };
            const spy = jest.spyOn(Tweet, 'create').mockImplementation(() => {
                return { ...data, createdAt: '2024-04-12', updatedAt: '2024-04-12' };
            });

            const tweet = await tweetRepository.create(data);

            expect(spy).toHaveBeenCalled();
            expect(tweet.content).toBe(data.content);
            expect(tweet.createdAt).toBeDefined();
        });

        test('should not create a tweet and throw an exception', async () => {
            const data = { content: 'Testing tweet' };
            const spy = jest.spyOn(Tweet, 'create').mockImplementation(() => {
                throw new Error('something went wrong');
            });

            await tweetRepository.create(data).catch(err => {
                expect(err).toBeInstanceOf(Error);
                expect(err.message).toBe('something went wrong');
            });
        });
    });

    describe('Get tweet with comments tests', () => {
        test('should get a tweet with nested comments', async () => {
            const id = 'some-id';
            const mockTweet = {
                _id: id,
                content: 'Testing tweet',
                comments: [
                    {
                        content: 'Comment 1',
                        comments: [
                            {
                                content: 'Nested Comment 1',
                                comments: []
                            }
                        ]
                    }
                ]
            };

            const populateMock = jest.fn().mockReturnThis();
            const leanMock = jest.fn().mockResolvedValue(mockTweet);
            const spy = jest.spyOn(Tweet, 'findById').mockImplementation(() => ({
                populate: populateMock,
                lean: leanMock,
            }));

            const tweet = await tweetRepository.getWithComments(id);

            expect(spy).toHaveBeenCalledWith(id);
            expect(populateMock).toHaveBeenCalled();
            expect(leanMock).toHaveBeenCalled();
            expect(tweet).toEqual(mockTweet);
        });

        test('should return null if tweet not found', async () => {
            const id = 'nonexistent-id';
            const populateMock = jest.fn().mockReturnThis();
            const leanMock = jest.fn().mockResolvedValue(null);
            const spy = jest.spyOn(Tweet, 'findById').mockImplementation(() => ({
                populate: populateMock,
                lean: leanMock,
            }));

            const tweet = await tweetRepository.getWithComments(id);

            expect(spy).toHaveBeenCalledWith(id);
            expect(populateMock).toHaveBeenCalled();
            expect(leanMock).toHaveBeenCalled();
            expect(tweet).toBeNull();
        });
    });

    describe('Get all tweets tests', () => {
        test('should get tweets with specified limit and offset', async () => {
            const data = { content: 'Testing tweet' };
            const tweetsArray = [
                { ...data, createdAt: '2022-02-12', updatedAt: '2022-02-12' },
                { ...data, createdAt: '2022-02-12', updatedAt: '2022-02-12' },
                { ...data, createdAt: '2022-02-12', updatedAt: '2022-02-12' }
            ];

            const findResponse = { tweetsArray };
            findResponse.skip = jest.fn(() => findResponse);
            findResponse.limit = jest.fn((limit) => findResponse.tweetsArray.slice(0, limit));
            const spy = jest.spyOn(Tweet, 'find').mockImplementation(() => findResponse);

            const tweets = await tweetRepository.getAll(0, 2);

            expect(spy).toHaveBeenCalled();
            expect(tweets).toHaveLength(2);
        });

        test('should return an empty array if no tweets are found', async () => {
            const findResponse = [];
            findResponse.skip = jest.fn(() => findResponse);
            findResponse.limit = jest.fn(() => findResponse);
            const spy = jest.spyOn(Tweet, 'find').mockImplementation(() => findResponse);

            const tweets = await tweetRepository.getAll(0, 2);

            expect(spy).toHaveBeenCalled();
            expect(tweets).toHaveLength(0);
        });
    });

    describe('Find tweet by id tests', () => {
        test('should find a tweet by id with likes populated', async () => {
            const id = 'some-id';
            const mockTweet = { _id: id, content: 'Testing tweet', likes: [] };
            const populateMock = jest.fn().mockResolvedValue(mockTweet);
            const spy = jest.spyOn(Tweet, 'findById').mockImplementation(() => ({
                populate: populateMock
            }));

            const tweet = await tweetRepository.find(id);

            expect(spy).toHaveBeenCalledWith(id);
            expect(populateMock).toHaveBeenCalled();
            expect(tweet).toEqual(mockTweet);
        });

        test('should return null if tweet not found by id', async () => {
            const id = 'nonexistent-id';
            const populateMock = jest.fn().mockResolvedValue(null);
            const spy = jest.spyOn(Tweet, 'findById').mockImplementation(() => ({
                populate: populateMock
            }));

            const tweet = await tweetRepository.find(id);

            expect(spy).toHaveBeenCalledWith(id);
            expect(populateMock).toHaveBeenCalled();
            expect(tweet).toBeNull();
        });
    });
});
