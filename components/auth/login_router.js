const express = require('express');
const router = express.Router();
// using passport for authorization

const passport = require("./passport")

// this router will manipulate the url to inform the client about the wrong password info
router.get('/', function (req, res, next) {
    res.render('./auth/login', {wrongPass: req.query.wrongPass !== undefined});
});


// use passport middleware
router.post('/',
    // redirect is not render page but to throw the url out and it go to another router 
    passport.authenticate('local', {
        successRedirect: '/',
        // if failed to login we add some query string so the client will alert user about the error
        failureRedirect: '/login?wrongPass'
    })
);

router.get("/logout",(req, res)=>{
    req.logout();
    res.redirect('/');
})
module.exports = router;