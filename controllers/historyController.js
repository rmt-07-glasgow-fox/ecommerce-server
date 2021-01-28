const { History } = require('../models')

class HistoryController {
    static async create(req,res,next){
        try {
            let data = req.body
            data.forEach(el => {
                el.UserId = req.user.id   
            });
            let result = await History.bulkCreate(data)
            if(result) res.status(201).json(result)
            
        } catch (error) {
            next(error)
        }
    }

    static async get(req,res,next){
        try {
            let result = await History.findAll({
                where:{
                    UserId: req.user.id
                }
            })

            res.status(200).json(result)            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = HistoryController