const router = require('express').Router();
const User = require('../models/User'); 

router.post('/login', async (req, res) => {
    try {
        // Look up the user
        const user = await User.findOne({ where: { username: req.body.username } });

        // Check the password
        if (user && user.checkPassword(req.body.password)) {
            // Successful login!
            req.session.user = user;
            res.json({ success: true });
        } else {
            // Wrong username or password
            res.status(401).json({ success: false, message: 'Wrong username or password' });
        }
    } catch (err) {
        // Server error
        console.log(err); // Log the error
        res.status(500).json(err);
    }
});



module.exports = router;