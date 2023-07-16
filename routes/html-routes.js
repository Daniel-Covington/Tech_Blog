const router = require('express').Router();
const User = require('../models/User'); 
const Post = require('../models/Post'); 

// Home route
router.get('/', async (req, res) => {
    try {
        let posts = [];

        // Fetch all posts for all users, regardless of login status
        posts = await Post.findAll({ raw: true });

        res.render('index', { posts, logged_in: !!req.session.logged_in });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Login view route
router.get('/login', async (req, res) => {
    try {
        res.render('login', { logged_in: !!req.session.logged_in });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Sign Up view route
router.get('/signup', async (req, res) => {
    try {
        res.render('signup', { logged_in: !!req.session.logged_in });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});


// Dashboard view route
router.get('/dashboard', async (req, res) => {
    try {
        if (!req.session.logged_in) {
            console.log("User not logged in");
            return res.redirect('/login');
        }

        console.log("Getting user data for:", req.session.user_id);

        // Fetch user data
        const userData = await User.findByPk(req.session.user_id);
        
        // If user data could not be retrieved
        if (!userData) {
            console.log("User data not retrieved");
            return res.status(404).json({ message: "No user found with this id" });
        }

        const user = userData.get({ plain: true });
        console.log("User data retrieved:", user);

        // Now let's try fetching posts
        console.log("Fetching posts for user:", req.session.user_id);
        const userPosts = await Post.findAll({ where: { user_id: req.session.user_id } });
        console.log("Fetched posts:", userPosts);
        console.log("Fetched posts:", userPosts.map(post => post.get({ plain: true })));
        
        // Render the dashboard view, passing in the user and their posts
        res.render('dashboard', { 
            username: user.username, 
            posts: userPosts, // pass the fetched posts
            logged_in: !!req.session.logged_in 
        });

    } catch (err) {
        console.error(err); // Changing console.log to console.error
        res.status(500).json(err);
    }
});

router.post('/posts', async (req, res) => {
    try {
        if (!req.session.logged_in) {
            return res.status(401).json({ success: false, message: 'You must be logged in to create a post' });
        }

        const { title, content } = req.body;
        const newPost = await Post.create({ 
            title, 
            content, 
            user_id: req.session.user_id
        });

        res.json({ success: true, post: newPost });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/logout', async (req, res) => {
    try {
        req.session.destroy(() => {
            res.redirect('/');
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});



module.exports = router;