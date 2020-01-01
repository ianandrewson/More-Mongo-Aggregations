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

schema.statics.topTenAgenciesThatCausedLawsuits = function() {
  return this.aggregate([
    {
      '$group': {
        '_id': '$caseSource', 
        'count': {
          '$sum': 1
        }
      }
    }, {
      '$project': {
        'caseSource': '$_id', 
        'count': true
      }
    }, {
      '$sort': {
        'count': -1
      }
    }, {
      '$limit': 10
    }, {
      '$project': {
        '_id': false
      }
    }
  ]);
};

schema.statics.unconstitutional = function() {
  return this.aggregate([
    {
      '$match': {
        '$or': [
          {
            'declarationUncon': '2'
          }, {
            'declarationUncon': '3'
          }, {
            'declarationUncon': '4'
          }
        ]
      }
    }
  ]);
};

schema.statics.precedentSettingFirstAmendment = function() {
  return this.aggregate([
    {
      '$match': {
        'lawSupp': '200', 
        'precedentAlteration': '1'
      }
    }
  ]);
};

module.exports = mongoose.model('CaseModel', schema);
