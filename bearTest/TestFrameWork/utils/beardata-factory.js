'use strict'

const dataFactory = require('object-factory-bot')
const faker = require('faker')


dataFactory.define('bearInfo')
  .bear_type (() => faker.random.arrayElement(['POLAR','BROWN','BLACK']))
  .bear_name (() => faker.name.findName())
  .bear_age (() => faker.random.number({min:1, max:100}))


exports.DataFactory  = dataFactory