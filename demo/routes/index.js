import { Router } from 'express';
import Debug from 'debug'

import _checksession from './checksession';

const router = Router();
const debug = Debug("chat-plugin:index");
const checksession = _checksession("/");

/* GET home page. */
router.get('/', checksession, async (req, res) => {
    debug('requested');
    if (req.session.count === undefined)
        req.session.count = 1;
    else
        req.session.count++;
    res.render('index', { title: 'Express',
                          count: req.session.count,
                          userName: req.session.userName });
});

router.get('/logout', async (req, res) => {
    debug('logging out');
    req.session.regenerate(err => {
        debug('logged out');
        res.redirect('/');
    });
});

export default  router;
