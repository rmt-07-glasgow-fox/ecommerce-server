function errorHandler (err, req, res, next) {
  switch (err.code) {
    case 400:
      let msg = err.msg.map(e => e.message);

      return res.status(400).json({ msg: msg });
    case 401:
      return res.status(401).json({ msg: err.msg });
    case 404:
      return res.status(404).json({ msg: err.msg });
    case 500:
      return res.status(500).json({ msg: "Server Error" });
  }
}

module.exports = errorHandler;