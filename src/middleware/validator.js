'use strict';

 function validator (req, res, next){
    const {name} = req.query;
    if (!name)
        return next(new Error('Name is required'));

    next();
}
module.exports = validator;
