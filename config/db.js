const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

const mongo = process.env.MONGO_URI || "";

const client = new MongoClient(mongo);
  
var _db;

module.exports = {
    connectToServer: function(callback) {
        client.connect(function (err, db) {
            // Verify we got a good "db" object
            if (db)
            {
                _db = db.db("test_example");
                console.log("Successfully connected to MongoDB.");
            }
            return callback(err);
        });
    },
      
      getDb: function() {
        return _db;
      }
}
