'use strict'
var chai = require('chai')
  , chaiHttp = require('chai-http')
chai.use(chaiHttp)
var expect = chai.expect
chai.use(require('chai-string'))
const dataFactory = require('./beardata-factory.js').DataFactory

class CommonCall {
  /**
   * createBearData(for creating multiple records)
   * @param {*} id
   * @param {*} bear_type
   * @param {*} bear_name
   * @param {*} bear_age
   */
  async createBearData (id, bear_type, bear_name, bear_age) {
    let props = {bear_type , bear_name ,bear_age }
    let res = await chai.request('http://localhost:8091').post('/bear').send(props)
    expect(res).to.have.status(200)
  }

  /**
   * create bear data(single record)
   * @param {*} bear_type
   * @param {*} bear_name
   * @param {*} bear_age
   */
  async createBearInfo (bear_type, bear_name, bear_age) {
    let props = {bear_type , bear_name ,bear_age }
    let res = await chai.request('http://localhost:8091').post('/bear').send(props)
    expect(res).to.have.status(200)
  }

  /**
   * Read all bear data
   */
  async getBearData () {
    let props = { }
    let res = await chai.request('http://localhost:8091').get('/bear').send(props)
    expect(res).to.have.status(200)
    return res.text
  }

  /**
   * getBearDataById //Read specific bear data
    * @param {*} id
   */
  async getBearDataById (id) {
    let props = { id  }
    let res = await chai.request('http://localhost:8091').get('/bear/id').send(props)
    expect(res).to.have.status(200)
    return res.text
  }

  /**
   * deleteAllBearData
   */
  async deleteAllBearData (query) {
    return await chai.request('http://localhost:8091').delete('/bear').send(query)
  }

  /**
   * deleting specific bear record
   * @param {*} id
   * @param {*} bear
   */
  async deleteById (id) {
    const str1 = '/bear/'
    const str2 = id
    const newString = str1.concat(str2)
    let res = await chai.request('http://localhost:8091').delete(newString).send()
  }

  // /**
  //  * updating specific bear record
  //  * @param {*} id
  //  * @param {*} bear_name
  //  */
  // async updateBearData (id,bear_name) {

  //   let props = {bear_name }
  //   const str1 = '/bear/'
  //   const str2 = id
  //   const newString = str1.concat(str2)
  //   let res = await chai.request('http://localhost:8091').put(newString).send(props)
  //   // expect(res).to.have.status(200)
  // }

  /**
   * updating specific bear record
   * @param {*} id
   * @param {*} bear_type
   * @param {*} bear_name
   * @param {*} bear_age
   */
  async updateBearData (id,bear_type,bear_name,bear_age) {

    let props = {bear_type,bear_name,bear_age }
    const str1 = '/bear/'
    const str2 = id
    const newString = str1.concat(str2)
    let res = await chai.request('http://localhost:8091').put(newString).send(props)
    // expect(res).to.have.status(200)
  }
}


exports.CommonCall  = new CommonCall()

