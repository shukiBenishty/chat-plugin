import { Router } from 'express';
import Debug from 'debug'

import models from "../mongooseModels";

const router = Router();
const User = models('User')
const debug = Debug("chat-plugin:login");

router.get('/', async (req, res) => {
    debug(`Login request ${req}`);
    if (req.session.userId === undefined) {
        if (req.session.referer === undefined){
             req.session.referer = req.get('Referer');
             if (req.session.referer === undefined)
                 req.session.referer = '/';
        }
        res.render("login", {title: "Login", problem: req.session.badLogin});
    }
    else
        res.redirect('/');
});

router.post('/', async (req, res) => {
    var session = req.session;
    let user;
    try {
        user = await User.findOne({username: req.body.user});
    } catch (err) {
        debug(`Login error: ${err}`);
        session.badLogin = "Login error";
        res.redirect(req.session.referer);
        return;
    }
    if (user === null) {
        debug(`Login no user: ${req.body.user}`);
        session.badLogin = `User '${req.body.user}' doesn't exist`;
        res.redirect(req.session.referer);
        return;
    }
    if (user.password !== req.body.password) {
        debug(`Login wrong password: ${req.body.password}/${user.password}`);
        session.badLogin = `Wrong password for '${req.body.user}'`;
        res.redirect(req.session.referer);
        return;
    }
    debug(`Logged to: ${user.username}`);
    delete session.badLogin;
    session.userId = user.id;
    session.userName = user.username;
    session.admin = user.admin;
    session.userName = user.name;
    session.count = 0;
    res.redirect(req.session.referer);
});

export default  router;
