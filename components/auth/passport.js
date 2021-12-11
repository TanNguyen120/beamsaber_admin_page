// local strategy is a passport strategy that for authorization with local database information
const passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');


const authService = require("./auth_service");



// bcrypt function to compare password with hash password


// define strategy to local auth
passport.use(new LocalStrategy(
    // sequelize dont have callback methods so we have to use then catch
    async function (username, password, done) {
        try {
            const user = await authService.findUser(username);
            /*When Passport authenticates a request, it parses the credentials contained in the request. 
            It then invokes the verify callback with those credentials as arguments, in this case username and password. 
            If the credentials are valid, the verify callback invokes done to supply Passport with the user that authenticated. */
            console.log("user.id: " + user.user_id);

            // with admin page we have to check role too
            if (user.role != 'admin') {
                return done(null, false, { message: 'Wrong username' })
            }

            const mathPassword = await checkPassword(user, password)
            if (!mathPassword) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            console.log("found this user: " + JSON.stringify(user));

            if (user.account_status === 'ban') {
                return done(null, false, { message: "you are baned" });
            }
            return done(null, user);

        } catch (err) {
            console.log("cant find user: " + username);
            return done(null, false, { message: 'Incorrect username.' });
        }
    }
));

// This function is use bcrypt to decrypt password in database
// So we can check matches against user password
async function checkPassword(user, password) {
    return bcrypt.compare(password, user.password)
}

/*
    serializeUser and deserializeUser is for when password have authorized user we will create a session row for that user and when a cookie
    is sent to server we can identify the user
 */

// for storing user data to session storage and send this to client so it will store this in their cookie vault
// for performance purpose we just store user id and name in session
passport.serializeUser(function (user, done) {
    // user id and name will be store in sever Ram
    done(null, { user_id: user.user_id, user_name: user.name });
    console.log("Serialize: " + user.user_id);
});


// for performance purpose we not find the id in the database but will use thing store on session instead 
passport.deserializeUser(function (user, done) {
    return done(null, user);
    // NOT QUERY USER MODEL FOR PERFORMANCE PURPOSE 
    // try{
    //     const user = await authService.findUserById(user_id);
    //     console.log("Deserialized: " + JSON.stringify(user));
    //     if(user.length != 0) {
    //         done(null, user);
    //     }
    //     else {
    //         done(user.errors,null)
    //     }
    // }catch(err) {
    //     console.log(err);
    //     done(user.errors,null)}
});


module.exports = passport;