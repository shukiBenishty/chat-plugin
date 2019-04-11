import Debug from "debug";
import { Router } from 'express';

import group from "../mongooseModels";
import checksession from './checksession';

const router = Router();
const debug = Debug("chat-plugin:groups");
const groupsChecksession = checksession("/groups");


const Group = group('Group')

router.get('/', groupsChecksession, async (req, res) => {
    debug('request groups');
    try {
        res.render('groups', {title: 'Group List', admin: req.session.admin, groups: await Group.find({})});
    } catch (err) { debug(`get groups failure: ${err}`); }
});

router.get('/add', groupsChecksession, async (req, res) => {
    debug('add group page');
    if (!req.session.admin) {
        debug("Must be admin to add a group!!!");
        res.redirect('/groups');
    } else
        res.render('addgroup', {title: 'Add group', admin: req.session.admin});
});

router.post('/add', groupsChecksession, async (req, res) => {
    debug('add group');
    if (!req.session.admin)
        debug("Must be admin to add a group!!!");
    else if (req.body.group === undefined || req.body.group === null || req.body.group === "")
        debug("Missing group to add!!!");
    else if (req.body.subscribers === undefined || req.body.subscribers === null || req.body.subscribers === "")
        debug("Missing subscribers for group to add!!!");
    else {
        let group;
        try {
            group = await Group.findOne({name: req.body.group}).exec();
        } catch (err) {
            debug(`get group for adding failure: ${err}`);
        }
        if (group === null)
            try {
                group = new Group({
                    name: req.body.group,
                    picture: req.body.picture,
                    subscribers: req.body.subscribers.split(',')
                });
                await group.save();
                debug('Group created:' + group);
            } catch (err) {
                debug("Error creating a group: " + err);
            }
        else
            debug('Group to be added already exists or checkin group existence failure!');
    }
    res.redirect('/groups');
});

router.get('/delete/:name', groupsChecksession, async (req, res) => {
    debug('delete group');
    if (!req.session.admin || req.params.name === 'dzilbers')
        debug("Must be admin to delete a group or can't delete THE ADMIN!!!");
    else {
        let group;
        try {
            group = await Group.findOne({name: req.params.name}).exec();
        } catch (err) {
            debug(`get group for deleting failure: ${err}`);
        }
        if (group === null || group === undefined)
            debug('Group to be deleted does not exist or failure checking group!');
        else {
            debug("REMOVING");
            try {
                await group.remove();
                debug('Group successfully deleted!');
            } catch (err) {
                debug(`Failed deleting group: ${err}`);
            }
        }
    }
    res.redirect('/groups');
});

export default  router;
