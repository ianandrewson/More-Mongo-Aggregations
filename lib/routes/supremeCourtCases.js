const { Router } = require('express');
const CaseModel = require('../models/SupremeCourtCases.js');

module.exports = Router()
  .post('/', (req, res, next) => {
    CaseModel
      .create(req.body)
      .then(courtCase => res.send(courtCase))
      .catch(next);
  })

  .get('/worst', (req, res, next) => {
    CaseModel
      .topTenAgenciesThatCausedLawsuits()
      .then(courtCases => res.send(courtCases))
      .catch(next);
  })

  .get('/unconstitutional', (req, res, next) => {
    CaseModel
      .unconstitutional()
      .then(courtCases => res.send(courtCases))
      .catch(next);
  })

  .get('/precedentSettingFirstAmendment', (req, res, next) => {
    CaseModel
      .precedentSettingFirstAmendment()
      .then(courtCases => res.send(courtCases))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    const { page = 1, perPage = 25 } = req.query;
    CaseModel
      .find()
      .limit(Number(perPage))
      .skip((Number(page) - 1) * Number(perPage))
      .then(courtCases => res.send(courtCases))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    CaseModel
      .findById(req.params.id)
      .then(courtCase => res.send([courtCase]))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    CaseModel
      .findByIdAndDelete(req.params.id)
      .then(courtCase => res.send([courtCase]))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    CaseModel
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(courtCase => res.send([courtCase]))
      .catch(next);
  });


