'use strict'
var chai = require('chai')
  , chaiHttp = require('chai-http')
chai.use(chaiHttp)
var expect = chai.expect
chai.use(require('chai-string'))
const call = require('./utils/common-call').CommonCall
const dataFactory = require('./utils/beardata-factory.js').DataFactory

describe('readBearInfo', async () => {

  it('1)read all BearData', async () =>{

    let getAllBearData1 = await call.getBearData()
  // let getAllBearData1Res = JSON.parse(getAllBearData1)
  // console.log(getAllBearData1Res)
  })

  it('2)read specific BearData By Id', async () =>{

    let getAllBearData1 = await call.getBearDataById('1')
    let getAllBearData1Res = JSON.parse(getAllBearData1)
    expect(getAllBearData1Res[0].bear_type).to.be.equal('POLAR')
    expect(getAllBearData1Res[0].bear_name).to.be.equal('ADAM')
    expect(getAllBearData1Res[0].bear_age).to.be.equal('11')
  })

  it('3)Validate- insert bear_type = GUMMY, result= UNKNOWN', async () =>{

    await call.createBearInfo('GUMMY','MACK','16')
    let getAllBearData1 = await call.getBearData()
    let getAllBearData1Res = JSON.parse(getAllBearData1)
    expect(getAllBearData1Res[9].bear_type).to.equal('GUMMY')//Mismatch between the inserted record data and populated data
  })

})