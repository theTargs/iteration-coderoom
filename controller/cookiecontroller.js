const User = require("./../model/database");


// const cookieController = {};
// cookieController.setSSIDCookie = setSSIDCookie;

const setSSIDCookie = (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, data) => {
    console.log('ssid ', data._id);
    res.cookie('ssid', data._id, { httpOnly: true });
    res.locals.ssid = data.id;
    next();
  });  
}

module.exports = setSSIDCookie;