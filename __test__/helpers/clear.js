const {User, Product, Banner} = require("../../models")

function clearUsers() {
    if (process.env.NODE_ENV === 'test') {
        return User.destroy({where: {}})
    }
}

function clearProducts() {
    if (process.env.NODE_ENV === 'test') {
        return Product.destroy({where: {}})
    }
}

function clearBanners() {
    if (process.env.NODE_ENV === 'test') {
        return Banner.destroy({where: {}})
    }
}

module.exports = {clearUsers, clearProducts, clearBanners}

