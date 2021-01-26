const { mod } = require('prelude-ls')
const{Product} = require('../../models')

function cleanUp (){
    if(process.env.NODE_ENV === 'test'){
        return Product.destroy({where:{}})
    }
}
module.exports = cleanUp