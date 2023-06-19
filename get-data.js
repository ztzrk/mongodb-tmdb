const { MongoClient } = require("mongodb");
const axios = require("axios");

async function insertTMDBData() {
  // Connect to MongoDB
  const client = await MongoClient.connect("mongodb://localhost:27017");
  const db = client.db("tmdb_database");

  // Retrieve TMDB data using the API
  const response = await axios.get(
    "https://api.themoviedb.org/3/movie/popular",
    {
      params: {
        api_key: "YOUR_TMDB_API_KEY",
      },
    }
  );
  const movies = response.data.results;

  // Insert the data into MongoDB
  const collection = db.collection("movies");
  await collection.insertMany(movies);

  // Close the MongoDB connection
  client.close();

  console.log("TMDB data inserted into MongoDB");
}

insertTMDBData().catch(console.error);
