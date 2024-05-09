const { validationResult } = require('express-validator');
const User = require('../models/user');

const {mailMarketingQueue} = require('../workers/mailMarketingJob')

function mailMarketing(req, res){
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).send({
            status: 400,
            message: errors.array()
        })
    }
    
    var data = req.body
    mailMarketingQueue.add(data)
}