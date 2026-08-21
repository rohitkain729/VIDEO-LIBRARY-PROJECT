const { MongoClient } = require('mongodb');
const express =require('express');
const cors = require("cors");
const axios = require('axios');


// or as an es module:
// import { MongoClient } from 'mongodb'

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'videoproject';


// ADMIN MODULE
app.get("/admin", async (req,res)=>{

  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('admin');
  
  collection.find({}).toArray().then((doc)=>{
    res.send(doc);
    res.end();
  }).catch((err)=>{
    res.send(err);
  });

});

app.get("/admin/:UserId",async (req,res)=>{

  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('admin');

    collection.findOne({UserId:req.params.UserId})
    .then(result=>{
        res.send(result);
        res.end();
    }).catch((err)=>{
    res.send(err);
  });
    

});

app.post("/admin",async (req,res)=>{

  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('admin');


  const user = {
  UserId: req.body.UserId,
  UserName: req.body.UserName,
  Age: req.body.Age,
  Password: req.body.Password,
  Email: req.body.Email,
  Mobile: req.body.Mobile,
  Country: req.body.Country,
  Role:"ADMIN"
  };

  collection.insertOne(user).then(()=>{
    res.send("Admin Record Inserted Successfully");
    res.end();
  }).catch((err)=>{
    res.send(err);
  });
});


app.delete("/admin/:UserId",async (req,res)=>{

  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('admin');

    collection.deleteOne({UserId:req.params.UserId})
    .then(()=>{
        res.send("admin record deleted successfully UserId::"+req.params.UserId);
        res.end();
    }).catch((err)=>{
    res.send(err);
  });
});


// video module

app.post("/videos",async (req,res)=>{

  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('videos');
  const MaXId = await axios.get('http://localhost:4000/maxVideoId');

      // console.log(Object.keys(MaXId.data).length); 
      // console.log(Object.keys(MaXId.data)); 
      // console.log((typeof(Object.keys(MaXId.data)))); 
      // console.log(MaXId.data); 
      // Object.keys(MaXId.data).length === 0  ?   MaXId.data = 1 : MaXId.data;
      
  const  obj = {
  // VideoId: MaXId.data+1,
  VideoId:  MaXId.data +1,
  Title: req.body.Title,
  Url: `https://www.youtube.com/embed/${req.body.Url}`,
  Description: req.body.Description,
  CategoryId: req.body.CategoryId
  }
  
  collection.insertOne(obj).then(()=>{
    res.send(" video info is saved with Id::"+obj.VideoId);
  }).catch((err)=>{
    res.send(err);
  });

});

// Likes: req.body.Likes,
//   Dislikes: req.body.Dislikes,
//   Views: req.body.Views,
//   Comments: req.body.Comments,

app.get("/maxVideoId",async (req,res)=>{

      await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('videos');

    collection.find(
    {},
    { VideoId: 1, _id: 0 }
    ).sort({ VideoId: -1 }).limit(1).toArray().then((result)=>{
    console.log(result.length === 0 ? 1: result);
    res.send(result.length === 0 ? 0: result[0].VideoId);
    res.end();
    }).catch((err)=>{
        res.send(err);
    });

});


app.get("/videos",async (req,res)=>{
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('videos');

  collection.find({}).toArray()
  .then((result)=>{
    res.send(result);
    res.end();
  }).catch((err)=>{res.send(err)});

});

app.get("/videos/:videoId",async (req,res)=>{
   await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('videos');

  collection.findOne({VideoId:parseInt(req.params.videoId)})
  .then((result)=>{
    res.send(result);
    res.end();
  }).catch((err)=>{res.send(err)});

});

app.put("/video/:videoId", async (req,res)=>{
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('videos');

   const  obj = {
  Title: req.body.Title,
  Url: `https://www.youtube.com/embed/${req.body.Url}`,
  Description: req.body.Description,
  CategoryId: req.body.CategoryId
  }
  collection.updateOne({VideoId:parseInt(req.params.videoId)},{$set:obj})
  .then(()=>{
    res.send("data updated with VideoId::"+req.params.videoId);
    res.end();
  }).catch((err)=>{res.send(err)});
});

