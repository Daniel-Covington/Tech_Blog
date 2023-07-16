// Import express router
const router = require('express').Router();

// Import API routes
const apiRoutes = require('./api-routes');

// Import HTML routes
const htmlRoutes = require('./html-routes');

// Middleware to add user info to response
router.use((req, res, next) => {
  res.locals.loggedIn = req.session.logged_in;
  next();
});

// Use the API routes when /api is called
router.use('/api', apiRoutes);

// Use the HTML routes when no API routes are hit
router.use(htmlRoutes);

// Export the router
module.exports = router;