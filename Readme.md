This is the tweet App Backend 
Before creating a tweet you have to do signup and login
After login you will be able to see your tweets, comments and likes 
Here you can create tweet and also comment and toggle-like it.
In the env variable in .env file i have added  PORT=3000 youn can change it accordingly
`
PORT=3000
DATABASE_URL='<YOUR_MONGO_DB_URL>'
`
# Optional
I have also setup aws s3 storage to store static data such as images
Just in the tweet controller you have to uncomment the commented line on tweets and  
`const response = await tweetService.create(req.body);` comment this line you are good to go.
for that you have to do some additional confoinguration in .env file
`AWS_REGION='<YOUR_REGION>'
AWS_SECRET_ACCESS_KEY ='<YOUR_SECRET_ACCESS_KEY>'
AWS_KEY_ID ='<YOUR_KEY_ID>'
BUCKET_NAME=<YOUR_BUCKET_NAME>
`
Add these setup you aws Account accordingly

And the Routes are 
Signup:localhost:3000/api/v1/signup
Login:localhost:3000/api/v1/login
Create a Comment on Comment or Tweet:localhost:3000/api/v1/comments?modelId=<Your_Model_ID>&modelType=<Tweet|Comment>
Create Tweet: localhost:3000/api/v1/tweets
Toggle likes: localhost:3000/api/v1/likes/toggle?modelId=<Your_Model_ID>&modelType=<Tweet>
Get Tweet:localhost:3000/api/v1/tweet/<YOUR_Tweet_ID>

Here Create a Comment on Comment or Tweet and Create Tweet this two are authenticated you have to do signup and login to be able to use these routes. I have only made this routes authenticated but you can makes other routes to authenticate or
Unauthenticated as well. Its your choice You just  have to add `authenticate` in the v1/index.js file if you want to authenticate your route. 


