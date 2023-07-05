const router = require('express').Router();

// Home route
router.get('/', async (req, res) => {
    try {
        res.render('index');
    } catch (err) {
        res.status(500).json(err);
    }
});

// Login view route
router.get('/login', async (req, res) => {
    try {
        res.render('login');
    } catch (err) {
        res.status(500).json(err);
    }
});

// Sign Up view route
router.get('/signup', async (req, res) => {
    try {
        res.render('signup');
    } catch (err) {
        res.status(500).json(err);
    }
});

// Dashboard view route
router.get('/dashboard', async (req, res) => {
    try {
        res.render('dashboard');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;