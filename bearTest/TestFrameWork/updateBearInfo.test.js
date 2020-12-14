'use strict'
var chai = require('chai')
  , chaiHttp = require('chai-http')
chai.use(chaiHttp)
var expect = chai.expect
chai.use(require('chai-string'))
const call = require('./utils/common-call').CommonCall
const dataFactory = require('./utils/beardata-factory.js').DataFactory

describe('updateBearInfo', async () => {
  it('1)updateBearData-Case1', async () =>{

    await call.updateBearData('3',undefined,'AdamHack',undefined)
    let getAllBearData1 = await call.getBearData()
    let getAllBearData1Res = JSON.parse(getAllBearData1)
    expect(getAllBearData1Res[2].bear_name).to.be.equal('AdamHack')
  })

  it('2)update bear_type is not allowed', async () =>{

    try
    {
      await call.updateBearData('3','Gummy','updatedname',undefined)
    }
    catch(error)
    {
      expect(error.actual).to.eql(500)
    }
  })
  it('3)update bear_age is not allowed', async () =>{

    try
    {
      await call.updateBearData('3',undefined,'updatedname','15')
    }
    catch(error)
    {
      expect(error.actual).to.eql(500)
    }
  })
})