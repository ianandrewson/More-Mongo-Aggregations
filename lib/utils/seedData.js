const csv = require('csvtojson');
const Cases = require('../models/SupremeCourtCases.js');

function seedData(){
  return csv()
    .fromFile(__dirname + '/../../assets/SCDB_2019_01_caseCentered_LegalProvision.csv')
    .then(cases => {
      return cases.map(courtCase => ({
        caseId: courtCase.caseId,
        caseName: courtCase.caseName,
        petitioner: courtCase.petitioner,
        peitionerState: courtCase.petitionerState,
        respondent: courtCase.respondent,
        respondentState: courtCase.respondentState,
        caseSource: courtCase.caseSource,
        certReason: courtCase.certReason,
        dateDecision: courtCase.dateDecision,
        chief: courtCase.chief,
        issue: courtCase.issue,
        issueArea: courtCase.issueArea,
        lawSupp: courtCase.lawSupp,
        declarationUncon: courtCase.declarationUncon,
        partyWinning: courtCase.partyWinning,
        precedentAlteration: courtCase.precedentAlteration,
        majVotes: courtCase.majVotes,
        minVotes: courtCase.minVotes,
        adminAction: courtCase.adminAction,
        decisionDirection: courtCase.decisionDirection,
        caseDisposition: courtCase.caseDisposition
      }));
    })
    .then(cases => Cases.create(cases));
}

module.exports = { seedData };
