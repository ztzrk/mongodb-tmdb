const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;

// Set up EJS as the view engine
app.set("view engine", "ejs");

// Define a route to fetch and render TMDB data
app.get("/", async (req, res) => {
  try {
    // Connect to MongoDB
    const client = await MongoClient.connect("mongodb://localhost:27017");
    const db = client.db("tmdb_database");
    const collection = db.collection("movies");

    // Retrieve the TMDB data from MongoDB
    const movies = await collection.find().toArray();

    // Render the EJS template and pass the movies data
    res.render("index", { movies });

    // Close the MongoDB connection
    client.close();
  } catch (error) {
    console.error("Error retrieving TMDB data:", error);
    res.status(500).send("Internal server error");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
