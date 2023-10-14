import mongoose from "mongoose";

let isConnected = false; // track the connection status

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log('MongoDB is already connected')
    return;
  }

  //If the isConnected variable is false, it attempts to connect to the MongoDB database using the mongoose.connect method:

  try {

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "promptgenius",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConnected = true;

    console.log('MongoDB is connected');

  } catch (error) {
    console.log(error);
  }

}


//The 'mongoose.set("strictQuery", true);' statement enables strict mode for Mongoose queries. Strict mode ensures that only valid fields can be queried in a collection.