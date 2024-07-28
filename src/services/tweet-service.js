// const {TweetRepository,HashtagRepository}= require('../repository/index');
import {TweetRepository,HashtagRepository} from '../repository/index.js'
class TweetService{
    // constructor(){
    //     this.tweetRepository= new TweetRepository();
    //     this.hashtagRepository= new HashtagRepository();
    // }   
    // async create(data){
    //     const content= data.content;
    //     //  let tags= content.match(/#[a-zA-Z0-9_]+/g);// this regex extract Hashtag
    //     //  tags=tags.map((tag)=>tag.substring(1).tolowercase());
    //     const tags = content.match(/#[a-zA-Z0-9_]+/g)
    //                    .map((tag) => tag.substring(1).toLowerCase()); // this regex extracts hashtags
    //      console.log(tags);
    //      const tweet= await this.tweetRepository.create(data);
    //      const alreadyPresentTags=await this.hashtagRepository.findByName(tags).map(tags=>tags.title);
    //     //  alreadyPresentTags=alreadyPresentTags.map((tag)=>tag.title);


    //      // lets first of all see what hastaga already exist and create those which dont exist
    //         const newTags=tags.filter((tag)=>!alreadyPresentTags.includes(tag));
    //         newTags = newTags.map(tag => {
    //                         return {title: tag, tweets: [tweet.id]}
    //                      });
    //         const response= await this.hashtagRepository.bulkCreate(newTags);
    //         console.log(response);
            
    //      // todo create hastgs and add them
    //      /**
    //       * 1 bulkcreate in mongoose
    //       * 2 filter title of hashtag based on multiple tags
    //       * 3 How to add tweet id inside all the hashtags
    //       */
    //      return tweet;

 
    // }
   
            constructor() {
                this.tweetRepository = new TweetRepository();
                this.hashtagRepository = new HashtagRepository();
            }
        
            async create(data) {
                // console.log(data);
                const content = data.content;
                const tags = content.match(/#[a-zA-Z0-9_]+/g)
                                .map((tag) => tag.substring(1).toLowerCase()); // this regex extracts hashtags
                const tweet = await this.tweetRepository.create(data);
                let alreadyPresentTags = await this.hashtagRepository.findByName(tags);
                console.log(alreadyPresentTags);
                let titleOfPresenttags = alreadyPresentTags.map(tags => tags.title);
                let newTags = tags.filter(tag => !titleOfPresenttags.includes(tag));
                newTags = newTags.map(tag => {
                    return {title: tag, tweets: [tweet.id]}
                });

                await this.hashtagRepository.bulkCreate(newTags);
                alreadyPresentTags.forEach((tag) => {
                    tag.tweets.push(tweet.id);
                    tag.save();
                });
                return tweet;
            }
        
            async get(tweetId) {
                const tweet = await this.tweetRepository.getWithComments(tweetId);
                return tweet;
            }
        }



// module.exports = TweetService;
export  default TweetService;
// Comments

// import { TweetRepository, HashtagRepository } from '../repository/index.js'

// class TweetService {
//     constructor() {
//         this.tweetRepository = new TweetRepository();
//         this.hashtagRepository = new HashtagRepository();
//     }

//     async create(data) {
//         console.log(data);
//         const content = data.content;
//         const tags = content.match(/#[a-zA-Z0-9_]+/g)
//                         .map((tag) => tag.substring(1).toLowerCase()); // this regex extracts hashtags
//         const tweet = await this.tweetRepository.create(data);
//         let alreadyPresentTags = await this.hashtagRepository.findByName(tags);
//         let titleOfPresenttags = alreadyPresentTags.map(tags => tags.title);
//         let newTags = tags.filter(tag => !titleOfPresenttags.includes(tag));
//         newTags = newTags.map(tag => {
//             return {title: tag, tweets: [tweet.id]}
//         });
//         await this.hashtagRepository.bulkCreate(newTags);
//         alreadyPresentTags.forEach((tag) => {
//             tag.tweets.push(tweet.id);
//             tag.save();
//         });
//         return tweet;
//     }

//     async get(tweetId) {
//         const tweet = await this.tweetRepository.getWithComments(tweetId);
//         return tweet;
//     }
// }

// export default TweetService;





