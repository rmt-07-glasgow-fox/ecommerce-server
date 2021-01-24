if (process.env.NODE_DEV === 'development' || process.env.NODE_ENV === 'test') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(router);
app.use(errorHandler);
app.listen(port, _=> console.log(`running on port: ${port}`));