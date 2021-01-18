const app = require('../app')
const port = process.env.PORT || 7500

// listening
app.listen(port, () => {
    console.log('masuk di port', port)
})