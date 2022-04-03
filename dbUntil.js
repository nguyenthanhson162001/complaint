const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://son:162001@cluster0.vch9y.mongodb.net/complaint?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

module.exports = {
  insertComplaint: (data) => {
    client.connect(async function (err, db) {
      if (err) throw err;
      var dbo = db.db("complaint");
      const result = await dbo.collection("complaint").insertOne(data);
      db.close();
      return result;
    });
  },
};
