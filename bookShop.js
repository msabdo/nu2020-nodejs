const express = require('express')
const app = express()

app.use(express.json())

let books = [
    {isbn:123, title:'book_1', publisher:"pub_1"},
    {isbn:321, title:"book_2", publisher:"pub_2"},
    {isbn:456, title:"book_3", publisher:"pub_3"},
    {isbn:654, title:"book_4", publisher:"pub_4"},
    {isbn:789, title:"book_5", publisher:"pub_5"}
];

app.get('/', function(req, res){
    res.send('Hello World !!!');
});
app.get('/books/:isbn',function(req, res){
    
    let isbn = parseInt(req.params.isbn);    
    const book = books.find(p => p.isbn === isbn);

    if(book === undefined){
        res.send(JSON.stringify({'is_found':false}));
    }
    else{
        res.send(JSON.stringify(book));
    }
    
});

app.get('/books', function(req, res){
    res.send(JSON.stringify(books));
});

app.post('/books', function(req, res){
    book = {
        isbn: req.body.isbn,
        title: req.body.title,
        publisher: req.body.publisher
    };
    is_found = books.includes(book)
    if(is_found){
        res.send(JSON.stringify({'is_found':true}));
    }
    else{
    books.push(book);
    res.send(JSON.stringify(books));
    }
});

app.put('/books/:isbn', function(req, res){
    let isbn = parseInt(req.params.isbn);
    const p_index = books.findIndex(p => p.isbn === isbn);
    if (p_index !== undefined){
        books[p_index].title = req.body.title;
        books[p_index].publisher = req.body.publisher;
        res.send(JSON.stringify(books));    
    }
    else{
        res.send(JSON.stringify({'is_found':false}));
    }
});

app.delete('/books/:isbn', function(req, res){
    let isbn = parseInt(req.params.isbn);
    const book = books.find(p => p.isbn === isbn);
    if(book === undefined)
    {
        res.send(JSON.stringify({'is_found':false}));
    }
    else
    {
        const p_index = books.indexOf(book);
        books.splice(p_index, 1);
        res.send(JSON.stringify(books));
    }
    
});

app.listen(3000);