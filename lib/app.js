const express = require('express');
const app = express();

app.use(express.json());

app.use(require('../lib/middleware/decoderMiddleware.js'));
app.use('/api/v1/cases', require('./routes/supremeCourtCases.js'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
