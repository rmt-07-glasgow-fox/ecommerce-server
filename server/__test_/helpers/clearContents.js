const { Content } = require("../../models")

function clearContent() {
    if (process.env.NODE_ENV === "test") {
        Content.destroy({ where: {} })
    }
}

module.exports = clearContent