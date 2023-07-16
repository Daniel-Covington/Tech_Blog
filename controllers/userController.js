const router = require('express').Router();
const { User } = require('../models');

// Login route
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login', {
        logged_in: req.session.logged_in
    });
});

// Signup route
router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('signup', {
        logged_in: req.session.logged_in
    });
});

// Logout route
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.post('/', async (req, res) => {
    try {
      console.log(req.body); 
      const userData = await User.create(req.body);
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.status(201).json({ success: true, user: userData });
      });
    } catch (err) {
      console.error(err);
      res.status(400).json({ success: false, message: 'Failed to create user' });
    }
  });


module.exports = router;