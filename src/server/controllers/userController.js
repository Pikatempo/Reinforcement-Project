// import database 
const db = require('../model')

const userController = {};

userController.addUser = async (req, res, next) => {

};

userController.verifyUser = async (req, res, next) => {
    const {username, password} = req.body 

    const query = 'SELECT * FROM users WHERE username = $1 and password = $2'
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.log('Error querying the database')
            return res.status(500).json({error: 'An error occured'})
        }

        if (results.length === 1) {
            req.user = results[0]
            next(); 
        } else {
            return res.status(401).json({error: 'Invalid username or password'})
        }
    })
    
};





