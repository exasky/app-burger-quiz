import express from 'express';
import cors from 'cors';
import http from 'http';
import path from 'path';
import flash from 'connect-flash';
import passport from 'passport';
import bodyParser from 'body-parser';
import session from 'express-session';
import { Server as SocketIOServer } from 'socket.io';

import confServer = require('./config/config-server');
import { passportConfig } from './config/passport';
import { routeConfig } from './app/routes';
import { gameConfig } from './app/game';
import starter from './config/starter';

// Global variable storing the base path of the app (Linux path compatibility)
declare global {
    var __basedir: string;
}
global.__basedir = confServer.rootDir;

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: '*',
    }
});

app.use(express.static(path.join(confServer.rootDir, '/views/public/')));
app.use('/qrcode', express.static(path.join(confServer.rootDir, '/node_modules/qrcode/build/')));

app.set('views', path.join(confServer.rootDir, 'views/'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

// session secret
app.use(session({
    secret: '6RU8WwGOiQ54sKJtxw1CfmL9Ve5phvQd',
    resave: true,
    saveUninitialized: true
} as any));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(cors());

// Passport configuration
passportConfig(passport);

// Inject into router
routeConfig(app, passport);

// Declare the game here
gameConfig(io);

// Get utility methods for network
const port = process.env.PORT || confServer.network.port;

server.listen(port, () => starter.messagesToDisplayWhenServerStart(+port));
