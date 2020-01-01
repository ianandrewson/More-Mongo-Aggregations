require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app.js');
const connect = require('../lib/utils/connect.js');
const mongoose = require('mongoose');
const CaseModel = require('../lib/models/SupremeCourtCases');
const decoder = require('../lib/utils/decoder.js');

describe('decoder test', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let courtCase;
  beforeEach(async() => {
    courtCase = await CaseModel.create({
      caseId:'1946-001',
      caseName:'HALLIBURTON OIL WELL CEMENTING CO. v. WALKER et al., DOING BUSINESS AS...',
      petitioner: 198,
      respondent: 172,
      respondentState: null,
      caseSource: 29,
      certReason: 11,
      dateDecision: '11/18/1946',
      chief: 'Vinson',
      issue: 80180,
      issueArea: 8,
      lawSupp: 600,
      declarationUncon: 1,
      partyWinning: 1,
      precedentAlteration: 1,
      majVotes: 8,
      minVotes: 1,
      adminAction: null,
      decisionDirection: 2,
      caseDisposition: 3,
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('should return all values decoded into plaintext', () => {
    return request(app)
      .get(`/api/v1/cases/${courtCase.id}`)
      .then(res => {
        expect(res.body).toEqual([{
          _id: expect.any(String),
          caseId:'1946-001',
          caseName:'HALLIBURTON OIL WELL CEMENTING CO. v. WALKER et al., DOING BUSINESS AS...',
          petitioner: decoder.partiesDecoder[courtCase.petitioner],
          respondent: decoder.partiesDecoder[courtCase.respondent],
          respondentState: null,
          caseSource: decoder.caseSourceDecoder[courtCase.caseSource],
          certReason: decoder.certReasonDecoder[courtCase.certReason],
          dateDecision: '11/18/1946',
          chief: 'Vinson',
          issue: decoder.issueDecoder[courtCase.issue],
          issueArea: decoder.issueAreaDecoder[courtCase.issueArea],
          lawSupp: decoder.lawSuppDecoder[courtCase.lawSupp],
          declarationUncon: decoder.declarationUnconDecoder[courtCase.declarationUncon],
          partyWinning: decoder.partyWinningDecoder[courtCase.partyWinning],
          precedentAlteration: decoder.precedentAlterationDecoder[courtCase.precedentAlteration],
          majVotes: 8,
          minVotes: 1,
          adminAction: null,
          decisionDirection: decoder.decisionDirectionDecoder[courtCase.decisionDirection],
          caseDisposition: decoder.caseDispositionDecoder[courtCase.caseDisposition],
          __v: 0
        }]);
      });
  });
});
