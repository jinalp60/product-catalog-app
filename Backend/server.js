
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

app.post('/userLogin', (req, res, next) => {
    console.log("user login req:", req.body);
    let flag = false;
    for (let user of users) {
        console.log("user:", user);
        if (req.body.name == user.name && req.body.password == user.password) {
            flag = true;
            console.log("true");
            res.status(200).json({ isLogIn: true });
        }
    }
    if (!flag) {
        res.status(200).json({ isLogIn: false });
    }

})

app.get('/getUserProfile/:name', (req, res, next) => {
    // console.log(req)
    let flag = false;
    for (let user of users) {
        if (user.name == req.params.name) {
            flag = true;
            res.status(200).json({ user, isUserFound: true });
            break;
        }
    }
    if (!flag) {
        res.status(200).json({ isUserFound: false });
    }
})

app.patch('/updateUserProfile', (req, res, next) => {
    console.log("register user req:", req.body);
    let flag = false;

    for (let user of users) {
        console.log("user:", user);
        if (req.body.name == user.name) {
            flag = true;
            console.log("true");
            //user.password = req.body.password;
            user.bio = req.body.bio;
            user.email = req.body.email;
            user.phone = req.body.phone;
            user.imagePath = req.body.imagePath;
            break;
        }
    }

    if (flag) {
        console.log(users);
        const data = JSON.stringify(users);

        fs.writeFile('./DB.json', data, 'utf8', (err) => {

            if (err) {
                console.log(`Error writing file: ${err}`);
                res.status(200).json({ message: "error registering user" });
            } else {
                console.log(`File is written successfully!`);
                res.status(200).json({ isUpdated: true });
            }
        });
    } else {
        console.log("User not found");
        res.status(200).json({ isUpdated: false });
    }


})

app.get('/getUserTasks/:name', (req, res, next) => {
    // console.log(req)
    let flag = false;
    for (let user of users) {
        if (user.name == req.params.name) {
            flag = true;
            res.status(200).json({ tasks: user.tasks, isUserFound: true });
            break;
        }
    }
    if (!flag) {
        res.status(200).json({ isUserFound: false });
    }
})

app.post('/completeTasks', (req, res, next) => {
    console.log("complete tasks user req:", req.body);
    let flag = false;

    let tasksToBeCompleted = req.body.tasks.map(task => task.name);

    for (let user of users) {
        if (req.body.name == user.name) {
            flag = true;

            for (let task of user.tasks) {
                if (tasksToBeCompleted.includes(task.name)) {
                    task.status = 'completed';
                }
            }
            break;
        }
    }

    if (flag) {
        console.log(users);
        const data = JSON.stringify(users);

        fs.writeFile('./DB.json', data, 'utf8', (err) => {

            if (err) {
                console.log(`Error writing file: ${err}`);
                res.status(200).json({ message: "error registering user" });
            } else {
                console.log(`File is written successfully!`);
                res.status(200).json({ isUpdated: true });
            }
        });
    } else {
        console.log("User not found");
        res.status(200).json({ isUpdated: false });
    }

})

app.post('/removeTasks', (req, res, next) => {
    console.log("complete tasks user req:", req.body);
    let flag = false;

    const tasksToBeRemoved = req.body.tasks.map(task => task.name);

    for (let user of users) {
        if (req.body.name == user.name) {
            flag = true;

            for (let i = 0; i < user.tasks.length; i++) {
                let task = user.tasks[i];
                if (tasksToBeRemoved.includes(task.name)) {
                    user.tasks.splice(i, 1);
                    i--;
                }
            }
            break;
        }
    }

    if (flag) {
        console.log(users);
        const data = JSON.stringify(users);

        fs.writeFile('./DB.json', data, 'utf8', (err) => {

            if (err) {
                console.log(`Error writing file: ${err}`);
                res.status(200).json({ message: "error registering user" });
            } else {
                console.log(`File is written successfully!`);
                res.status(200).json({ isUpdated: true });
            }
        });
    } else {
        console.log("User not found");
        res.status(200).json({ isUpdated: false });
    }

})

