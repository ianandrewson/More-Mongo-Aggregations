require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app.js');
const connect = require('../lib/utils/connect.js');
const mongoose = require('mongoose');
const CaseModel = require('../lib/models/SupremeCourtCases.js');

describe('supremeCourtCases route tests', () => {
  beforeAll(() => {
    connect();
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });
  it('should be able to create a court case', () => {
    return request(app)
      .post('/api/v1/cases')
      .send({
        caseId: '999999',
        caseName: 'test case'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          caseId: '999999',
          caseName: 'test case',
          __v: 0
        });
      });
  });
  it('should be able to get all cases', async() => {
    const getTheseCases = await CaseModel.create([
      { caseId: 'case 1', caseName: 'test 1' },
      { caseId: 'case 2', caseName: 'test 2' },
      { caseId: 'case 3', caseName: 'test 3' }
    ]);
    return request(app)
      .get('/api/v1/cases/')
      .then(res => {
        getTheseCases.forEach(courtCase => {
          expect(res.body).toContainEqual(JSON.parse(JSON.stringify(courtCase)));
        });
      });
  });
  it('should be able to get a court case by ID', async() => {
    const caseTwo = await CaseModel.create({
      caseId: '000000',
      caseName: 'another test'
    });
    return request(app)
      .get(`/api/v1/cases/${caseTwo.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          caseId: '000000',
          caseName: 'another test',
          __v: 0
        });
      });
  });
  it('should be able to delete a court case by ID', () => {
    const caseThree = CaseModel.create({
      caseId: '000001',
      caseName: 'third test'
    });
    return request(app)
      .delete(`/api/v1/cases/${caseThree.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          caseId: '000001',
          caseName: 'third test',
          __v: 0
        });
      });
  });
  it('should be able to update a court case', () => {
    const caseFour = CaseModel.create({
      caseId: '000002',
      caseName: 'fourth test'
    });
    return request(app)
      .patch(`/api/v1/cases/${caseFour.id}`)
      .send({
        caseId: 'NEW CASE ID',
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          caseId: 'NEW CASE ID',
          caseName: 'fourth test',
          _v: 0
        });
      });
  });
});
