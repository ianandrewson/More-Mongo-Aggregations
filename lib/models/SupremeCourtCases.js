const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  caseId: {
    type: String,
    required: true
  },
  caseName: {
    type: String,
    required: true
  },
  petitioner: String,
  petitionerState: String,
  respondent: String,
  respondentState: String,
  caseSource: String,
  certReason: String,
  dateDecision: String,
  chief: String,
  issue: String,
  issueArea: String,
  lawSupp: String,
  declarationUncon: String,
  partyWinning: String,
  precedentAlteration: String,
  majVotes: Number,
  minVotes: Number,
  adminAction: String,
  decisionDirection: String,
  caseDisposition: String
});

module.exports = mongoose.model('CaseModel', schema);
