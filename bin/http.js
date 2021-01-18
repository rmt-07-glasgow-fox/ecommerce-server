const { listen } = require("../app")
const app = require("../app")
const port = process.env.PORT || 3000

listen(port, () => {
    console.log('listen on port ' + port)
})