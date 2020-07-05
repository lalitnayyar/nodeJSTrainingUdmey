var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://lalitnayyar:Sharda@23@cluster0-ow0zp.mongodb.net/shop?retryWrites=true&w=majority";


//Find documents 
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("shop");
  var query = { price: "123" };
  dbo.collection("products").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
}); 


//insert
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("shop");
  let r = Math.random().toString(36).substring(7);
  var myobj = { title: r, price: Math.pow(Math.random(),2).toString() ,imageUrl: "http://xyz.com/"+r+".jpg" , userId: "5ee632cd6a3a702faf34152d" };
  dbo.collection("products").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});

//find one

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("shop");
    dbo.collection("products").findOne({}, function(err, result) {
      if (err) throw err;
      console.log(result.title);
      db.close();
    });
  }); 

//Find all documents in the customers collection

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("shop");
    dbo.collection("products").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  }); 

  //Sort the result alphabetically by name:

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("shop");
    var mysort = { title: 1 };
    dbo.collection("products").find().sort(mysort).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });

  //Update the document

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("shop");
    var myquery = { title: "cagf2p" };
    var newvalues = { $set: {title: "Mickey", price: "99.99" } };
    dbo.collection("products").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
    });
  });

  //Limit the result to only return 5 documents:

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("shop");
    dbo.collection("products").find().limit(5).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });


  //Join the matching "products" document(s) to the "orders" collection:

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("shop");
    dbo.collection('users').aggregate([
      { $lookup:
         {
           from: 'products',
           localField: 'productId',
           foreignField: '_id',
           as: 'orderdetails'
         }
       }
      ]).toArray(function(err, res) {
      if (err) throw err;
      console.log(JSON.stringify(res));
      db.close();
    });
  }); 