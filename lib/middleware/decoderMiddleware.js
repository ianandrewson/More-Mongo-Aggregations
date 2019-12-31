const decoder = require('../utils/decoder.js');
const mung = require('express-mung');

function decode(body) {
  if(body.petitioner) body.petitioner = decoder.partiesDecoder[Number(body.petitioner)];
  if(body.peitionerState) body.peitionerState = decoder.stateDecoder[Number(body.petitionerState)];
  if(body.respondent) body.respondent = decoder.partiesDecoder[Number(body.respondent)];
  if(body.respondentState) body.respondentState = decoder.stateDecoder[Number(body.respondentState)];
  if(body.caseSource) body.caseSource = decoder.caseSourceDecoder[Number(body.caseSource)];
  if(body.certReason) body.certReason = decoder.certReasonDecoder[Number(body.certReason)];
  if(body.issue) body.issue = decoder.issueDecoder[Number(body.issue)];
  if(body.issueArea) body.issueArea = decoder.issueAreaDecoder[Number(body.issueArea)];
  if(body.lawSupp) body.lawSupp = decoder.lawSuppDecoder[Number(body.lawSupp)];
  if(body.declarationUncon) body.declarationUncon = decoder.declarationUnconDecoder[Number(body.declarationUncon)];
  if(body.partyWinning) body.partyWinning = decoder.partyWinningDecoder[Number(body.partyWinning)];
  if(body.precedentAlteration) body.precedentAlteration = decoder.precedentAlterationDecoder[Number(body.precedentAlteration)];
  if(body.adminAction) body.adminAction = decoder.adminActionDecoder[Number(body.adminAction)];
  if(body.decisionDirection) body.decisionDirection = decoder.decisionDirectionDecoder[Number(body.decisionDirection)];
  if(body.caseDisposition) body.caseDisposition = decoder.caseDispositionDecoder[Number(body.caseDisposition)];
  return body;
}

module.exports = mung.json(decode);
