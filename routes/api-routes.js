const router = require('express').Router();
const { Router } = require('express');
const User = require('../models/User'); 
const Post = require('../models/Post');

const userRoutes = Router();

userRoutes.get('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
});

userRoutes.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

  userRoutes.post('/login', async (req, res) => {
    try {
        // Look up the user
        const user = await User.findOne({ where: { username: req.body.username } });

        // Check the password
        if (user && user.checkPassword(req.body.password)) {
            // Successful login!
            req.session.user = user.get({ plain: true });
            req.session.user_id = user.id;  // add this line
            req.session.logged_in = true;  // make sure logged_in is set to true
            
            req.session.save((err) => {
                if (err) {
                    // handle error
                    console.log(err);
                    res.status(500).json(err);
                } else {
                    res.json({ success: true });
                }
            });
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

userRoutes.post('/', async (req, res) => {
    try {
      const userData = await User.create(req.body);
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.status(200).json(userData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
});

router.use('/users', userRoutes);

router.post('/posts', async (req, res) => {
    try {
       
        if (!req.session.user) {
            return res.status(401).json({ success: false, message: 'You must be logged in to create a post' });
        }

        const { title, content } = req.body;
        const newPost = await Post.create({ 
            title, 
            content, 
            user_id: req.session.user.id
        });

        res.json({ success: true, post: newPost });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;