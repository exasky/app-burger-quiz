import { Express } from 'express';
import { PassportStatic } from 'passport';
import urlResolverService = require('./services/url-resolver');

export function routeConfig(app: Express, passport: PassportStatic) {
    /**
     * The base path where views are located
     */
    const basePathViews = app.get('views');

    /**
     * Default route for team selection
     */
    app.get("/", (req: any, res: any) => {
        res.render(basePathViews + "team-choice");
    });

    /**
     * Team selection
     */
    app.get("/buzzer", (req: any, res: any) => {
        const team: string = req.query.team;
        // If no team has been determined, redirect to home
        if (!team) {
            res.redirect("/");
            return;
        }
        res.render(basePathViews + "buzzer", {
            team: team
        });
    });

    /**
     * Game screen
     */
    app.get("/game", (req: any, res: any) => {
        const urlToGenerate = urlResolverService.retrieveUrlForQrCodeGeneration(req);
        res.render(basePathViews + "game", {
            urlToGenerate: urlToGenerate
        });
    });
    app.get("/game/url", (req: any, res: any) => {
        const urlToGenerate = urlResolverService.retrieveUrlForQrCodeGeneration(req);
        res.json({
            url: urlToGenerate
        })
    });

    /** Security */

    /**
     * Login form
     */
    app.get("/login", (req: any, res: any) => {
        res.render(basePathViews + "login");
    });

    // Authenticate the admin
    app.post('/login',
        passport.authenticate('local', {
            successRedirect: '/admin',
            failureRedirect: '/login',
            failureFlash: true
        })
    );

    /**
     * Admin remote control for managing the game
     */
    app.get("/admin", (req: any, res: any) => {
        res.render(basePathViews + "admin");
    });

    /**
     * Redirect to home if route not found
     * Warning: place this route last!
     */
    app.use((req: any, res: any) => {
        res.redirect('/');
    });

    /**
     * Middleware to know if user is logged in
     * Only for the admin part
     * @param req
     * @param res
     * @param next
     */
    function isLoggedIn(req: any, res: any, next: any) {
        // If user is authenticated, proceed to next request
        if (req.isAuthenticated())
            return next();
        // Otherwise redirect to authentication page
        res.redirect('/login');
    }
};
