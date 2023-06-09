import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import RestaurantsDAO from "./dao/restaurantsDAO.js";

dotenv.config();
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

MongoClient.connect(process.env.REST_REVIEWS_DB_URI, {
  //poolSize: 50,
  //wtimeout: 2500,
  //useNewUrlParse: true,
  useUnifiedTopology: true,
})
  .catch((err) => {
    console.log("Foutje");
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await RestaurantsDAO.injectDB(client);
    app.listen(port, () => {
      console.log("Luisteren op poort ${port}");
    });
  });
