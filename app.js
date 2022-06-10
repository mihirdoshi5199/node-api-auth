const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.static("public"));

app.get('/api', (req,res)=> {
    res.json({
        message: 'Welcome to Streamon'
    });
});


app.post('/api/posts', verifyToken, (req,res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
        res.sendStatus(403);
    } else {
    res.json({
        message: 'Post created..',
        authData
    });
}
});
});

app.post('/api/login', (req,res)=> {
    // Mock User
    const user = {
        id:1,
        username: 'mihir',
        email: 'mihirdoshi27@gmail.com'
    }

jwt.sign({user}, 'secretkey', {expiresIn: '25s' }, (err, token) => {
    res.json({
        token
    });
});
});

// FORMAT OF TOKEN

// AUTHORIZATION: Bearer <access_token> 

// Verify Tokens

function verifyToken(req, res, next)
{
    //Get auth header value

    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined 
    if(typeof bearerHeader !== 'undefined'){
        //Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken
        //Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}
app.listen(5000, ()=> console.log('Server started on port 5000'));