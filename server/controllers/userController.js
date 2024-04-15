const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const checkAuth = require('../middleware/check-auth');

// const User = db.user;
const { emailSchema, passwordSchema } = require('../util/validation_schema');

module.exports.addUser = async (req, res, next) => {
    try {
        //validate email
        const { error: emailError } = emailSchema.validate(req.body.email);
        if (emailError) {
            return res.status(400).json({ message: emailError.details[0].message });
        }

        //validate password
        const { error: passwordError } = passwordSchema.validate(req.body.password);
        if (passwordError) {
            return res.status(400).json({ message: passwordError.details[0].message });
        }
        //check if required fields are present
        // if (!req.body.username || !req.body.email || !req.body.password || !req.body.firstName || !req.body.lastName) {
        //     return res.status(400).json({ message: 'All fields cannot be empty' });
        // }

        //A better way to validate required fields
        const requiredFields = ['username', 'email', 'password', 'firstName', 'lastName'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({ message: 'All fields cannot be empty' });
        }

        //Check if username or email already exists
        const existingUser = await User.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.email }
            ]
        });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        //create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            storeName: req.body.storeName,
            forSaleItems: req.body.forSaleItems
        });
        // Save the new user
        await newUser.save();

        return res.status(201).json({
            message: 'User added successfully'
        });
    } catch (err) {
        return res.status(500).json({
            message: 'An error occurred',
            error: err
        });
    }
}

module.exports.loginUser = async(req, res, next) => {
    try {
        const { username, password } = req.body;

        // Find the user by username in the database
        const user = await User.findOne({ username })

        // If user not found, return 404
        if(!user) {
            return res.status(404).json({ message: 'User not found'});
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        //If passwords don't match, return 401
        if(!passwordMatch) {
            return res.status(401).json({ message: 'Invalid Password' });
        }
        //If no errors proceed to generate a JWT token

        // const secretKey = crypto.randomBytes(32).toString('hex');
        const secretKey = "my_secret_key";
        const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '10h' });

        //Send token to client
        res.status(200).json({ token });

        
        
    } catch(err) {
        res.status(500)
            .json({ message: err.message || 'An error occured while authenticating users.'});
    
    }

}

module.exports.getUser = async(req, res, next) => {
    try {

        const user = await User.findOne({ username: req.user.username }).select('-_id -password');
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch(error) {
        console.error('Error fetching user data', error);
        res.status(500).json({ message: 'An error occured while fetching data'});

    }
}

module.exports.addForSaleItem = async (req, res, next) => {
    try {
        const { itemName, price, stock, itemId } = req.body;

        const user = await User.findOne({ username: req.params.username }).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newItem = {
            itemId,
            itemName,
            price,
            stock
        };

        // Push the new item into forSaleItems array
        await user.forSaleItems.push(newItem);
        // Save the updated user
        await user.save();

        

        res.status(200).json({ message: 'Item added successfully', items: user.forSaleItems});
    } catch (error) {
        console.error('Error adding item', error);
        res.status(500).json({ message: 'An error occurred while adding item' });
    }
}

module.exports.deleteForSaleItem = async (req, res, next) => {
    try {
        const { username, itemId } = req.params;

        const user = await User.findOne({ username: username }).select('-password');

        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        //find the index of the item with the given itemId in the forSaleItems array
        //Make sure to make the item.id a string
        const itemIndex = user.forSaleItems.findIndex(item => item.itemId.trim() === itemId.trim());

        if(itemIndex === -1) {
            return -res.status(404).json({ message: "Item not found for the user" });

        }
        //remove the item from the forSaleItems array
        user.forSaleItems.splice(itemIndex, 1);

        await user.save();
        res.status(200).json({ 
            message: `Item with itemId: ${itemId} deleted successfully`,  
            user: user
        });

    } catch (error){
        console.error('Error deleting item:', error);
        res.status(500).json({ message: 'Server error'});

    }
    
}

