function errorHandlers(err, req, res, next) {
    if (err) {
        let { name, message } = err

        if (name === 400) {
            return res.status(400).json({ message: message || 'Bad Request' })
        }

        if (name === 401) {
            return res.status(401).json({ message: message || 'Unauthorized' })
        }

        if (name === 403) {
            return res.status(403).json({ message: message || 'Forbidden' })
        }

        if (name === 404) {
            return res.status(404).json({ message: message || 'Not Found' })
        }

        return res.status(500).json(err)
    }

    console.log('>>> check error handlers please')
}

module.exports = errorHandlers