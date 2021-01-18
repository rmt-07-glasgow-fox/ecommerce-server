function errorHandle(err, req, res, next) {
    if (err) {
        const status = err.code || 500

        if (err.from) {
            res.status(status).json(err)
        } else {
            const msg = err.message

            res.status(status).json(msg)
        }
    }
}

module.exports = { errorHandle }