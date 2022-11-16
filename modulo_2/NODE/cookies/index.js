const express = require('express');
const {join} = require('path');
const cookieParser = require('cookie-parser');

const port = 3000;
const staticFiles = 'public';

const app = express();

app.use(cookieParser());

app.use(express.static(join(__dirname, staticFiles)));

app.get('/setcookie', (req, res) =>{
    res.cookie(
        "theme", "dark",{
            // maxAge: 60*60,
            sameSite: 'lax',
            expires: new Date('2022-11-17')
        }
    );
    res.send("Set cookies")
});

app.get("/getcookie", (req, res) =>{
    console.log(req.cookies);
    res.send("Get cookies")
});

app.listen(port, ()=> console.log('Server Running'));