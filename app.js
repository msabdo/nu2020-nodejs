const mongoose = require("mongoose");
const express = require('express');
// ObjectID = require('mongodb').ObjectID
const ObjectId = require('mongoose').Types.ObjectId 
const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true});

//https://mongoosejs.com/docs/guide.html#_id
const productSchema = mongoose.Schema({
    _id: ObjectId,
    name: String,
    price: Number
});

const Product = mongoose.model("Product",productSchema);

//CRUD
//create, read, update, delete
//queries documentation
//https://mongoosejs.com/docs/queries.html


//create  
app.post('/products',function(req,res){
    const product = new Product({
        _id: new ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product
        .save()
        .then(result => {
            console.log(result);
            console.log(typeof(product._id));
            res.send(JSON.stringify(result));
        })
        .catch(err => {
        console.log(err);
        });
});

//read
//get product by id
app.get('/products/:id', function(req, res){
    console.log(typeof(id));
    Product.findOne({_id: req.params.id})
        .exec()
        .then(prod => {
            console.log("product: "+prod.name+", price: "+prod.price);
            res.send(JSON.stringify(prod));
        })
        .catch(err => {
        console.log(err);
        });
});

//list all products(find all products)
app.get('/products', function(req, res){
    Product.find()
        .exec()
        .then(prod => {
            for(i=0;i<prod.length;i++)
               console.log(prod[i].name+", id: "+prod[i]._id+" price:"+prod[i].price);
            
            console.log(typeof(prod[0]._id));
            res.send(JSON.stringify(prod));
        })
        .catch(err => {
          console.log(err);
        });
    });

app.patch('/products/:id', function(req, res){
    //update
    //edit product by id
    Product.update({ _id: req.params.id },{price:req.body.price})
    .exec()
    .then(result => {
           console.log(result);
           res.send(JSON.stringify(result));
    })
    .catch(err => {
      console.log(err);
    });

});

app.delete('/products/:id', function(req, res){
    //delete
    // remove product by id
    Product.remove({_id: req.params.id})
    .exec()
    .then(result => {
           console.log(result);
           res.send(JSON.stringify(result));
    })
    .catch(err => {
      console.log(err);
    });
});


app.listen(3000);