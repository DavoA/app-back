const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const port = 3001;
const routes = require("./routes");

main().catch((err) => console.log(err));

async function main() {
  try {
    console.log('MongoDB connection details:');
    console.log(`Username: ${process.env.MONGO_INITDB_ROOT_USERNAME}`);
    console.log(`Database: ${process.env.MONGO_INITDB_DATABASE}`);
    await mongoose.connect(`mongodb://admin:password@mongodb-service.ingress-nginx.svc.cluster.local:27017`,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );

    const app = express();
    app.use(cors({
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.use(express.json());
    app.use("/api", routes);

    app.listen(port, () => {
      console.log(`Server is listening on port: ${port}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
}