app.delete("/video/:videoId", async (req,res)=>{
   await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('videos');

  collection.deleteOne({VideoId:parseInt(req.params.videoId)})
  .then(()=>{
    res.send("Video Deleted with VideoId::"+req.params.videoId);
    res.end();
  }).catch((err)=>{res.send(err)});
});


// categories

app.get("/category" ,  async (req,res)=>{

    await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('categories');

  collection.find({}).toArray()
  .then((result)=>{
    res.send(result);
    res.end();
  }).catch((err)=>{
    res.send(err);
  });

});

// USER

app.post("/users",async (req,res)=>{

  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('users');

  const user = {
  UserId: req.body.UserId,
  UserName: req.body.UserName,
  Password: req.body.Password,
  Email: req.body.Email,
  Mobile: req.body.Mobile,
  CreatedAt:req.body.CreatedAt,
  Role:"USER"
};

  collection.insertOne(user).then(()=>{
    res.send("User Record Inserted Successfully");
    res.end();
  }).catch((err)=>{
    res.send(err);
  });
});

app.get("/users/:UserId",async (req,res)=>{

  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('users');


  collection.findOne({UserId:req.params.UserId}).then((result)=>{
    res.send(result);
    res.end();
  }).catch((err)=>{
    res.send(err);
  });
});


app.put("/users/:UserId",async (req,res)=>{

  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('users');

  const user = {
  UserName: req.body.UserName,
  Password: req.body.Password,
  Email: req.body.Email,
  Mobile: req.body.Mobile,
  CreatedAt:req.body.CreatedAt
};
  collection.updateOne({UserId:req.params.UserId},{$set:user}).then(()=>{
    res.send("User Record Updated with Id::"+req.params.UserId);
    res.end();
  }).catch((err)=>{
    res.send(err);
  });
});


app.get("/users",async (req,res)=>{

  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('users');

  collection.find({}).toArray().then((docs)=>{
    res.send(docs);
    res.end();
  }).catch((err)=>{
    res.send(err);
  });
});

app.delete("/users/:UserId",async (req,res)=>{

  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('users');

  collection.deleteOne({UserId:req.params.UserId}).then(()=>{
    res.send("User is deleted Successfully ID::"+req.params.UserId);
    res.end();
  }).catch((err)=>{
    res.send(err);
  });
});



// comments



app.get("/comments",async (req,res)=>{
    
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('comments');
  
  collection.find({}).toArray().then((result)=>{
      res.send(result);
      res.end();
    }).catch((err)=>{
    res.send(err);
  });
});


app.get("/comments/:VideoId",async (req,res)=>{
    
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('comments');
  
  collection.findOne({VideoId:parseInt(req.params.VideoId)}).then((result)=>{
      res.send(result);
      res.end();
    }).catch((err)=>{
    res.send(err);
  });
});


app.get("/comments/:VideoId/:UserId",async (req,res)=>{
    
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('comments');
  collection.find({VideoId:parseInt(req.params.VideoId),"Comments.UserId":req.params.UserId}).toArray()
  .then((doc)=>{
    res.send(doc[0].Comments[0])
  }).catch((err)=>{res.send(err)});

});

// app.post("/test/comments",async (req,res)=>{
//   // res.send(req.body);
//   console.log(req.body);
// });


app.post("/comments",async (req,res)=>{
    
  await client.connect();
  // console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('comments');

   // insert one
  const videoObj = {
  Dislikes: req.body.Dislikes,
  Likes: req.body.Likes,

  UserId: req.body.UserId,
  User_Comments: req.body.User_Comments,
  CreatedAt: new Date(req.body.CreatedAt),
    VideoId: req.body.VideoId
   };
   console.log(videoObj);
   collection.insertOne(videoObj).then(()=>{
      res.send("Video Data is Inserted  Successfully");
      res.end();
    }).catch((err)=>{    
    res.send(err);
  });


});


