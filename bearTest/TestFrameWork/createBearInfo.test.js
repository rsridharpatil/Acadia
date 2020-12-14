'use strict'
var chai = require('chai')
  , chaiHttp = require('chai-http')
chai.use(chaiHttp)
var expect = chai.expect
chai.use(require('chai-string'))
const call = require('./utils/common-call').CommonCall
const dataFactory = require('./utils/beardata-factory.js').DataFactory

describe('createBearInfo', async () => {

  it('1)createBearInfo-single record', async () =>{

    try
    {
      await call.createBearInfo('BLACK','KATE','16')
    }
    catch(error){
      console.log(error)
      expect(error.actual).to.eql(200)
    }
  })

  it('2)createBearData-multiple records', async () =>{

    try
    {
      await call.createBearData('1','POLAR', 'ADAM', '11')
      await call.createBearData('2','BROWN', 'BOBBY', '12')
      await call.createBearData('4','GUMMY', 'DEXTER', '13')
    }
    catch(error){
      expect(error.actual).to.eql(200)
    }

  })
  it('3)Validation-bear data', async () =>{

    let getAllBearData1 = await call.getBearData()
    let getAllBearData1Res = JSON.parse(getAllBearData1)
    expect(getAllBearData1Res[1].bear_type).to.be.equal('POLAR')
    expect(getAllBearData1Res[1].bear_name).to.be.equal('ADAM')
    expect(getAllBearData1Res[1].bear_age).to.be.equal(11)
    expect(getAllBearData1Res.length).to.be.equal(4)
  })

  it('4)Validate-able to insert bear_age-with -veValue', async () =>{

    await call.createBearInfo('BLACK','KATE','-16')
    let getAllBearData1 = await call.getBearData()
    let getAllBearData1Res = JSON.parse(getAllBearData1)
    expect(getAllBearData1Res[4].bear_type).to.be.equal('BLACK')
    expect(getAllBearData1Res[4].bear_name).to.be.equal('KATE')
    expect(getAllBearData1Res[4].bear_age).to.be.equal('-16')//bear_age cannot have negative value
  })

  it('5)Validate-able to insert bear_age-with 0 Value', async () =>{

    await call.createBearInfo('BLACK','LISA','0')
    let getAllBearData1 = await call.getBearData()
    let getAllBearData1Res = JSON.parse(getAllBearData1)
    expect(getAllBearData1Res[5].bear_type).to.be.equal('BLACK')
    expect(getAllBearData1Res[5].bear_name).to.be.equal('LISA')
    expect(getAllBearData1Res[5].bear_age).to.be.equal(0)
  })

  it('6)Validate-bear_age >100', async () =>{

    await call.createBearInfo('BROWN','JACK','101')
    let getAllBearData1 = await call.getBearData()
    let getAllBearData1Res = JSON.parse(getAllBearData1)
    expect(getAllBearData1Res[6].bear_type).to.be.equal('BROWN')
    expect(getAllBearData1Res[6].bear_name).to.be.equal('JACK')
    expect(getAllBearData1Res[6].bear_age).to.be.equal('101')// Need to check whether bear_age can be 0 or not
  })

  it('7)Validate-able to create bear_name-with-ve number', async () =>{
    await call.createBearInfo('BLACK','-4','12')
    let getAllBearData1 = await call.getBearData()
    let getAllBearData1Res = JSON.parse(getAllBearData1)
    expect(getAllBearData1Res[7].bear_type).to.be.equal('BLACK')
    expect(getAllBearData1Res[7].bear_name).to.not.equal('-4')// Need to check (bear_name need to be a string)
    expect(getAllBearData1Res[7].bear_age).to.be.equal('12')
  })

  it('8)Observation-able to create bear_name- without value', async () =>{

    await call.createBearInfo('BLACK','','12.5')
    let getAllBearData1 = await call.getBearData()
    let getAllBearData1Res = JSON.parse(getAllBearData1)
    expect(getAllBearData1Res[8].bear_type).to.be.equal('BLACK')
    expect(getAllBearData1Res[8].bear_name).to.be.equal('')
    expect(getAllBearData1Res[8].bear_age).to.be.equal(12.5)
  })

  it('9)Validation-create bearData Without-bear_type', async () =>{

    try
    {
      await call.createBearInfo('','JACK','12.5')
    }
    catch(error)
    {
      expect(error.actual).to.eql(500)// bear_type cannot be blank
    }
  })
  it('10)Validation-create bearData Without-bear_age', async () =>{

    try
    {
      await call.createBearInfo('BLACK','MACK','')
    }
    catch(error)
    {
      expect(error.actual).to.eql(500)// bear_age cannot be blank
    }
  })

})