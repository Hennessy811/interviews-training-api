import { connectToDatabase } from "../../shared/utils/connectdb";

// The main, exported, function of the endpoint,
// dealing with the request and subsequent response
export default async (req, res) => {
  // Get a database connection, cached or otherwise,
  // using the connection string environment variable as the argument
  const db = await connectToDatabase(process.env.MONGODB_URI);

  // Select the "users" collection from the database
  const collection = await db.collection("users");

  // Select the users collection from the database
  const users = await collection.find({}).toArray();

  // Respond with a JSON string of all users in the collection
  res.status(200).json({ users });
};
