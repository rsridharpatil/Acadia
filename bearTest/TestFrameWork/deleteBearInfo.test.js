'use strict'
var chai = require('chai')
  , chaiHttp = require('chai-http')
chai.use(chaiHttp)
var expect = chai.expect
chai.use(require('chai-string'))
const call = require('./utils/common-call').CommonCall
const dataFactory = require('./utils/beardata-factory.js').DataFactory

describe('deleteBearInfo', async () => {
  it('1)delete specific BearData by id', async () =>{

    try
    {
      await call.deleteById('1')// We need to pass appropriate id from database
      let getAllBearData1 = await call.query({})
      let getAllBearData1Res = JSON.parse(getAllBearData1.text)
      expect(getAllBearData1Res[0].bear_id).to.not.equal('1')
    }
    catch(error){
      expect(error.actual).to.eql(200)
    }
  })

  it('2)delete all BearData', async () =>{

    try
    {
      await call.deleteAllBearData()
    }
    catch(error){
      expect(error.actual).to.eql(200)
    }
  })

})