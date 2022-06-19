import mongoose from "mongoose";

import config from "../config/database";

class Database{
  constructor(){
    this.connection = mongoose.connect(
      config.url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
    .then(() => console.log('database connect'))
    .catch((err) => console.log(`database not connect, error: ${err}`))      
  }
}

export default new Database();