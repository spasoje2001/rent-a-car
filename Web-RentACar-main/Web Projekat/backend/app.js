const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const authMiddleWare = require("./middleware/auth");

const userController = require("./controllers/user_controller.js");
const authController = require("./controllers/auth_controller.js");
const locationController = require("./controllers/location_controller.js");
const basketController = require("./controllers/basket_controller.js");
const commentController = require("./controllers/comment_controller.js");
const orderController = require("./controllers/order_controller.js");
const rentacarController = require("./controllers/rentacar_controller.js");
const vehicleController = require("./controllers/vehicle_controller.js");

require("dotenv").config();



const app = express();


//app.listen(3000);

app.use(express.json());
app.use(morgan('dev'));

const corsOptions = {
    origin: "http://localhost:8080",
};
app.use(cors(corsOptions));

app.use(
    "/users",
    authMiddleWare(["Customer", "Manager", "Administrator"]),
    userController
);

app.use("/auth", authController);
app.use("/locations", locationController);
app.use("/basket", basketController);
app.use("/comments", commentController);
app.use("/orders", orderController);
app.use("/rentacar", rentacarController);
app.use("/vehicles", vehicleController);
/*
app.get('/', (req,res) => {
    res.sendFile('./views/index.html', { root: __dirname });
});

app.get('/signin', (req,res) => {
    res.sendFile('./views/signin.html', { root: __dirname });
});

app.post('/signin', (req,res) => {
    const user = req.body;
    console.log(user);
    try{
        if(userService.exist(user)){
            res.sendFile('./views/index.html', { root: __dirname });
            console.log("korisnik " + user.username + " ulogovan!");

        }
        else{
            res.sendFile('./views/registration.html', { root: __dirname });
            console.log("ne postoji korisnik " + user.username + "!");
        }        
    }
    catch(err){
        res.status(500).json({err : "Failure!"});
    }
});
app.get('/registration', (req,res) => {
    res.sendFile('./views/registration.html', { root: __dirname });
});

app.post('/registration', (req,res) => {
    const user = req.body;
    console.log(user);
    try{
        userService.create(user);
        res.status(200).json({message: "Success!"});
        
    }
    catch(err){
        res.status(500).json({err : "Failure!"});
    }
});

app.get('/allusers', (req,res) => {
    res.sendFile('./views/allusers.html', { root: __dirname });
});

app.get('/editprofile', (req,res) => {
    res.sendFile('./views/editprofile.html', { root: __dirname });
});

app.get('/allrentobjects', (req,res) => {
    res.sendFile('./views/allrentobjects.html', { root: __dirname });
});

app.use((req,res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname });
});
*/

app.listen(3000, () => console.log("Server running!"));