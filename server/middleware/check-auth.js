const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const header = req.headers;
        const token = req.headers.authorization.split(" ")[1];
        

        // Check if token is provided
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Verify the token and decode its payload
        const decodedToken = jwt.verify(token, "my_secret_key");

        // Attach decoded user information to the request object
        req.user = decodedToken;

        // Proceed to the next middleware or route handler
        next();
    } catch(error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ message: "Authentication failed!" });
    }
    
};


// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
    
//     try {
//         const token = req.headers.authorization.split(" ")[1];
//         if(!token) {
//             return res.status(401).json({ message: 'No token provided' });
//         }
//         jwt.verify(token, "my_secret_key");
//         next();

//     } catch(error) {
//         res.status(401).json({ message: "Authentication failed!" });
//     }
    
    
// }
