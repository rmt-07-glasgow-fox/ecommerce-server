function authorization (req, res, next) {
    if(req.loggedInUser.role === 'admin'){
        next()
    }
    else {
        res.status(401).json({msg: "Sorry you no Authorized in product"})
    }
}

module.exports = authorization