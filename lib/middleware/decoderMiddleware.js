const decoder = require('../utils/decoder.js');
const mung = require('express-mung');

function decode(body) {
  body.forEach(courtCase => {
    if(courtCase.petitioner) courtCase.petitioner = decoder.partiesDecoder[Number(courtCase.petitioner)];
    if(courtCase.peitionerState) courtCase.peitionerState = decoder.stateDecoder[Number(courtCase.petitionerState)];
    if(courtCase.respondent) courtCase.respondent = decoder.partiesDecoder[Number(courtCase.respondent)];
    if(courtCase.respondentState) courtCase.respondentState = decoder.stateDecoder[Number(courtCase.respondentState)];
    if(courtCase.caseSource) courtCase.caseSource = decoder.caseSourceDecoder[Number(courtCase.caseSource)];
    if(courtCase.certReason) courtCase.certReason = decoder.certReasonDecoder[Number(courtCase.certReason)];
    if(courtCase.issue) courtCase.issue = decoder.issueDecoder[Number(courtCase.issue)];
    if(courtCase.issueArea) courtCase.issueArea = decoder.issueAreaDecoder[Number(courtCase.issueArea)];
    if(courtCase.lawSupp) courtCase.lawSupp = decoder.lawSuppDecoder[Number(courtCase.lawSupp)];
    if(courtCase.declarationUncon) courtCase.declarationUncon = decoder.declarationUnconDecoder[Number(courtCase.declarationUncon)];
    if(courtCase.partyWinning) courtCase.partyWinning = decoder.partyWinningDecoder[Number(courtCase.partyWinning)];
    if(courtCase.precedentAlteration) courtCase.precedentAlteration = decoder.precedentAlterationDecoder[Number(courtCase.precedentAlteration)];
    if(courtCase.adminAction) courtCase.adminAction = decoder.adminActionDecoder[Number(courtCase.adminAction)];
    if(courtCase.decisionDirection) courtCase.decisionDirection = decoder.decisionDirectionDecoder[Number(courtCase.decisionDirection)];
    if(courtCase.caseDisposition) courtCase.caseDisposition = decoder.caseDispositionDecoder[Number(courtCase.caseDisposition)];
  });
  return body;
}

module.exports = mung.json(decode);
