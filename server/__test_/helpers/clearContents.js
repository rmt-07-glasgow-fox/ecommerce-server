const { Content, Banner, User } = require("../../models")

function clearContent() {
    if (process.env.NODE_ENV === "test") {
        Content.destroy({ where: {} })
        Banner.destroy({ where: {} })
        User.destroy({ where : {}})
    }
}

module.exports = clearContent