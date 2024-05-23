
const express = require('express');
const app = express();
const cors = require('cors');

const fs = require('fs');
let products = [];
fs.readFile('./DB.json', 'utf8', (err, data) => {
    if (err) {
        console.log(`Error reading file from disk: ${err}`);
    } else {
        // parse JSON string to JSON object
        products = JSON.parse(data);
        console.log("products", products);
    }

});

const bodyParser = require('body-parser');
app.use(bodyParser.json({
    parameterLimit: 100000,
    limit: 102410241024,
    extended: true
}));

app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.get('/getAllProducts', (req, res, next) => {
    console.log(req.params)
    res.status(200).json({products, productsFound: true });
})

//  Connect all our routes to our application
app.post('/addProduct', (req, res, next) => {
    console.log("add product req:", req.body);
    products.push(req.body);
    const data = JSON.stringify(products);

    fs.writeFile('./DB.json', data, 'utf8', (err) => {

        if (err) {
            console.log(`Error writing file: ${err}`);
            res.status(200).json({ message: "Error adding product" , success: false});
        } else {
            console.log(`File is written successfully!`);
            res.status(200).json({ message: "Product added successfully!" , success: true});
        }
    });

})


app.patch('/updateProduct', (req, res, next) => {
    console.log("update product req:", req.body);
    let flag = false;

    for (let product of products) {
        console.log("product:", product);
        if (req.body.name == product.name) {
            flag = true;
            console.log("true");
            product.category = req.body.category;
            product.price = req.body.price;
            product.stocked = req.body.stocked;
            break;
        }
    }

    if (flag) {
        console.log(products);
        const data = JSON.stringify(products);
        fs.writeFile('./DB.json', data, 'utf8', (err) => {

            if (err) {
                console.log(`Error writing file: ${err}`);
                res.status(200).json({ message: "error updating product" , isUpdated: false});
            } else {
                console.log(`File is written successfully!`);
                res.status(200).json({ isUpdated: true });
            }
        });
    } else {
        console.log("Product not found");
        res.status(200).json({ isUpdated: false });
    }

})

const server = app.listen(8000, function () {
    const host = server.address().address
    const port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})