// routes/auth.js

module.exports = function(app,passport) {

    //sends success login state back to angular
    app.get('/success',function(req,res){
        res.send({user : req.user});
    });

    //sends failure login state back to angular
    app.get('/failure', function(req, res){
        res.send({state: 'failure', user: null, message: {register : req.flash('signupMessage'), login : req.flash('loginMessage')}});
    });

    // =====================================
    // HOME PAGE============================
    // =====================================
    app.get('/',function(req,res){
        res.render('index');
    });

    app.get('/user',function(req,res){
        if (req.isAuthenticated()){
            res.send({user : req.user , auth : true});
        }
        else{
            res.send({user : null , auth : false});
        }
    });
    // =====================================
    // LOGIN ===============================
    // =====================================

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/success',
        failureRedirect: '/failure',
        failureFlash : true
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
     // process the signup form
    
    app.post('/register',passport.authenticate('local-signup', {
        successRedirect: '/success',
        failureRedirect: '/failure',
        failureFlash : true
    }));

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/',
            failureRedirect: '/'
        }));

    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect: '/',
                failureRedirect: '/'    
            }));


    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.json(req.user);
    });
};

