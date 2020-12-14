'use strict'
var chai = require('chai')
  , chaiHttp = require('chai-http')
chai.use(chaiHttp)
var expect = chai.expect
chai.use(require('chai-string'))
const call = require('./utils/common-call').CommonCall
const dataFactory = require('./utils/beardata-factory.js').DataFactory

describe('performanceTest-bulkCreation', async () => {

  it('1)Performance-Took 2 seconds for creating 200 BearInfo records', async () =>{

    await call.deleteAllBearData()

    try
    {
      for (let id = 0; id < 200; id++) {
        let props = dataFactory.create('bearInfo')
        await call.createBearData(id,props.bear_type, props.bear_name, props.bear_age)
      }
    }
    catch(error){
      console.log(error)
    }

  })


})