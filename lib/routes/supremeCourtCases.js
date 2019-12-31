const { Router } = require('express');
const CaseModel = require('../models/SupremeCourtCases.js');

module.exports = Router()
  .post('/', (req, res, next) => {
    CaseModel
      .create(req.body)
      .then(courtCase => res.send(courtCase))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    const { page = 1, perPage = 25 } = req.query;
    CaseModel
      .find()
      .limit(Number(perPage))
      .skip((Number(page) - 1) * Number(perPage))
      .then(cases => res.send(cases))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    CaseModel
      .findById(req.params.id)
      .then(courtCase => res.send(courtCase))
      .catch(next);
  });
