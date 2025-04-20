import bcrypt from "bcrypt";
import mongoose from "mongoose";

const URL = "mongodb+srv://generalUser:generalUser@wiflynyc.yipbflu.mongodb.net/WiFlyNYC?retryWrites=true&w=majority&appName=WiFlyNYC";

const seedDatabase = async () => {
  try {
    await mongoose.connect(URL);
    console.log("Connected to MongoDB.");

    const usersCollection = mongoose.connection.db.collection("users");
    const reviewsCollection = mongoose.connection.db.collection("reviews");
    const postsCollection = mongoose.connection.db.collection("posts");
    const commentCollection = mongoose.connection.db.collection("comment");

    const hashedPassword1 = await bcrypt.hash("password123A#", 16);
    const hashedPassword2 = await bcrypt.hash("password456A#", 16);
    const hashedPassword3 = await bcrypt.hash("password789A#", 16);
    const hashedPassword4 = await bcrypt.hash("password781H#", 16);
    const hashedPassword5 = await bcrypt.hash("password789C#", 16);
    const hashedPassword6 = await bcrypt.hash("password780B#", 16);

    await usersCollection.deleteMany({});
    console.log("Cleared existing users.");

    await reviewsCollection.deleteMany({});
    console.log("Cleared existing reviews.");

    await postsCollection.deleteMany({});
    console.log("Cleared existing users.");

    await commentCollection.deleteMany({});
    console.log("Cleared existing users.");

    const reviews = [
       {
        rating: [5],
        text: ["Great coffee, loved the flavor and ambiance!"],
        id: 418520887,
        type: "coffee",
      },
      {
        rating: [4],
        text: ["Nice place, good coffee, but a bit too crowded."],
        id: 746176794,
        type: "coffee",
      },
      {
        rating: [3],
        text: ["Average coffee, needs improvement in taste."],
        id: 883235940,
        type: "coffee",
      },
      {
        rating: [5],
        text: ["Best coffee ever, will definitely come back!"],
        id: 1383942697,
        type: "coffee",
      },
      {
        rating: [5],
        text: ["Amazing wifi, perfect for remote work!"],
        id: 21,
        type: "wifi",
      },
      {
        rating: [3],
        text: ["Wifi was decent, could be faster."],
        id: 28,
        type: "wifi",
      },
      {
        rating: [5],
        text: ["Wifi was fantastic, never had any issues!"],
        id: 1,
        type: "wifi",
      },
      {
        rating: [1],
        text: ["I did not like this place and would not recommend at all."],
        id: 7,
        type: "wifi",
      },
      {
        rating: [3],
        text: ["It was an okay location. Weather was bad when I went."],
        id: 15,
        type: "wifi",
      },
      {
        rating: [5],
        text: ["Very good place and good wifi for the speed"],
        id: 30,
        type: "wifi",
      },
    ];

    await reviewsCollection.insertMany(reviews);
    console.log("Seeded reviews successfully.");

    const users = [
      {
        username: "user123",
        email: "email@gmail.com",
        password: hashedPassword1, 
        reviews: [418520887, 1, 28],
        friends: [],
      },
      {
        username: "user456",
        email: "email1l@gmail.com",
        password: hashedPassword2,
        reviews: [ 21 ],
        friends: ["user1", "randomuser"],
      },
      {
        username: "user1",
        email: "email2@gmail.com",
        password: hashedPassword3,
        reviews: [ 7, 1383942697],
        friends: [],
      },
      {
        username: "randomuser",
        email: "randomuser@gmail.com",
        password: hashedPassword4,
        reviews: [ 883235940],
        friends: [],
      },
      {
        username: "user",
        email: "email_user@gmail.com",
        password: hashedPassword5,
        reviews: [30],
        friends: ["user32", "user123"],
      },
      {
        username: "user32",
        email: "email32@gmail.com",
        password: hashedPassword6,
        reviews: [15, 746176794],
        friends: ["randomuser", "user456"],
      },
    ];

    await usersCollection.insertMany(users);
    console.log("Seeded users successfully.");


    const user123 = await usersCollection.findOne({ username: "user123" });
    const user456 = await usersCollection.findOne({ username: "user456" });
    const user1 = await usersCollection.findOne({ username: "user1" }); 
    const randomuser = await usersCollection.findOne({ username: "randomuser" }); 

    const posts = [
        {
            poster: {
                userId : user123._id,
                username : "user123"
            },
            title: "best coffee", 
            body: "I loved the coffee here; it was tasty and affordable.", 
            image: {
                url: "http://res.cloudinary.com/dcvqjizwy/image/upload/v1734395554/pp32kb4x1syrp41jnf4m.jpg", 
                altText: "book, coffee, place"
            }, 
            location: {
                type: "coffee", 
                id: 418520887,
                name: "Everything Goes Book Cafe", 
                detail: "208 Bay Street, Staten Island"
            }, 
            comments: []
        },
        {
            poster: {
                userId : user456._id,
                username : "user456"
            },
            title: "great outdoor park", 
            body: "I went to this park down the street from my house, and the wifi connectivity was great! I was able to be outside and stay connected!", 
            image: {
                url: "http://res.cloudinary.com/dcvqjizwy/image/upload/v1734395718/gztjnbat8cj8udujxhwr.jpg", 
                altText: "park, path, trees. wifi"
            }, 
            location: {
                type: "wifi", 
                id: 397,
                name: "Chelsea Park", 
                detail: null
            }, 
            comments: []
        },
        {
            poster: {
                userId : user1._id,
                username : "user1"
            },
            title: "Christmas Market", 
            body: "You definitely have to check this place out! There were so many cool vendors, and the lights were pretty. It was a little pricey so bring your wallets!!! #$$$ #ItsChristmasTime", 
            image: {
                url: "http://res.cloudinary.com/dcvqjizwy/image/upload/v1734395973/ktj5lqzcfconejizaoyn.jpg", 
                altText: "people, lights, food"
            }, 
            location: {
                type: "event", 
                id: 811589,
                name: "2025 HOLIDAY MARKET", 
                detail: "Union Square Park: North Plaza, Union Square Park: South Plaza"
            }, 
            comments: []
        },
    ]

    let insertedPosts = await postsCollection.insertMany(posts);
    let insertedPostIds = insertedPosts.insertedIds;
    console.log("Seeded posts successfully.");

    console.log(insertedPosts);
    console.log(insertedPostIds);
    
    
    let postId1 = insertedPostIds['0'].toString();
    let postId2 = insertedPostIds['1'].toString();
    let postId3 = insertedPostIds['2'].toString();

    console.log(postId1)
    console.log(postId2)
    console.log(postId3)

    const comments = [
        {
            commenter: {
                id : user456._id,
                name : "user456"
            },
            parent:{
                id: `${postId1}`,
                type: 'Post'
            },
            body:"Wow, I definitely have to check it out! Thanks for the review!"
        },
        {
            commenter: {
                id : randomuser._id,
                name : "randomuser"
            },
            parent:{
                id: `${postId2}`,
                type: 'Post'
            },
            body:"This is near me! Can't wait to try! "
        },
        {
            commenter: {
                id : randomuser._id,
                name : "randomuser"
            },
            parent:{
                id: `${postId3}`,
                type: 'Post'
            },
            body:"In this economy??? My wallet will stay home XD"
        }
    ]

    let insertedComments = await commentCollection.insertMany(comments);
    const insertedCommentsId = insertedComments.insertedIds;
    console.log("Seeded comments successfully.");

    const commentId1 = insertedCommentsId['0'].toString();
    const commentId2 = insertedCommentsId['1'].toString();
    const commentId3 = insertedCommentsId['2'].toString();

    await postsCollection.updateOne(
      { _id: new mongoose.Types.ObjectId(postId1) },
      { $push: { comments: commentId1 } }
    );

    await postsCollection.updateOne(
      { _id: new mongoose.Types.ObjectId(postId2) },
      { $push: { comments: commentId2 } }
    );

    await postsCollection.updateOne(
      { _id: new mongoose.Types.ObjectId(postId3) },
      { $push: { comments: commentId3 } }
    );

    console.log("Successfully assigned comments to posts.")

  } catch (e) {
    console.error("Error:", e);
  } finally {
    mongoose.connection.close();
    console.log("Database connection closed.");
  }
};

seedDatabase();
