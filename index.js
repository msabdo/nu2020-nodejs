const express = require('express')
const app = express()

app.use(express.json())

let products = [
    {id:1, name:'Noodles', price:10.5},
    {id:2, name:"Milk", price:20.5},
    {id:3, name:"Egg", price:1.5},
    {id:4, name:"Rice", price:10.5},
    {id:5, name:"Pepsi", price:5.0}
];

app.get('/', function(req, res){
    res.send('Hello World !!!');
});
app.get('/products/:id',function(req, res){
    
    let id = parseInt(req.params.id);    
    const product = products.find(p => p.id === id);
    res.send(JSON.stringify(product));
});

app.get('/products', function(req, res){
    res.send(JSON.stringify(products));
});

app.post('/products', function(req, res){
    last_id = products[products.length-1].id;
    product = {
        id: last_id+ 1,
        name: req.body.name,
        price: req.body.price
    };
    products.push(product);
    res.send(JSON.stringify(products));
});

app.put('/products/:id', function(req, res){
    let id = parseInt(req.params.id);
    const p_index = products.findIndex(p => p.id === id);
    if (p_index !== undefined){
        products[p_index].name = req.body.name;
        products[p_index].price = req.body.price;
        res.send(JSON.stringify(products));
    }
});

app.delete('/products/:id', function(req, res){
    let id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    const p_index = products.indexOf(product);
    products.splice(p_index, 1);
    res.send(JSON.stringify(products));
    
});

app.listen(3000);