// app.put("/comments/:VideoId",async (req,res)=>{

//     await client.connect();
//   console.log('Connected successfully to server');
//   const db = client.db(dbName);
//   const collection = db.collection('comments');

//   let videoId = parseInt(req.params.VideoId); 
//   let UserId = req.body.Comments[0].UserId; 

//   console.log(videoId);
//   console.log(UserId);

//   let UserDetails=await collection.findOne({VideoId:videoId,"Comments.UserId":UserId});

//   console.log(UserDetails);

//   let clientNewComment = req.body.Comments[0].User_Comments[0];

//   if(UserDetails){                             
//     console.log("user detail exist");
//       collection.updateOne({VideoId:videoId,"Comments.UserId":UserId}
//         ,{
//             $push:{
//                 "Comments.$.User_Comments":clientNewComment
//             }
//         }).then(()=>{
//           res.send("Video Data is Updated  Successfully");
//           res.end();
//         }).catch((err)=>{    
//         res.send(err);
//       });
//   }
//  else{
//      console.log("user detail dont exist");
//   collection.updateOne({VideoId:videoId},{
//     $push :{
//         Comments:{
//         UserId:UserId,
//         User_Comments : clientNewComment,
//         CreatedAt:req.body.Comments[0].CreatedAt
//        }
//     }
//   }).then(()=>{
//       res.send("Video Data is Updated  Successfully");
//       res.end();
//     }).catch((err)=>{    
//     res.send(err);
//   });
//    }
// });

app.put("/comments/:VideoId", async (req, res) => {

  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("comments");

    const videoId = parseInt(req.params.VideoId);
    const UserId = req.body.Comments[0].UserId;
    const clientNewComment =
      req.body.Comments[0].User_Comments[0];

    // Check whether video document exists
    const videoDetails = await collection.findOne({
      VideoId: videoId
    });

    if (videoDetails) {

      // Video exists
      console.log("Video exists");

      // Check whether user exists inside Comments
      const UserDetails = await collection.findOne({
        VideoId: videoId,
        "Comments.UserId": UserId
      });

      if (UserDetails) {

        // CASE 1:
        // Video exists + User exists
        console.log("User exists");

        await collection.updateOne(
          {
            VideoId: videoId,
            "Comments.UserId": UserId
          },
          {
            $push: {
              "Comments.$.User_Comments": clientNewComment
            }
          }
        );

      } else {
        // CASE 2:
        // Video exists + User does not exist
        console.log("User does not exist");

        await collection.updateOne(
          {
            VideoId: videoId
          },
          {
            $push: {
              Comments: {
                UserId: UserId,
                User_Comments: [clientNewComment],
                CreatedAt: req.body.Comments[0].CreatedAt
              }
            }
          }
        );
      }

    } else {

      // CASE 3:
      // Video does not exist
      console.log("Video does not exist");

      await collection.insertOne({
        VideoId: videoId,
        Comments: [
          {
            UserId: UserId,
            User_Comments: [clientNewComment],
            CreatedAt: req.body.Comments[0].CreatedAt
          }
        ],
        Likes: req.body.Likes || 0,
        Dislikes: req.body.Dislikes || 0
      });
    }

    res.send("Comment saved successfully");

  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});



app.get("/videocategorycount",async (req,res)=>{

     await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("categories");

    collection.aggregate([
            {
                $lookup: {
                    from: "videos",
                    localField: "CategoryId",
                    foreignField: "CategoryId",
                    as: "videos"
                }
            },
            {
                $project: {
                    _id: 0,
                    CategoryId: 1,
                    CategoryName: 1,
                    VideoCount: { $size: "$videos" }
                }
            }
        ]).toArray().then((result)=>{
          res.send(result);
          res.end();
        }).catch(err=>{
          res.send(err);
          res.end(); 
        })
});



app.listen (4000,()=>{
    console.log("server started at port 4000");
})


