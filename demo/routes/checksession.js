export default  (redirectPath) => {
    return (req, res, next) => {
        if (req.session === undefined || req.session.userId === undefined){
            req.session.referer = redirectPath;
            res.redirect('/login');
        }
        else
            next();
    }
}