app.post('/addTasks', (req, res, next) => {
    console.log("complete tasks user req:", req.body);
    let flag = false;

    let tasksToBeAdded = req.body.task;

    for (let user of users) {
        if (req.body.name == user.name) {

            if (tasksToBeAdded.length > 0) {
                flag = true;
                for (let i = 0; i < user.tasks.length; i++) {
                    if (user.tasks[i].name === tasksToBeAdded) {
                        console.log("duplicate:", user.tasks[i]);
                        flag = false
                        res.status(200).json({ duplicateTask: True });
                        break;
                    }

                }
                if (flag) {
                    task_dict = {}
                    task_dict["name"] = tasksToBeAdded
                    task_dict["status"] = "active"
                    user.tasks.push(task_dict)
                }
            }
            else {
                res.status(200).json({ emptyTask: True });
            }
        }
    }


    if (flag) {
        console.log(users);
        const data = JSON.stringify(users);
        fs.writeFile('./DB.json', data, 'utf8', (err) => {
            if (err) {
                console.log(`Error writing file: ${err}`);
                res.status(200).json({ message: "error registering user" });
            } else {
                console.log(`File is written successfully!`);
                res.status(200).json({ isUpdated: true });
            }
        });
    }

    else {
        console.log("User not found");
        res.status(200).json({ isUpdated: false });
    }

})

app.post('/addPhoto', (req, res, next) => {
    console.log("complete tasks user req:", req.body);
    let flag = false;

    for (let user of users) {
        if (req.body.name == user.name) {
            user.photos.unshift({ imageUrl: req.body.imageUrl, label: req.body.label });
            flag = true;
            break;
        }
    }

    if (flag) {
        console.log(users);
        const data = JSON.stringify(users);
        fs.writeFile('./DB.json', data, 'utf8', (err) => {
            if (err) {
                console.log(`Error writing file: ${err}`);
                res.status(200).json({ message: "error registering user" });
            } else {
                console.log(`File is written successfully!`);
                res.status(200).json({ message: "Success" });
            }
        });
    }
    else {
        console.log("User not found");
        res.status(200).json({ message: "Failure" });
    }

})

app.post('/deletePhoto', (req, res, next) => {
    console.log("complete tasks user req:", req.body);
    let flag = false;

    for (let user of users) {
        if (req.body.name == user.name && req.body.password == user.password) {
            user.photos.splice(req.body.photoIndex, 1);
            flag = true;
            break;
        }
    }

    if (flag) {
        console.log(users);
        const data = JSON.stringify(users);
        fs.writeFile('./DB.json', data, 'utf8', (err) => {
            if (err) {
                console.log(`Error writing file: ${err}`);
                res.status(200).json({ message: "error registering user" });
            } else {
                console.log(`File is written successfully!`);
                res.status(200).json({ message: "Success" });
            }
        });
    }
    else {
        console.log("User not found");
        res.status(200).json({ message: "Failure" });
    }

})

app.post('/updatePhoto', (req, res, next) => {
    console.log("complete tasks user req:", req.body);
    let flag = false;

    for (let user of users) {
        if (req.body.name == user.name) {
            user.photos[req.body.photoIndex].imageUrl = req.body.imageUrl;
            flag = true;
            break;
        }
    }

    if (flag) {
        console.log(users);
        const data = JSON.stringify(users);
        fs.writeFile('./DB.json', data, 'utf8', (err) => {
            if (err) {
                console.log(`Error writing file: ${err}`);
                res.status(200).json({ message: "error registering user" });
            } else {
                console.log(`File is written successfully!`);
                res.status(200).json({ message: "Success" });
            }
        });
    }
    else {
        console.log("User not found");
        res.status(200).json({ message: "Failure" });
    }

})

const server = app.listen(8000, function () {
    const host = server.address().address
    const port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})