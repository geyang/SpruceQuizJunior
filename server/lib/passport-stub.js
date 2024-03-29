// Generated by CoffeeScript 1.6.3
(function () {
    var done, passportStub,
        _this = this;

    sU = function (user, req, done) {
        return done(null, user.id);
    };
    dU = function (user, req, done) {
        return done(null, user);
    };

    passportStub = function (req, res, next) {
        var passport;
        if (!_this.active) {
            return next();
        }
        passport = {
            deserializeUser: dU,
            serializeUser: sU,
            _userProperty: 'user',
            _key: 'passport'
        };
        req.__defineGetter__('_passport', function () {
            return {
                instance: passport,
                session: {
                    user: _this.user
                }
            };
        });
        req.__defineGetter__('user', function () {
            return _this.user;
        });
        return next();
    };

    exports.install = function (app) {
        this.app = app;
        return this.app.stack.unshift({
            route: '',
            handle: passportStub,
            _id: 'passport.stub'
        });
    };

    exports.uninstall = function () {
        if (this.app == null) {
            return;
        }
        return this.app.stack.forEach(function (middleware, index, stack) {
            if (middleware._id === 'passport.stub') {
                return stack.splice(index, 1);
            }
        });
    };

    exports.login = function (user) {
        if (this.app == null) {
            throw new Error('Passport Stub not installed.\
    Please run "passportStub.install(app)" first.');
        }
        this.active = true;
        return this.user = user;
    };

    exports.logout = function () {
        return this.active = false;
    };

}).call(this);
