const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
const User = require('./models/User');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.post('/register-hook', async (req, res) => {
    console.log(req.body);
  try {
    const user = req.body.user;
    const userDoc = new User({
      _id: user._id,
      first_name: user.firstName,
      last_name: user.lastName,
      username: user.firstName + user.lastName,
      email: user.email,
      password: user.password
    });

    await userDoc.save();
    res.status(200).send('Success');
  }
  catch(err) {
    res.status(400).send('Failed');
  }

});

// const { MongoClient, ObjectId } = require('mongodb');

// async function main() {
//   const uri = process.env.DB_URI; // your connection string
//   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//   try {
//     // Connect to the MongoDB cluster
//     await client.connect();

//     // Call search function passing the client
//     await findUserById(client, "test", "users", "6633d0e78807ec16bc28ac4b");

//   } catch (e) {
//     console.error(e);
//   } finally {
//     // Close the connection to the MongoDB cluster
//     await client.close();
//   }
// }

// main().catch(console.error);


// async function findUserById(client, dbName, collectionName, id) {
//   const db = client.db(dbName);
//   const collection = db.collection(collectionName);

//   // Converting the string ID to an ObjectId
//   const query = { _id: new ObjectId(id) };

//   const user = await collection.findOne(query);

//   if (user) {
//     console.log("Found a user by ID:");
//     console.log(user);
//   } else {
//     console.log("No user found with that ID.");
//   }
// }

//routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

//database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("error connecting to mongodb", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT,'0.0.0.0', () => {
  console.log(`server is running on port ${PORT}..`);
});
