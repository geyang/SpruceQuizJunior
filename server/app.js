if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['module', 'express', 'http', 'mongoose', 'passport', 'path', 'less-middleware',
    './routes', './models/User', './spider/spiderRouter'],
    function (module, express, http, mongoose, passport, path, lessMiddleware,
              routes, User, spiderRouter) {
        "use strict";

        var resetDB = ( process.env.RESETDB || false );

        if (typeof process.env.NJ_MAILER_PASSWORD != 'string') {
            console.log('NJ_MAILER_PASSWORD environmental variable not set. Need for nodemailer.');
            throw new Error("Cannot find variable NJ_MAILER_PASSWORD");
        }

        var app = express();

        mongoose.connect('mongodb://localhost/nantijiazidb', function (err) {
            if (resetDB == 'true' || resetDB == 'True') {
                console.log(resetDB);
                mongoose.connection.db.dropDatabase(function (err) {
                    console.log("reset database complete");
                });
            }
        });

        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function callback() {
            console.log('Connected to Nantijiazi database');
        });
        // Now setup view and stylesheet path and middlewares
        if (module.uri) {
            var __dirname = path.dirname(module.uri) + '/';
        } else {
            var __dirname = path.dirname(module.filename) + '/';
        }

        app.set('views', __dirname + '../client/views');
        app.set('view engine', 'jade');
        app.use(express.logger('dev'))
        app.use(express.cookieParser());
        app.use(express.bodyParser());
//        app.use(express.favicon(__dirname + '../client/img/favicon.ico'));
        app.use(express.methodOverride()); // Allows the use of HTTP 'DELETE' AND 'PUT' methods.
        app.use(lessMiddleware({ src: __dirname + '../client', compress: true }));
        app.use(express.static(path.join(__dirname, '../client')));
        app.use(express.cookieSession(
            {
                secret: process.env.COOKIE_SECRET || "Superdupersecret"
            }));
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(spiderRouter);

        passport.use(User.localStrategy);
        //passport.use(User.twitterStrategy());  // Comment out this line if you don't want to enable login via Twitter
        //passport.use(User.facebookStrategy()); // Comment out this line if you don't want to enable login via Facebook
        //passport.use(User.googleStrategy());   // Comment out this line if you don't want to enable login via Google
        //passport.use(User.linkedInStrategy()); // Comment out this line if you don't want to enable login via LinkedIn
        passport.serializeUser(User.serializeUser);
        passport.deserializeUser(User.deserializeUser);

        routes(app);

        if (!process.env.PORT) process.env.PORT = 8000;
        app.set('port', process.env.PORT);

        return app;
    });
