const app = require('../app')
const port = process.env.PORT || 3300

app.listen(port, () => {
    console.log(`Connected on Port ${port}`)
})