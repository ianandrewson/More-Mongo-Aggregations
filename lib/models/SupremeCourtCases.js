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
  petitioner: Number,
  petitionerState: Number,
  respondent: Number,
  respondentState: Number,
  caseSource: Number,
  certReason: Number,
  dateDecision: String,
  chief: String,
  issue: Number,
  issueArea: Number,
  lawSupp: Number,
  declarationUncon: Number,
  partyWinning: Number,
  precedentAlteration: Number,
  majVotes: Number,
  minVotes: Number,
  adminAction: Number
});

module.exports = mongoose.model('cases', schema);
